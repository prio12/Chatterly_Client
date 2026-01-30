import { CreatePostPayload, FeedPost, UserWithPostIds } from '../../../types';
import baseApi from '../baseApi';

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //creating a post
    createAPost: builder.mutation<
      { success: boolean; result: FeedPost },
      CreatePostPayload
    >({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['posts'],
    }),

    //fetching all posts
    getAllPosts: builder.query<
      { result: FeedPost[]; hasMore: boolean },
      { page: number; limit: number }
    >({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/posts?page=${page}&limit=${limit}`,
      }),
      providesTags: ['posts'],
    }),

    //fetching a specific post details
    getAPost: builder.query<{ success: boolean; response: FeedPost }, string>({
      query: (id) => {
        return { url: `/posts/${id}` };
      },
      providesTags: ['postDetails'],
    }),

    //updating a post
    updateAPost: builder.mutation<
      { success: boolean; response: FeedPost },
      { id: string; content: string }
    >({
      query: ({ id, content }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: { content },
      }),
      invalidatesTags: ['posts', 'postDetails'],
    }),

    //update likes unLikes
    handleLikeUnlike: builder.mutation<
      {
        success: boolean;
        liked: boolean;
        likes: UserWithPostIds[];
        post: FeedPost;
      },
      {
        postId: string;
        data: {
          userId: string | undefined;
          postId: string;
          authorUid: string;
          action: 'like' | 'unLike';
        };
      }
    >({
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
    handleAddComment: builder.mutation<
      { success: boolean; updatedPost: FeedPost },
      {
        id: string;
        comment: {
          user: string;
          authorId: string;
          authorUid: string;
          text: string;
        };
      }
    >({
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
    deleteAPost: builder.mutation<{ success: boolean }, { _id: string }>({
      query: ({ _id }) => ({
        url: `/posts/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),

    //update a user's comment to a specific post
    updateComment: builder.mutation<
      { success: boolean; response: FeedPost },
      { id: string; text: { comment_id: string; text: string } }
    >({
      query: ({ id, text }) => {
        return {
          url: `/posts/comments/update/${id}`,
          method: 'PATCH',
          body: text,
        };
      },
      invalidatesTags: ['posts', 'postDetails'],
    }),

    //delete a comment of a user to a specific post
    deleteAComment: builder.mutation<
      { success: boolean },
      { postId: string; commentId: string }
    >({
      query: ({ postId, commentId }) => {
        return {
          url: `/posts/comments/delete/${postId}/${commentId}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['posts', 'postDetails'],
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
  useUpdateCommentMutation,
  useDeleteACommentMutation,
} = postsApi;
