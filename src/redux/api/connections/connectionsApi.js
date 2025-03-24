import baseApi from '../baseApi';

const connectionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //sending connection requests to the server
    addConnectionRequest: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/connections',
          method: 'POST',
          body: data,
        };
      },
    }),

    //fetching all connection requests of a specific user
  }),
});

export const { useAddConnectionRequestMutation } = connectionsApi;
