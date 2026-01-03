import api from "./axios";

export const placeOrderAPI = (orderData) => {
  return api.post("/order/create", orderData);
};
