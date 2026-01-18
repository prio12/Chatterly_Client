import { Connection } from "./connection";
import { UserWithPosts } from "./user";

//typing chat state
export interface ChatState {
    myConnections: Connection[],
    activeConnections:Connection[],
    userProfile: UserWithPosts | null
}