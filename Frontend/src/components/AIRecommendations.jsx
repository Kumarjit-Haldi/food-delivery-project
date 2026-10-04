import React, { useEffect, useState } from "react";
import axios from "axios";

const AIRecommendations = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);

  // ---------------- FETCH FOODS ----------------
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5900/api/foods"
        );

        setFoods(response.data);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };

    fetchFoods();
  }, []);

  // ---------------- ADD TO CART ----------------
  const addToCart = (food) => {
    const savedCart = localStorage.getItem("foodnest-cart");

    let cart = savedCart ? JSON.parse(savedCart) : [];

    const existingFood = cart.find((item) => item._id === food._id);

    if (existingFood) {
      existingFood.quantity += 1;
    } else {
      cart.push({
        ...food,
        quantity: 1,
      });
    }

    localStorage.setItem("foodnest-cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ---------------- FIND RECOMMENDED FOODS ----------------
  const getRecommendedFoods = (reply) => {
    if (!reply || foods.length === 0) {
      return [];
    }

    const lowerReply = reply.toLowerCase();

    return foods.filter((food) =>
      lowerReply.includes(food.name.toLowerCase())
    );
  };

  // ---------------- SEND MESSAGE ----------------
  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("foodnest-token");

      const response = await axios.post(
        "http://localhost:5900/api/ai",
        {
          message: userMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-orange-50 via-white to-red-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 text-3xl shadow-lg shadow-orange-200">
            🤖
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            FoodNest <span className="text-orange-500">AI</span>
          </h1>

          <p className="mt-2 text-gray-500">
            Your personal AI food recommendation assistant
          </p>
        </div>

        {/* Chat Box */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              🤖
            </div>

            <div>
              <h2 className="font-bold">FoodNest AI</h2>

              <p className="text-xs text-orange-100">
                Ask me what you should eat
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-[420px] max-h-[500px] space-y-4 overflow-y-auto p-5 sm:p-6">

            {messages.length === 0 && (
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                <div className="mb-4 text-5xl">
                  🍔
                </div>

                <h3 className="text-xl font-bold text-gray-800">
                  What are you craving today?
                </h3>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                  Tell me what you want to eat, and I'll recommend something
                  from the FoodNest menu.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {[
                    "Suggest something delicious",
                    "I want something spicy",
                    "What should I eat?",
                    "Suggest a cheap food",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setMessage(suggestion)}
                      className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-600 transition hover:bg-orange-100"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    item.role === "user"
                      ? "rounded-br-md bg-orange-500 text-white"
                      : "rounded-bl-md bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.role === "ai" && (
                    <div className="mb-1 font-bold text-orange-500">
                      🤖 FoodNest AI
                    </div>
                  )}

                  {/* Clean AI text */}
                  {item.content.replace(/\*\*/g, "")}

                  {/* Add To Cart */}
                  {item.role === "ai" &&
                    getRecommendedFoods(item.content).length > 0 && (
                      <div className="mt-4 space-y-2">
                        {getRecommendedFoods(item.content).map((food) => (
                          <div
                            key={food._id}
                            className="flex items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                          >
                            <div className="flex items-center gap-3">

                              {/* Food Image */}
                              <img
                                src={food.image}
                                alt={food.name}
                                className="h-16 w-16 rounded-xl object-cover"
                              />

                              {/* Food Details */}
                              <div>
                                <p className="font-bold text-gray-800">
                                  {food.name}
                                </p>

                                <p className="mt-1 text-sm font-semibold text-orange-500">
                                  ₹{food.price}
                                </p>
                              </div>

                            </div>

                            {/* Add To Cart */}
                            <button
                              onClick={() => addToCart(food)}
                              className="rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md"
                            >
                              Add to Cart
                            </button>

                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-5 py-3 text-sm text-gray-500">
                  🤖 FoodNest AI is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 bg-gray-50 p-4">
            <div className="flex gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask FoodNest AI what you should eat..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />

              <button
                onClick={handleSend}
                disabled={!message.trim() || loading}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "..." : "Send"}
              </button>

            </div>

            <p className="mt-2 text-center text-[11px] text-gray-400">
              FoodNest AI recommends food from your available menu.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;