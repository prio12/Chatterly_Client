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

    //get messages
    getMessages: builder.query({
      query: ({ user1, user2 }) => {
        return {
          url: `/conversations/messages/between?user1=${user1}&user2=${user2}`,
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

    //create an empty conversation
    createEmptyConversation: builder.mutation({
      query: (participants) => {
        console.log(participants, 'from messaging api');
        return {
          url: '/conversations/initiate/conversation',
          method: 'POST',
          body: { participants },
        };
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetUserConversationQuery,
  useGetMessagesQuery,
  useMarkConversationAsReadMutation,
  useCreateEmptyConversationMutation,
} = messaging;
