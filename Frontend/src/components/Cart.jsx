import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("foodnest-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart
  useEffect(() => {
    localStorage.setItem("foodnest-cart", JSON.stringify(cart));
  }, [cart]);

  // Increase quantity
  const increaseQuantity = (id) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    localStorage.setItem(
      "foodnest-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    return updatedCart;
  });
};

  // Decrease quantity
  const decreaseQuantity = (id) => {
  setCart((prevCart) => {
    const updatedCart = prevCart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem(
      "foodnest-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    return updatedCart;
  });
};
  // Remove item
  const removeItem = (id) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.filter(
      (item) => item._id !== id
    );

    localStorage.setItem(
      "foodnest-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    return updatedCart;
  });
};

  // Total
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            FoodNest
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Your Cart 🛒
          </h1>

          <p className="text-gray-500 mt-3">
            Review your selected food before checkout.
          </p>

        </div>


        {/* Empty Cart */}
        {cart.length === 0 && (

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 text-center py-20 px-6">

            <div className="text-7xl mb-6">
              🛒
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-3">
              Add some delicious food from our menu.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/products";
              }}
              className="mt-7 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Explore Menu →
            </button>

          </div>

        )}


        {/* Cart Items */}
        {cart.length > 0 && (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Items */}
            <div className="lg:col-span-2 space-y-5">

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-lg p-5 flex flex-col sm:flex-row gap-5 hover:shadow-xl transition-all duration-300"
                >

                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                  </div>


                  {/* Details */}
                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h2 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                          ₹{item.price} per item
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 hover:text-red-700 font-semibold transition"
                      >
                        Remove
                      </button>

                    </div>


                    {/* Quantity + Price */}
                    <div className="flex items-center justify-between mt-7">

                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item._id)}
                          className="w-9 h-9 rounded-lg bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 transition"
                        >
                          −
                        </button>

                        <span className="w-8 text-center font-bold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item._id)}
                          className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition"
                        >
                          +
                        </button>

                      </div>


                      <p className="text-xl font-extrabold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* Summary */}
            <div className="lg:col-span-1">

              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-7 sticky top-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="border-t border-gray-100 my-6"></div>


                <div className="flex justify-between text-gray-500 mb-4">

                  <span>
                    Items
                  </span>

                  <span>
                    {cart.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>

                </div>


                <div className="flex justify-between text-gray-500 mb-4">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹{totalPrice}
                  </span>

                </div>


                <div className="flex justify-between text-gray-500 mb-6">

                  <span>
                    Delivery
                  </span>

                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>

                </div>


                <div className="border-t border-gray-100 pt-5">

                  <div className="flex justify-between items-center">

                    <span className="text-lg font-semibold text-gray-700">
                      Total
                    </span>

                    <span className="text-3xl font-extrabold text-gray-900">
                      ₹{totalPrice}
                    </span>

                  </div>

                </div>

//checkout section 
                <button
                  type="button"
                   onClick={() => navigate("/checkout")}
                  className="w-full mt-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Proceed to Checkout →
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Cart;