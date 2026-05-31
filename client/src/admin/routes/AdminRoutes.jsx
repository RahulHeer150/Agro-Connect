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
import Products from "../pages/Products";
import Orders from "../pages/Orders";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="farmers" element={<Farmers />} />
        <Route path="buyers" element={<Buyers />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="*" element={<Navigate to="dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;