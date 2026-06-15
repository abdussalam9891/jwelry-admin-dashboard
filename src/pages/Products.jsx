import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import StatCard from "@/components/products/StatCard";

import { CATEGORIES, PRODUCT_TYPES } from "@/constants/productMeta";

import {
  Package,
  AlertTriangle,
  PackageX,
  LayoutGrid,
  Layers,
  PackageCheck,

  Search
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

  const [sort, setSort] = useState("newest");

  const [productType, setProductType] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

 const [stats, setStats] = useState({
  totalProducts: 0,

  totalCategories: 0,

  totalProductTypes: 0,

  inStockProducts: 0,

  lowStockProducts: 0,

  outOfStockProducts: 0,

  bestSellerProducts: 0,

  averageStoreRating: 0,
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, statsRes] = await Promise.all([
          api.get(
            `/admin/products?page=${page}&limit=10&search=${search}&category=${category}&productType=${productType}&status=${status}&sort=${sort}`,
          ),

          api.get("/admin/products/stats"),
        ]);

        setProducts(productsRes.data.products);

        setPagination(productsRes.data.pagination);

        setStats(statsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, category, productType, status, sort]);

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

  const availableTypes = category
    ? PRODUCT_TYPES[category] || []
    : Object.values(PRODUCT_TYPES).flat();

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
         hover:bg-surface-secondary
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
  <StatCard
    title="Total Products"
    value={stats.totalProducts}
    icon={Package}
    glowColor="#F8EEF1"
    iconBg="#F8EEF1"
    iconColor="#6B1A2A"
  />

  <StatCard
    title="Categories"
    value={stats.totalCategories}
    icon={Layers}
    glowColor="#F3F4F6"
    iconBg="#F3F4F6"
    iconColor="#4B5563"
  />

  <StatCard
    title="Product Types"
    value={stats.totalProductTypes}
    icon={LayoutGrid}
    glowColor="#EEF6FF"
    iconBg="#EEF6FF"
    iconColor="#2563EB"
  />

  <StatCard
    title="In Stock"
    value={stats.inStockProducts}
    icon={PackageCheck}
    glowColor="#ECFDF5"
    iconBg="#ECFDF5"
    iconColor="#059669"
  />

  <StatCard
    title="Low Stock"
    value={stats.lowStockProducts}
    icon={AlertTriangle}
    glowColor="#FFF5E8"
    iconBg="#FFF5E8"
    iconColor="#D97706"
  />

  <StatCard
    title="Out of Stock"
    value={stats.outOfStockProducts}
    icon={PackageX}
    glowColor="#FFF1F2"
    iconBg="#FFF1F2"
    iconColor="#E11D48"
  />


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

            text-text-secondary
          "
              />

              <Input
                value={search}
                onChange={(e) => {
                  setPage(1);

                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="
    Search by name, SKU, type...
  "
                className="
    h-12

    rounded-2xl

    border-border

    bg-surface-secondary

    pl-11
    pr-4

    text-sm
    text-text-primary

    placeholder:text-text-secondary

    focus-visible:ring-0
    focus-visible:border-[#D8C7CD]
    focus-visible:bg-surface
  "
              />
            </div>

            {/* CATEGORY */}

            <Select
              value={category || "all"}
              onValueChange={(value) => {
                setPage(1);

                setCategory(value === "all" ? "" : value);

                setProductType("");
              }}
            >
              <SelectTrigger
                className="
      h-12
      rounded-2xl
      border-border
      bg-surface-secondary
      px-4
      text-sm
      font-medium
      text-text-primary
      focus:ring-2
      focus:ring-[#7b1e2b]/20
    "
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>

                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* PRODUCT TYPE */}

          <Select
  value={productType || "all"}
  disabled={!category}
  onValueChange={(value) => {
    setPage(1);
    setProductType(
      value === "all" ? "" : value
    );
  }}
>
  <SelectTrigger
    className="
      h-12
      rounded-2xl
      border-border
      bg-surface-secondary
      px-4
      text-sm
      font-medium
      text-text-primary
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
  >
    <SelectValue
      placeholder={
        category
          ? "All Types"
          : "Select Category First"
      }
    />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="all">
      All Types
    </SelectItem>

    {availableTypes.map((type) => (
      <SelectItem
        key={type.value}
        value={type.value}
      >
        {type.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

            {/* STATUS */}

            <Select
              value={status || "all"}
              onValueChange={(value) => {
                setPage(1);

                setStatus(value === "all" ? "" : value);
              }}
            >
              <SelectTrigger
                className="
      h-12
      rounded-2xl
      border-border
      bg-surface-secondary
      px-4
      text-sm
      font-medium
      text-text-primary
    "
              >
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>

                <SelectItem value="ACTIVE">Active</SelectItem>

                <SelectItem value="DRAFT">Draft</SelectItem>

                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>

            {/* SORT */}

            <Select
              value={sort}
              onValueChange={(value) => {
                setPage(1);
                setSort(value);
              }}
            >
              <SelectTrigger
                className="
      h-12
      rounded-2xl
      border-border
      bg-surface-secondary
      px-4
      text-sm
      font-medium
      text-text-primary
      focus:ring-0
      focus:border-border-[#D8C7CD]
      focus:bg-surface
    "
              >
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>

                <SelectItem value="price_asc">Price Low to High</SelectItem>

                <SelectItem value="price_desc">Price High to Low</SelectItem>

                <SelectItem value="highest_rated">Highest Rated</SelectItem>

                <SelectItem value="best_selling">Best Selling</SelectItem>
              </SelectContent>
            </Select>
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
            <div className="space-y-4 p-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <Table>
              {/* HEAD */}
              <TableHeader>
                <TableRow
                  className="


              bg-surface-secondary

              hover:bg-surface-secondary
            "
                >
                  {[
                    "Product",
                    "Category",
                    "Product Type",
                    "Price",
                    "Stock",
                    "Status",
                  ].map((heading) => (
                    <TableHead
                      key={heading}
                      className="
                  px-6
                  py-5

                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]

                  text-text-secondary
                "
                    >
                      {heading}
                    </TableHead>
                  ))}

                  <TableHead
                    className="
                px-6
                py-5

                text-right

                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-text-secondary
              "
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* BODY */}
              <TableBody>
                {products.map((product) => {
                  return (
                    <TableRow
                      key={product._id}
                      onClick={() => navigate(`/admin/products/${product._id}`)}
                      className="
                  cursor-pointer


                  dark:border-white/[0.06]

                  transition-colors
                  duration-200

                  hover:bg-surface-secondary
                "
                    >
                      {/* PRODUCT */}
                      <TableCell className="px-6 py-5">
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
                        border-border

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

                          text-text-secondary
                        "
                            >
                              #{product._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* CATEGORY */}

                      <TableCell
                        className="
    px-6
    py-5

    text-sm

    text-[#4B5563]
  "
                      >
                        <span className="capitalize">{product.category}</span>
                      </TableCell>

                      {/* PRODUCT TYPE */}

                      <TableCell
                        className="
    px-6
    py-5

    text-sm

    text-[#4B5563]
  "
                      >
                        <span className="capitalize">
                          {product.productType?.replaceAll("-", " ")}
                        </span>
                      </TableCell>

                      {/* PRICE */}
                      <TableCell
                        className="
                    px-6
                    py-5

                    text-sm
                    font-semibold

                    text-text-primary
                  "
                      >
                        ₹{product.price.toLocaleString()}
                      </TableCell>

                      {/* STOCK */}

                      <TableCell
                        className="
    px-6
    py-5

    text-sm

    text-[#4B5563]
  "
                      >
                        {product.stock}
                      </TableCell>

                      {/* STATUS */}
                      <TableCell className="px-6 py-5">
                        <div
                          className="
                      flex
                      flex-col
                      gap-2
                    "
                        >
                          {/* BUSINESS STATUS */}
                          <Badge
                            className={`
                        w-fit

                        rounded-full

                        px-3
                        py-1

                        text-[11px]
                        font-semibold

                        hover:bg-transparent

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
                          </Badge>

                          {/* INVENTORY STATUS */}
                          <Badge
                            className={`
                        w-fit

                        rounded-full

                        px-3
                        py-1

                        text-[11px]
                        font-semibold

                        hover:bg-transparent

                        ${
                          product.inventoryStatus === "IN STOCK"
                            ? "bg-[#EEF8F1] text-[#0F9F61]"
                            : product.inventoryStatus === "LOW STOCK"
                              ? "bg-[#FFF5E8] text-[#D97706]"
                              : "bg-[#FFF1F2] text-[#E11D48]"
                        }
                      `}
                          >
                            {product.inventoryStatus}
                          </Badge>
                        </div>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell
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
                    "
                        >
                          <Button
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

                        shadow-[#6B1A2A]/15

                        hover:bg-brand/90
                      "
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
          rounded-2xl

          border-border

          bg-surface

          px-4
          py-2.5

          text-sm
          font-semibold

          text-text-primary

          shadow-sm

          hover:bg-[#FAFAFA]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
            >
              Previous
            </Button>

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
            <Button
              variant="outline"
              disabled={page === pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="
          rounded-2xl

          border-border

          bg-surface

          px-4
          py-2.5

          text-sm
          font-semibold

          text-text-primary

          shadow-sm

          hover:bg-[#FAFAFA]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
