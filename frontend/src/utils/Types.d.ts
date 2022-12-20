/* eslint-disable @typescript-eslint/no-explicit-any */
export type Post = {
  _id: string;
  user_id: string;
  title: string;
  image: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  author: string;
  usernameAuthor: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  user_id: string;
  username: string;
  email: string;
  bio: string;
  website: string;
  github: string;
  linkedin: string;
  instagram: string;
  isAdmin: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
};

/* State Posts */
export type StatePosts = {
  posts: Post[];
  post: Post | null;
  msgError: any;
  msgSuccess: string | null;
};

/* State Add Post */
export type AddPost = {
  title: string;
  image: string;
  slug: string;
  category: string;
  body: string;
  author: string;
};

/* State Auth */
export type StateAuth = {
  msgSuccess: string;
  isLoading: boolean;
  msgError: any;
};

export type VerifyAuth = {
  isAuth: boolean,
  isLoading: boolean,
};

export type StateAuthStore = {
  StateSignIn: Auth;
  StateSignUp: Auth;
  StateAuth: VerifyAuth;
};

/* State User */
export type StateUser = {
  data: User | null;
  userPosts: Post[];
  userPost: Post | null;
  msgError: any;
  msgSuccess: any;
};

export type DataUserUpdate = {
  username: string;
  email: string;
  bio: string;
  instagram: string;
  linkedin: string;
  website: string;
  github: string;
};

export type DataNewPassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

/* Input SignIn */
export type InputSignIn = {
  email: string;
  password: string;
};

/* Input SignUp */
export type InputSignUp = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

/*
  Static Data
*/
export type StaticData = {
  categories: string[];
};
