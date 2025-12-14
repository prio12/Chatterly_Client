import {  ProfilePost,  } from "./posts";

//typing signUp data 
export interface SignUpFormData  {
  fname: string;
  lname: string;
  email: string;
  password: string;
};

//typing email password for signIn
export interface SignInFormData   {
  email: string;
  password: string;
};

//typing user initial state for userSlice
export interface UserState  {
  currentUser : string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null
}

//typing new userData
export interface NewUserData   {
  name: string;
  email: string;
  uid: string;
  isGoogleSignIn?:boolean
}

//typing user
export interface BaseUser {
    _id:string;
    name:string;
    email:string;
    uid:string;
    isGoogleSignIn?:boolean;
    profilePicture?:string;
    coverPhoto?:string;
    bio?: string;
    gender?:string;
    profession?:string;
    relationshipStatus?:string;
    birthDate?:string;
    location?:string;
    role?:"user" |"admin"
    createdAt:string;
    updatedAt:string;
}

//typing user with only postIds
export interface UserWithPostIds extends BaseUser {
    posts: string[];
    likedPosts:string[];
}

//typing user with the whole posts
export interface UserWithPosts extends BaseUser {
    posts: ProfilePost[];
    likedPosts:ProfilePost[];
}

//typing the author for user's posts
export interface LightUser {
    _id:string;
    uid:string;
    name:string;
    profilePicture?:string;
}