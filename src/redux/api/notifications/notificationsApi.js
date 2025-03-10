import baseApi from '../baseApi';

const notifications = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // fetching a user-specific notifications
    getUserSpecificNotifications: builder.query({
      query: ({ _id }) => {
        return {
          url: `/notifications/${_id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetUserSpecificNotificationsQuery } = notifications;
