import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import "./index.css";

import App from "./App.jsx";

import {
  AuthProvider,
} from "./context/AuthContext.jsx";



const savedTheme =
  localStorage.getItem(
    "theme"
  );

if (
  savedTheme === "dark"
) {

  document.documentElement.classList.add(
    "dark"
  );

}


createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <App />

        <Toaster
          position="top-right"
        />

      </AuthProvider>

    </BrowserRouter>

  </StrictMode>

);
