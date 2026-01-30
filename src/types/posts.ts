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
export interface BaseComment {
  _id: string;
  text: string;
  createdAt: string;
}

export interface FeedPostComment extends BaseComment {
  user: UserWithPostIds;
}

export interface NotificationPostComment extends BaseComment {
  user: string;
}

// typing post
export interface Post {
  _id: string;
  // author: UserWithPostIds;
  comments: FeedPostComment[];
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
