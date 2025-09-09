import baseApi from '../baseApi';

const messaging = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //send message
    sendMessage: builder.mutation({
      query: (data) => {
        return {
          url: '/conversations',
          method: 'POST',
          body: data,
        };
      },
    }),

    //get user specific conversation
    getUserConversation: builder.query({
      query: ({ id }) => {
        return {
          url: `/conversations/${id}`,
        };
      },
    }),

    //mark a conversation as read
    markConversationAsRead: builder.mutation({
      query: ({ conversationId, userId }) => {
        return {
          url: `/conversations/${conversationId}/read`,
          method: 'PATCH',
          body: { userId },
        };
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetUserConversationQuery,
  useMarkConversationAsReadMutation,
} = messaging;
