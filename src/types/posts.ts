import { LightUser, UserWithPostIds } from './user';

//post with payload
export interface CreatePostPayload {
  author: string;
  content?: string;
  img?: string;
  video?: string;
  thoughtMode?: boolean;
}

// typing comment
export interface Comment {
  _id: string;
  text: string;
  user: UserWithPostIds;
  createdAt: string;
}

// typing post
export interface Post {
  _id: string;
  // author: UserWithPostIds;
  comments: Comment[];
  content?: string;
  img?: string;
  video?: string;
  likes: UserWithPostIds[];
  thoughtMode?: boolean;
  createdAt: string;
  updatedAt: string;
}

//typing post for profile page's user's post
export interface ProfilePost extends Post {
  author: LightUser;
}

//typing post for Feed
export interface FeedPost extends Post {
  author: UserWithPostIds;
}
