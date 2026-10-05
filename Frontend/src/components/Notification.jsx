import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      const token = localStorage.getItem("foodnest-token");

      const response = await axios.get(
        "http://localhost:5900/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  getNotifications();

  const socket = io("http://localhost:5900");

  socket.on("notificationUpdated", () => {
    console.log("New notification received");
    getNotifications();
  });

  return () => {
    socket.off("notificationUpdated");
    socket.disconnect();
  };
}, []);


  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("foodnest-token");

      await axios.put(
        `http://localhost:5900/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to mark notification:", err);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
              🔔
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Notifications
              </h1>

              <p className="text-sm text-gray-500">
                {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </p>
            </div>

          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && notifications.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

            <div className="mb-4 text-5xl">
              🔔
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No notifications
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You're all caught up!
            </p>

          </div>
        )}

        {/* Notifications */}
        {!loading && notifications.length > 0 && (
          <div className="space-y-4">

            {notifications.map((item) => (

              <div
                key={item._id}
                className={`rounded-2xl border p-5 shadow-sm transition ${
                  item.isRead
                    ? "border-gray-100 bg-white"
                    : "border-orange-200 bg-orange-50"
                }`}
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                      🔔
                    </div>

                    <div>

                      <p className="font-semibold text-gray-800">
                        {item.message}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  {!item.isRead && (
                    <button
                      onClick={() => markAsRead(item._id)}
                      className="shrink-0 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
                    >
                      Mark as Read
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Notification;