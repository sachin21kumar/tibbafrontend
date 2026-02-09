"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAddProductMutation } from "../redux/query/productsQuery/productsQuery";

interface ProductFormValues {
  name: string;
  price: number;
  categoryId: string;
  description?: string;
  image?: FileList;
}

export const AddProduct = () => {
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
      formData.append("price", data.price.toString());
      formData.append("categoryId", data.categoryId);
      formData.append("description", data.description ?? "");

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
          Add Product
        </h2>

        <div>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border border-[#d1a054] !font-[system-ui] text-[#7a4a2e] focus:outline-none focus:ring-1 focus:ring-[#d1a054] rounded-lg px-3 py-2"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Price"
            className="w-full border rounded-lg px-3 py-2 !font-[system-ui] text-[#7a4a2e] focus:outline-none focus:ring-1 focus:ring-[#d1a054]"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be greater than 0" },
              valueAsNumber: true,
            })}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Category ID"
            className="w-full border rounded-lg px-3 py-2 !font-[system-ui] text-[#7a4a2e] focus:outline-none focus:ring-1 focus:ring-[#d1a054]"
            {...register("categoryId", {
              required: "Category ID is required",
            })}
          />
          {errors.categoryId && (
            <span className="text-red-500 text-sm">
              {errors.categoryId.message}
            </span>
          )}
        </div>

        <textarea
          placeholder="Description (optional)"
          rows={3}
          className="w-full border rounded-lg px-3 py-2 resize-none !font-[system-ui] text-[#7a4a2e] focus:outline-none focus:ring-1 focus:ring-[#d1a054]"
          {...register("description")}
        />

        <div>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Product Image is required",
            })}
            className="text-[#7a4a2e] cursor-pointer w-full"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#d1a054] text-white py-2 cursor-pointer rounded-lg disabled:opacity-70"
        >
          {isLoading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};
