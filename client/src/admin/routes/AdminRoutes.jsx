// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Dashboard from '../pages/Dashboard'
// import Buyers from "../pages/Buyers"
// import Products from '../pages/Products'
// import Orders from '../pages/Orders'
// import Farmers from '../pages/Farmers'

// import AdminLayout from '../components/layout/AdminLayout'
// import AdminProtectedRoute from '../../components/ProtectedRoute'

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route
//         path="dashboard"
//         element={
//           <AdminProtectedRoute>
//             <AdminLayout>
//                    <Dashboard />

//             </AdminLayout>

//           </AdminProtectedRoute>
//         }
//       />

//       <Route
//         path="farmers"
//         element={
//           <AdminProtectedRoute>
//             <AdminLayout>
//                      <Farmers />

//             </AdminLayout>

//           </AdminProtectedRoute>
//         }
//       />

//       <Route
//         path="buyers"
//         element={
//           <AdminProtectedRoute>
//             <AdminLayout>
//                 <Buyers />

//             </AdminLayout>

//           </AdminProtectedRoute>
//         }
//       />

//       <Route
//         path="products"
//         element={
//           <AdminProtectedRoute>
//             <AdminLayout>
//                    <Products />

//             </AdminLayout>

//           </AdminProtectedRoute>
//         }
//       />

//       <Route
//         path="orders"
//         element={
//           <AdminProtectedRoute>
//             <AdminLayout>
//                  <Orders />

//             </AdminLayout>

//           </AdminProtectedRoute>
//         }
//       />
//     </Routes>
//   )
// }

// export default AdminRoutes

import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Farmers from "../pages/Farmers";
import Buyers from "../pages/Buyers";
import Product from "../pages/Product";
import Orders from "../pages/Orders";
import FarmerDetails from "../pages/FarmerDetails";
import ProductDetails from "../pages/ProductDetails";
import OrderDetails from "../pages/OrderDetails";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="farmers" element={<Farmers />} />
        <Route path="buyers" element={<Buyers />} />
        <Route path="products" element={<Product />} />
        <Route path="orders" element={<Orders />} />
        <Route path="farmers/:id" element={<FarmerDetails />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;
