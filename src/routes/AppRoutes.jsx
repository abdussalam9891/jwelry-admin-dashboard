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
      index
      element={<Dashboard />}
    />

    <Route
      path="products"
      element={<Products />}
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
      path="customers"
      element={<Customers />}
    />

  </Route>

</Routes>
  );
}
