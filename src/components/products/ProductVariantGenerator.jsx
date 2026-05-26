import { useState } from "react";

const materialOptions = [
  "18K Gold",
  "22K Gold",
  "Silver",
  "Diamond",
  "Rose Gold",
  "White Gold",
  "Platinum",
  "Gemstone",
];

const sizeOptions = ["6", "7", "8"];

export default function ProductVariants({ formData, setFormData }) {
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState([]);


  const existingMaterials =
  new Set(
    formData.variants.map(
      (variant) => variant.material
    )
  );





  const toggleSelection = (value, selected, setter) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const generateVariants = () => {
    const generatedVariants = [];

    selectedMaterials.forEach((material) => {
      // PRODUCTS WITHOUT SIZE

      if (!["rings", "bracelets"].includes(formData.category)) {
        const sku = `${formData.category}-${material}`

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
        const sku = `${formData.category}-${material}-${size}`

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

    const existingSkus = formData.variants.map((variant) => variant.sku);

    const uniqueGeneratedVariants = generatedVariants.filter(
      (variant) => !existingSkus.includes(variant.sku),
    );

    setFormData((prev) => ({
      ...prev,

      variants: [...prev.variants, ...uniqueGeneratedVariants],
    }));
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
         {materialOptions.map((material) => {
  const isExisting =
    formData.variants.some(
      (variant) =>
        variant.material === material
    );

  return (
    <button
      key={material}
      type="button"
      disabled={isExisting}
      onClick={() => {
        if (isExisting) return;

        toggleSelection(
          material,
          selectedMaterials,
          setSelectedMaterials
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
            : selectedMaterials.includes(material)
            ? "border-brand bg-brand text-white"
            : "border-border bg-surface text-text-primary"
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

        {["rings", "bracelets"].includes(formData.category) && (
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
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    toggleSelection(size, selectedSizes, setSelectedSizes)
                  }
                  className={`
                    rounded-2xl

                    border

                    px-4
                    py-2

                    text-sm
                    font-medium

                    transition

                    ${
                      selectedSizes.includes(size)
                        ? "border-brand bg-brand text-white"
                        : "border-border bg-surface text-text-primary"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
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
