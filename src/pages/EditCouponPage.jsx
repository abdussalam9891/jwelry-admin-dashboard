import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import CouponForm from "../components/CouponForm";

import {
  getCoupon,
} from "../services/couponService";

export default function EditCouponPage() {

  const { id } =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [coupon, setCoupon] =
    useState(null);

  useEffect(() => {

    const fetchCoupon =
      async () => {

        try {

          const data =
            await getCoupon(id);

          setCoupon(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    fetchCoupon();

  }, [id]);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <CouponForm
      mode="edit"
      initialData={coupon}
    />
  );
}
