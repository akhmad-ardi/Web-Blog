/* MODELS */
export interface IUserSchema {
  _id: string;
  username: string;
  email: string;
  bio: string;
  github: string;
  website: string;
  instagram: string;
  linkedin: string;
  password: string;
  isAdmin: boolean;
}

export interface IPostSchema {
  _id: string;
  user_id: string;
  image: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  author: string;
}

// Response JSON
export interface Response {
  code: number;
  status: string;
  message: string;
}

export interface ResponseJsonUser extends Response {
  isAuth?: boolean;
  data?: IUserSchema | IUserSchema[];
}

export interface ResponseJsonPost extends Response {
  data?: IPostSchema | IPostSchema[];
}
