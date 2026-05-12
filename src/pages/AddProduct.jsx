import { useState } from "react";
import api from "../api/client";
import {
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProduct() {

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

    });

    const navigate =
  useNavigate();

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

 const handleSubmit = async (e) => {

  e.preventDefault();

  const price = Number(formData.price);

  const originalPrice = Number(formData.originalPrice);

  const stock = Number(formData.stock);

  const lowStockThreshold = Number(
    formData.lowStockThreshold
  );

  // VALIDATION

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

    const images = [

      `/uploads/products/${formData.subcategory}/${formData.category}/${formData.image1}.webp`,

      `/uploads/products/${formData.subcategory}/${formData.category}/${formData.image2}.webp`,

    ];

    await api.post(
      "/admin/products",

      {
        name: formData.name,

        slug: formData.slug,

        price,

        originalPrice,

        stock,

        lowStockThreshold,

        category: formData.category,

        subcategory: formData.subcategory,

        gender: formData.gender,

        status: formData.status,

        images,

        description: {
          short:
            formData.shortDescription,
        },

      }
    );

    toast.success(
      "Product created successfully"
    );

    navigate("/admin/products");

  } catch (error) {

    console.error(error);

    toast.error(

      error.response?.data?.message ||

      "Failed to create product"

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

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

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
            Create Product
          </button>

        </div>

      </form>

    </div>

  );

}
