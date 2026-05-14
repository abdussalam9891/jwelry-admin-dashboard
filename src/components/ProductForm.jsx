import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function ProductForm({
  initialData = null,

  mode = "create",
}) {
  const navigate = useNavigate();

  const isEditMode =
  mode === "edit";

  const [formData, setFormData] = useState({
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

    images: [],



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
      name: initialData.name || "",

      slug: initialData.slug || "",

      category: initialData.category || "gold",

      subcategory: initialData.subcategory || "rings",

      gender: initialData.gender || "her",

      price: initialData.price || "",

      originalPrice: initialData.originalPrice || "",

      stock: initialData.stock || "",

      status: initialData.status || "ACTIVE",

      lowStockThreshold: initialData.lowStockThreshold || 5,

      shortDescription: initialData.description?.short || "",

images:
  initialData.images || [],

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

    value,
  ) => {
    const updatedVariants = [...formData.variants];

    updatedVariants[index][field] = value;

    setFormData((prev) => ({
      ...prev,

      variants: updatedVariants,
    }));
  };

  const removeVariant = (index) => {
    const filtered = formData.variants.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,

      variants: filtered,
    }));
  };

 const handleChange = (e) => {

  const { name, value } =
    e.target;



  setFormData((prev) => ({

    ...prev,

    [name]: value,



    ...(name === "name" && {

      slug: value

        .toLowerCase()

        .trim()

        .replace(/\s+/g, "-")

        .replace(/[^\w-]+/g, ""),

    }),

  }));

};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = Number(formData.price);

    const originalPrice = Number(formData.originalPrice);

    const stock = Number(formData.stock);

    const lowStockThreshold = Number(formData.lowStockThreshold);

    /*
    VALIDATION
  */

    if (price < 0) {
      return toast.error("Price cannot be negative");
    }

    if (originalPrice < 0) {
      return toast.error("Original price cannot be negative");
    }

    if (stock < 0) {
      return toast.error("Stock cannot be negative");
    }

    if (lowStockThreshold < 0) {
      return toast.error("Low stock threshold cannot be negative");
    }

    if (originalPrice > 0 && originalPrice < price) {
      return toast.error("Original price should be greater than price");
    }

    try {



      /*
      PAYLOAD
    */

      const payload = {
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

       images: formData.images,

        description: {
          short: formData.shortDescription,
        },
      };

      /*
      CREATE / UPDATE
    */

      if (mode === "edit") {
        await api.put(
          `/admin/products/${initialData._id}`,

          payload,
        );

        toast.success("Product updated successfully");
      } else {
        await api.post(
          "/admin/products",

          payload,
        );

        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };



  const handleImageUpload =
  async (e) => {

    const files =
      Array.from(
        e.target.files
      );



    // MAX VALIDATION

    if (
      formData.images.length +
      files.length > 5
    ) {

      return toast.error(
        "Maximum 5 images allowed"
      );

    }



    try {

      const formDataObj =
        new FormData();



      files.forEach((file) => {

        formDataObj.append(
          "images",
          file
        );

      });



      const response =
        await api.post(

          "/admin/media/images",

          formDataObj,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",

            },

          }
        );



      setFormData((prev) => ({

        ...prev,

        images: [

          ...prev.images,

          ...response.data.images,

        ],

      }));



      toast.success(
        "Images uploaded"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Image upload failed"
      );

    }

  };



  const removeImage =
  (imageToRemove) => {

    setFormData((prev) => ({

      ...prev,

      images:

        prev.images.filter(

          (img) =>

            img.public_id !==
            imageToRemove.public_id

        ),

    }));

  };



const moveImage =
  (from, to) => {

    const updated =
      [...formData.images];



    const [moved] =
      updated.splice(from, 1);



    updated.splice(
      to,
      0,
      moved
    );



    setFormData((prev) => ({

      ...prev,

      images: updated,

    }));

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
    {isEditMode
      ? "Product Editing"
      : "Product Creation"}
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
    {isEditMode
      ? "Edit Product"
      : "Add Product"}
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


          {/* BASIC INFO */}
          <div
            className="
              rounded-3xl

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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-surface
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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-surface
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

                    text-text-primary
                  "
                >
                  Short Description
                </label>

                <textarea
                  rows={5}
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Write product overview..."
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-border

                    bg-surface-secondary

                    p-4

                    text-sm

                    outline-none

                    transition

                    resize-none

                    focus:border-[#D8C7CD]
                    focus:bg-surface
                  "
                />
              </div>

            {/* PRODUCT IMAGES */}

<div className="space-y-5">

  <label
    className="
      block

      text-sm
      font-medium

      text-text-primary
    "
  >
    Product Images
  </label>



  {/* UPLOAD BOX */}

  <label
    className="
      flex
      min-h-[220px]

      cursor-pointer

      items-center
      justify-center

      rounded-3xl

      border-2
      border-dashed
      border-border

      bg-surface-secondary

      transition

      hover:border-[#6B1A2A]
    "
  >

    <input
      type="file"
      multiple
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
    />



    <div className="text-center">

      <p
        className="
          text-sm
          font-medium
          text-text-primary
        "
      >
        Upload Product Images
      </p>

      <p
        className="
          mt-2

          text-xs

          text-text-secondary
        "
      >
        Upload up to 5 images
      </p>

      <p
        className="
          mt-1

          text-[11px]

          text-text-secondary/70
        "
      >
        First image becomes primary product image
      </p>

    </div>

  </label>



  {/* IMAGE PREVIEW GRID */}

  {formData.images?.length > 0 && (

    <div
      className="
        grid
        grid-cols-2
        gap-4

        sm:grid-cols-3
        xl:grid-cols-5
      "
    >

      {formData.images.map(
        (image, index) => (

          <div
            key={image.public_id}

            className="
              group
              relative

              overflow-hidden

              rounded-3xl

              border
              border-border

              bg-surface-secondary
            "
          >

            {/* IMAGE */}

            <img
              src={image.url}
              alt={`Product ${index + 1}`}

              className="
                h-40
                w-full

                object-cover
              "
            />



            {/* PRIMARY BADGE */}

            {index === 0 && (

              <div
                className="
                  absolute
                  left-2
                  top-2

                  rounded-full

                  bg-black/70

                  px-2
                  py-1

                  text-[10px]
                  font-medium

                  text-white
                "
              >
                Primary
              </div>

            )}



            {/* IMAGE INDEX */}

            <div
              className="
                absolute
                bottom-2
                left-2

                rounded-full

                bg-white/90

                px-2
                py-1

                text-[10px]
                font-medium

                text-black
              "
            >
              #{index + 1}
            </div>



            {/* REMOVE BUTTON */}

            <button
              type="button"

              onClick={() =>
                removeImage(image)
              }

              className="
                absolute
                right-2
                top-2

                rounded-full

                bg-red-500

                px-2
                py-1

                text-xs
                font-medium

                text-white

                opacity-0

                transition

                group-hover:opacity-100
              "
            >
              Remove
            </button>



            {/* MOVE LEFT */}

            {index > 0 && (

              <button
                type="button"

                onClick={() =>
                  moveImage(
                    index,
                    index - 1
                  )
                }

                className="
                  absolute
                  bottom-2
                  right-10

                  rounded-full

                  bg-black/70

                  px-2
                  py-1

                  text-xs

                  text-white
                "
              >
                ←
              </button>

            )}



            {/* MOVE RIGHT */}

            {index <
              formData.images.length - 1 && (

              <button
                type="button"

                onClick={() =>
                  moveImage(
                    index,
                    index + 1
                  )
                }

                className="
                  absolute
                  bottom-2
                  right-2

                  rounded-full

                  bg-black/70

                  px-2
                  py-1

                  text-xs

                  text-white
                "
              >
                →
              </button>

            )}

          </div>

        )
      )}

    </div>

  )}

</div>















            </div>
          </div>


          {/* PRICING */}
          <div
            className="
              rounded-3xl

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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-surface
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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-surface
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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-surface
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

                    text-text-primary
                  "
                >
                  Low Stock Threshold
                </label>

                <input
                  type="number"
                  name="lowStockThreshold"
                  value={formData.lowStockThreshold}
                  onChange={handleChange}
                  min="0"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none

                    transition

                    focus:border-[#D8C7CD]
                    focus:bg-surface
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
                  inventory. Size options automatically appear for rings and
                  bracelets.
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

        bg-brand

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
              {formData.variants.map((variant, index) => (
                <div
                  key={index}
                  className="
            relative

            overflow-hidden

            rounded-[28px]

            border
            border-border

            bg-surface-secondary

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
                  text-text-primary
                "
                      >
                        #{index + 1}
                      </h3>
                    </div>

                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
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
                  text-text-primary
                "
                      >
                        Material
                      </label>

                      <select
                        value={variant.material}
                        onChange={(e) =>
                          handleVariantChange(index, "material", e.target.value)
                        }
                        className="
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-border

                  bg-surface

                  px-4

                  text-sm
                  text-text-primary

                  outline-none

                  transition

                  focus:border-[#6B1A2A]
                "
                      >
                        <option value="">Select Material</option>

                        <option value="18k">18K Gold</option>

                        <option value="22k">22K Gold</option>

                        <option value="silver">Silver</option>
                      </select>
                    </div>

                    {/* SIZE */}

                    {["rings", "bracelets"].includes(formData.subcategory) && (
                      <div>
                        <label
                          className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-text-primary
                  "
                        >
                          Size
                        </label>

                        <input
                          type="text"
                          placeholder="Enter Size"
                          value={variant.size}
                          onChange={(e) =>
                            handleVariantChange(index, "size", e.target.value)
                          }
                          className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-border

                    bg-surface

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
                  text-text-primary
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
    border-border

    bg-[#F5F5F5]

    px-4

    text-sm

    text-text-secondary
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
                  text-text-primary
                "
                      >
                        Variant Price
                      </label>

                      <input
                        type="number"
                        placeholder="Price"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(index, "price", e.target.value)
                        }
                        className="
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-border

                  bg-surface

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
                  text-text-primary
                "
                      >
                        Inventory Stock
                      </label>

                      <input
                        type="number"
                        placeholder="Stock Quantity"
                        value={variant.stock}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", e.target.value)
                        }
                        className="
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-border

                  bg-surface

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
              ))}
            </div>
          </div>
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
          {/* ORGANIZATION */}
          <div
            className="
              rounded-3xl

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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none
                  "
                >
                  <option value="gold">Gold</option>

                  <option value="diamond">Diamond</option>

                  <option value="silver">Silver</option>

                  <option value="gemstone">Gemstone</option>
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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none
                  "
                >
                  <option value="rings">Rings</option>

                  <option value="earrings">Earrings</option>

                  <option value="necklaces">Necklaces</option>

                  <option value="bracelets">Bracelets</option>
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

                    text-text-primary
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
                    border-border

                    bg-surface-secondary

                    px-4

                    text-sm

                    outline-none
                  "
                >
                  <option value="ACTIVE">Active</option>

                  <option value="DRAFT">Draft</option>

                  <option value="ARCHIVED">Archived</option>
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
