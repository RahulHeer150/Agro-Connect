import api from "./axios";

// create razorpay order
export const createRazorpayOrderAPI = (orderId) => {
  return api.post("/payment/razorpay/create", { orderId });
};

// verify payment
export const verifyRazorpayPaymentAPI = (paymentData) => {
  return api.post("/payment/razorpay/verify", paymentData);
};
