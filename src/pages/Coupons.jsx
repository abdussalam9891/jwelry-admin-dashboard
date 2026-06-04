import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Plus,
} from "lucide-react";

import {
  getCoupons,
} from "../services/couponService";

import CouponCard from "../components/coupons/CouponCard";

import CouponStats from "../components/coupons/CouponStatsCards";

import CouponFilters from "../components/coupons/CouponFilters";

export default function Coupons() {

  const [
    coupons,
    setCoupons,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [search, setSearch] =
  useState("");

const [status, setStatus] =
  useState("ALL");

const [
  discountType,
  setDiscountType,
] = useState("ALL");




const fetchCoupons =
      async () => {

        try {

          const data =
            await getCoupons();

          setCoupons(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };





  useEffect(() => {



    fetchCoupons();

  }, []);



  const filteredCoupons =
  coupons.filter(
    (coupon) => {

      const matchesSearch =
        coupon.code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        coupon.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const isExpired =
        coupon.expiresAt &&
        new Date(
          coupon.expiresAt
        ) < new Date();

      const matchesStatus =
        status === "ALL"
          ? true
          : status ===
            "ACTIVE"
          ? coupon.isActive &&
            !isExpired
          : status ===
            "INACTIVE"
          ? !coupon.isActive
          : isExpired;

      const matchesType =
        discountType ===
        "ALL"
          ? true
          : coupon.discountType ===
            discountType;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    }
  );

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>

          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Coupons
          </h1>

          <p
            className="
              mt-2
              text-text-secondary
            "
          >
            Manage discounts and
            promotional campaigns.
          </p>

        </div>

        <Link
          to="/admin/coupons/new"
          className="
            inline-flex
            items-center
            gap-2

            rounded-2xl

            bg-brand

            px-5
            py-3

            text-white
          "
        >
          <Plus size={18} />

          Create Coupon
        </Link>
      </div>

      <CouponStats
        coupons={coupons}
      />

      <CouponFilters
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
  discountType={discountType}
  setDiscountType={setDiscountType}
  totalResults={
    filteredCoupons.length
  }
/>

   {loading ? (

  <div>
    Loading...
  </div>

) : filteredCoupons.length === 0 ? (

  <div
    className="
      rounded-3xl
      border
      border-dashed
      border-border

      bg-surface

      p-12

      text-center
    "
  >
    <h3
      className="
        text-lg
        font-semibold
      "
    >
      No coupons found
    </h3>

    <p
      className="
        mt-2
        text-sm
        text-text-secondary
      "
    >
      Try adjusting your
      filters or create a
      new coupon.
    </p>
  </div>

) : (

  <div
    className="
      grid
      grid-cols-1
      gap-3

      xl:grid-cols-2
    "
  >
    {filteredCoupons.map(
      (coupon) => (
        <CouponCard
      key={coupon._id}
      coupon={coupon}
      onRefresh={
        fetchCoupons
      }
    />
      )
    )}
  </div>

)}
    </div>
  );
}
