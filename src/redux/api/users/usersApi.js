import baseApi from '../baseApi';

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewUser: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),

    // Update user profile (profile pic, cover photo, bio, etc.)
    updateUserProfile: builder.mutation({
      query: ({ userUid, updates }) => ({
        url: `/users/${userUid}`,
        method: 'PATCH',
        body: updates,
      }),
    }),
  }),
});

export const { useAddNewUserMutation, useUpdateUserProfileMutation } = usersApi;
