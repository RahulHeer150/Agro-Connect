import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

import {
  getMyNotifications,
  markNotificationRead,
} from "../services/notificationService";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getMyNotifications();

      setNotifications(data.notifications || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return <Loader size="large" />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-15">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>

        <p className="text-gray-500 mt-2">View all your notifications</p>
      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold">No Notifications Yet</h2>

          <p className="text-gray-500 mt-2">You're all caught up.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`rounded-xl shadow border p-5 transition ${
                notification.isRead
                  ? "bg-white"
                  : "bg-green-50 border-green-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">
                    {notification.title}
                  </h2>

                  <p className="text-gray-600 mt-2">{notification.message}</p>

                  <p className="text-xs text-gray-400 mt-3">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>

                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkRead(notification._id)}
                    className="
                        bg-green-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-green-700
                      "
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
