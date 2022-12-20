import {
  ResponseJsonUser, ResponseJsonPost, IUserSchema, IPostSchema,
} from "./Types";

function ResJsonUser(
  code: number,
  status: string,
  message: string,
  isAuth?: boolean,
  data?: IUserSchema | IUserSchema[],
): ResponseJsonUser {
  return {
    code, status, message, isAuth, data,
  };
}

function ResJsonPost(
  code: number,
  status: string,
  message: string,
  data?: IPostSchema | IPostSchema[],
): ResponseJsonPost {
  return {
    code, status, message, data,
  };
}

export { ResJsonUser, ResJsonPost };
