import React from 'react'
import api from './axios'

export const getAllProducts = async () => {
  const res = await api.get("/api/products/");
  return res.data;
}