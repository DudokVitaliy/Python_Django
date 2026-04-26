import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../utils/createBaseQuery";

import type { ICreateCategory } from "../types/category/ICreateCategory";
import type { ICategoryItem } from "../types/category/ICategoryItem";

import { serialize } from "object-to-formdata";

export const categoryService = createApi({
    reducerPath: "categoryService",
    baseQuery: createBaseQuery("categories"),
    tagTypes: ["Categories"],

    endpoints: (builder) => ({

        createCategory: builder.mutation<void, ICreateCategory>({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: serialize(data),
            }),
            invalidatesTags: ["Categories"],
        }),

        getCategories: builder.query<ICategoryItem[], void>({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),

        getCategoryById: builder.query<ICategoryItem, number>({
            query: (id) => ({
                url: `/${id}/`,
                method: "GET",
            }),
        }),

        updateCategory: builder.mutation<void, { id: number; data: ICreateCategory }>({
            query: ({ id, data }) => ({
                url: `/${id}/`,
                method: "PUT",
                body: serialize(data),
            }),
            invalidatesTags: ["Categories"],
        }),

        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});
export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryService;