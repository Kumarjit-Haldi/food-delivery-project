import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5900/api/orders"
        );

        setOrders(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>

          <p className="font-semibold text-gray-600">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-5 py-12">

      {/* Header */}
      <div className="mx-auto mb-10 max-w-6xl text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-500">
          FoodNest
        </p>

        <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
          My Orders
        </h1>

        <p className="mt-3 text-gray-500">
          Track and view all your FoodNest orders
        </p>
      </div>

      {/* Empty */}
      {orders.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mb-5 text-6xl">🍽️</div>

          <h2 className="text-2xl font-bold text-gray-900">
            No orders yet
          </h2>

          <p className="mt-2 text-gray-500">
            Your placed orders will appear here.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl space-y-5">

          {orders.map((order, index) => (

            <div
              key={order._id}
              className="group rounded-3xl border border-orange-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >

              {/* Food + Price */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                {/* Food */}
                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                    🍔
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-orange-500">
                      Order #{index + 1}
                    </p>

                    <h2 className="text-xl font-bold text-gray-900">
                      {order.food}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Customer: {order.name}
                    </p>
                  </div>

                </div>

                {/* Price */}
                <div className="text-left sm:text-right">

                  <p className="text-sm text-gray-500">
                    Quantity: {order.quantity}
                  </p>

                  <p className="mt-1 text-2xl font-black text-orange-500">
                    ₹{order.price}
                  </p>

                </div>

              </div>

              {/* Bottom */}
              <div className="mt-5 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Status */}
                <div className="flex items-center gap-2 text-sm font-semibold">

                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Out for Delivery"
                        ? "bg-blue-500"
                        : order.status === "Preparing"
                        ? "bg-yellow-500"
                        : "bg-orange-500"
                    }`}
                  ></span>

                  <span
                    className={
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Out for Delivery"
                        ? "text-blue-600"
                        : order.status === "Preparing"
                        ? "text-yellow-600"
                        : "text-orange-600"
                    }
                  >
                    {order.status || "Placed"}
                  </span>

                </div>

                {/* View Details */}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  View Details
                </button>

              </div>

              {/* ============================= */}
              {/* ORDER TRACKING TIMELINE */}
              {/* ============================= */}

              <div className="mt-6 rounded-2xl bg-gray-50 p-5">

                <p className="mb-5 text-sm font-bold text-gray-700">
                  Order Tracking
                </p>

                <div className="flex items-center justify-between">

                  {/* Placed */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                        [
                          "Placed",
                          "Preparing",
                          "Out for Delivery",
                          "Delivered",
                        ].includes(order.status || "Placed")
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      ✓
                    </div>

                    <span className="mt-2 text-xs font-semibold text-gray-600">
                      Placed
                    </span>

                  </div>

                  {/* Line */}
                  <div
                    className={`mx-2 h-1 flex-1 rounded-full ${
                      [
                        "Preparing",
                        "Out for Delivery",
                        "Delivered",
                      ].includes(order.status)
                        ? "bg-orange-500"
                        : "bg-gray-200"
                    }`}
                  ></div>

                  {/* Preparing */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                        [
                          "Preparing",
                          "Out for Delivery",
                          "Delivered",
                        ].includes(order.status)
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      🍳
                    </div>

                    <span className="mt-2 text-xs font-semibold text-gray-600">
                      Preparing
                    </span>

                  </div>

                  {/* Line */}
                  <div
                    className={`mx-2 h-1 flex-1 rounded-full ${
                      ["Out for Delivery", "Delivered"].includes(
                        order.status
                      )
                        ? "bg-orange-500"
                        : "bg-gray-200"
                    }`}
                  ></div>

                  {/* Delivery */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                        ["Out for Delivery", "Delivered"].includes(
                          order.status
                        )
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      🛵
                    </div>

                    <span className="mt-2 text-xs font-semibold text-gray-600">
                      Delivery
                    </span>

                  </div>

                  {/* Line */}
                  <div
                    className={`mx-2 h-1 flex-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>

                  {/* Delivered */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                        order.status === "Delivered"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      ✓
                    </div>

                    <span className="mt-2 text-xs font-semibold text-gray-600">
                      Delivered
                    </span>

                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                  FoodNest Order
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  Order Details
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600 transition hover:bg-red-100 hover:text-red-500"
              >
                ×
              </button>

            </div>

            {/* Food */}
            <div className="mb-5 rounded-2xl bg-orange-50 p-5">

              <p className="text-sm font-medium text-gray-500">
                Food
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                {selectedOrder.food}
              </p>

            </div>

            {/* Details */}
            <div className="space-y-4">

              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500">
                  Customer
                </span>

                <span className="font-semibold text-gray-900">
                  {selectedOrder.name}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500">
                  Quantity
                </span>

                <span className="font-semibold text-gray-900">
                  {selectedOrder.quantity}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500">
                  Total Price
                </span>

                <span className="font-bold text-orange-500">
                  ₹{selectedOrder.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Status
                </span>

                <span className="font-bold text-green-600">
                  ● {selectedOrder.status || "Placed"}
                </span>
              </div>

            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-7 w-full rounded-xl bg-gray-900 py-3 font-bold text-white transition hover:bg-gray-800"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Orders;