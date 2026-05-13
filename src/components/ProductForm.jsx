import { useState, useEffect } from "react";
import api from "../api/client";
import {
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductForm({

  initialData = null,

  mode = "create",

}) {


    const navigate =
  useNavigate();

const [formData, setFormData] =
  useState({

    name: "",

    slug: "",

    category: "gold",

    subcategory: "rings",

    gender: "her",

    price: "",

    originalPrice: "",

    stock: "",

    status: "ACTIVE",

    lowStockThreshold: 5,

    shortDescription: "",

    image1: "",

    image2: "",

    variants: [
  {
    material: "",
    size: "",
    sku: "",
    price: "",
    stock: "",
  },
],

  });

useEffect(() => {

  if (!initialData) return;

  setFormData({

    name:
      initialData.name || "",

    slug:
      initialData.slug || "",

    category:
      initialData.category || "gold",

    subcategory:
      initialData.subcategory || "rings",

    gender:
      initialData.gender || "her",

    price:
      initialData.price || "",

    originalPrice:
      initialData.originalPrice || "",

    stock:
      initialData.stock || "",

    status:
      initialData.status || "ACTIVE",

    lowStockThreshold:
      initialData.lowStockThreshold || 5,

    shortDescription:
      initialData.description?.short || "",

    image1:
      initialData.images?.[0]
        ?.split("/")
        ?.pop()
        ?.replace(".webp", "") || "",

    image2:
      initialData.images?.[1]
        ?.split("/")
        ?.pop()
        ?.replace(".webp", "") || "",

        variants:
  initialData?.variants?.length > 0

    ? initialData.variants

    : [
        {
          material: "",
          size: "",
          sku: "",
          price: "",
          stock: "",
        },
      ],

  });

}, [initialData]);

const addVariant = () => {

  setFormData((prev) => ({

    ...prev,

    variants: [

      ...prev.variants,

      {
        material: "",
        size: "",
        sku: "",
        price: "",
        stock: "",
      },

    ],

  }));

};

const handleVariantChange = (

  index,

  field,

  value

) => {

  const updatedVariants =
    [...formData.variants];

  updatedVariants[index][field] =
    value;

  setFormData((prev) => ({

    ...prev,

    variants:
      updatedVariants,

  }));

};


const removeVariant = (index) => {

  const filtered =
    formData.variants.filter(

      (_, i) => i !== index
    );

  setFormData((prev) => ({

    ...prev,

    variants: filtered,

  }));

};

 const handleChange = (e) => {

  const {
    name,
    value,
  } = e.target;

  setFormData((prev) => ({

    ...prev,

    [name]: value,

  }));

};

const handleSubmit = async (e) => {

  e.preventDefault();

  const price =
    Number(formData.price);

  const originalPrice =
    Number(formData.originalPrice);

  const stock =
    Number(formData.stock);

  const lowStockThreshold =
    Number(
      formData.lowStockThreshold
    );

  /*
    VALIDATION
  */

  if (price < 0) {

    return toast.error(
      "Price cannot be negative"
    );

  }

  if (originalPrice < 0) {

    return toast.error(
      "Original price cannot be negative"
    );

  }

  if (stock < 0) {

    return toast.error(
      "Stock cannot be negative"
    );

  }

  if (lowStockThreshold < 0) {

    return toast.error(
      "Low stock threshold cannot be negative"
    );

  }

  if (

    originalPrice > 0 &&

    originalPrice < price

  ) {

    return toast.error(
      "Original price should be greater than price"
    );

  }

  try {

    /*
      IMAGES
    */

    const images = [

      `/uploads/products/${formData.subcategory}/${formData.category}/${formData.image1}.webp`,

      `/uploads/products/${formData.subcategory}/${formData.category}/${formData.image2}.webp`,

    ];

    /*
      PAYLOAD
    */

    const payload = {

      name:
        formData.name,

      slug:
        formData.slug,

      price,

      originalPrice,

      stock,

      lowStockThreshold,

      category:
        formData.category,

      subcategory:
        formData.subcategory,

      gender:
        formData.gender,

      status:
        formData.status,

      images,

      description: {

        short:
          formData.shortDescription,

      },

    };

    /*
      CREATE / UPDATE
    */

    if (mode === "edit") {

      await api.put(

        `/admin/products/${initialData._id}`,

        payload
      );

      toast.success(
        "Product updated successfully"
      );

    } else {

      await api.post(

        "/admin/products",

        payload
      );

      toast.success(
        "Product created successfully"
      );

    }

    navigate(
      "/admin/products"
    );

  } catch (error) {

    console.error(error);

    toast.error(

      error.response?.data?.message ||

      "Failed to save product"

    );

  }

};

  return (

    <div
      className="
        min-h-screen
        bg-[#FAF7F8]

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
            Product Creation
          </div>

          <h1
            className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-[#111111]
            "
          >
            Add Product
          </h1>

          <p
            className="
              mt-2

              max-w-2xl

              text-sm
              leading-relaxed

              text-[#6D7175]
            "
          >
            Create a new product and manage inventory,
            pricing and visibility.
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

          {/* BASIC INFO */}
          <div
            className="
              rounded-3xl

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
              Basic Information
            </h2>

            <div
              className="
                mt-6
                grid
                grid-cols-1
                gap-5
              "
            >

              {/* NAME */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Diamond Ring"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-white
                  "
                />

              </div>

              {/* SLUG */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="diamond-ring"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-white
                  "
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Short Description
                </label>

                <textarea
                  rows={5}
                  name="shortDescription"
                  value={
                    formData.shortDescription
                  }
                  onChange={handleChange}
                  placeholder="Write product overview..."
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    p-4

                    text-sm

                    outline-none

                    transition

                    resize-none

                    focus:border-[#D8C7CD]
                    focus:bg-white
                  "
                />

              </div>

           {/* PRODUCT IMAGES */}
<div className="space-y-4">

  <label
    className="
      block

      text-sm
      font-medium

      text-[#111111]
    "
  >
    Product Images
  </label>

  {/* IMAGE 1 */}
  <input
    type="text"

    value={formData.image1}

    onChange={(e) =>
      setFormData({

        ...formData,

        image1:
          e.target.value,

      })
    }

    placeholder="1"

    className="
      h-12
      w-full

      rounded-2xl

      border
      border-[#ECE7E9]

      bg-[#FCFAFB]

      px-4

      text-sm

      outline-none
    "
  />

  {/* IMAGE 2 */}
  <input
    type="text"

    value={formData.image2}

    onChange={(e) =>
      setFormData({

        ...formData,

        image2:
          e.target.value,

      })
    }

    placeholder="1-2"

    className="
      h-12
      w-full

      rounded-2xl

      border
      border-[#ECE7E9]

      bg-[#FCFAFB]

      px-4

      text-sm

      outline-none
    "
  />

</div>

            </div>

          </div>

          {/* PRICING */}
          <div
            className="
              rounded-3xl

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
              Pricing & Inventory
            </h2>

            <div
              className="
                mt-6

                grid
                grid-cols-1
                gap-5

                md:grid-cols-2
              "
            >

              {/* PRICE */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25000"
                   min="0"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-white
                  "
                />

              </div>

              {/* ORIGINAL PRICE */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Original Price
                </label>

                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="30000"
                   min="0"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-white
                  "
                />

              </div>

              {/* STOCK */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="10"
                   min="0"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-white
                  "
                />

              </div>

              {/* LOW STOCK */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Low Stock Threshold
                </label>

                <input
                  type="number"
                  name="lowStockThreshold"
                  value={
                    formData.lowStockThreshold
                  }
                  onChange={handleChange}
                   min="0"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-white
                  "
                />

              </div>

            </div>

          </div>



  {/*PRODUCT VARIANTS */}

<div
  className="
    rounded-[32px]
    border
    border-[#ECE7E9]
    bg-white
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

          bg-[#F8EEF1]

          px-3
          py-1

          text-xs
          font-semibold

          text-[#6B1A2A]
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
          text-[#111111]
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
          text-[#6D7175]
        "
      >
        Configure purchasable combinations
        like material, pricing and inventory.
        Size options automatically appear
        for rings and bracelets.
      </p>

    </div>

    <button
      type="button"

      onClick={addVariant}

      className="
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        bg-[#6B1A2A]

        px-5
        py-3

        text-sm
        font-semibold

        text-white

        shadow-lg
        shadow-[#6B1A2A]/10

        transition

        hover:opacity-90
      "
    >
      + Add Variant
    </button>

  </div>

  {/* VARIANT LIST */}

  <div className="mt-8 space-y-6">

    {formData.variants.map(
      (variant, index) => (

        <div

          key={index}

          className="
            relative

            overflow-hidden

            rounded-[28px]

            border
            border-[#ECE7E9]

            bg-[#FCFAFB]

            p-6

            transition

            hover:border-[#E4D7DB]
          "
        >

          {/* TOP ROW */}

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
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide

                  text-[#9CA3AF]
                "
              >
                Variant
              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-semibold
                  text-[#111111]
                "
              >
                #{index + 1}
              </h3>

            </div>

            {formData.variants.length > 1 && (

              <button
                type="button"

                onClick={() =>
                  removeVariant(index)
                }

                className="
                  rounded-xl

                  border
                  border-red-100

                  bg-red-50

                  px-4
                  py-2

                  text-sm
                  font-semibold

                  text-red-500

                  transition

                  hover:bg-red-100
                "
              >
                Remove
              </button>

            )}

          </div>

          {/* FIELDS */}

          <div
            className="
              mt-6

              grid
              grid-cols-1
              gap-4

              md:grid-cols-2
            "
          >

            {/* MATERIAL */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#111111]
                "
              >
                Material
              </label>

              <select

                value={variant.material}

                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "material",
                    e.target.value
                  )
                }

                className="
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-[#ECE7E9]

                  bg-white

                  px-4

                  text-sm
                  text-[#111111]

                  outline-none

                  transition

                  focus:border-[#6B1A2A]
                "
              >
                <option value="">
                  Select Material
                </option>

                <option value="18k">
                  18K Gold
                </option>

                <option value="22k">
                  22K Gold
                </option>

                <option value="silver">
                  Silver
                </option>

              </select>

            </div>

            {/* SIZE */}

            {[
              "rings",
              "bracelets",
            ].includes(
              formData.subcategory
            ) && (

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#111111]
                  "
                >
                  Size
                </label>

                <input
                  type="text"
                  placeholder="Enter Size"

                  value={variant.size}

                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "size",
                      e.target.value
                    )
                  }

                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-white

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#6B1A2A]
                  "
                />

              </div>

            )}

            {/* SKU */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#111111]
                "
              >
                SKU
              </label>

            <input
  type="text"

  value={variant.sku}

  readOnly

  className="
    h-12
    w-full

    rounded-2xl

    border
    border-[#ECE7E9]

    bg-[#F5F5F5]

    px-4

    text-sm

    text-[#6D7175]
  "
/>

            </div>

            {/* PRICE */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#111111]
                "
              >
                Variant Price
              </label>

              <input
                type="number"
                placeholder="Price"

                value={variant.price}

                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "price",
                    e.target.value
                  )
                }

                className="
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-[#ECE7E9]

                  bg-white

                  px-4

                  text-sm

                  outline-none

                  transition

                  focus:border-[#6B1A2A]
                "
              />

            </div>

            {/* STOCK */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#111111]
                "
              >
                Inventory Stock
              </label>

              <input
                type="number"
                placeholder="Stock Quantity"

                value={variant.stock}

                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "stock",
                    e.target.value
                  )
                }

                className="
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-[#ECE7E9]

                  bg-white

                  px-4

                  text-sm

                  outline-none

                  transition

                  focus:border-[#6B1A2A]
                "
              />

            </div>

          </div>

        </div>

      )
    )}

  </div>

</div>

        </div>

        {/* RIGHT */}
        <div className="
    sticky
    top-28

    h-fit

    space-y-6
  ">

          {/* ORGANIZATION */}
          <div
            className="
              rounded-3xl

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
              Organization
            </h2>

            <div className="mt-6 space-y-5">

              {/* CATEGORY */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none
                  "
                >

                  <option value="gold">
                    Gold
                  </option>

                  <option value="diamond">
                    Diamond
                  </option>

                  <option value="silver">
                    Silver
                  </option>

                  <option value="gemstone">
                    Gemstone
                  </option>

                </select>

              </div>

              {/* SUBCATEGORY */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Subcategory
                </label>

                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none
                  "
                >

                  <option value="rings">
                    Rings
                  </option>

                  <option value="earrings">
                    Earrings
                  </option>

                  <option value="necklaces">
                    Necklaces
                  </option>

                  <option value="bracelets">
                    Bracelets
                  </option>

                </select>

              </div>

              {/* STATUS */}
              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-[#111111]
                  "
                >
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-[#ECE7E9]

                    bg-[#FCFAFB]

                    px-4

                    text-sm

                    outline-none
                  "
                >

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="DRAFT">
                    Draft
                  </option>

                  <option value="ARCHIVED">
                    Archived
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full

              rounded-2xl

              bg-[#6B1A2A]

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
           {mode === "edit"
  ? "Save Changes"
  : "Create Product"}
          </button>

        </div>

      </form>

    </div>

  );

}
