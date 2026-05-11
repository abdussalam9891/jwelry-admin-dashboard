import api from "../api/client";

export const getProductStats =
  async () => {

    const res =
      await api.get(
        "/admin/products/stats"
      );

    return res.data;

  };
