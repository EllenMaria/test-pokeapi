import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (limit) => `pokemon?limit=${limit}`,
    }),

    getById: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetAllQuery, useGetByIdQuery } = apiSlice;
