import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/profile/me',
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/profile/me',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            profileApi.util.updateQueryData(
              "getProfile",
              undefined,
              (draft) => {
                if (draft?.user && data?.user) {
                  Object.assign(draft.user, data.user);
                }
              }
            )
          );
        } catch {
        }
      },
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
