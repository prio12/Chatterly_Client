import { ActiveStory, CreateStoryPayload, Story } from '../../../types';
import baseApi from '../baseApi';

const stories = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create a story
    createAStory: builder.mutation<
      { success: boolean; story: Story },
      CreateStoryPayload
    >({
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
    fetchStories: builder.query<
      { success: boolean; activeStories: ActiveStory[] },
      string
    >({
      query: (id) => {
        return {
          url: `/stories/${id}`,
        };
      },
      providesTags: ['stories'],
    }),

    //delete a user specific story
    deleteAStory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
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
