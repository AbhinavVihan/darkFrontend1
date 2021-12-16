import { Customer } from "../models/Customer";
import { LoginRequest } from "../api/interfaces/authInterfaces";
import {
  CUSTOMER_UPDATEME_BEGIN,
  CUSTOMER_UPDATEME_COMPLETED,
  CUSTOMER_UPDATEME_ERROR,
  FORGOT_PASSWORD_BEGIN,
  GET_CUSTOMER_BEGIN,
  GET_CUSTOMER_COMPLETE,
  LOGGEDIN_PASSWORD_CHANGE_BEGIN,
  LOGGEDIN_PASSWORD_CHANGE_COMPLETED,
  LOGIN_BEGIN,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  LOGOUT_BEGIN,
  LOGOUT_COMPLETE,
  ME_FETCH,
  ME_FETCH_COMPLETE,
  ME_LOGIN,
  ME_LOGIN_COMPLETE,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_COMPLETE,
  RESET_PASSWORD_COMPLETED,
  RESET_PASSWORD_ERROR,
  RETAILOR_LOGIN_BEGIN,
  RETAILOR_LOGIN_COMPLETE,
  RETAILOR_LOGIN_ERROR,
  RETAILOR_SIGNUP_BEGIN,
  RETAILOR_SIGNUP_COMPLETE,
  RETAILOR_SIGNUP_ERROR,
  SIGNUP_BEGIN,
  SIGNUP_COMPLETE,
  SIGNUP_ERROR,
  UPDATE_MY_CREDENTIALS_BEGIN,
  UPDATE_MY_CREDENTIALS_COMPLETED,
  UPDATE_MY_CREDENTIALS_ERROR,
} from "./action.constants";

export const loginActionBegin = (data: LoginRequest) => ({
  type: LOGIN_BEGIN,
  payload: data,
});

export const RetailorLoginActionBegin = (data: LoginRequest) => ({
  type: RETAILOR_LOGIN_BEGIN,
  payload: data,
});

export const RetailorSignupActionBegin = () => ({
  type: RETAILOR_SIGNUP_BEGIN,
});

export const loginActionComplete = (c: Customer) => ({
  type: LOGIN_COMPLETE,
  payload: c,
});

export const RetailorLoginActionComplete = () => ({
  type: RETAILOR_LOGIN_COMPLETE,
});
export const RetailorSignupActionComplete = () => ({
  type: RETAILOR_SIGNUP_COMPLETE,
});

export const LoginActionError = (msg: string) => ({
  type: LOGIN_ERROR,
  payload: msg,
});

export const retailorLoginActionError = (msg: string) => ({
  type: RETAILOR_LOGIN_ERROR,
  payload: msg,
});
export const retailorSignupActionError = (msg: string) => ({
  type: RETAILOR_SIGNUP_ERROR,
  payload: msg,
});

export const meFetchActionBegin = (c: Customer) => ({
  type: ME_FETCH,
  payload: c,
});

export const meFetchActionComplete = () => ({
  type: ME_FETCH_COMPLETE,
});

export const meLoginAction = (c: Customer) => ({
  type: ME_LOGIN,
  payload: c,
});
export const meLoginCompletedAction = () => ({
  type: ME_LOGIN_COMPLETE,
});
export const resetPasswordForTokenBegin = () => ({
  type: RESET_PASSWORD_BEGIN,
});
export const resetPasswordForTokenCompleted = () => ({
  type: RESET_PASSWORD_COMPLETE,
});
export const resetPasswordForTokenError = () => ({
  type: RESET_PASSWORD_ERROR,
});

export const logoutBegin = () => ({
  type: LOGOUT_BEGIN,
});

export const logoutCompleted = () => ({
  type: LOGOUT_COMPLETE,
});

export const resetPasswordBegin = ({ token }: any) => ({
  type: FORGOT_PASSWORD_BEGIN,
  payload: { token },
});

export const resetPasswordCompleted = (c: Customer) => ({
  type: RESET_PASSWORD_COMPLETED,
  payload: c,
});

export const loggedinResetPasswordBegin = () => ({
  type: LOGGEDIN_PASSWORD_CHANGE_BEGIN,
});

export const loggedinResetPasswordCompleted = () => ({
  type: LOGGEDIN_PASSWORD_CHANGE_COMPLETED,
});

export const customerUpdatemeBegin = () => ({
  type: CUSTOMER_UPDATEME_BEGIN,
});

export const customerUpdatemeCompleted = (c: Customer) => ({
  type: CUSTOMER_UPDATEME_COMPLETED,
  payload: c,
});
export const customerUpdatemeError = (c: Customer) => ({
  type: CUSTOMER_UPDATEME_ERROR,
});
export const updateMyCredentialsBegin = (id: string) => ({
  type: UPDATE_MY_CREDENTIALS_BEGIN,
  // payload: { id, data },
});

export const updateMyCredentialsCompleted = (c: Customer) => ({
  type: UPDATE_MY_CREDENTIALS_COMPLETED,
  payload: c,
});

export const updateMyCredentialsError = (msg: string) => ({
  type: UPDATE_MY_CREDENTIALS_ERROR,
  payload: msg,
});

export const getCustomerBegin = (id: string) => ({
  type: GET_CUSTOMER_BEGIN,
  payload: id,
});

export const getCustomerComplete = (customer: Customer) => ({
  type: GET_CUSTOMER_COMPLETE,
  payload: customer,
});

export const signupBegin = () => ({
  type: SIGNUP_BEGIN,
});

export const signupComplete = () => ({
  type: SIGNUP_COMPLETE,
});

export const signupError = () => ({
  type: SIGNUP_ERROR,
});

// export const authActions = bindActionCreators(
//   {
//     // fetch: meFetchActionBegin,
//     // login: meLoginAction,
//     // retailorLogin: retailorLoginAction,
//     // retailorLoginError: retailorLoginErrorAction,
//     // password: resetPasswordBegin,
//     // passwordChanged: resetPasswordCompleted,
//     // loggedinPasswordChangeBegin: loggedinResetPasswordBegin,
//     // loggedinPasswordChangeCompleted: loggedinResetPasswordCompleted,
//     // updatemeBegin: customerUpdatemeBegin,
//     // updatemeCompleted: customerUpdatemeCompleted,
//     // updatemeError: customerUpdatemeError,
//   },
//   store.dispatch
// );
