import api from "../api/client";

export const globalSearch =
  async (query) => {
    const res =
      await api.get(
        "/admin/search",
        {
          params: {
            q: query,
          },
        }
      );

    return res.data;
  };
