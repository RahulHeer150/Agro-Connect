import axios from "axios";

// ✅ Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // optional (cookies later)
});

// ✅ Request interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Attach token only if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor (optional – future use)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout if token expired (future-ready)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
