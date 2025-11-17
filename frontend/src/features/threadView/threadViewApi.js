import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const threadViewApi = createApi({
  reducerPath: 'threadViewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getThread: builder.query({
      query: (id) => `/threads/${id}`,
    }),
    getReplies: builder.query({
      query: (threadId) => `/replies/thread/${threadId}`,
    }),
    deleteThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}`,
        method: 'DELETE',
      }),
    }),
    addReply: builder.mutation({
      query: (body) => ({
        url: '/replies',
        method: 'POST',
        body,
      }),
    }),
    deleteReply: builder.mutation({
      query: (id) => ({
        url: `/replies/${id}`,
        method: 'DELETE',
      }),
    }),
    vote: builder.mutation({
      query: (body) => ({
        url: '/vote',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetThreadQuery,
  useGetRepliesQuery,
  useAddReplyMutation,
  useVoteMutation,
  useDeleteThreadMutation,
  useDeleteReplyMutation,
} = threadViewApi;
