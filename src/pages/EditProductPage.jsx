import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import ProductForm from "../components/ProductForm";

import {
  getProductDetails,
} from "../services/productService";

export default function EditProductPage() {

  const { id } =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const data =
            await getProductDetails(id);

          setProduct(
            data.product
          );

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    fetchProduct();

  }, [id]);

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  return (

    <ProductForm

      mode="edit"

      initialData={product}

    />

  );

}
