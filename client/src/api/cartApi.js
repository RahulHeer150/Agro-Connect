import api from './axios';

export const fetchCart=()=>{
    api.get("/cart")
}

export const addToCartAPI=(productId,quantity=1)=>{
    api.post("/cart/add",{productId,quantity});
}

export const updateCartItemAPI=(productId,quantity) => {
    api.put("/cart/update", {productId,quantity});
}

export const removeFromCartAPI=(productId)=>{
    api.delete(`/cart/remove/${productId}`);
}

export const clearCartAPI=()=>{
    api.delete("/cart/clear")
}