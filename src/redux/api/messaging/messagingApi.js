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
        console.log(id, 'from messaging api');
        return {
          url: `/conversations/${id}`,
        };
      },
    }),
  }),
});

export const { useSendMessageMutation, useGetUserConversationQuery } =
  messaging;
