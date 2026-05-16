import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ConfirmModal from "../components/ConfirmModal";
import {
  archiveProduct,
  deleteProduct,
  getProductDetails,
} from "../services/productService";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  Boxes,
  IndianRupee,
  Pencil,
  ShoppingBag,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteProduct(id);

      toast.success("Product deleted successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleteLoading(false);

      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      {/* TOP BAR */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-8">
            <Link
              to="/admin/products"
              className="
      group
      inline-flex
      items-center
      gap-2

      rounded-2xl

      border
      border-border

     bg-surface

      px-4
      py-2.5

      text-sm
      font-medium

      text-text-secondary

      shadow-sm

      transition-all
      duration-200

      hover:-translate-y-[1px]
      hover:border-[#6B1A2A]/20
      hover:text-brand
      hover:shadow-md
    "
            >
              <div
                className="
        flex
        h-8
        w-8

        items-center
        justify-center

        rounded-xl

        bg-[#F8EEF1]

        text-brand

        transition-transform
        duration-200

        group-hover:-translate-x-0.5
      "
              >
                <ArrowLeft size={16} />
              </div>

              <span>Back to Products</span>
            </Link>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-[#F8EEF1] px-4 py-2 text-xs font-semibold text-brand">
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
          </div>
        </div>



        {/* ACTIONS */}

        <div className="flex flex-wrap items-center gap-3">
          {/* ARCHIVE */}

          <button
            onClick={() => setShowArchiveModal(true)}
            className="
      flex
      items-center
      gap-2

      rounded-2xl

      border
      border-black/10

      bg-surface

      px-5
      py-3

      text-sm
      font-semibold

      text-text-primary

      shadow-sm

      transition

      
    "
          >
            <Archive size={18} />

            {product.status === "ARCHIVED"
              ? "Restore Product"
              : "Archive Product"}
          </button>

          {/* EDIT */}

          <Link
            to={`/admin/products/${id}/edit`}
            className="
      flex
      items-center
      gap-2

      rounded-2xl

      bg-brand

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

          {/* DELETE */}

          <button
            onClick={() => setShowDeleteModal(true)}
            className="
      flex
      items-center
      gap-2

      rounded-2xl

      border
      border-red-100

      bg-red-50

      px-5
      py-3

      text-sm
      font-semibold

      text-red-600

      shadow-sm

      transition

      hover:bg-red-100
    "
          >
            <Trash2 size={18} />
            Delete Product
          </button>
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
    border-border

    bg-surface
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

          text-text-primary
        "
                >
                  Product Media
                </h2>

                <p
                  className="
          mt-1
          text-sm

          text-text-secondary
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

        text-brand
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
                    src={image.url}
                    alt={product.name}
                    className="
              h-[320px]
              w-full

              rounded-3xl

              object-cover

              border
              border-border
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
          text-text-secondary
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
    border-border

    bg-surface
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
              <div >
                <h2
                  className="
          text-xl
          font-semibold



          text-text-primary
        "
                >
                  Product Overview
                </h2>

                <p
                  className="
          mt-1
          text-sm

          text-text-secondary
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

      bg-surface

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

        text-text-primary
      "
                  >
                    Short Description
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-text-secondary
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

        text-text-primary
      "
                  >
                    Design
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-text-secondary
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

        text-text-primary
      "
                  >
                    Details
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-text-secondary
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

        text-text-primary
      "
                  >
                    Styling
                  </h3>

                  <p
                    className="
        mt-2
        leading-relaxed

        text-text-secondary
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

          <div className="rounded-[28px] border border-border bg-surface shadow-sm">
            <div className="border-b border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">
                    Variant Inventory
                  </h2>

                  <p className="mt-1 text-sm text-text-secondary">
                    Manage variant stock, pricing and sales analytics.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className=" border-border bg-surface  text-left text-text-secondary">
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
                    <tr key={index} className="border-b border-border">
                      <td className="px-6 py-5 font-medium text-text-primary">
                        {variant.sku}
                      </td>

                      <td className="px-6 py-5 text-text-secondary">
                        {variant.material}
                      </td>

                      <td className="px-6 py-5 text-text-secondary">
                        {variant.size}
                      </td>

                      <td className="px-6 py-5 font-semibold text-text-primary">
                        ₹{variant.price.toLocaleString()}
                      </td>

                      <td className="px-6 py-5 text-text-primary">
                        {variant.stock}
                      </td>

                      <td className="px-6 py-5 text-text-primary">
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

          <div className="rounded-[28px] border border-border bg-surface shadow-sm">
            <div className="border-b border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary">
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
                    <p className="font-semibold text-text-primary">
                      {order.orderNumber}
                    </p>

                    <p className="mt-1 text-sm text-text-secondary">
                      {order.customerName}
                    </p>
                  </div>

                  <div className="font-semibold text-text-primary">
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
          border-border

          bg-surface
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
                text-text-secondary
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

                text-text-primary
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

              text-brand
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
    border-border

    bg-surface
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

        text-brand
      "
              >
                <TrendingUp size={22} />
              </div>

              <div>
                <h2
                  className="
          font-semibold
          text-text-primary
        "
                >
                  Sales Performance
                </h2>

                <p
                  className="
          mt-1
          text-sm

          text-text-secondary
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

        bg-surface-secondary

        p-5
      "
              >
                <p
                  className="
          text-sm
          text-text-secondary
        "
                >
                  Total Revenue
                </p>

                <h2
                  className="
          mt-2

          text-2xl
          font-bold

          text-text-primary
        "
                >
                  ₹{analytics.totalRevenue.toLocaleString()}
                </h2>
              </div>

              <div
                className="
        rounded-3xl

        bg-surface-secondary

        p-5
      "
              >
                <p
                  className="
          text-sm
          text-text-secondary
        "
                >
                  Units Sold
                </p>

                <h2
                  className="
          mt-2

          text-2xl
          font-bold

          text-text-primary
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
      border-border

      bg-surface-secondary

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
            text-text-secondary
          "
                  >
                    Total Orders
                  </p>

                  <h2
                    className="
            mt-2

            text-3xl
            font-bold

            text-text-primary
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

          text-brand
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
    border-border

    bg-surface
    p-6

    shadow-sm
  "
          >
            <h2
              className="
      text-lg
      font-semibold

      text-text-primary
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
          text-text-secondary
        "
                >
                  Product Type
                </span>

                <span
                  className="
          font-medium
          text-text-primary
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
          text-text-secondary
        "
                >
                  Category
                </span>

                <span
                  className="
          font-medium
          text-text-primary
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
          text-text-secondary
        "
                >
                  Variants
                </span>

                <span
                  className="
          font-medium
          text-text-primary
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
          text-text-secondary
        "
                >
                  Inventory Status
                </span>

                <span
                  className="
          font-medium

          text-text-primary
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

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Product"
        description={`
    This action cannot be undone.

    The product, variants,
    inventory data and analytics
    associations will be permanently deleted.
  `}
        confirmText="Delete Product"
      />
    </div>
  );
};

export default ProductDetailsPage;
