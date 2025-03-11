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
      providesTags: ['markAsSeen'],
    }),

    //handle mark as seen
    handleMarkAsSeen: builder.mutation({
      query: ({ _id }) => {
        return {
          url: `/notifications/${_id}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['markAsSeen'],
    }),

    //handle delete a notification
    handleDelete: builder.mutation({
      query: ({ _id }) => ({
        url: `/notifications/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['markAsSeen'],
    }),
  }),
});

export const {
  useGetUserSpecificNotificationsQuery,
  useHandleMarkAsSeenMutation,
  useHandleDeleteMutation,
} = notifications;
