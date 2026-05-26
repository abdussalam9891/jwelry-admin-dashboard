import {  useState } from "react";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import api from "../api/client";



const createEmptyVariant = () => ({

  material: "",

  size: "",

  sku: "",

  price: "",

  stock: "",
});



const generateSku = (
  category,
  material,
  size
) => {

  return [

    category,
    material,
    size,
  ]

    .filter(Boolean)

    .join("-")

    .toUpperCase()

    .replace(/\s+/g, "-")

    .replace(/[^A-Z0-9-]/g, "");

};



export default function useProductForm({
  initialData = null,
  mode = "create",
}) {

  const navigate = useNavigate();



const [formData, setFormData] =
  useState(() => ({

    name:
      initialData?.name || "",

    slug:
      initialData?.slug || "",

    category:
      initialData?.category || "rings",

    subcategory:
      initialData?.subcategory || ["casual"],

    targetAudience:
      initialData?.targetAudience || "women",

    price:
      initialData?.price || "",

    originalPrice:
      initialData?.originalPrice || "",

    stock:
      initialData?.stock || "",

    status:
      initialData?.status || "ACTIVE",

    lowStockThreshold:
      initialData?.lowStockThreshold || 5,



    // DESCRIPTION

    shortDescription:
      initialData?.description?.short || "",

    designDescription:
      initialData?.description?.design || "",

    stylingDescription:
      initialData?.description?.styling || "",

    details:
      initialData?.description?.details || [""],



    // MEDIA

    images:
      initialData?.images || [],



    // VARIANTS

    variants:

      initialData?.variants?.length > 0

        ? initialData.variants

        : [createEmptyVariant()],

  }));






 const handleChange = (e) => {

  let { name, value } =
    e.target;



  const numericFields = [

    "price",

    "originalPrice",

    "stock",

    "lowStockThreshold",

  ];



  // NUMERIC SANITIZATION

  if (
    numericFields.includes(name)
  ) {

    // ALLOW ONLY DIGITS

    value = value.replace(
      /[^0-9]/g,
      ""
    );

  }



  setFormData((prev) => ({

    ...prev,

    [name]:

      name === "subcategory"

        ? [value]

        : value,



    // AUTO SLUG

    ...(name === "name" && {

      slug: value

        .toLowerCase()

        .trim()

        .replace(/\s+/g, "-")

        .replace(/[^\w-]+/g, ""),

    }),

  }));

};




 const handleVariantChange = (
  index,
  field,
  value
) => {

  // NUMERIC FIELDS

  if (
    [
      "price",
      "stock",
      "originalPrice",
    ].includes(field)
  ) {

    // ALLOW ONLY DIGITS

    value = value.replace(
      /[^0-9]/g,
      ""
    );

  }



  const updatedVariants = [
    ...formData.variants,
  ];



  updatedVariants[index][field] =
    value;



  const material =
    updatedVariants[index]
      .material || "";



  const size =
    updatedVariants[index]
      .size || "";



  updatedVariants[index].sku =

    generateSku(
      formData.category,
      material,
      size
    );



  setFormData((prev) => ({

    ...prev,

    variants: updatedVariants,

  }));

};




  const removeVariant = (
    index
  ) => {

    const filtered =
      formData.variants.filter(
        (_, i) => i !== index
      );



    setFormData((prev) => ({

      ...prev,

      variants: filtered,

    }));

  };




  const handleImageUpload =
    async (e) => {

      const files =

        Array.from(
          e.target.files
        );



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




  const removeImage = (
    imageToRemove
  ) => {

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




  const moveImage = (
    from,
    to
  ) => {

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




  const handleSubmit =
    async (e) => {

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



      if (
        lowStockThreshold < 0
      ) {

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



      const invalidVariant =

        formData.variants.some(
          (variant) => {

            return (

              !variant.material ||

              Number(
                variant.price
              ) < 0 ||

              Number(
                variant.stock
              ) < 0 ||

              !variant.sku
            );

          }
        );



      if (invalidVariant) {

        return toast.error(
          "Please complete all variant fields"
        );

      }



      try {

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

          targetAudience:
            formData.targetAudience,

          status:
            formData.status,

          images:
            formData.images,

          variants:
            formData.variants,

          description: {

  short:
    formData.shortDescription,

  design:
    formData.designDescription,

  details:

    formData.details.filter(
      (detail) =>
        detail.trim() !== ""
    ),

  styling:
    formData.stylingDescription,
},
        };



        if (mode === "edit") {

          await api.patch(

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




  return {

    formData,

    setFormData,

    handleChange,

    handleSubmit,

    handleVariantChange,

    removeVariant,

    handleImageUpload,

    removeImage,

    moveImage,

  };

}
