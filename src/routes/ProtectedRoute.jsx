import {
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import api from "../api/client";

export default function ProtectedRoute({
  children,
}) {

  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    async function verifyAdmin() {

      try {

        const res =
          await api.get(
            "/v1/auth/me"
          );

        const user =
          res.data.user;

        if (
          user.role === "admin"
        ) {

          setAuthorized(true);

        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    verifyAdmin();

  }, []);

  //  loading screen
  if (loading) {

    return (
      <div
        className="
          min-h-screen
          bg-[#0B0B0C]
          flex
          items-center
          justify-center
          text-white/60
        "
      >
        Verifying access...
      </div>
    );

  }

  //  reject non-admin
  if (!authorized) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;

}
