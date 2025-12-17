import { UserWithPostIds } from "./user";

// typing connection 
export interface Connection {
    connectionId:string;
    myConnection: UserWithPostIds
}