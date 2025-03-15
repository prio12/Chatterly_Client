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

    //update likes unLikes
    handleLikeUnlike: builder.mutation({
      query: ({ postId, data }) => {
        return {
          url: `/posts/likes/${postId}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['profile', 'posts'],
    }),

    //adding a comment to the specific post
    handleAddComment: builder.mutation({
      query: ({ id, comment }) => {
        return {
          url: `/posts/comments/${id}`,
          method: 'PATCH',
          body: comment,
        };
      },
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
  useHandleLikeUnlikeMutation,
  useHandleAddCommentMutation,
} = postsApi;
