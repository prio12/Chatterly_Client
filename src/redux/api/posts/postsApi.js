import baseApi from '../baseApi';

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: '/posts',
      }),
    }),
  }),
});

export const { useCreateAPostMutation, useGetAllPostsQuery } = postsApi;
