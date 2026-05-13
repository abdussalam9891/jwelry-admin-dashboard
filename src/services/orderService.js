import api from "../api/client";

export const getOrderStats =
  async () => {

    const res =
      await api.get(
        "/admin/orders/stats"
      );

    return res.data;
};


/* GET ORDERS */

export const getOrders =
  async (params) => {

    const res =
      await api.get(
        "/admin/orders",
        {
          params,
        }
      );

    return res.data;
};


export const exportOrdersReport =
  async () => {

    const res =
      await api.get(
        "/admin/orders/export",
        {
          responseType:
            "blob",
        }
      );

    return res.data;

  };
