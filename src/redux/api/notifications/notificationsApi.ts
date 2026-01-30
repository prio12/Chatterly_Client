import baseApi from '../baseApi';

const notifications = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // fetching a user-specific notifications
    getUserSpecificNotifications: builder.query<
      {
        success: boolean;
        response: Notification[];
      },
      { _id: string }
    >({
      query: ({ _id }) => {
        return {
          url: `/notifications/${_id}`,
          method: 'GET',
        };
      },
      providesTags: ['notifications'],
    }),

    //handle mark as seen
    handleMarkAsSeen: builder.mutation<
      { success: boolean; message: string },
      { _id: string }
    >({
      query: ({ _id }) => {
        return {
          url: `/notifications/${_id}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['notifications'],
    }),

    //handle mark as read
    handleMarkAsRead: builder.mutation<
      { success: boolean; response: Notification },
      { _id: string }
    >({
      query: ({ _id }) => {
        return {
          url: `/notifications/${_id}/mark-as-read`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['notifications'],
    }),

    //handle delete a notification
    handleDelete: builder.mutation<
      { success: boolean; message: string },
      { _id: string }
    >({
      query: ({ _id }) => ({
        url: `/notifications/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notifications'],
    }),
  }),
});

export const {
  useGetUserSpecificNotificationsQuery,
  useHandleMarkAsSeenMutation,
  useHandleDeleteMutation,
  useHandleMarkAsReadMutation,
} = notifications;
