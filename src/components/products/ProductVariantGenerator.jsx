import { useState } from "react";
import {
  MATERIALS,
  SIZE_BASED_PRODUCT_TYPES,
} from "@/constants/productMeta";



const sizeOptions = [

  "6",
  "7",
  "8",
  "9",
  "10",

];

export default function ProductVariants({ formData, setFormData }) {
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState([]);



  const requiresSize =
  SIZE_BASED_PRODUCT_TYPES.includes(
    formData.productType
  );



  const variantExists = (
  material,
  size = ""
) => {
  return formData.variants.some(
    (variant) =>
      variant.material === material &&
      (variant.size || "") === size
  );
};

const materialFullyGenerated = (
  material
) => {
  if (!requiresSize) {
    return formData.variants.some(
      (variant) =>
        variant.material === material
    );
  }

  return sizeOptions.every((size) =>
    variantExists(material, size)
  );
};






  const toggleSelection = (value, selected, setter) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

 const generateVariants = () => {

  if (
  selectedMaterials.length === 0 ||
  (requiresSize &&
    selectedSizes.length === 0)
) {
  return;
}


  if (!formData.productType) {
  return;
}


  const generatedVariants = [];



  selectedMaterials.forEach((material) => {
    // PRODUCTS WITHOUT SIZE

    if (!requiresSize) {
      const sku =
        `${formData.productType}-${material}`

          .toUpperCase()

          .replace(/\s+/g, "-");

      generatedVariants.push({
        material,

        size: "",

        sku,

        price: "",

        stock: "",
      });

      return;
    }

    // PRODUCTS WITH SIZE

    selectedSizes.forEach((size) => {
      const sku =
        `${formData.productType}-${material}-${size}`

          .toUpperCase()

          .replace(/\s+/g, "-");

      generatedVariants.push({
        material,

        size,

        sku,

        price: "",

        stock: "",
      });
    });
  });

  // REMOVE DUPLICATES

  const existingSkus = formData.variants.map(
    (variant) => variant.sku
  );

  const uniqueGeneratedVariants =
    generatedVariants.filter(
      (variant) =>
        !existingSkus.includes(
          variant.sku
        )
    );

  setFormData((prev) => ({
    ...prev,

    variants: [
      ...prev.variants,
      ...uniqueGeneratedVariants,
    ],
  }));

  // RESET GENERATOR

  setSelectedMaterials([]);
  setSelectedSizes([]);
};

  return (
    <div
      className="
        rounded-[32px]

        border
        border-border

        bg-surface

        p-7

        shadow-sm
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <div
            className="
              inline-flex
              items-center

              rounded-full



              px-3
              py-1

              text-xs
              font-semibold

              text-brand
            "
          >
            Variant Management
          </div>

          <h2
            className="
              mt-4

              text-2xl
              font-bold
              tracking-tight

              text-text-primary
            "
          >
            Product Variants
          </h2>

          <p
            className="
              mt-2

              max-w-xl

              text-sm
              leading-relaxed

              text-text-secondary
            "
          >
            Configure purchasable combinations like material, pricing and
            inventory.
          </p>
        </div>
      </div>

      {/* VARIANT GENERATOR */}

      <div
        className="
          mt-8

          rounded-3xl

          border
          border-border

          bg-surface-secondary

          p-6
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            text-text-primary
          "
        >
          Variant Generator
        </h3>

        {/* MATERIALS */}

        <div className="mt-6">
          <p
            className="
              mb-3

              text-sm
              font-medium

              text-text-primary
            "
          >
            Select Materials
          </p>

        <div className="flex flex-wrap gap-3">
  {MATERIALS.map((material) => {
    const isExisting =
  materialFullyGenerated(
    material
  );

    return (
      <button
        key={material}
        type="button"
        disabled={isExisting}
       onClick={() => {
  if (isExisting) return;

  if (requiresSize) {
    setSelectedMaterials([material]);

    setSelectedSizes([]);
  } else {
    toggleSelection(
      material,
      selectedMaterials,
      setSelectedMaterials
    );
  }
}}
        className={`
          rounded-2xl
          border
          px-4
          py-2
          text-sm
          font-medium
          transition

          ${
            isExisting
              ? "border-border bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
              : selectedMaterials.includes(
                  material
                )
              ? "border-brand bg-brand text-white"
              : "border-border bg-surface text-text-primary hover:border-brand/40"
          }
        `}
      >
        {material}
      </button>
    );
  })}
</div>
        </div>

        {/* SIZES */}

        {requiresSize && (
          <div className="mt-6">
            <p
              className="
                mb-3

                text-sm
                font-medium

                text-text-primary
              "
            >
              Select Sizes
            </p>

            <div className="flex flex-wrap gap-3">
            {sizeOptions.map((size) => {
  const selectedMaterial =
    selectedMaterials[0];

  const isExisting =
    selectedMaterial &&
    variantExists(
      selectedMaterial,
      size
    );

  return (
    <button
      key={size}
      type="button"
      disabled={isExisting}
      onClick={() => {
        if (isExisting) return;

        toggleSelection(
          size,
          selectedSizes,
          setSelectedSizes
        );
      }}
      className={`
        rounded-2xl
        border
        px-4
        py-2
        text-sm
        font-medium
        transition

        ${
          isExisting
            ? "border-border bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
            : selectedSizes.includes(size)
            ? "border-brand bg-brand text-white"
            : "border-border bg-surface text-text-primary"
        }
      `}
    >
      {size}
    </button>
  );
})}
            </div>
          </div>
        )}

        {/* GENERATE BUTTON */}

        <button
          type="button"
          onClick={generateVariants}
          className="
            mt-8

            rounded-2xl

            bg-brand

            px-6
            py-3

            text-sm
            font-semibold

            text-white

            transition

            hover:opacity-90
          "
        >
          Generate Variants
        </button>
      </div>
    </div>
  );
}
