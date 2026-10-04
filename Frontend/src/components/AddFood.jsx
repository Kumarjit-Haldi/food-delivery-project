import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFood = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  async function add(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("foodnest-token");

await axios.post(
  "http://localhost:5900/api/foods",
  {
    name: name.trim(),
    price: Number(price),
    description: description.trim(),
    image: image.trim(),
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Food added successfully");
      navigate("/view");
    } catch (err) {
      console.error(err);
      alert("Failed to add food");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-14 text-white">

      {/* Background Effects */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-3xl shadow-lg shadow-blue-500/20">
            🍔
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Add New Food
          </h1>

          <p className="mt-3 text-gray-400">
            Add a delicious new item to your FoodNest menu.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={add}
          className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl md:p-10"
        >

          {/* Food Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-300"
            >
              Food Name
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-semibold text-gray-300"
            >
              Price
            </label>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-semibold text-gray-400">
                ₹
              </span>

              <input
                type="number"
                id="price"
                placeholder="Enter food price"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-4 pl-10 pr-5 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-300"
            >
              Description
            </label>

            <textarea
              id="description"
              placeholder="Describe this food..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Image URL */}
          <div className="mb-8">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold text-gray-300"
            >
              Food Image URL
            </label>

            <input
              type="text"
              id="image"
              placeholder="Paste food image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-600/40"
          >
            <span className="inline-flex items-center gap-2">
              Add Food
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>

        </form>

        {/* Bottom text */}
        <p className="mt-6 text-center text-sm text-gray-500">
          FoodNest Admin Panel • Manage your menu easily
        </p>

      </div>
    </div>
  );
};

export default AddFood;