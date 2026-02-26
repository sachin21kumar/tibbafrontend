import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  _id: string;
  title: string;
  imageUrl?: string;
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

const getLocale = () => {
  if (typeof window === "undefined") return "en";

  const path = window.location.pathname.split("/");
  const lang = path[1];

  if (lang === "ar" || lang === "en") return lang;
  return "en";
};

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

    prepareHeaders: (headers) => {
      const locale = getLocale();
      headers.set("x-locale", locale);
      return headers;
    },
  }),

  tagTypes: ["Category"],

  endpoints: (builder) => ({
    getCategory: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "category",
      }),
      providesTags: ["Category"],
    }),

    updateCategory: builder.mutation<Category, UpdateCategoryPayload>({
      query: ({ id, title }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Category"],
    }),

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
  useAddCategoryMutation,
} = categoryApi;
