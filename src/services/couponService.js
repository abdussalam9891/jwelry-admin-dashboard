import api from "../api/client";

export const getCoupons =
  async () => {

    const { data } =
      await api.get(
        "/admin/coupons"
      );

    return data;
  };

export const getCoupon =
  async (id) => {

    const { data } =
      await api.get(
        `/admin/coupons/${id}`
      );

    return data;
  };

export const createCoupon =
  async (couponData) => {

    const { data } =
      await api.post(
        "/admin/coupons",
        couponData
      );

    return data;
  };

export const updateCoupon =
  async (
    id,
    couponData
  ) => {

    const { data } =
      await api.patch(
        `/admin/coupons/${id}`,
        couponData
      );

    return data;
  };

export const toggleCouponStatus =
  async (id) => {

    const { data } =
      await api.patch(
        `/admin/coupons/${id}/toggle-status`
      );

    return data;
  };

export const getCouponStats =
  async (id) => {

    const { data } =
      await api.get(
        `/admin/coupons/${id}/stats`
      );

    return data;
  };
