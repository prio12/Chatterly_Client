import {
  AddConnectionServerResponse,
  Connection,
  ConnectionRequestPayload,
  fetchConnectionRequestsResponse,
  SentRequestResponse,
  UserWithPostIds,
  UserWithPosts,
} from '../../../types';
import baseApi from '../baseApi';

const connectionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //sending connection requests to the server
    addConnectionRequest: builder.mutation<
      { success: boolean; response: AddConnectionServerResponse },
      { data: ConnectionRequestPayload }
    >({
      query: ({ data }) => {
        return {
          url: '/connections',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['connections'],
    }),

    //fetching all connection requests of a specific user
    fetchConnectionRequests: builder.query<
      { success: boolean; response: fetchConnectionRequestsResponse[] },
      string
    >({
      query: (id) => {
        return {
          url: `/connections/${id}`,
        };
      },
      providesTags: ['connections'],
    }),

    //fetching connection Suggestions
    fetchConnectionSuggestions: builder.query<
      { success: boolean; suggestedConnections: UserWithPostIds[] },
      string
    >({
      query: (id) => {
        return {
          url: `/connections/suggestions/${id}`,
        };
      },
      providesTags: ['connections'],
    }),

    //accept connection request
    acceptConnectionRequest: builder.mutation<
      { success: boolean; response: AddConnectionServerResponse },
      {
        id: string;
        data: {
          notificationSender: UserWithPosts;
          notificationRecipient: UserWithPostIds;
        };
      }
    >({
      query: ({ id, data }) => {
        return {
          url: `/connections/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['connections'],
    }),

    //ignore/decline a connection request
    ignoreAConnectionRequest: builder.mutation<
      { success: boolean; response: AddConnectionServerResponse },
      string
    >({
      query: (id) => {
        return {
          url: `/connections/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['connections'],
    }),

    //get myConnections (A user's all friends/connections)
    getMyConnections: builder.query<
      { success: boolean; myConnections: Connection[] },
      string
    >({
      query: (id) => {
        return {
          url: `/connections/myConnections/${id}`,
        };
      },
      providesTags: ['connections'],
    }),

    //get all sent Requests of a individual user
    getSentRequests: builder.query<
      { success: boolean; response: SentRequestResponse[] },
      string
    >({
      query: (id) => {
        return {
          url: `/connections/sentRequests/${id}`,
        };
      },
      providesTags: ['connections'],
    }),

    //get connection status between two users for the profile section to show disconnect,connect,cancel,accept
    getConnectionStatus: builder.query<
      {
        connection: boolean;
        connectionId: string;
        status: string;
        action: string;
      },
      { userId: string; targetId: string }
    >({
      query: ({ userId, targetId }) => {
        return {
          url: `/connections/status/${userId}/${targetId}`,
        };
      },
      providesTags: ['connections'],
    }),
  }),
});

export const {
  useAddConnectionRequestMutation,
  useFetchConnectionRequestsQuery,
  useFetchConnectionSuggestionsQuery,
  useAcceptConnectionRequestMutation,
  useIgnoreAConnectionRequestMutation,
  useGetMyConnectionsQuery,
  useGetSentRequestsQuery,
  useGetConnectionStatusQuery,
} = connectionsApi;
