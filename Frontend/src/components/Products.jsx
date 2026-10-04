import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review
  const [reviews, setReviews] = useState({});
  const [selectedFood, setSelectedFood] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  // Cart
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("foodnest-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5900/api/foods");
        setFoods(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getFoods();
  }, []);

  // Fetch Reviews
  const getReviews = async (foodId) => {
    try {
      const response = await axios.get(
        `http://localhost:5900/api/reviews/${foodId}`
      );

      setReviews((prev) => ({
        ...prev,
        [foodId]: response.data,
      }));
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  // Submit Review
  const submitReview = async () => {
    if (!selectedFood) return;

    if (!reviewText.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      setReviewLoading(true);

      const token = localStorage.getItem("foodnest-token");

      await axios.post(
        "http://localhost:5900/api/reviews",
        {
          food: selectedFood._id,
          rating: rating,
          review: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review added successfully!");

      setReviewText("");
      setRating(5);

      await getReviews(selectedFood._id);

      setSelectedFood(null);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to add review"
      );
    } finally {
      setReviewLoading(false);
    }
  };

// Calculate Average Rating
const getAverageRating = (foodId) => {
  const foodReviews = reviews[foodId] || [];

  if (foodReviews.length === 0) {
    return "4.8";
  }

  const total = foodReviews.reduce(
    (sum, item) => sum + item.rating,
    0
  );

  return (total / foodReviews.length).toFixed(1);
};
  // Save cart in localStorage
  useEffect(() => {
    localStorage.setItem(
      "foodnest-cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  // Add to Cart
  const addToCart = (food) => {
    const existingFood = cart.find(
      (item) => item._id === food._id
    );

    let updatedCart;

    if (existingFood) {
      updatedCart = cart.map((item) =>
        item._id === food._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "foodnest-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${food.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">

        <div className="absolute -top-24 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

          <p className="text-blue-100 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            Welcome to FoodNest
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-5">
            Explore Delicious
            <span className="block text-blue-200">
              Food & Flavours
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 text-lg leading-8">
            Discover your favourite meals and enjoy a smarter food ordering
            experience with FoodNest.
          </p>

        </div>

      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">

          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              Our Menu
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Popular Food
            </h2>
          </div>

          <p className="text-gray-500 mt-3 md:mt-0">
            {foods.length} delicious choices available
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && foods.length === 0 && (
          <div className="text-center py-20">

            <div className="text-6xl mb-4">
              🍽️
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              No food available
            </h3>

            <p className="text-gray-500 mt-2">
              Admin has not added any food yet.
            </p>

          </div>
        )}

        {/* Food Cards */}
        {!loading && foods.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {foods.map((x) => (

              <ul
                key={x._id}
                className="group relative list-none bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              >

                {/* Food Image */}
                <li className="relative h-52 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden">

                  <div className="absolute w-32 h-32 bg-white/60 rounded-full blur-2xl"></div>

                  <img
                    src={x.image}
                    alt={x.name}
                    className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Favourite */}
                  <button
                    type="button"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 hover:bg-red-50 transition-all duration-300"
                  >
                    ❤️
                  </button>

                </li>

                {/* Card Content */}
                <li className="list-none p-6">

                  <div className="flex items-center justify-between mb-3">

                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                      FoodNest Special
                    </span>

                    <span className="text-sm text-gray-500">
             ⭐ {getAverageRating(x._id)}
                 </span>
                  </div>

                  {/* Write Review */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFood(x);
                      getReviews(x._id);
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    ⭐ Write a Review
                  </button>
                  {/* Reviews */}
{reviews[x._id] && reviews[x._id].length > 0 && (
  <div className="mt-4 rounded-2xl bg-gray-50 p-4">

    <p className="mb-3 text-sm font-bold text-gray-800">
      Customer Reviews
    </p>

    <div className="space-y-3">
      {reviews[x._id].slice(0, 2).map((item) => (
        <div
          key={item._id}
          className="rounded-xl bg-white p-3 shadow-sm"
        >
          <div className="flex items-center justify-between">

            <p className="text-sm font-semibold text-gray-800">
              {item.user?.name || "FoodNest User"}
            </p>

            <span className="text-sm text-yellow-500">
              {"★".repeat(item.rating)}
            </span>

          </div>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {item.review}
          </p>

            </div>
           ))}
             </div> 

                  </div>
                   )}

                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mt-3">
                    {x.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 leading-6">
                    {x.description}
                  </p>

                  <div className="flex items-center justify-between mt-6">

                    <div>
                      <p className="text-xs text-gray-400">
                        Price
                      </p>

                      <p className="text-2xl font-extrabold text-gray-900">
                        ₹{x.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(x)}
                      className="group/btn flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                    >

                      <span>
                        Add to Cart
                      </span>

                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                        →
                      </span>

                    </button>

                  </div>

                </li>

              </ul>

            ))}

          </div>
        )}

      </section>

      {/* Review Modal */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Write a Review
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedFood.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFood(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>

            </div>

            {/* Rating */}
            <div className="mt-6">

              <p className="mb-3 text-sm font-semibold text-gray-700">
                Your Rating
              </p>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-transform hover:scale-110 ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}

              </div>

            </div>

            {/* Review */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Your Review
              </label>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your food..."
                rows="4"
                className="w-full resize-none rounded-2xl border border-gray-200 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={submitReview}
              disabled={reviewLoading}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Products;