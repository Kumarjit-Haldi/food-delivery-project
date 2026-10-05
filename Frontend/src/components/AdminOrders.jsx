import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5900");

let watchId = null;

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("Live Latitude:", latitude);
      console.log("Live Longitude:", longitude);
        
      socket.emit("adminLocationUpdate", {
        latitude,
        longitude
      });
    },
    (error) => {
      console.error(error);
      alert("Unable to get your live location.");
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    }
  );

  alert("Live location tracking started!");
};
const stopLiveLocation = () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    socket.emit("deliveryTrackingStopped");
    alert("Live location tracking stopped!");
  }
};
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("foodnest-token");

const response = await axios.get(
  "http://localhost:5900/api/orders",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  
     const updateStatus = async (id, newStatus) => {
  try {
    const token = localStorage.getItem("foodnest-token");

    const response = await axios.put(
      `http://localhost:5900/api/orders/${id}`,
      {
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? response.data : order
      )
    );
    console.log("ADMIN EMITTING STATUS:", id, newStatus);

        socket.emit("orderStatusUpdated", {
      orderId: id,
     status: newStatus
    });
   socket.emit("orderStatusUpdated", {
  orderId: id,
  status: newStatus
  });
    alert("Order status updated successfully");
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);

    if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("Failed to update order status");
    }
  }
};

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("foodnest-token");

      await axios.delete(
        `http://localhost:5900/api/orders/${id}`,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== id)
      );

      alert("Order deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 px-5 py-12">

      {/* Header */}
      <div className="mx-auto mb-10 max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
          FoodNest Admin
        </p>

        <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">
          Order Management
        </h1>

        <p className="mt-3 text-gray-400">
          Manage customer orders from one place.
        </p>
        <button
          onClick={getCurrentLocation}
          className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition-all hover:bg-orange-600"
          >
         📍 Get My Location
       </button>
       <button
  onClick={stopLiveLocation}
  className="mt-3 ml-3 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition-all hover:bg-red-600"
>
  🛑 Stop Live Location
</button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-300 border-t-orange-500"></div>
        </div>
      )}

      {/* Empty */}
      {!loading && orders.length === 0 && (
        <div className="mx-auto max-w-xl rounded-3xl bg-white/10 p-10 text-center backdrop-blur-xl">
          <div className="mb-4 text-5xl">📦</div>

          <h2 className="text-2xl font-bold text-white">
            No Orders Found
          </h2>

          <p className="mt-2 text-gray-400">
            Customer orders will appear here.
          </p>
        </div>
      )}

      {/* Orders */}
      {!loading && orders.length > 0 && (
        <div className="mx-auto max-w-6xl space-y-5">

          {orders.map((order, index) => (
            <div
              key={order._id}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.13]"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Order info */}
                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500/20 text-3xl">
                    🍔
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      Order #{index + 1}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-white">
                      {order.food}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Customer: {order.name}
                    </p>
                  </div>

                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Quantity
                    </p>

                    <p className="mt-1 font-bold text-white">
                      {order.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Amount
                    </p>

                    <p className="mt-1 font-bold text-orange-400">
                      ₹{order.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Current Status
                    </p>

                    <p className="mt-1 font-semibold text-green-400">
                      ● {order.status || "Placed"}
                    </p>
                  </div>

                </div>

                {/* Status + Delete */}
                <div className="flex flex-col gap-3">

                  <select
                    value={order.status || "Placed"}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-orange-500"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="rounded-xl bg-red-500/10 px-5 py-3 text-sm font-bold text-red-400 transition-all hover:bg-red-500 hover:text-white"
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
  );
};

export default AdminOrders;