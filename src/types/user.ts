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