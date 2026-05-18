import { useNavigate } from "react-router-dom";

import api from "../api/client";

export default function useLogout() {

  const navigate =
    useNavigate();

  const logout =
    async () => {

      try {

        await api.post(
          "/auth/logout"
        );

        navigate(
          "/login",
          {
            replace: true,
          }
        );

      } catch (err) {

        console.error(
          "Logout failed",
          err
        );

      }

    };

  return logout;

}
