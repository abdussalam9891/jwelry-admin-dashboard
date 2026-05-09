import { useEffect, useState } from "react";
import api from "../api/client";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("-createdAt");

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/admin/products?page=${page}&limit=10&search=${search}&category=${category}&sort=${sort}`,
        );

        setProducts(res.data.products);

        setPagination(res.data.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, search, category, sort]);


  const totalProducts =
  pagination?.totalProducts || 0;

const lowStockProducts =
  products.filter((product) => {

    const totalStock =
      product.variants?.length > 0
        ? product.variants.reduce(
            (acc, variant) =>
              acc + variant.stock,
            0
          )
        : product.stock;

    return (
      totalStock > 0 &&
      totalStock <=
        product.lowStockThreshold
    );

  }).length;

const outOfStockProducts =
  products.filter((product) => {

    const totalStock =
      product.variants?.length > 0
        ? product.variants.reduce(
            (acc, variant) =>
              acc + variant.stock,
            0
          )
        : product.stock;

    return totalStock === 0;

  }).length;

const totalCategories =
  new Set(
    products.map(
      (product) =>
        product.category
    )
  ).size;

  return (
    <div className="min-h-screen bg-[#F6F6F7] p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Products</h1>

          <p className="mt-1 text-sm text-[#6D7175]">
            Manage inventory, pricing, stock and product visibility.
          </p>
        </div>

        <button className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
          Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6D7175]">Total Products</p>
          <h2 className="mt-2 text-3xl font-bold">{totalProducts}</h2>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6D7175]">Low Stock</p>
          <h2 className="mt-2 text-3xl font-bold">{lowStockProducts}</h2>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6D7175]">Out of Stock</p>
          <h2 className="mt-2 text-3xl font-bold">{outOfStockProducts}</h2>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#6D7175]">Categories</p>
          <h2 className="mt-2 text-3xl font-bold">{totalCategories}</h2>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-black/10 bg-[#F6F6F7] px-4 py-3 text-sm outline-none focus:border-black"
          />

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="rounded-xl border border-black/10 bg-[#F6F6F7] px-4 py-3 text-sm outline-none focus:border-black"
          >
            <option>All Categories</option>
            <option>Gold</option>
            <option>Diamond</option>
            <option>Silver</option>
            <option>Gemstone</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
            className="rounded-xl border border-black/10 bg-[#F6F6F7] px-4 py-3 text-sm outline-none focus:border-black"
          >
            <option>Newest</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 text-center text-sm text-[#6D7175]">
              Loading products...
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/5 bg-[#FAFAFA] text-left">
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    Product
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    Category
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    SKU
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    Price
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    Stock
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#6D7175]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => {
                  // TOTAL STOCK
                  const totalStock =
                    product.variants?.length > 0
                      ? product.variants.reduce(
                          (acc, variant) => acc + variant.stock,
                          0,
                        )
                      : product.stock;

                  // INVENTORY STATUS
                  const inventoryStatus =
                    totalStock === 0
                      ? "OUT OF STOCK"
                      : totalStock <= product.lowStockThreshold
                        ? "LOW STOCK"
                        : "IN STOCK";

                  return (
                    <tr
                      key={product._id}
                      className="border-b border-black/5 transition hover:bg-[#FAFAFA]"
                    >
                      {/* PRODUCT */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.images?.[1]
                                ? `${import.meta.env.VITE_ASSET_URL}${product.images[1]}`
                                : "/placeholder.webp"
                            }
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />

                          <div>
                            <h3 className="text-sm font-medium text-[#1A1A1A]">
                              {product.name}
                            </h3>

                            <p className="text-xs text-[#6D7175]">
                              #{product._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}

                      <td className="px-4 py-3 text-sm capitalize text-[#4A4A4A]">
                        {product.category}
                      </td>

                      {/* SKU */}

                      <td className="px-4 py-3 text-sm text-[#4A4A4A]">
                        {product.sku || "—"}
                      </td>

                      {/* PRICE */}

                      <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">
                        ₹{product.price.toLocaleString()}
                      </td>

                      {/* STOCK */}

                      <td className="px-4 py-3 text-sm text-[#4A4A4A]">
                        {totalStock}
                      </td>

                      {/* STATUS */}

                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {/* BUSINESS STATUS */}

                          <span
                            className={`
                  inline-flex
                  w-fit
                  rounded-full
                  px-2
                  py-0.5
                  text-[10px]
                  font-medium

                  ${
                    product.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : product.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                  }
                `}
                          >
                            {product.status}
                          </span>

                          {/* INVENTORY STATUS */}

                          <span
                            className={`
                  text-[10px]
                  font-medium

                  ${
                    inventoryStatus === "IN STOCK"
                      ? "text-green-600"
                      : inventoryStatus === "LOW STOCK"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }
                `}
                          >
                            {inventoryStatus}
                          </span>
                        </div>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="
                  rounded-md
                  border
                  border-black/10

                  px-3
                  py-1.5

                  text-xs
                  font-medium

                  transition
                  hover:bg-black
                  hover:text-white
                "
                          >
                            Edit
                          </button>

                          <button
                            className="
                  rounded-md
                  border
                  border-red-200

                  px-3
                  py-1.5

                  text-xs
                  font-medium
                  text-red-600

                  transition
                  hover:bg-red-50
                "
                          >
                            Delete
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

        {/* PAGINATION */}

        {pagination && (
          <div
            className="
      flex
      flex-col
      gap-4

      border-t
      border-black/5

      px-4
      py-3

      md:flex-row
      md:items-center
      md:justify-between
    "
          >
            <p className="text-sm text-[#6D7175]">
              Page {pagination.currentPage}
              of {pagination.totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="
          rounded-md
          border
          border-black/10

          px-3
          py-1.5

          text-xs

          transition

          hover:bg-[#F6F6F7]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
              >
                Previous
              </button>

              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="
          rounded-md
          border
          border-black/10

          px-3
          py-1.5

          text-xs

          transition

          hover:bg-[#F6F6F7]

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
