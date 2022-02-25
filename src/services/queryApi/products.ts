import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlBaseQuery } from "../baseQuery";
import {getCategories, getCurrency, getProductsCategoriesBySlug, getProductDetailsById} from "../queries";
import {PUBLIC_API} from "../../config";


export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: graphqlBaseQuery({ baseUrl: PUBLIC_API}),
    endpoints: (builder) => ({
        getCurrencyDos: builder.query<any, void>({
            query: () => ({
                document: getCurrency,
            }),
        }),
        getCategoriesDos: builder.query<any, void>({
            query: () => ({
                document: getCategories,
            }),
        }),
        getCategoriesBySlugDos: builder.query({
            query: (title) => ({
                document: getProductsCategoriesBySlug,
                variables:{
                    "input": {
                        "title": title
                    }
                }
            }),
        }),
        getGetProductsByIdDos: builder.query({
            query: (id) => ({
                document: getProductDetailsById,
                variables:{
                    "productId": id
                }
            }),
        }),
    }),
});

export const {
    useGetCurrencyDosQuery,
    useGetCategoriesDosQuery,
    useGetCategoriesBySlugDosQuery,
    useGetGetProductsByIdDosQuery
} = productsApi;