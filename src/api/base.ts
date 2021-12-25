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

export const get = <T>(url: string, config: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();

  const response = axios.get<T>(url, { ...config, cancelToken: source.token });
  response[CANCEL] = source.cancel;
  return response;
};
