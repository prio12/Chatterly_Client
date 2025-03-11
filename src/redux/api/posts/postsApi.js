import baseApi from '../baseApi';

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //creating a post
    createAPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['posts'],
    }),

    //fetching all posts
    getAllPosts: builder.query({
      query: () => ({
        url: '/posts',
      }),
      providesTags: ['posts'],
    }),

    //fetching a specific post details
    getAPost: builder.query({
      query: (id) => {
        console.log('API Request for Post ID:', id); // Debugging line
        return { url: `/posts/${id}` };
      },
      providesTags: ['postDetails'],
    }),

    //updating a post
    updateAPost: builder.mutation({
      query: ({ id, content }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: { content },
      }),
      invalidatesTags: ['posts', 'postDetails'],
    }),

    //deleting a post
    deleteAPost: builder.mutation({
      query: ({ _id }) => ({
        url: `/posts/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const {
  useCreateAPostMutation,
  useGetAllPostsQuery,
  useUpdateAPostMutation,
  useDeleteAPostMutation,
  useGetAPostQuery,
} = postsApi;
