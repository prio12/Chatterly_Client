import {
  Conversation,
  CreateMessagePayload,
  Message,
  NewMessageServerResponse,
} from '../../../types';
import baseApi from '../baseApi';

const messaging = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //send message
    sendMessage: builder.mutation<
      { success: boolean; newMessage: NewMessageServerResponse },
      CreateMessagePayload
    >({
      query: (data) => {
        return {
          url: '/conversations',
          method: 'POST',
          body: data,
        };
      },
    }),

    //get user specific conversation
    getUserConversation: builder.query<
      {
        success: boolean;
        conversations: Conversation[];
      },
      { id: string }
    >({
      query: ({ id }) => {
        return {
          url: `/conversations/${id}`,
        };
      },
    }),

    //get messages
    getMessages: builder.query<
      { success: boolean; messages: Message[] },
      { user1: string; user2: string }
    >({
      query: ({ user1, user2 }) => {
        return {
          url: `/conversations/messages/between?user1=${user1}&user2=${user2}`,
        };
      },
    }),

    //mark a conversation as read
    markConversationAsRead: builder.mutation<
      { success: boolean; updatedConversation: Conversation },
      { conversationId: string; userId: string }
    >({
      query: ({ conversationId, userId }) => {
        return {
          url: `/conversations/${conversationId}/read`,
          method: 'PATCH',
          body: { userId },
        };
      },
    }),

    //edit a message
    editMessage: builder.mutation<
      { success: boolean; response: Message },
      { message: Message; editedMessage: string }
    >({
      query: ({ message, editedMessage }) => {
        return {
          url: '/conversations/message/edit',
          method: 'PATCH',
          body: { message, editedMessage },
        };
      },
    }),

    //delete single message
    deleteSingleMessage: builder.mutation<
      { success: boolean; updatedMessage: Message },
      { messageId: string; userId: string; status: string }
    >({
      query: ({ messageId, userId, status }) => {
        return {
          url: `/conversations/message/delete/${messageId}`,
          method: 'PATCH',
          body: { userId, status },
        };
      },
    }),

    //delete all messages
    deleteAllMessages: builder.mutation<
      { success: boolean },
      { conversationId: string; userId: string; uid: string }
    >({
      query: ({ conversationId, userId, uid }) => {
        return {
          url: `/conversations/message/deleteAll/${conversationId}`,
          method: 'PATCH',
          body: { userId, uid },
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
  useEditMessageMutation,
  useDeleteSingleMessageMutation,
  useDeleteAllMessagesMutation,
} = messaging;
