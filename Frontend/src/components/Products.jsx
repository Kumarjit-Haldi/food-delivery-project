import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Save cart in localStorage
  useEffect(() => {
  localStorage.setItem("foodnest-cart", JSON.stringify(cart));

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
        ? { ...item, quantity: item.quantity + 1 }
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

            {foods.map(x => (

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
                      ⭐ 4.8
                    </span>

                  </div>


                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
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

    </div>
  );
};

export default Products;