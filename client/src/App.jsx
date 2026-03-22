import { useState } from "react";

import "./index.css";
import Navbar from "./components/Navbar";
import { Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import Login from "./components/Login";
import AuthPage from "./pages/AuthPage";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import MyProduct from "./components/MyProduct";
import MyOrders from "./components/MyOrders";
import FarmerDashBoard from "./pages/FarmerDashBoard";
import BuyerDashBoard from "./pages/BuyerDashBoard";
import MarketPlace from "./pages/MarketPlace";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ContactUs from "./pages/ContactUs";
import AddCrop from "./pages/AddCrop";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/cart-item" element={<CartItem />} />
        <Route path="/cart-summary" element={<CartSummary />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-product" element={<MyProduct />} />
        <Route path="/farmer-dashboard" element={<FarmerDashBoard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashBoard />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/add-crop" element={<AddCrop />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
