const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectToDb = require("./config/db");

dotenv.config();


const app = express();

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDb();
// CORS config (frontend integration)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);


// =======================
// ROUTES
// =======================
const authRoutes = require("./routes/authroutes");

app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AgroConnect API is running 🚜🌾",
  });
});

// =======================
// GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const productRoutes = require("./routes/productroutes");
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/orderroutes");
app.use("/api/orders", orderRoutes);

const paymentRoutes = require("./routes/paymentroutes");
app.use("/payment", paymentRoutes);

const farmerRoutes = require("./routes/farmerroutes");
app.use("/api/farmer", farmerRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
