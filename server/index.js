const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/db");

dotenv.config();

// console.log("ENV CHECK:");
// console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
// console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDb();

app.use(cors({ origin: "*" }));

app.use("/uploads", express.static(require("path").join(__dirname, "uploads")));

// =======================
// ROUTES (all above error handler)
// =======================
const authRoutes = require("./routes/authroutes");
const mapsRoutes = require("./routes/mapsroutes");
const productRoutes = require("./routes/productroutes");
const orderRoutes = require("./routes/orderroutes");
const paymentRoutes = require("./routes/paymentroutes");
const farmerRoutes = require("./routes/farmerroutes");
const cartRoutes = require("./routes/cartroutes");


app.use("/api/auth", authRoutes);
app.use("/api/map", mapsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AgroConnect API is running 🚜🌾",
  });
});

// =======================
// GLOBAL ERROR HANDLER (always last)
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});