import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category"],

  endpoints: (builder) => ({

    // GET
    getCategories: builder.query({
      query: () => "categories/",
      providesTags: ["Category"],
    }),

    // CREATE
    createCategory: builder.mutation({
      query: (data) => ({
        url: "categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // UPDATE
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // DELETE
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = api;