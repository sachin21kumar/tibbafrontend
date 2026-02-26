import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  _id: string;
  title: string;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  imagePath?: string;
  categoryId?: string;
}

export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface AddProductPayload {
  formData: FormData;
}

const getLocale = () => {
  if (typeof window === "undefined") return "en";

  const path = window.location.pathname.split("/");
  const lang = path[1];

  if (lang === "ar" || lang === "en") return lang;
  return "en";
};

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

    prepareHeaders: (headers) => {
      const locale = getLocale();
      headers.set("x-locale", locale);
      return headers;
    },
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductResponse,
      {
        categoryId?: string;
        name?: string;
        page?: number;
        limit?: number;
        sortBy?: "price" | "name";
        order?: "asc" | "desc";
      }
    >({
      query: ({
        categoryId,
        name,
        page = 1,
        limit = 500,
        sortBy = "price",
        order = "asc",
      }) => {
        const params = new URLSearchParams();

        if (categoryId) params.append("categoryId", categoryId);
        if (name) params.append("name", name);

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return `product?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `product/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    addProduct: builder.mutation<Product, AddProductPayload>({
      query: ({ formData }) => ({
        url: "product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
