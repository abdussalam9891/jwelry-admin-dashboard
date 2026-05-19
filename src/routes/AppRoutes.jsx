import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import Customers from "../pages/Customer";
import ProductDetailsPage from "../pages/ProductDetails";
import EditProductPage from "../pages/EditProductPage";
import OrderDetailsPage from "../pages/OrderDetails";
import CustomerDetailsPage from "../pages/CustomerDetails";
import AdminProfilePage
from "../pages/AdminProfile";
import SettingsPage from "../pages/Settings";
import AnalyticsPage from "../pages/AnalyticsPage";

export default function AppRoutes() {
  return (
   <Routes>

  {/*  Root redirect */}
  <Route
    path="/"
    element={
      <Navigate
        to="/admin"
        replace
      />
    }
  />

  {/*  Login */}
  <Route
    path="/login"
    element={<Login />}
  />

  {/*  Admin protected routes */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    }
  >

     <Route
    path="profile"
    element={<AdminProfilePage />}
  />

    <Route
      index
      element={<Dashboard />}
    />

    <Route path="/admin/analytics" element={<AnalyticsPage />} />

    <Route
      path="products"
      element={<Products />}
    />


    <Route
  path="products/:id/edit"
  element={<EditProductPage />}
/>



    <Route
  path="products/:id"
  element={<ProductDetailsPage />}
/>



    <Route
    path="products/new"
    element={<AddProduct />}
  />

    <Route
      path="orders"
      element={<Orders />}
    />

    <Route
  path="orders/:id"
  element={<OrderDetailsPage />}
/>

     <Route
      path="customers"
      element={<Customers />}
    />

      <Route
      path="customers/:id"
      element={<CustomerDetailsPage />}
    />

    <Route
  path="settings"
  element={<SettingsPage />}
/>

  </Route>

</Routes>
  );
}
