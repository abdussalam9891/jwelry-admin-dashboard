import useProductForm from "../hooks/useProductForm";

import ProductBasicInfo from "../components/products/ProductBasicInfo";

import ProductDescription from "../components/products/ProductDescription";

import ProductImages from "../components/products/ProductImages";

import ProductPricing from "../components/products/ProductPricing";

import ProductOrganization from "../components/products/ProductOrganization";

import ProductVariants from "../components/products/ProductVariantGenerator";

import ProductVariantsList from "../components/products/ProductVariantsList";

import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

export default function ProductForm({ initialData = null, mode = "create" }) {
  const isEditMode = mode === "edit";

  const {
    formData,

    setFormData,

    handleChange,

    handleSubmit,

    handleVariantChange,

    removeVariant,

    handleImageUpload,

    removeImage,

    moveImage,
  } = useProductForm({
    initialData,

    mode,
  });

  return (
    <div
      className="
        min-h-screen

        bg-bg

        p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-8

          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
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

          <div
            className="
              inline-flex
              items-center

              rounded-full

              border
              border-border

              bg-[#F8EEF1]

              px-4
              py-2

              text-xs
              font-medium

              text-brand
            "
          >
            {isEditMode ? "Product Editing" : "Product Creation"}
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
            {isEditMode ? "Edit Product" : "Add Product"}
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
            {isEditMode
              ? "Update product details, inventory, pricing and visibility."
              : "Create a new product and manage inventory, pricing and visibility."}
          </p>
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-1
          items-start
          gap-6

          xl:grid-cols-3
        "
      >
        {/* LEFT */}

        <div
          className="
            xl:col-span-2

            space-y-6
          "
        >
          <ProductBasicInfo formData={formData} handleChange={handleChange} />

          <ProductDescription
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />

          <ProductImages
            formData={formData}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            moveImage={moveImage}
          />

          <ProductPricing formData={formData} handleChange={handleChange} />

          <ProductVariants formData={formData} setFormData={setFormData} />

          <ProductVariantsList
            formData={formData}
            removeVariant={removeVariant}
            handleVariantChange={handleVariantChange}
          />
        </div>

        {/* RIGHT */}

        <div
          className="
            sticky
            top-28

            h-fit

            space-y-6
          "
        >
          <ProductOrganization
            formData={formData}
            handleChange={handleChange}
          />

          {/* SUBMIT */}

          <button
            type="submit"
            className="
              w-full

              rounded-2xl

              bg-brand

              px-5
              py-4

              text-sm
              font-semibold

              text-white

              shadow-lg
              shadow-[#6B1A2A]/15

              transition

              hover:opacity-90
            "
          >
            {mode === "edit" ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
