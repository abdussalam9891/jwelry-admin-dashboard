import api from "../api/client";

/* GET DASHBOARD DATA */

export const getDashboardData =
  async (range = "12m") => {

    const res =
      await api.get(

        `/admin/dashboard?range=${range}`

      );

    return res.data;

  };
