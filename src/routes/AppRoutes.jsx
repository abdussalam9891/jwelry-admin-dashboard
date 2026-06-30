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
import ResetPassword from "../pages/ResetPassword";
import AddProduct from "../pages/AddProduct";
import Customers from "../pages/Customer";
import ProductDetailsPage from "../pages/ProductDetails";
import EditProductPage from "../pages/EditProductPage";
import OrderDetailsPage from "../pages/OrderDetails";
import CustomerDetailsPage from "../pages/CustomerDetails";
import AdminProfilePage from "../pages/AdminProfile";
import SettingsPage from "../pages/Settings";
import AnalyticsPage from "../pages/AnalyticsPage";
import CouponsPage from "../pages/Coupons";
import CreateCouponPage from "../pages/CreateCouponPage";
import EditCouponPage from "../pages/EditCouponPage";
import CouponAnalyticsPage from "@/pages/CouponAnalyticsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ROOT */}
      <Route
        path="/"
        element={
          <Navigate
            to="/admin"
            replace
          />
        }
      />

      {/* PUBLIC */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* PROTECTED ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route
          index
          element={<Dashboard />}
        />

        {/* Analytics */}
        <Route
          path="analytics"
          element={<AnalyticsPage />}
        />

        {/* Profile */}
        <Route
          path="profile"
          element={
            <AdminProfilePage />
          }
        />

        {/* Products */}
        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="products/new"
          element={<AddProduct />}
        />

        <Route
          path="products/:id"
          element={
            <ProductDetailsPage />
          }
        />

        <Route
          path="products/:id/edit"
          element={
            <EditProductPage />
          }
        />

        {/* Orders */}
        <Route
          path="orders"
          element={<Orders />}
        />

        <Route
          path="orders/:id"
          element={
            <OrderDetailsPage />
          }
        />

        <Route
  path="coupons"
  element={<CouponsPage />}
/>

<Route
  path="coupons/new"
  element={<CreateCouponPage />}
/>

<Route
  path="coupons/:id/edit"
  element={<EditCouponPage />}
/>

<Route
  path="coupons/:id/analytics"
  element={
    <CouponAnalyticsPage />
  }
/>

        {/* Customers */}
        <Route
          path="customers"
          element={<Customers />}
        />

        <Route
          path="customers/:id"
          element={
            <CustomerDetailsPage />
          }
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<SettingsPage />}
        />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}
