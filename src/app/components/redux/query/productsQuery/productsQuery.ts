import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Category type
export interface Category {
  _id: string;
  title: string;
}

// Product type
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  imagePath?: string;
  categoryId?: string;
}

// API Response type
export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

// Add Product Payload
export interface AddProductPayload {
  formData: FormData;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // GET PRODUCTS
    getProducts: builder.query<
      ProductResponse,
      {
        categoryId?: string;
        name?: string; // <-- added filter by name
        page?: number;
        limit?: number;
        sortBy?: "price" | "name";
        order?: "asc" | "desc";
      }
    >({
      query: ({
        categoryId,
        name, // <-- added
        page = 1,
        limit = 9,
        sortBy = "price",
        order = "asc",
      }) => {
        const params = new URLSearchParams();
        if (categoryId) params.append("categoryId", categoryId);
        if (name) params.append("name", name); // <-- append name filter
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        params.append("sortBy", sortBy);
        params.append("order", order);
        return `product?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),

    // GET PRODUCT BY ID
    getProductById: builder.query<Product, string>({
      query: (id) => `product/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // ADD PRODUCT
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
