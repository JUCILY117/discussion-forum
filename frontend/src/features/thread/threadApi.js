import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const threadApi = createApi({
  reducerPath: 'threadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getThreads: builder.query({
      query: ({ category, tags, sort, limit=10, page=1, search }) => {
        let queryStr = `?limit=${limit}&page=${page}`;
        if(category) queryStr += `&category=${encodeURIComponent(category)}`;
        if(tags && tags.length) queryStr += `&tags=${encodeURIComponent(tags.join(','))}`;
        if(sort) queryStr += `&sort=${encodeURIComponent(sort)}`;
        if(search) queryStr += `&search=${encodeURIComponent(search)}`;
        return `/threads${queryStr}`;
      }
    }),
    getThreadById: builder.query({ query: (id) => `/threads/${id}`}),
  }),
});

export const { useGetThreadsQuery, useGetThreadByIdQuery } = threadApi;
