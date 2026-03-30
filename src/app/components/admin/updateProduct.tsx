"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/query/productsQuery/productsQuery";
import { useTranslations } from "@/i18n/TranslationProvider";

export default function UpdateProduct() {
  const { locale } = useTranslations();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (data) {
      setValue("nameEn", data?.translations?.en?.name || "");
      setValue("nameAr", data?.translations?.ar?.name || "");
      setValue("price", data.price);
      setValue("stock", data.stock);
      setValue("isActive", data.isActive === 1);
    }
  }, [data, setValue]);

  const onSubmit = async (formDataValues: any) => {
    const formData = new FormData();

    formData.append("nameEn", formDataValues.nameEn);
    formData.append("nameAr", formDataValues.nameAr);
    formData.append("price", String(formDataValues.price));
    formData.append("stock", String(formDataValues.stock));
    formData.append("isActive", formDataValues.isActive ? "1" : "0");

    if (formDataValues.image?.[0]) {
      formData.append("image", formDataValues.image[0]);
    }

    try {
      await updateProduct({ id, formData }).unwrap();

      await Swal.fire({
        title: "Updated!",
        text: "Product updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push(`/${locale}/admin/products`);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update product",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name (English)
          </label>
          <input
            className="w-full border px-3 py-2 rounded"
            {...register("nameEn", { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name (Arabic)
          </label>
          <input
            dir="rtl"
            className="w-full border px-3 py-2 rounded"
            {...register("nameAr", { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            {...register("price", { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            {...register("stock", { required: true })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isActive")} />
          <label>Active (Uncheck to Block Item)</label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Update Image (optional)
          </label>
          <input type="file" accept="image/*" {...register("image")} />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-[#d1a054] text-white py-2 rounded disabled:opacity-60"
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
