import baseApi from '../baseApi';

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['posts'],
    }),

    getAllPosts: builder.query({
      query: () => ({
        url: '/posts',
      }),
      providesTags: ['posts'],
    }),

    updateAPost: builder.mutation({
      query: ({ id, content }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: { content },
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const {
  useCreateAPostMutation,
  useGetAllPostsQuery,
  useUpdateAPostMutation,
} = postsApi;
