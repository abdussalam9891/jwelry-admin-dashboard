import api from "../api/client";

/* DASHBOARD */
export const getDashboardAnalytics =
  async () => {
    const res =
      await api.get(
        "/admin/analytics/dashboard"
      );

    return res.data;
  };

/* REVENUE */
export const getRevenueAnalytics =
  async (params) => {
    const res =
      await api.get(
        "/admin/analytics/revenue",
        {
          params,
        }
      );

    return res.data;
  };

/* ORDERS */
export const getOrdersAnalytics =
  async (params) => {
    const res =
      await api.get(
        "/admin/analytics/orders",
        {
          params,
        }
      );

    return res.data;
  };

/* PRODUCTS */
export const getProductsAnalytics =
  async (params) => {
    const res =
      await api.get(
        "/admin/analytics/products",
        {
          params,
        }
      );

    return res.data;
  };

/* CUSTOMERS */
export const getCustomersAnalytics =
  async (params) => {
    const res =
      await api.get(
        "/admin/analytics/customers",
        {
          params,
        }
      );

    return res.data;
  };

/* PAYMENTS */
export const getPaymentsAnalytics =
  async (params) => {
    const res =
      await api.get(
        "/admin/analytics/payments",
        {
          params,
        }
      );

    return res.data;
  };

/* INVENTORY */
export const getInventoryAnalytics =
  async (params) => {
    const res =
      await api.get(
        "/admin/analytics/inventory",
        {
          params,
        }
      );

    return res.data;
  };

/* GEO */
export const getGeoAnalytics =
  async (params) => {
    const res =
      await api.get(
        "/admin/analytics/geo",
        {
          params,
        }
      );

    return res.data;
  };
