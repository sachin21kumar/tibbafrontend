import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  _id: string;
  title: string;
}

export interface CategoryResponse {
  data: Category[];
  page: number;
  limit: number;
}

export interface UpdateCategoryPayload {
  id: string;
  title: string;
}
export interface AddCategoryPayload {
  title: string;
}
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // GET
    getCategory: builder.query<CategoryResponse, void>({
      query: () => "category",
      providesTags: ["Category"],
    }),

    // UPDATE
    updateCategory: builder.mutation<Category, UpdateCategoryPayload>({
      query: ({ id, title }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Category"],
    }),

    // DELETE
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    addCategory: builder.mutation<Category, AddCategoryPayload>({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryMutation
} = categoryApi;
