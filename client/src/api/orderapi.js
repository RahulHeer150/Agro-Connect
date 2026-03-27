import api from "./axios";

export const placeOrderAPI = (orderData) => {
  return api.post("/api/orders/place", orderData);


};

export const getMyOrdersAPI=()=>{
  return api.get("/api/orders/my")
};
