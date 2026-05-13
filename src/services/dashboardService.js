import api from "../api/client";

/* GET DASHBOARD DATA */

export const getDashboardData =
  async (params = {}) => {

    const res =
      await api.get(
        "/admin/dashboard",
        {
          params,
        }
      );

    return res.data;

  };


  export const exportDashboardReport =
  async () => {

    const res =
      await api.get(
        "/admin/dashboard/export",
        {
          responseType:
            "blob",
        }
      );

    return res.data;

  };
