import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState({
    foods: 0,
    orders: 0,
    users: 0,
    revenue: 0,
    placed: 0,
    preparing: 0,
    outForDelivery: 0,
    delivered: 0,
  });
  const [demandData, setDemandData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("foodnest-token");

        const [foodsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5900/api/foods"),
          axios.get("http://localhost:5900/api/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const orders = ordersRes.data;

        const revenue = orders.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        setAnalytics({
          foods: foodsRes.data.length,
          orders: orders.length,
          users: new Set(orders.map((item) => item.userId)).size,
          revenue,
          placed: orders.filter((item) => item.status === "Placed").length,
          preparing: orders.filter((item) => item.status === "Preparing")
            .length,
          outForDelivery: orders.filter(
            (item) => item.status === "Out for Delivery",
          ).length,
          delivered: orders.filter((item) => item.status === "Delivered")
            .length,
        });
      } catch (err) {
        console.error("Analytics fetch failed:", err);
      }
    };

    fetchAnalytics();
  }, []);
useEffect(() => {
  const fetchDemandPrediction = async () => {
    try {
      const token = localStorage.getItem("foodnest-token");

      const response = await axios.get(
        "http://localhost:5900/api/orders/demand-prediction",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDemandData(response.data);
    } catch (err) {
      console.error("Demand prediction fetch failed:", err);
    }
  };

  fetchDemandPrediction();
}, []);
  const handleLogout = () => {
    localStorage.removeItem("foodnest-token");
    localStorage.removeItem("foodnest-user");

    navigate("/login");
  };

  const goToUserSite = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
              FoodNest Admin
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 mt-3">
              Manage your food menu and orders from one place.
            </p>
          </div>

          {/* Admin Actions */}
          <div className="flex flex-wrap gap-3">
            {/* Go to User Site */}
            <button
              onClick={goToUserSite}
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
            >
              Go to User Site
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl shadow-xl">
            <p className="text-gray-400 text-sm">Total Foods</p>
            <h2 className="text-4xl font-extrabold mt-2 text-blue-400">
              {analytics.foods}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl shadow-xl">
            <p className="text-gray-400 text-sm">Total Orders</p>
            <h2 className="text-4xl font-extrabold mt-2 text-green-400">
              {analytics.orders}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl shadow-xl">
            <p className="text-gray-400 text-sm">Total Users</p>
            <h2 className="text-4xl font-extrabold mt-2 text-purple-400">
              {analytics.users}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl shadow-xl">
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <h2 className="text-4xl font-extrabold mt-2 text-yellow-400">
              ₹{analytics.revenue}
            </h2>
          </div>
        </div>
        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Food */}
          <Link
            to="/addfood"
            className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl shadow-xl hover:-translate-y-2 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl mb-5">
              🍔
            </div>

            <h2 className="text-2xl font-bold">Add Food</h2>

            <p className="text-gray-400 mt-2">
              Add a new food item to your FoodNest menu.
            </p>

            <div className="mt-6 text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
              Add Food →
            </div>
          </Link>

          {/* Manage Foods */}
          <Link
            to="/view"
            className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl shadow-xl hover:-translate-y-2 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl mb-5">
              📋
            </div>

            <h2 className="text-2xl font-bold">Manage Foods</h2>

            <p className="text-gray-400 mt-2">
              View, edit and delete food items.
            </p>

            <div className="mt-6 text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
              Manage Foods →
            </div>
          </Link>

          {/* Orders */}
          <Link
            to="/admin/orders"
            className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl shadow-xl hover:-translate-y-2 hover:border-green-500/40 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl mb-5">
              📦
            </div>

            <h2 className="text-2xl font-bold">Manage Orders</h2>

            <p className="text-gray-400 mt-2">
              View and manage customer orders.
            </p>

            <div className="mt-6 text-green-400 font-semibold group-hover:translate-x-1 transition-transform">
              View Orders →
            </div>
          </Link>
        </div>

        {/* Order Status Analytics */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Order Status Overview</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6">
              <p className="text-gray-400">Placed</p>
              <h3 className="text-3xl font-extrabold text-yellow-400 mt-2">
                {analytics.placed}
              </h3>
            </div>

            <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6">
              <p className="text-gray-400">Preparing</p>
              <h3 className="text-3xl font-extrabold text-blue-400 mt-2">
                {analytics.preparing}
              </h3>
            </div>

            <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6">
              <p className="text-gray-400">Out for Delivery</p>
              <h3 className="text-3xl font-extrabold text-orange-400 mt-2">
                {analytics.outForDelivery}
              </h3>
            </div>

            <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
              <p className="text-gray-400">Delivered</p>
              <h3 className="text-3xl font-extrabold text-green-400 mt-2">
                {analytics.delivered}
              </h3>
            </div>
          </div>
        </div>
    {/* Demand Prediction */}
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-5">
    🤖 Food Demand Prediction
  </h2>

  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl shadow-xl">

    {demandData.length === 0 ? (
      <p className="text-gray-400">
        No demand data available yet.
      </p>
    ) : (
      <div className="space-y-4">
        {demandData.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-white/[0.05] p-4"
          >
            <div>
              <p className="font-semibold">
                Food: {item._id}
              </p>

              <p className="text-gray-400 text-sm">
                Total ordered quantity
              </p>
            </div>

            <div className="text-orange-400 font-bold text-xl">
              {item.totalOrders}
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
</div>   
        {/* Bottom Info */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8">
          <h2 className="text-2xl font-bold">Welcome to FoodNest Admin 👋</h2>

          <p className="text-gray-400 mt-2 max-w-2xl">
            From here you can add new foods, manage your menu and handle
            customer orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
