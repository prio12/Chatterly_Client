import { UserWithPostIds } from './user';

//connection request payload
export interface ConnectionRequestPayload {
  requester: string;
  recipient: string;
  requesterUid: string;
  recipientUid: string;
}

//typing addConnectionRequest server response
export interface AddConnectionServerResponse {
  requester: string;
  recipient: string;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

//typing connectionRequestResponse
export interface fetchConnectionRequestsResponse extends Omit<
  AddConnectionServerResponse,
  'requester'
> {
  requester: UserWithPostIds;
}

//typing sentRequest response
export interface SentRequestResponse extends Omit<
  AddConnectionServerResponse,
  'recipient'
> {
  recipient: UserWithPostIds;
}

// typing connection
export interface Connection {
  connectionId: string;
  myConnection: UserWithPostIds;
}
