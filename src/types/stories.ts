import { UserWithPostIds } from './user';

export interface CreateStoryPayload {
  author: string;
  mediaUrl: string;
}

export interface Story extends CreateStoryPayload {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActiveStory {
  _id: string;
  author: UserWithPostIds;
  stories: Story[];
  createdAt: string;
  updatedAt: string;
}
