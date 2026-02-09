"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/query/productsQuery/productsQuery";

export default function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setPrice(data.price);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price));

    if (image) {
      formData.append("image", image);
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

      router.push("/admin/products");
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
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Update Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
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
