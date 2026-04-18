import React from 'react'
import api from './axios'

// 🛍️ Get all available products (for buyers)
export const getAllProducts = async () => {
  const res = await api.get("/api/products/");
  return res.data;
}

// 🌾 Get farmer's own products
export const getMyProducts = async () => {
  const res = await api.get("/api/products/my");
  return res.data;
}

// 📦 Get single product details
export const getSingleProduct = async (productId) => {
  const res = await api.get(`/api/products/${productId}`);
  return res.data;
}

// ➕ Create new product (farmer)
export const createProduct = async (formData) => {
  const res = await api.post("/api/products/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

// ✏️ Update product (farmer)
export const updateProduct = async (productId, data) => {
  const res = await api.put(`/api/products/${productId}`, data);
  return res.data;
}

// 🗑️ Delete product (farmer)
export const deleteProduct = async (productId) => {
  const res = await api.delete(`/api/products/${productId}`);
  return res.data;
}