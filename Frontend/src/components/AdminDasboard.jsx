import React from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

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

            <h2 className="text-2xl font-bold">
              Add Food
            </h2>

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

            <h2 className="text-2xl font-bold">
              Manage Foods
            </h2>

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

            <h2 className="text-2xl font-bold">
              Manage Orders
            </h2>

            <p className="text-gray-400 mt-2">
              View and manage customer orders.
            </p>

            <div className="mt-6 text-green-400 font-semibold group-hover:translate-x-1 transition-transform">
              View Orders →
            </div>
          </Link>

        </div>


        {/* Bottom Info */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8">

          <h2 className="text-2xl font-bold">
            Welcome to FoodNest Admin 👋
          </h2>

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