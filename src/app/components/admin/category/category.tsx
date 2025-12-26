"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/query/categoryQuery/categoryQuery";

export default function AdminCategory() {
  const { data: category, isLoading } = useGetCategoryQuery();

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  if (isLoading) {
    return <p className="text-center mt-10">Loading categories...</p>;
  }

  const handleEdit = (id: string, currentTitle: string) => {
    setEditId(id);
    setTitle(currentTitle);
  };

  const handleUpdate = async (id: string) => {
    if (!title.trim()) {
      Swal.fire("Validation Error", "Title cannot be empty", "warning");
      return;
    }

    try {
      await updateCategory({ id, title }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Category updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setEditId(null);
      setTitle("");
    } catch (error) {
      Swal.fire("Error", "Failed to update category", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCategory(id).unwrap();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Category has been deleted",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to delete category", "error");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Category Name</th>
              <th className="p-3 border">Category ID</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {category?.data?.length ? (
              category.data.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>

                  <td className="p-3 border">
                    {editId === item._id ? (
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      item.title
                    )}
                  </td>

                  <td className="p-3 border text-sm text-gray-600">
                    {item._id}
                  </td>

                  <td className="p-3 border text-center space-x-2">
                    {editId === item._id ? (
                      <>
                        <button
                          disabled={isUpdating}
                          onClick={() => handleUpdate(item._id)}
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-60"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="px-3 py-1 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handleEdit(item._id, item.title)
                          }
                          className="px-3 py-1 text-sm bg-[#da3743] text-white rounded hover:bg-[#da3743] cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-60 cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
