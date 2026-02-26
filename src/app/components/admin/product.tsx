"use client";

import Link from "next/link";
import Swal from "sweetalert2";
import { useDeleteProductMutation, useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";
import { useTranslations } from "@/i18n/TranslationProvider";

export default function ProductList() {
  const { locale, t } = useTranslations();
  const { data, isLoading } = useGetProductsQuery({});
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteProductMutation();

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProduct(id).unwrap();

      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete product.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t("product.products")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.data?.map((product) => (
          <div
            key={product._id}
            className="border border-[#d1a054] rounded-lg shadow p-4 hover:shadow-md transition"
          >
            {product.imagePath && (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`}
                className="h-40 w-full object-cover rounded"
                alt={product.name}
              />
            )}

            <h2 className="mt-3 font-semibold text-[#7a4a2e]">{product.name}</h2>
            <span className="text-[#d1a054]">د.إ  {product.price}</span>

            <div className="mt-4 flex gap-3">
              <Link
                href={`/${locale}/admin/products/${product._id}`}
                className="px-4 py-2 text-sm bg-[#d1a054] text-white rounded hover:bg-[#c18f47]"
              >
                {t("product.edit")}
              </Link>

              <button
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                {t("product.delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
