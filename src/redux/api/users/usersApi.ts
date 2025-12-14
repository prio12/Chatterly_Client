import { NewUserData, UserWithPostIds, UserWithPosts } from '../../../types';
import baseApi from '../baseApi';


const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewUser: builder.mutation<{result: UserWithPostIds},NewUserData>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),

    //getAll Users
    getAllUsers: builder.query<{success:boolean,response:UserWithPostIds[]},void>({
      query: () => ({
        url: '/users',
      }),
    }),

    //fetch user specific info by uid
    userInfoByUid: builder.query<{user:UserWithPosts},string | null>({
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
