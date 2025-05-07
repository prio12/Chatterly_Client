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
        return {
          url: `/stories/${id}`,
        };
      },
      providesTags: ['stories'],
    }),

    //delete a user specific story
    deleteAStory: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/stories/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['stories'],
    }),
  }),
});

export const {
  useCreateAStoryMutation,
  useFetchStoriesQuery,
  useDeleteAStoryMutation,
} = stories;
