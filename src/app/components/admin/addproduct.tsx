"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAddProductMutation } from "../redux/query/productsQuery/productsQuery";
import { useTranslations } from "@/i18n/TranslationProvider";

interface ProductFormValues {
  name: string;
  nameAr?: string;
  price: number;
  categoryId: string;
  subCategoryId?: string;
  description?: string;
  foodType?: string;
  taxProductGroup?: string;
  kitchenDept?: string;
  stock?: number;
  preparationTime?: number;
  isActive?: number;
  itemType?: number;
  platformStatus?: number;
  syncToAggregator?: number;
  salePrice1?: number;
  salePrice2?: number;
  salePrice3?: number;
  salePrice4?: number;
  salePrice5?: number;
  image?: FileList;
}

export const AddProduct = () => {
  const { t } = useTranslations();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const [addProduct, { isLoading }] = useAddProductMutation();
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      if (data.nameAr) formData.append("nameAr", data.nameAr);

      formData.append("price", data.price.toString());
      formData.append("categoryId", data.categoryId);
      formData.append("description", data.description ?? "");

      if (data.subCategoryId)
        formData.append("subCategoryId", data.subCategoryId);

      if (data.foodType) formData.append("foodType", data.foodType);
      if (data.taxProductGroup)
        formData.append("taxProductGroup", data.taxProductGroup);

      if (data.kitchenDept) formData.append("kitchenDept", data.kitchenDept);

      if (data.stock !== undefined)
        formData.append("stock", data.stock.toString());

      if (data.preparationTime !== undefined)
        formData.append("preparationTime", data.preparationTime.toString());

      if (data.isActive !== undefined)
        formData.append("isActive", data.isActive.toString());

      if (data.itemType !== undefined)
        formData.append("itemType", data.itemType.toString());

      if (data.platformStatus !== undefined)
        formData.append("platformStatus", data.platformStatus.toString());

      if (data.syncToAggregator !== undefined)
        formData.append("syncToAggregator", data.syncToAggregator.toString());

      if (data.salePrice1 !== undefined)
        formData.append("salePrice1", data.salePrice1.toString());

      if (data.salePrice2 !== undefined)
        formData.append("salePrice2", data.salePrice2.toString());

      if (data.salePrice3 !== undefined)
        formData.append("salePrice3", data.salePrice3.toString());

      if (data.salePrice4 !== undefined)
        formData.append("salePrice4", data.salePrice4.toString());

      if (data.salePrice5 !== undefined)
        formData.append("salePrice5", data.salePrice5.toString());

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await addProduct({ formData }).unwrap();

      setMessage("✅ Product added successfully");
      reset();
    } catch (error: any) {
      setMessage(error?.data?.message ?? "❌ Failed to add product");
    }
  };

  return (
    <div className="min-h-[87vh] flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-[#d1a054]">
          {t("product.addProduct")}
        </h2>

        <input
          type="text"
          placeholder="Product Name (English)"
          className="w-full border px-3 py-2 rounded"
          {...register("name", { required: true })}
        />

        <input
          type="text"
          placeholder="Product Name (Arabic)"
          className="w-full border px-3 py-2 rounded"
          {...register("nameAr")}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
          {...register("price", { valueAsNumber: true })}
        />

        <input
          type="text"
          placeholder="Category ID"
          className="w-full border px-3 py-2 rounded"
          {...register("categoryId", { required: true })}
        />

        <input
          type="text"
          placeholder="Sub Category ID"
          className="w-full border px-3 py-2 rounded"
          {...register("subCategoryId")}
        />

        <textarea
          placeholder="Description"
          rows={3}
          className="w-full border px-3 py-2 rounded"
          {...register("description")}
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full border px-3 py-2 rounded"
          {...register("stock", { valueAsNumber: true })}
        />

        <input
          type="number"
          placeholder="Preparation Time"
          className="w-full border px-3 py-2 rounded"
          {...register("preparationTime", { valueAsNumber: true })}
        />

        <input
          type="file"
          accept="image/*"
          {...register("image")}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#d1a054] text-white py-2 rounded"
        >
          {isLoading ? "Saving..." : "Add Product"}
        </button>

        {message && (
          <p className="text-center text-sm mt-2">{message}</p>
        )}
      </form>
    </div>
  );
};