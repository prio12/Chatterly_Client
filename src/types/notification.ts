import { NotificationPostComment, Post } from './posts';
import { UserWithPostIds } from './user';

//using interface to type the post that notification includes
export interface NotificationPost extends Omit<Post, 'likes' | 'comments'> {
  author: string;
  likes: string[];
  comments: NotificationPostComment[];
}

//using interface to type Notification
export interface Notification {
  _id: string;
  type: string;
  recipient: string;
  sender: UserWithPostIds;
  post: NotificationPost;
  read: boolean;
  seen: boolean;
  createdAt: string;
  updatedAt?: string;
}
