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



  export const getOrderDetails =
  async (id) => {

    const res =
      await api.get(
        `/admin/orders/${id}`
      );

    return res.data;

  };


  export const updateOrderStatus =
  async (id, orderStatus) => {

    const res =
      await api.patch(

        `/admin/orders/${id}/status`,

        {
          orderStatus,
        }
      );

    return res.data;

  };



  export const updatePaymentStatus = async (
  id,
  paymentStatus
) => {
  const res = await api.patch(
    `/admin/orders/${id}/payment-status`,
    {
      paymentStatus,
    }
  );

  return res.data;
};
