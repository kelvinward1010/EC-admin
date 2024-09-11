export const BASE_URL = "https://be-nodejs-mvc.onrender.com/api/";

//Auth
export const URL_API_AUTH = "auth";
export const URL_API_LOGIN = `${URL_API_AUTH}/sign-in`;
export const URL_API_LOGOUT = `${URL_API_AUTH}/logout`;
export const URL_API_REFRESHTOKEN = `${URL_API_AUTH}/refresh-token`;

//User
export const URL_USER = "user";
export const URL_GETUSERS = `${URL_USER}/search`;
export const URL_CREATEUSER = `${URL_USER}/create`;
export const URL_GETUSER = `${URL_USER}/detail`;
export const URL_UPDATEUSER = `${URL_USER}`;
