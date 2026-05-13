import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ConfirmModal from "../components/ConfirmModal";
import { archiveProduct, getProductDetails } from "../services/productService";

import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  Boxes,
  IndianRupee,
  Pencil,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductDetails(id);

        setProductData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  const {
    product,

    analytics,

    variants,

    recentOrders,

    revenueChart,
  } = productData;

  const stats = [
    {
      title: "Revenue",

      value: `₹${analytics.totalRevenue.toLocaleString()}`,

      icon: IndianRupee,
    },

    {
      title: "Units Sold",

      value: analytics.totalUnitsSold,

      icon: ShoppingBag,
    },

    {
      title: "Inventory",

      value:
        product.variants?.reduce(
          (acc, item) => acc + item.stock,

          0,
        ) || product.stock,

      icon: Boxes,
    },

    {
      title: "Low Stock Alerts",

      value: analytics.lowStockCount,

      icon: AlertTriangle,
    },
  ];

  const handleArchive = async () => {
    try {
      const data = await archiveProduct(id);

      /*
        UPDATE UI
      */

      setProductData((prev) => ({
        ...prev,

        product: {
          ...prev.product,

          status: data.status,
        },
      }));

      /*
        CLOSE MODAL
      */

      setShowArchiveModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F8] p-6">
      {/* TOP BAR */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-sm text-[#6D7175]"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#111111]">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-[#F8EEF1] px-4 py-2 text-xs font-semibold text-[#6B1A2A]">
              {product.category}
            </div>

            <div
              className={`
    rounded-full

    px-4
    py-2

    text-xs
    font-semibold

    ${
      product.status === "ARCHIVED"
        ? `
          bg-[#FEF3F2]
          text-[#B42318]
        `
        : product.status === "DRAFT"
          ? `
          bg-[#FFF7ED]
          text-[#C2410C]
        `
          : `
          bg-[#ECFDF3]
          text-[#027A48]
        `
    }
  `}
            >
              {product.status}
            </div>

            <div className="text-sm text-[#6D7175]">SKU: {product.sku}</div>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowArchiveModal(true)}
            className="
    flex
    items-center
    gap-2

    rounded-2xl

    border
    border-black/10

    bg-white

    px-5
    py-3

    text-sm
    font-semibold

    text-[#111111]

    shadow-sm

    transition

    hover:bg-[#FAFAFA]
  "
          >
            <Archive size={18} />

            {product.status === "ARCHIVED"
              ? "Restore Product"
              : "Archive Product"}
          </button>

          <Link
            to={`/admin/products/${id}/edit`}
            className="
    flex
    items-center
    gap-2

    rounded-2xl

    bg-[#6B1A2A]

    px-5
    py-3

    text-sm
    font-semibold

    text-white

    shadow-lg
    shadow-[#6B1A2A]/20

    transition

    hover:opacity-90
  "
          >
            <Pencil size={18} />
            Edit Product
          </Link>
        </div>
      </div>

      {/* GRID */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-6 xl:col-span-2">
          {/* PRODUCT IMAGES */}

          <div
            className="
    rounded-[28px]
    border
    border-[#ECE7E9]

    bg-white
    p-6

    shadow-sm
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
                <h2
                  className="
          text-xl
          font-semibold

          text-[#111111]
        "
                >
                  Product Media
                </h2>

                <p
                  className="
          mt-1
          text-sm

          text-[#6D7175]
        "
                >
                  Product gallery and storefront assets.
                </p>
              </div>

              <div
                className="
        rounded-full

        bg-[#F8EEF1]

        px-4
        py-2

        text-xs
        font-semibold

        text-[#6B1A2A]
      "
              >
                {product.images?.length || 0} Images
              </div>
            </div>

            <div
              className="
      mt-6

      grid
      grid-cols-1
      gap-4

      md:grid-cols-2
    "
            >
              {product.images?.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_ASSET_URL}${image}`}
                    alt={product.name}
                    className="
              h-[320px]
              w-full

              rounded-3xl

              object-cover

              border
              border-black/5
            "
                  />
                ))
              ) : (
                <div
                  className="
          flex
          h-[320px]

          items-center
          justify-center

          rounded-3xl

          border
          border-dashed
          border-black/10

          bg-[#FAFAFA]

          text-sm
          text-[#9CA3AF]
        "
                >
                  No product images uploaded
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}

          <div
            className="
    rounded-[28px]

    border
    border-[#ECE7E9]

    bg-white
    p-6

    shadow-sm
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
                <h2
                  className="
          text-xl
          font-semibold

          text-[#111111]
        "
                >
                  Product Overview
                </h2>

                <p
                  className="
          mt-1
          text-sm

          text-[#6D7175]
        "
                >
                  Internal product summary and storefront description.
                </p>
              </div>
            </div>

            <div
              className="
      mt-6

      rounded-3xl

      bg-[#FAFAFA]

      p-6
    "
            >
              <div
                className="
    mt-6

    space-y-5
  "
              >
                <div>
                  <h3
                    className="
        text-sm
        font-semibold

        text-[#111111]
      "
                  >
                    Short Description
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-[#6D7175]
      "
                  >
                    {product.description?.short ||
                      "No short description available."}
                  </p>
                </div>

                <div>
                  <h3
                    className="
        text-sm
        font-semibold

        text-[#111111]
      "
                  >
                    Design
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-[#6D7175]
      "
                  >
                    {product.description?.design ||
                      "No design information available."}
                  </p>
                </div>

                <div>
                  <h3
                    className="
        text-sm
        font-semibold

        text-[#111111]
      "
                  >
                    Details
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-[#6D7175]
      "
                  >
                    {product.description?.details ||
                      "No additional details available."}
                  </p>
                </div>

                <div>
                  <h3
                    className="
        text-sm
        font-semibold

        text-[#111111]
      "
                  >
                    Styling
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-[#6D7175]
      "
                  >
                    {product.description?.styling ||
                      "No styling information available."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VARIANTS */}

          <div className="rounded-[28px] border border-[#ECE7E9] bg-white shadow-sm">
            <div className="border-b border-black/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#111111]">
                    Variant Inventory
                  </h2>

                  <p className="mt-1 text-sm text-[#6D7175]">
                    Manage variant stock, pricing and sales analytics.
                  </p>
                </div>

 
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-black/5 bg-[#FAFAFA] text-left text-[#6D7175]">
                  <tr>
                    <th className="px-6 py-4 font-medium">SKU</th>
                    <th className="px-6 py-4 font-medium">Material</th>
                    <th className="px-6 py-4 font-medium">Size</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Stock</th>
                    <th className="px-6 py-4 font-medium">Sold</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {variants.map((variant, index) => (
                    <tr key={index} className="border-b border-black/5">
                      <td className="px-6 py-5 font-medium text-[#111111]">
                        {variant.sku}
                      </td>

                      <td className="px-6 py-5 text-[#6D7175]">
                        {variant.material}
                      </td>

                      <td className="px-6 py-5 text-[#6D7175]">
                        {variant.size}
                      </td>

                      <td className="px-6 py-5 font-semibold text-[#111111]">
                        ₹{variant.price.toLocaleString()}
                      </td>

                      <td className="px-6 py-5 text-[#111111]">
                        {variant.stock}
                      </td>

                      <td className="px-6 py-5 text-[#111111]">
                        {variant.sold}
                      </td>

                      <td className="px-6 py-5">
                        <div className="inline-flex rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#027A48]">
                          IN STOCK
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT ORDERS */}

          <div className="rounded-[28px] border border-[#ECE7E9] bg-white shadow-sm">
            <div className="border-b border-black/5 p-6">
              <h2 className="text-xl font-semibold text-[#111111]">
                Recent Orders
              </h2>
            </div>

            <div className="divide-y divide-black/5">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-[#111111]">
                      {order.orderNumber}
                    </p>

                    <p className="mt-1 text-sm text-[#6D7175]">
                      {order.customerName}
                    </p>
                  </div>

                  <div className="font-semibold text-[#111111]">
                    ₹{order.totalPrice.toLocaleString()}
                  </div>

                  <div className="inline-flex w-fit rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#027A48]">
                    {order.orderStatus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}

        <div
          className="
  sticky
  top-24

  space-y-6

  self-start
"
        >
          {/* QUICK STATS */}

          <div
            className="
    grid
    grid-cols-1
    gap-4
  "
          >
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
          rounded-[28px]

          border
          border-[#ECE7E9]

          bg-white
          p-6

          shadow-sm
        "
                >
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
                text-sm
                text-[#6D7175]
              "
                      >
                        {item.title}
                      </p>

                      <h2
                        className="
                mt-4

                text-3xl
                font-bold
                tracking-tight

                text-[#111111]
              "
                      >
                        {item.value}
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
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PERFORMANCE */}

          <div
            className="
    rounded-[28px]

    border
    border-[#ECE7E9]

    bg-white
    p-6

    shadow-sm
  "
          >
            <div
              className="
      flex
      items-center
      gap-3
    "
            >
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
                <TrendingUp size={22} />
              </div>

              <div>
                <h2
                  className="
          font-semibold
          text-[#111111]
        "
                >
                  Sales Performance
                </h2>

                <p
                  className="
          mt-1
          text-sm

          text-[#6D7175]
        "
                >
                  Product sales and revenue insights.
                </p>
              </div>
            </div>

            <div
              className="
      mt-6

      grid
      grid-cols-2
      gap-4
    "
            >
              <div
                className="
        rounded-3xl

        bg-[#FAFAFA]

        p-5
      "
              >
                <p
                  className="
          text-sm
          text-[#6D7175]
        "
                >
                  Total Revenue
                </p>

                <h2
                  className="
          mt-2

          text-2xl
          font-bold

          text-[#111111]
        "
                >
                  ₹{analytics.totalRevenue.toLocaleString()}
                </h2>
              </div>

              <div
                className="
        rounded-3xl

        bg-[#FAFAFA]

        p-5
      "
              >
                <p
                  className="
          text-sm
          text-[#6D7175]
        "
                >
                  Units Sold
                </p>

                <h2
                  className="
          mt-2

          text-2xl
          font-bold

          text-[#111111]
        "
                >
                  {analytics.totalUnitsSold}
                </h2>
              </div>
            </div>

            <div
              className="
      mt-5

      rounded-3xl

      border
      border-black/5

      bg-[#FCFAFB]

      p-5
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
                  <p
                    className="
            text-sm
            text-[#6D7175]
          "
                  >
                    Total Orders
                  </p>

                  <h2
                    className="
            mt-2

            text-3xl
            font-bold

            text-[#111111]
          "
                  >
                    {analytics.totalOrders}
                  </h2>
                </div>

                <div
                  className="
          rounded-full

          bg-[#F8EEF1]

          px-4
          py-2

          text-sm
          font-semibold

          text-[#6B1A2A]
        "
                >
                  Live Analytics
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}

          <div
            className="
    rounded-[28px]

    border
    border-[#ECE7E9]

    bg-white
    p-6

    shadow-sm
  "
          >
            <h2
              className="
      text-lg
      font-semibold

      text-[#111111]
    "
            >
              Product Information
            </h2>

            <div
              className="
      mt-6
      space-y-5
    "
            >
              <div
                className="
        flex
        items-center
        justify-between
      "
              >
                <span
                  className="
          text-sm
          text-[#6D7175]
        "
                >
                  Product Type
                </span>

                <span
                  className="
          font-medium
          text-[#111111]
        "
                >
                  Jewelry
                </span>
              </div>

              <div
                className="
        flex
        items-center
        justify-between
      "
              >
                <span
                  className="
          text-sm
          text-[#6D7175]
        "
                >
                  Category
                </span>

                <span
                  className="
          font-medium
          text-[#111111]
        "
                >
                  {product.category || "-"}
                </span>
              </div>

              <div
                className="
        flex
        items-center
        justify-between
      "
              >
                <span
                  className="
          text-sm
          text-[#6D7175]
        "
                >
                  Variants
                </span>

                <span
                  className="
          font-medium
          text-[#111111]
        "
                >
                  {variants.length}
                </span>
              </div>

              <div
                className="
        flex
        items-center
        justify-between
      "
              >
                <span
                  className="
          text-sm
          text-[#6D7175]
        "
                >
                  Inventory Status
                </span>

                <span
                  className="
          font-medium

          text-[#111111]
        "
                >
                  {analytics.lowStockCount > 0 ? "Needs Attention" : "Healthy"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onConfirm={handleArchive}
        title={
          product.status === "ARCHIVED" ? "Restore Product" : "Archive Product"
        }
        description={
          product.status === "ARCHIVED"
            ? `
        This product will become
        active on the storefront again.
      `
            : `
        This product will be hidden
        from storefront visibility
        but preserved for analytics,
        reports and order history.
      `
        }
        confirmText={product.status === "ARCHIVED" ? "Restore" : "Archive"}
      />
    </div>
  );
};

export default ProductDetailsPage;
