import api from './axios';

export const fetchCart=()=>{
  return  api.get("/api/cart")
}

export const addToCartAPI=(productId,quantity=1)=>{
    return api.post("/api/cart/add",{productId,quantity});
}

export const updateCartItemAPI=(productId,quantity) => {
   return api.put("/api/cart/update", {productId,quantity});
}

export const removeFromCartAPI=(productId)=>{
  return  api.delete(`/api/cart/remove/${productId}`);
}

export const clearCartAPI=()=>{
  return  api.delete("/api/cart/clear")
}