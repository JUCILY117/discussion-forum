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
    addReply: builder.mutation({
      query: (body) => ({
        url: '/replies',
        method: 'POST',
        body,
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
} = threadViewApi;
