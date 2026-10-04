import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingFood, setEditingFood] = useState(null);

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

  useEffect(() => {
    getFoods();
  }, []);

  // Delete Food
  const deleteFood = async (id) => {
    try {
      const token = localStorage.getItem("foodnest-token");

        await axios.delete(
       `http://localhost:5900/api/foods/${id}`,
           {
         headers: {
      Authorization: `Bearer ${token}`,
       },
     }
         );
      alert("Food deleted successfully");

      getFoods();
    } catch (err) {
      console.error(err);
      alert("Failed to delete food");
    }
  };

  // Open Edit Form
  const editFood = (food) => {
    setEditingFood(food);
  };

  // Update Food
  const updateFood = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("foodnest-token");

await axios.put(
  `http://localhost:5900/api/foods/${editingFood._id}`,
  {
    name: editingFood.name.trim(),
    price: Number(editingFood.price),
    description: editingFood.description.trim(),
    image: editingFood.image.trim(),
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Food updated successfully");

      setEditingFood(null);

      getFoods();
    } catch (err) {
      console.error(err);
      alert("Failed to update food");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
            FoodNest Admin
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            Manage Foods
          </h1>

          <p className="text-gray-400 mt-3">
            View, edit and delete your food items.
          </p>
        </div>

        {/* Edit Form */}
        {editingFood && (
          <div className="mb-10 rounded-3xl border border-blue-500/20 bg-white/[0.06] p-8 backdrop-blur-xl">

            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
                  Admin
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  Edit Food
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setEditingFood(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={updateFood} className="grid md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Food Name
                </label>

                <input
                  type="text"
                  value={editingFood.name}
                  onChange={(e) =>
                    setEditingFood({
                      ...editingFood,
                      name: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-5 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingFood.price}
                  onChange={(e) =>
                    setEditingFood({
                      ...editingFood,
                      price: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-5 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={editingFood.description}
                  onChange={(e) =>
                    setEditingFood({
                      ...editingFood,
                      description: e.target.value,
                    })
                  }
                  required
                  className="w-full resize-none rounded-xl bg-slate-900 border border-white/10 px-5 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-2">
                  Image URL
                </label>

                <input
                  type="text"
                  value={editingFood.image}
                  onChange={(e) =>
                    setEditingFood({
                      ...editingFood,
                      image: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-5 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex gap-4">

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold hover:-translate-y-1 transition"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setEditingFood(null)}
                  className="flex-1 rounded-xl bg-white/10 py-3 font-semibold hover:bg-white/20 transition"
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && foods.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>

            <h2 className="text-2xl font-bold">
              No Food Found
            </h2>

            <p className="text-gray-400 mt-2">
              Add some food items first.
            </p>
          </div>
        )}

        {/* Food Cards */}
        {!loading && foods.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {foods.map((food) => (

              <div
                key={food._id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-xl backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >

                {/* Image */}
                <div className="h-52 overflow-hidden bg-slate-900">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {food.name}
                  </h2>

                  <p className="text-blue-400 text-2xl font-extrabold mt-3">
                    ₹{food.price}
                  </p>

                  <p className="text-gray-400 text-sm leading-6 mt-3">
                    {food.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6">

                    <button
                      type="button"
                      onClick={() => editFood(food)}
                      className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteFood(food._id)}
                      className="flex-1 rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default ViewFood;