import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlBaseQuery } from "./baseQuery";
import {getProductsCategoriesBySlug, getToDosDocument} from "./queries";
import {gql} from "graphql-request";




export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: graphqlBaseQuery({ baseUrl: "http://localhost:4000" }),
    endpoints: (builder) => ({
        getProductsDos: builder.query<any, void>({
            query: () => ({
                document: getToDosDocument,
            }),
        }),
        getCategoriesDos: builder.query({
            query: ({title}) => ({
                document: getProductsCategoriesBySlug,
                variables: {
                    title,
                },
            }),
        }),
    }),
});

export const {
    useGetProductsDosQuery,
    useGetCategoriesDosQuery
} = productsApi;