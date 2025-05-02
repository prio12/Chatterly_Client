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
      invalidatesTags: ['stories'],
    }),

    //get stories
    fetchStories: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/stories/${id}`,
        };
      },
      providesTags: ['stories'],
    }),
  }),
});

export const { useCreateAStoryMutation, useFetchStoriesQuery } = stories;
