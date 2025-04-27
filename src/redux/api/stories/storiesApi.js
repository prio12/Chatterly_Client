import baseApi from '../baseApi';

const stories = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create a story
    createAStory: builder.mutation({
      query: (data) => {
        return {
          url: '/stories',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateAStoryMutation } = stories;
