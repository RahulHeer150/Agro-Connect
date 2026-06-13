import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const getMyNotifications = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/my-notifications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getUnreadCount = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/unread-count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const markNotificationRead = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${API}/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};