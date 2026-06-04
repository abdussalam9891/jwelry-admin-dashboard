import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  exportCustomersReport,
  getCustomers,
} from "../services/customerService";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
} from "lucide-react";

export default function CustomersPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [tier, setTier] = useState("All");

  const [sort, setSort] = useState("Newest");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        const data = await getCustomers({
          search,

          tier,

          sort,

          page,

          limit: 8,
        });

        setCustomers(data.customers);

        setPagination(data.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [search, tier, sort, page]);

  const stats = [
    {
      title: "Total Customers",

      value: customers.length,
    },

    {
      title: "Platinum Tier",

      value: customers.filter((c) => c.customerTier === "Platinum").length,
    },

    {
      title: "Gold Tier",

      value: customers.filter((c) => c.customerTier === "Gold").length,
    },

    {
      title: "Revenue Generated",

      value: `₹${customers
        .reduce((acc, customer) => acc + customer.totalSpent, 0)
        .toLocaleString()}`,
    },
  ];

  const handleExport = async () => {
    try {
      const data = await exportCustomersReport();

      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "customers-report.xlsx");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };



  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading customers...
    </div>
  );
}

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm text-[#7b1e2b] font-medium mb-2">
              Customer Management
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-text-primary">
              Customers
            </h1>

            <p className="text-text-secondary mt-2 max-w-2xl leading-7">
              Manage customer relationships, monitor purchasing activity,
              analyze retention trends and handle support operations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExport}
              className="
    h-12
    px-6

    rounded-2xl

    border
    border-border

    bg-surface

    font-medium

    transition

    hover:bg-surface-secondary
  "
            >
              Export
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-surface rounded-3xl border border-border p-6 shadow-sm"
            >
              <p className="text-sm text-text-secondary font-medium mb-4 uppercase tracking-wide">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold text-text-primary">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTERS */}
       <div className="bg-surface border border-border rounded-3xl p-4 md:p-5 shadow-sm">
  <div className="flex flex-col xl:flex-row gap-4">

    {/* SEARCH */}

    <div className="flex-1 relative">

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-text-secondary
        "
      />

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(
            e.target.value
          );

          setPage(1);
        }}
        placeholder="Search customers by name, email or phone..."
        className="
          h-14
          w-full

          rounded-2xl

          border
          border-border

          bg-surface-secondary

          pl-12
          pr-4

          text-sm

          outline-none

          transition

          focus:ring-2
          focus:ring-[#7b1e2b]/20
          focus:border-brand
        "
      />
    </div>

    {/* FILTERS */}

    <div className="flex flex-col sm:flex-row gap-3">

      <Select
        value={tier}
        onValueChange={(value) => {
          setTier(value);

          setPage(1);
        }}
      >
        <SelectTrigger
          className="
            h-14
            min-w-[170px]

            rounded-2xl

            border-border

            bg-surface
          "
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">
            All Tiers
          </SelectItem>

          <SelectItem value="Platinum">
            Platinum
          </SelectItem>

          <SelectItem value="Gold">
            Gold
          </SelectItem>

          <SelectItem value="Silver">
            Silver
          </SelectItem>

          <SelectItem value="Bronze">
            Bronze
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sort}
        onValueChange={(value) => {
          setSort(value);

          setPage(1);
        }}
      >
        <SelectTrigger
          className="
            h-14
            min-w-[190px]

            rounded-2xl

            border-border

            bg-surface
          "
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Newest">
            Newest First
          </SelectItem>

          <SelectItem value="Highest Spend">
            Highest Spend
          </SelectItem>

          <SelectItem value="Most Orders">
            Most Orders
          </SelectItem>
        </SelectContent>
      </Select>

    </div>

  </div>
</div>

        {/* DESKTOP TABLE */}

        <div
          className="
    hidden
    lg:block

    overflow-hidden

    rounded-[2rem]

    border
    border-border

    bg-surface

    shadow-sm
  "
        >
          {/* TABLE HEADER */}

          <div
            className="
      grid
      grid-cols-7

      gap-6

      border-b
      border-border

      px-8
      py-5

      text-[11px]
      font-semibold
      uppercase

      tracking-[0.18em]

      text-text-secondary
    "
          >
            <p>Customer</p>

            <p>Orders</p>

            <p>Revenue</p>

            <p>Tier</p>

            <p>First Purchase</p>

            <p>Activity</p>

            <p className="text-right">Profile</p>
          </div>

          {/* TABLE BODY */}

          <div>
            {customers?.length === 0 && (
              <div
                className="
        flex
        items-center
        justify-center

        py-20
      "
              >
                <div
                  className="
          text-center
        "
                >
                  <p
                    className="
            text-lg
            font-semibold

            text-text-primary
          "
                  >
                    No customers found
                  </p>

                  <p
                    className="
            mt-2

            text-sm

            text-text-secondary
          "
                  >
                    Try adjusting filters or search query
                  </p>
                </div>
              </div>
            )}

            {customers?.map((customer) => {
              const daysAgo = Math.floor(
                (new Date() - new Date(customer.lastOrderDate)) /
                  (1000 * 60 * 60 * 24),
              );

              return (
                <div
                  key={customer._id}
                  onClick={() => navigate(`/admin/customers/${customer._id}`)}
                  className="
                grid
                grid-cols-7

                items-center

                gap-6

                border-b
                border-border

                px-8
                py-6

                transition-all

                hover:bg-surface-secondary
              "
                >
                  {/* CUSTOMER */}

                  <div
                    className="
                  flex
                  items-center
                  gap-4

                  min-w-0
                "
                  >
                    {/* AVATAR */}

                    <div
                      className="
                    flex
                    h-12
                    w-12

                    shrink-0

                    items-center
                    justify-center

                    rounded-2xl

                    bg-brand/10

                    text-sm
                    font-semibold

                    text-brand
                  "
                    >
                      {customer.customerName?.charAt(0)}
                    </div>

                    {/* INFO */}

                    <div
                      className="
                    min-w-0
                  "
                    >
                      <p
                        className="
                      truncate

                      font-semibold

                      text-text-primary
                    "
                      >
                        {customer.customerName}
                      </p>

                      <p
                        className="
                      mt-1

                      truncate

                      text-sm

                      text-text-secondary
                    "
                      >
                        {customer.customerEmail}
                      </p>
                    </div>
                  </div>

                  {/* ORDERS */}

                  <div>
                    <p
                      className="
                    text-base
                    font-semibold

                    text-text-primary
                  "
                    >
                      {customer.totalOrders}
                    </p>

                    <p
                      className="
                    mt-1

                    text-xs

                    text-text-secondary
                  "
                    >
                      Orders placed
                    </p>
                  </div>

                  {/* REVENUE */}

                  <div>
                    <p
                      className="
                    text-base
                    font-bold

                    text-text-primary
                  "
                    >
                      ₹{customer.totalSpent?.toLocaleString()}
                    </p>

                    <p
                      className="
                    mt-1

                    text-xs

                    text-text-secondary
                  "
                    >
                      Lifetime value
                    </p>
                  </div>

                  {/* STATUS */}

                  <div>
                    <span
                      className={`
    inline-flex
    items-center

    rounded-full

    px-3
    py-1.5

    text-xs
    font-semibold

    ${
      customer.customerTier === "Platinum"
        ? "bg-[#EEF2FF] text-indigo-400 border border-[#C7D2FE]"
        : customer.customerTier === "Gold"
          ? "bg-[#FFF7E8] text-[#B7791F] border border-[#FDE3B0]"
          : customer.customerTier === "Silver"
            ? "bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]"
            : "bg-[#FFF4E8] text-[#C77700] border border-[#FFE1B4]"
    }
  `}
                    >
                      {customer.customerTier}
                    </span>
                  </div>

                  {/* JOINED */}

                  <div>
                    <p
                      className="
                    font-medium

                    text-text-primary
                  "
                    >
                      {new Date(customer.joinedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p
                      className="
                    mt-1

                    text-xs

                    text-text-secondary
                  "
                    >
                      Customer since
                    </p>
                  </div>

                  {/* ACTIVITY */}

                  <div>
                    <p
                      className="
                    font-semibold

                    text-text-primary
                  "
                    >
                      {daysAgo}d ago
                    </p>

                    <p
                      className="
                    mt-1

                    text-xs

                    text-text-secondary
                  "
                    >
                      Last purchase
                    </p>
                  </div>

                  {/* ACTION */}

                  <div
                    className="
                  flex
                  justify-end
                "
                  >
                    <button
                      className="
                    rounded-2xl

                    border
                    border-border

                    bg-surface-secondary

                    px-5
                    py-3

                    text-sm
                    font-medium

                    text-text-primary

                    transition-all

                    hover:border-brand/20
                    hover:bg-brand/5
                  "
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PAGINATION */}

        {pagination && (
          <div
            className="
        mt-6

        flex
        items-center
        justify-between
        gap-4
        flex-wrap
      "
          >
            {/* INFO */}

            <p
              className="
          text-sm

          text-text-secondary
        "
            >
              Page {pagination.page} of {pagination.pages}
            </p>

            {/* CONTROLS */}

            <div
              className="
          flex
          items-center
          gap-2
        "
            >
              {/* PREV */}

              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="
            h-11

            rounded-2xl

            border
            border-border

            bg-surface

            px-4

            text-sm
            font-medium

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
              >
                Previous
              </button>

              {/* CURRENT */}

              <div
                className="
            flex
            h-11
            min-w-[44px]

            items-center
            justify-center

            rounded-2xl

            bg-brand

            px-4

            text-sm
            font-semibold

            text-white
          "
              >
                {page}
              </div>

              {/* NEXT */}

              <button
                disabled={page === pagination.pages}
                onClick={() => setPage((prev) => prev + 1)}
                className="
            h-11

            rounded-2xl

            border
            border-border

            bg-surface

            px-4

            text-sm
            font-medium

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
