import baseApi from '../baseApi';

const connectionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addConnectionRequest: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/connections',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useAddConnectionRequestMutation } = connectionsApi;
