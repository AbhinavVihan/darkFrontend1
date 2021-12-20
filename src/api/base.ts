import axios, { AxiosRequestConfig } from "axios";
import { CANCEL } from "redux-saga";

export const BASE_URL = "https://dark-3.herokuapp.com";
// export const BASE_URL = "http://127.0.0.1:8000";

export const AUTH_TOKEN = "Login Token";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!token) {
    return config;
  }

  return { ...config, headers: { ...config.headers, Authorization: token } };
});

// axios.interceptors.response.use(undefined, (error) => {
//   if (error.message === "Request failed with status code 401") {
//     // console.log("err:", error.message);
//     alert(
//       "Your email or password is invalid, or your token is invalid or has expired. Please login again"
//     );
//     localStorage.removeItem(AUTH_TOKEN);
//     // eslint-disable-next-line no-restricted-globals
//     location.href = location.href;
//   }
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(undefined, (error) => {
//   // console.error("error is", error);
//   if (error.message) {
//     localStorage.removeItem(AUTH_TOKEN);
//     // window.location.href = "/login";
//   }
//   return Promise.reject(error);
// });

export const get = <T>(url: string, config: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();

  const response = axios.get<T>(url, { ...config, cancelToken: source.token });
  response[CANCEL] = source.cancel;
  return response;
};
