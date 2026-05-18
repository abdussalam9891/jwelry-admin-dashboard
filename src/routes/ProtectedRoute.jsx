import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useAuth();


  // loading state
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


  // no user
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // not admin
  if (
    user.role !== "admin"
  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return children;

}
