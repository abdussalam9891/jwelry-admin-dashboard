import api from "../api/client";

/* PRODUCT STATS */

export const getProductStats =
  async () => {

    const res =
      await api.get(
        "/admin/products/stats"
      );

    return res.data;

  };

/* EXPORT PRODUCTS REPORT */

export const exportProductsReport =
  async () => {

    const res =
      await api.get(
        "/admin/products/export",
        {
          responseType:
            "blob",
        }
      );

    return res.data;

  };


  /* GET PRODUCT DETAILS */

export const getProductDetails =
  async (id) => {

    const res =
      await api.get(
        `/admin/products/${id}/details`
      );

    return res.data;

  };



  /* ARCHIVE PRODUCT */

export const archiveProduct =
  async (id) => {

    const res =
      await api.patch(
        `/admin/products/${id}/archive`
      );

    return res.data;

  };



  /* UPDATE PRODUCT */

export const updateProduct =
  async (
    id,
    productData
  ) => {

    const res =
      await api.put(

        `/admin/products/${id}`,

        productData
      );

    return res.data;

  };



  export const deleteProduct =
  async (id) => {

    const { data } =
      await api.delete(
        `/admin/products/${id}`
      );



    return data;
};
