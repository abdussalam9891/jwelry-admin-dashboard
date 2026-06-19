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

 const [search, setSearch] = useState("");

const [status, setStatus] = useState("ALL");

const [discountType, setDiscountType] =
  useState("ALL");

const [sort, setSort] =
  useState("Newest");

const [page, setPage] =
  useState(1);

const [pagination, setPagination] =
  useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  const [debouncedSearch, setDebouncedSearch] =
  useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400);

  return () => clearTimeout(timer);
}, [search]);






const fetchCoupons = async () => {
  try {
    setLoading(true);

    const data = await getCoupons({
      search:   debouncedSearch,

      status,
      discountType,
      sort,
      page,
      limit: 12,
    });

    setCoupons(data.coupons);

    setPagination(data.pagination);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};





  useEffect(() => {
  fetchCoupons();
}, [
    debouncedSearch,
  status,
  discountType,
  sort,
  page,
]);




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
  sort={sort}
  setPage={setPage}
  setSort={setSort}
  status={status}
  setStatus={setStatus}
  discountType={discountType}
  setDiscountType={setDiscountType}
 totalResults={
    pagination?.total || 0
  }
/>

   {loading ? (

  <div>
    Loading...
  </div>

) : coupons.length === 0 ? (

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
    {coupons.map(
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



{pagination?.pages > 1 && (
  <div
    className="
      flex
      flex-col
      gap-4

      rounded-3xl
      border
      border-border

      bg-surface

      p-5

      sm:flex-row
      sm:items-center
      sm:justify-between
    "
  >
    <div
      className="
        text-sm
        text-text-secondary
      "
    >
      Showing page{" "}
      <span className="font-medium text-text-primary">
        {pagination.page}
      </span>{" "}
      of{" "}
      <span className="font-medium text-text-primary">
        {pagination.pages}
      </span>
      {" • "}
      {pagination.total} total coupons
    </div>

    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <button
        onClick={() =>
          setPage((prev) =>
            Math.max(prev - 1, 1)
          )
        }
        disabled={page === 1}
        className="
          rounded-2xl

          border
          border-border

          px-4
          py-2

          text-sm
          font-medium

          transition

          hover:bg-surface-secondary

          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Previous
      </button>

      {Array.from(
        {
          length: pagination.pages,
        },
        (_, index) => index + 1
      )
        .slice(
          Math.max(page - 3, 0),
          Math.min(
            page + 2,
            pagination.pages
          )
        )
        .map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() =>
              setPage(pageNumber)
            }
            className={`
              h-10
              w-10

              rounded-xl

              text-sm
              font-medium

              transition

              ${
                pageNumber === page
                  ? "bg-brand text-white"
                  : "border border-border hover:bg-surface-secondary"
              }
            `}
          >
            {pageNumber}
          </button>
        ))}

      <button
        onClick={() =>
          setPage((prev) =>
            Math.min(
              prev + 1,
              pagination.pages
            )
          )
        }
        disabled={
          page === pagination.pages
        }
        className="
          rounded-2xl

          border
          border-border

          px-4
          py-2

          text-sm
          font-medium

          transition

          hover:bg-surface-secondary

          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  </div>
)}





    </div>
  );
}
