import {
  AlertTriangle,
  LayoutGrid,
  Package,
  PackageX,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/client";
import { exportProductsReport } from "../services/productService";

import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("-createdAt");

  const [material, setMaterial] = useState("");

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  const [stats, setStats] = useState({
    totalProducts: 0,

    lowStockProducts: 0,

    outOfStockProducts: 0,

    totalCategories: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        /* PARALLEL REQUESTS */

        const [productsRes, statsRes] = await Promise.all([
          api.get(
            `/admin/products?page=${page}&limit=10&search=${search}&category=${category}&material=${material}&sort=${sort}`,
          ),

          api.get("/admin/products/stats"),
        ]);

        /* PRODUCTS */

        setProducts(productsRes.data.products);

        setPagination(productsRes.data.pagination);

        /* STATS */

        setStats(statsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, category, sort, material]);

  const handleExport = async () => {
    try {
      const data = await exportProductsReport();

      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "products-report.xlsx");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* HEADER */}
      <div
        className="
    mb-8

    flex
    flex-col
    gap-5

    lg:flex-row
    lg:items-center
    lg:justify-between
  "
      >
        {/* LEFT */}
        <div>
          <div
            className="
        inline-flex
        items-center

        rounded-full

        border
        border-[#E8DADF]

        bg-[#F8EEF1]

        px-4
        py-2

        text-xs
        font-medium

        text-[#6B1A2A]
      "
          >
            Inventory Management
          </div>

          <h1
            className="
        mt-4

        text-4xl
        font-bold
        tracking-tight

        text-text-primary
      "
          >
            Products
          </h1>

          <p
            className="
        mt-2

        max-w-2xl

        text-sm
        leading-relaxed

        text-text-secondary
      "
          >
            Manage inventory, pricing, stock levels and product visibility
            across your store.
          </p>
        </div>

        {/* RIGHT */}
        <div
          className="
      flex
      items-center
      gap-3
    "
        >
          {/* secondary */}
          <button
            onClick={handleExport}
            className="
        rounded-2xl

        border
        border-border

        bg-surface

        px-5
        py-3

        text-sm
        font-semibold

        text-text-primary

        shadow-sm

        transition
        hover:bg-[#FAFAFA]
      "
          >
            Export
          </button>

          {/* primary */}
          <button
            onClick={() => navigate("/admin/products/new")}
            className="
    rounded-2xl

    bg-brand

    px-5
    py-3

    text-sm
    font-semibold
    text-white

    shadow-lg
    shadow-[#6B1A2A]/15

    transition
    hover:opacity-90
  "
          >
            Add Product
          </button>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
    mb-8

    grid
    grid-cols-1
    gap-5

    md:grid-cols-2
    xl:grid-cols-4
  "
      >
        {/* TOTAL PRODUCTS */}
        <div
          className="
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-border

      bg-surface

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
        >
          <div
            className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#F8EEF1]

        blur-2xl
      "
          />

          <div className="relative z-10">
            <div
              className="
          flex
          items-start
          justify-between
        "
            >
              <div>
                <p
                  className="
              text-xs
              font-medium
              uppercase
              tracking-wide

              text-[#9CA3AF]
            "
                >
                  Total Products
                </p>

                <h2
                  className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-text-primary
            "
                >
                  {stats.totalProducts}
                </h2>
              </div>

              <div
                className="
            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-[#F8EEF1]

            text-[#6B1A2A]
          "
              >
                <Package size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* LOW STOCK */}
        <div
          className="
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-border

      bg-surface

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
        >
          <div
            className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#FFF5E8]

        blur-2xl
      "
          />

          <div className="relative z-10">
            <div
              className="
          flex
          items-start
          justify-between
        "
            >
              <div>
                <p
                  className="
              text-xs
              font-medium
              uppercase
              tracking-wide

              text-[#9CA3AF]
            "
                >
                  Low Stock
                </p>

                <h2
                  className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-text-primary
            "
                >
                  {stats.lowStockProducts}
                </h2>
              </div>

              <div
                className="
            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-[#FFF5E8]

            text-[#D97706]
          "
              >
                <AlertTriangle size={20} />
              </div>
            </div>

            {/* alert */}
            <div
              className="
          mt-6
          inline-flex
          items-center

          rounded-full

          bg-[#FFF5E8]

          px-3
          py-1

          text-xs
          font-semibold

          text-[#D97706]
        "
            >
              Needs attention
            </div>
          </div>
        </div>

        {/* OUT OF STOCK */}
        <div
          className="
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-border

      bg-surface

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
        >
          <div
            className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#FFF1F2]

        blur-2xl
      "
          />

          <div className="relative z-10">
            <div
              className="
          flex
          items-start
          justify-between
        "
            >
              <div>
                <p
                  className="
              text-xs
              font-medium
              uppercase
              tracking-wide

              text-[#9CA3AF]
            "
                >
                  Out of Stock
                </p>

                <h2
                  className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-text-primary
            "
                >
                  {stats.outOfStockProducts}
                </h2>
              </div>

              <div
                className="
            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-[#FFF1F2]

            text-[#E11D48]
          "
              >
                <PackageX size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div
          className="
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-border

      bg-surface

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
        >
          <div
            className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#EEF6FF]

        blur-2xl
      "
          />

          <div className="relative z-10">
            <div
              className="
          flex
          items-start
          justify-between
        "
            >
              <div>
                <p
                  className="
              text-xs
              font-medium
              uppercase
              tracking-wide

              text-[#9CA3AF]
            "
                >
                  Categories
                </p>

                <h2
                  className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-text-primary
            "
                >
                  {stats.totalCategories}
                </h2>
              </div>

              <div
                className="
            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-[#EEF6FF]

            text-[#2563EB]
          "
              >
                <LayoutGrid size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*FILTER BAR*/}

      <div
        className="
    mb-8

    rounded-[28px]

    border
    border-border

    bg-surface

    p-5

    shadow-[0_10px_30px_rgba(0,0,0,0.03)]
  "
      >
        <div
          className="
      flex
      flex-col
      gap-4

      xl:flex-row
      xl:items-center
      xl:justify-between
    "
        >
          {/* LEFT FILTERS */}

          <div
            className="
        flex
        flex-1
        flex-col
        gap-3

        lg:flex-row
      "
          >
            {/* SEARCH */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            text-[#9CA3AF]
          "
              />

              <input
                value={search}
                onChange={(e) => {
                  setPage(1);

                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="
            Search products, materials or collections...
          "
                className="
            h-12
            w-full

            rounded-2xl

            border
            border-border

            bg-surface-secondary

            pl-11
            pr-4

            text-sm
            text-text-primary

            outline-none

            transition

            placeholder:text-[#9CA3AF]

            focus:border-[#D8C7CD]
            focus:bg-surface
          "
              />
            </div>

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) => {
                setPage(1);

                setCategory(e.target.value);
              }}
              className="
          h-12

          rounded-2xl

          border
          border-border

          bg-surface-secondary

          px-4

          text-sm
          font-medium

          text-text-primary

          outline-none

          transition

          focus:border-[#D8C7CD]
          focus:bg-surface
        "
            >
              <option value="">All Categories</option>

              <option value="rings">Rings</option>

              <option value="bracelets">Bracelets</option>

              <option value="earrings">Earrings</option>

              <option value="necklaces">Necklaces</option>
            </select>

            {/* MATERIAL */}

            <select
              value={material}
              onChange={(e) => {
                setPage(1);

                setMaterial(e.target.value);
              }}
              className="
          h-12

          rounded-2xl

          border
          border-border

          bg-surface-secondary

          px-4

          text-sm
          font-medium

          text-text-primary

          outline-none

          transition

          focus:border-[#D8C7CD]
          focus:bg-surface
        "
            >
              <option value="">All Materials</option>

              <option value="18K Gold">18K Gold</option>

              <option value="22K Gold">22K Gold</option>

              <option value="Silver">Silver</option>

              <option value="Diamond">Diamond</option>

              <option value="Rose Gold">Rose Gold</option>

              <option value="White Gold">White Gold</option>

              <option value="Platinum">Platinum</option>

              <option value="Gemstone">Gemstone</option>
            </select>

            {/* SORT */}

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
              className="
          h-12

          rounded-2xl

          border
          border-border

          bg-surface-secondary

          px-4

          text-sm
          font-medium

          text-text-primary

          outline-none

          transition

          focus:border-[#D8C7CD]
          focus:bg-surface
        "
            >
              <option value="-createdAt">Newest First</option>

              <option value="price">Price Low to High</option>

              <option value="-price">Price High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
    overflow-hidden

    rounded-[32px]

    border
    border-border

    bg-surface

    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
  "
      >
        <div className="overflow-x-auto">
          {loading ? (
            <div
              className="
          flex
          items-center
          justify-center

          py-24

          text-sm
          font-medium

          text-text-secondary
        "
            >
              Loading products...
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              {/* HEAD */}
              <thead>
                <tr
                  className="
              border-b
              border-[#F1ECEE]

              bg-surface-secondary

              text-left
            "
                >
                  {[
                    "Product",
                    "Category",
                    "SKU",
                    "Price",
                    "Stock",
                    "Status",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="
                  px-6
                  py-5

                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]

                  text-[#9CA3AF]
                "
                    >
                      {heading}
                    </th>
                  ))}

                  <th
                    className="
                px-6
                py-5

                text-right

                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-[#9CA3AF]
              "
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {products.map((product) => {
                  return (
                    <tr
                      onClick={() => navigate(`/admin/products/${product._id}`)}
                      key={product._id}
                      className="
  cursor-pointer

  border-b
  border-[#F5F1F2]

  transition-all
  duration-200

  hover:bg-surface-secondary
  hover:shadow-[inset_4px_0_0_#6B1A2A]

  active:scale-[0.998]
"
                    >
                      {/* PRODUCT */}
                      <td className="px-6 py-5">
                        <div
                          className="
                      flex
                      items-center
                      gap-4
                    "
                        >
                          <img
                            src={
                              product.images?.[1]?.url || "/placeholder.webp"
                            }
                            alt={product.name}
                            className="
                        h-14
                        w-14

                        rounded-2xl

                        border
                        border-[#F1ECEE]

                        object-cover
                      "
                          />

                          <div>
                            <h3
                              className="
                          text-sm
                          font-semibold

                          text-text-primary
                        "
                            >
                              {product.name}
                            </h3>

                            <p
                              className="
                          mt-1

                          text-xs

                          text-[#8A8F98]
                        "
                            >
                              #{product._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td
                        className="
                    px-6
                    py-5

                    text-sm
                    capitalize

                    text-[#4B5563]
                  "
                      >
                        {product.category}
                      </td>

                      {/* SKU */}
                      <td
                        className="
                    px-6
                    py-5

                    text-sm

                    text-[#4B5563]
                  "
                      >
                        {product.sku || `SKU-${product._id.slice(-6)}`}
                      </td>

                      {/* PRICE */}
                      <td
                        className="
                    px-6
                    py-5

                    text-sm
                    font-semibold

                    text-text-primary
                  "
                      >
                        ₹{product.price.toLocaleString()}
                      </td>

                      {/* STOCK */}
                      <td
                        className="
                    px-6
                    py-5

                    text-sm

                    text-[#4B5563]
                  "
                      >
                        {product.totalStock}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <div
                          className="
                      flex
                      flex-col
                      gap-2
                    "
                        >
                          {/* BUSINESS STATUS */}
                          <span
                            className={`
                        inline-flex
                        w-fit

                        rounded-full

                        px-3
                        py-1

                        text-[11px]
                        font-semibold

                        ${
                          product.status === "ACTIVE"
                            ? "bg-[#EEF8F1] text-[#0F9F61]"
                            : product.status === "DRAFT"
                              ? "bg-[#FFF5E8] text-[#D97706]"
                              : "bg-[#F3F4F6] text-[#6B7280]"
                        }
                      `}
                          >
                            {product.status}
                          </span>

                          {/* INVENTORY STATUS */}
                          <span
                            className={`
                        inline-flex
                        w-fit

                        rounded-full

                        px-3
                        py-1

                        text-[11px]
                        font-semibold

                        ${
                          product.inventoryStatus === "IN STOCK"
                            ? "bg-[#EEF8F1] text-[#0F9F61]"
                            : product.inventoryStatus === "IN STOCK"
                              ? "bg-[#FFF5E8] text-[#D97706]"
                              : "bg-[#FFF1F2] text-[#E11D48]"
                        }
                      `}
                          >
                            {product.inventoryStatus}
                          </span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td
                        className="
                    px-6
                    py-5
                    text-right
                  "
                      >
                        <div
                          className="
                      flex
                      items-center
                      justify-end
                      gap-2
                    "
                        >
                          {/* EDIT */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              navigate(`/admin/products/${product._id}/edit`);
                            }}
                            className="
    rounded-2xl

    bg-brand

    px-5
    py-3

    text-sm
    font-semibold
    text-white

    shadow-lg
    shadow-[#6B1A2A]/15
cursor-pointer
    transition
    hover:opacity-90
  "
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div
          className="
      flex
      flex-col
      gap-4

      border-t
      border-[#F1ECEE]

      bg-surface-secondary

      px-6
      py-5

      md:flex-row
      md:items-center
      md:justify-between
    "
        >
          {/* LEFT */}
          <div>
            <p
              className="
          text-sm
          font-medium

          text-text-secondary
        "
            >
              Showing page{" "}
              <span className="text-text-primary">
                {pagination.currentPage}
              </span>{" "}
              of{" "}
              <span className="text-text-primary">{pagination.totalPages}</span>
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
        flex
        items-center
        gap-2
      "
          >
            {/* PREVIOUS */}
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
          rounded-2xl

          border
          border-border

          bg-surface

          px-4
          py-2.5

          text-sm
          font-semibold

          text-text-primary

          shadow-sm

          transition
          hover:bg-[#FAFAFA]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
            >
              Previous
            </button>

            {/* CURRENT PAGE */}
            <div
              className="
          flex
          h-[42px]
          min-w-[42px]

          items-center
          justify-center

          rounded-2xl

          bg-brand

          px-4

          text-sm
          font-semibold
          text-white

          shadow-lg
          shadow-[#6B1A2A]/15
        "
            >
              {page}
            </div>

            {/* NEXT */}
            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="
          rounded-2xl

          border
          border-border

          bg-surface

          px-4
          py-2.5

          text-sm
          font-semibold

          text-text-primary

          shadow-sm

          transition
          hover:bg-[#FAFAFA]

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
  );
}
