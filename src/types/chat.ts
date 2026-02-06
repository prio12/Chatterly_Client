import { Connection } from './connection';
import { UserWithPostIds, UserWithPosts } from './user';

//typing chat state
export interface ChatState {
  myConnections: Connection[];
  activeConnections: Connection[];
  userProfile: UserWithPosts | null;
}

//typing a message sender
export interface Sender {
  _id: string;
  name: string;
  uid: string;
  profilePicture: string;
}

//typing the SeenByUser
export type SeenByUser = Omit<Sender, 'name'>;

//typing a message
export interface Message {
  _id: string;
  conversation: string;
  sender: Sender;
  text?: string;
  image?: string;
  status?: string;
  seenBy: SeenByUser[];
  deletedBy: string[];
  isDeletedForEveryone: boolean;
  createdAt: string;
  updatedAt: string;
}

//typing the response when sending a new message
export interface NewMessageServerResponse extends Omit<Message, 'sender'> {
  sender: string;
}

//typing create Message payload
export interface CreateMessagePayload {
  participants: string[];
  sender: string;
  senderUid: string;
  receiverUid: string;
  text?: string;
  image?: string;
}

export interface LastMessage extends Omit<Message, 'sender'> {
  sender: UserWithPostIds;
}

export interface Conversation {
  _id: string;
  participants: UserWithPostIds[];
  lastMessage: LastMessage;
  unreadCounts: { [userId: string]: number }; //it's a map
  deletedBy: string[];
  createdAt: string;
  updatedAt: string;
}
