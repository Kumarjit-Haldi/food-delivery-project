import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();
  useEffect(() => {
  const script = document.createElement("script");

  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

  // Cart data
  const [cart] = useState(() => {
    const savedCart = localStorage.getItem("foodnest-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Customer details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Total items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Place Order
 const placeOrder = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  if (
    !name.trim() ||
    !phone.trim() ||
    !address.trim() ||
    !city.trim() ||
    !pincode.trim()
  ) {
    alert("Please fill all delivery details");
    return;
  }

  try {
    const savedUser = localStorage.getItem("foodnest-user");
    const savedToken = localStorage.getItem("foodnest-token");

    if (!savedUser || !savedToken) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const user = JSON.parse(savedUser);

    // ==============================
    // CASH ON DELIVERY
    // ==============================
    if (paymentMethod === "Cash on Delivery") {
      for (const item of cart) {
        await axios.post(
          "http://localhost:5900/api/orders",
          {
            name: name.trim(),
            food: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity,
            userId: user.id
          },
          {
            headers: {
              Authorization: `Bearer ${savedToken}`
            }
          }
        );
      }

      alert("Order placed successfully! 🎉");

      localStorage.removeItem("foodnest-cart");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/orders");

      return;
    }

    // ==============================
    // ONLINE PAYMENT - CREATE ORDER
    // ==============================

    if (!window.Razorpay) {
      alert("Razorpay is still loading. Please try again.");
      return;
    }

    const paymentResponse = await axios.post(
      "http://localhost:5900/api/payment/create-order",
      {
        food: cart[0]._id,
        amount: totalPrice
      },
      {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      }
    );

    const razorpayOrder = paymentResponse.data.order;
    const razorpayKey = paymentResponse.data.key_id;

    const options = {
      key: razorpayKey,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "FoodNest",
      description: "Food Order Payment",
      order_id: razorpayOrder.id,

      handler: async function (response) {
        try {
          // Verify payment
          await axios.post(
            "http://localhost:5900/api/payment/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            },
            {
              headers: {
                Authorization: `Bearer ${savedToken}`
              }
            }
          );

          // Create orders only after successful payment
          for (const item of cart) {
            await axios.post(
              "http://localhost:5900/api/orders",
              {
                name: name.trim(),
                food: item.name,
                quantity: item.quantity,
                price: item.price * item.quantity,
                userId: user.id
              },
              {
                headers: {
                  Authorization: `Bearer ${savedToken}`
                }
              }
            );
          }

          alert("Payment successful! Order placed successfully! 🎉");

          localStorage.removeItem("foodnest-cart");
          window.dispatchEvent(new Event("cartUpdated"));
          navigate("/orders");

        } catch (err) {
          console.error(err);
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: name.trim(),
        contact: phone.trim()
      },

      theme: {
        color: "#f97316"
      }
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (err) {
    console.error(err);

    if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("Payment failed");
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            FoodNest
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Checkout
          </h1>

          <p className="text-gray-500 mt-3">
            Complete your details and place your order.
          </p>
        </div>


        <div className="grid lg:grid-cols-3 gap-8">

          {/* Delivery Details */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-7">

              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Details
              </h2>

              <p className="text-gray-500 mt-2 mb-7">
                Enter your delivery information.
              </p>


              <div className="grid md:grid-cols-2 gap-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-5 py-3.5 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>


                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-5 py-3.5 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>


                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Enter your complete delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 px-5 py-3.5 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>


                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-5 py-3.5 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>


                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PIN Code
                  </label>

                  <input
                    type="text"
                    placeholder="Enter PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-5 py-3.5 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>


              {/* Payment */}
              <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Method
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mt-5">

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Cash on Delivery")}
                    className={`text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                      paymentMethod === "Cash on Delivery"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p className="font-bold text-gray-900">
                      💵 Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Pay when your food arrives.
                    </p>
                  </button>


                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Online Payment")}
                    className={`text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                      paymentMethod === "Online Payment"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p className="font-bold text-gray-900">
                      💳 Online Payment
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Pay securely online.
                    </p>
                  </button>

                </div>

              </div>


              {/* Place Order */}
              <button
                type="button"
                onClick={placeOrder}
                className="w-full mt-8 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4 text-lg font-bold text-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                Place Order →
              </button>

            </div>

          </div>


          {/* Order Summary */}
          <div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-7 sticky top-6">

              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="border-t border-gray-100 my-6"></div>


              {/* Cart Items */}
              <div className="space-y-4 mb-6">

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-3"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          × {item.quantity}
                        </p>
                      </div>

                    </div>

                    <p className="font-bold text-gray-800">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>
                ))}

              </div>


              <div className="border-t border-gray-100 pt-5"></div>


              <div className="flex justify-between text-gray-500 mb-4">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>


              <div className="flex justify-between text-gray-500 mb-4">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>


              <div className="flex justify-between text-gray-500 mb-6">
                <span>Delivery</span>

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

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;