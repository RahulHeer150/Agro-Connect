import api from "./api";

export const placeOrderAPI = (orderData) => {
  return api.post("/order/create", orderData);
};
