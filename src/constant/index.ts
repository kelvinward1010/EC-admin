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
export const URL_DELETEUSER = `${URL_USER}/delete`;

//Product
export const URL_PRODUCT = "product";
export const URL_GETPRODUCTS = `${URL_PRODUCT}/search`;
export const URL_CREATEPRODUCT = `${URL_USER}/create`;
export const URL_GETPRODUCT = `${URL_USER}/detail`;
export const URL_UPDATEPRODUCT = `${URL_USER}/update`;
export const URL_DELETEPRODUCT = `${URL_USER}/delete`;
