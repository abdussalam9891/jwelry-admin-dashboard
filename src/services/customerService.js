import api from '../api/client'

export const getCustomers =
  async (params) => {

    const res =
      await api.get(
        "/admin/customers",
        {
          params,
        }
      );

    return res.data;

  };


  /* GET CUSTOMER DETAILS */

export const getCustomerDetails =
  async (id) => {

    const res =
      await api.get(
        `/admin/customers/${id}`
      );

    return res.data;

  };



  export const exportCustomersReport =
  async () => {

    const res =
      await api.get(
        "/admin/customers/export",
        {
          responseType:
            "blob",
        }
      );

    return res.data;

  };
