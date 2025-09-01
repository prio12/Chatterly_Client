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
  }),
});

export const { useSendMessageMutation } = messaging;
