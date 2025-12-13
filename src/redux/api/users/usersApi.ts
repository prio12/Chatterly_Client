import baseApi from '../baseApi';

type NewUserData  = {
  name: string;
  email: string;
  uid: string;
  isGoogleSignIn:boolean
}

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewUser: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),

    //getAll Users
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
      }),
    }),

    //fetch user specific info by uid
    userInfoByUid: builder.query({
      query: (userUid) => ({
        url: `/users/${userUid}`,
      }),
      providesTags: ['profile', 'posts'],
    }),

    // Update user profile (profile pic, cover photo, bio, etc.)
    updateUserProfile: builder.mutation({
      query: ({ userUid, updates }) => ({
        url: `/users/${userUid}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['profile'],
    }),

    //generate jwt token to secure url , sending user data to the server after successful signed up or login
    generateJwt: builder.mutation({
      query: (data) => {
        return {
          url: '/jwt',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useUpdateUserProfileMutation,
  useUserInfoByUidQuery,
  usePrefetch,
  useGetAllUsersQuery,
  useGenerateJwtMutation,
} = usersApi;
