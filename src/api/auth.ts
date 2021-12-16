import axios from "axios";
// import { authActions } from "../actions/auth.actions";
import { Customer, CustomerForReview } from "../models/Customer";
import { AUTH_TOKEN, BASE_URL } from "./base";
import {
  forgotPasswordRequest,
  ForgotPasswordResponse,
  loggedinResetPasswordRequest,
  LoginRequest,
  LoginResponse,
  resetPasswordRequest,
  SignupRequest,
  SignupResponse,
  updateRequest,
} from "./interfaces/authInterfaces";

export const login = (data: LoginRequest) => {
  const url = BASE_URL + "/customers/login";

  return axios.post<LoginResponse>(url, data).then((response) => {
    localStorage.setItem(AUTH_TOKEN, "Bearer " + response.data.token);
    return response.data.doc;
  });
};

export const loginAsRetailor = (data: LoginRequest) => {
  const url = BASE_URL + "/customers/retailor-login";

  return axios
    .post<LoginResponse>(url, data)
    .then((response) => {
      localStorage.setItem(AUTH_TOKEN, "Bearer " + response.data.token);
      // alert("you are successfully loggedin as a retailor");
      return response.data.doc;
    })
    .catch((e) => {
      alert(
        "either you are not a retailor, or you might've entered your credentials wrong please try again!"
      );
    });
};

export const forgotPassword = (data: forgotPasswordRequest) => {
  const url = BASE_URL + "/customers/forgotPassword";

  return axios
    .post<ForgotPasswordResponse>(url, data)
    .then((response) => {
      // console.log(response.data.message);
      return response.data.message;
    })
    .catch((e) => console.log(e));
};

export const resetPassword = (data: resetPasswordRequest, token: any) => {
  const url = BASE_URL + "/customers/resetPassword/" + token;

  return axios
    .patch<LoginResponse>(url, data)
    .then((response) => {
      localStorage.setItem(AUTH_TOKEN, "Bearer " + response.data.token);
      // console.log(response.data.doc);
      alert("your password has been successfully changed");

      return response.data.doc;
    })
    .catch((e) => {
      alert(
        "either your passwords does not matched or you have entered an invalid token on the previous page, kindly try again."
      );
    });
};

export const loggedinResetResetPassword = (
  data: loggedinResetPasswordRequest
) => {
  const url = BASE_URL + "/customers/updateMyPassword";

  return axios
    .patch<LoginResponse>(url, data)
    .then((response) => {
      localStorage.setItem(AUTH_TOKEN, "Bearer " + response.data.token);
      return response.data.doc;
    })
    .catch((e) => console.log(e));
};

export const changeCustomerPhoto = (data: any) => {
  const form = new FormData();
  // console.log(form);
  form.append("photo", data);

  // form.append("image", data);
  const url = BASE_URL + "/customers/updateMe";

  return axios({
    method: "PATCH",
    url: url,
    data: form,
    headers: {
      Authorization: AUTH_TOKEN,
      "Content-type": "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      return response.data.doc;
    })
    .catch((e) => console.log(e));
};

export const signup = (data: SignupRequest) => {
  const url = BASE_URL + "/customers/signup";

  return axios
    .post<SignupResponse>(url, data)
    .then((response) => {
      // console.log(response.data);
      return response.data.doc;
    })
    .catch((e) => alert(e));
};

export const signupAsRetailor = (data: SignupRequest) => {
  const url = BASE_URL + "/customers/retailor-signup";

  return axios
    .post<SignupResponse>(url, data)
    .then((response) => {
      // console.log(response.data);
      alert("retailor signup successfull");
      // window.location.href = "/retailor-login";
      return response.data.doc;
    })
    .catch((e) => {
      alert(e.message);
    });
};

// export const logout = () => {
//   localStorage.removeItem(AUTH_TOKEN);
// };

export const logout = () => {
  const url = BASE_URL + "/customers/logout";

  localStorage.removeItem(AUTH_TOKEN);
  return axios.get(url);
};

interface MeResponse {
  status: string;
  doc: Customer;
}

export const me = () => {
  const url = BASE_URL + "/customers/me";

  return axios
    .get<MeResponse>(url, { headers: { Authorization: AUTH_TOKEN } })
    .then((response) => {
      return response.data.doc;
    })
    .catch((e) => console.log(e));
};

export const updateMe = (id: string, data: updateRequest) => {
  const url = BASE_URL + "/customers/" + id;
  return axios
    .patch<CustomerForReview>(url, data, {
      headers: { Authorization: AUTH_TOKEN },
    })
    .then((response) => {
      alert("credentials updated successfully");
      return response.data.doc;
    })
    .catch((e) => {
      alert(e);
      window.location.href = "/my-account";
    });
};

export const getCustomer = (id: string) => {
  const url = BASE_URL + "/customers/" + id;
  return axios
    .get<CustomerForReview>(url, { headers: { Authorization: AUTH_TOKEN } })
    .then((c) => {
      return c.data.doc;
    })
    .catch((e) => console.log(e));
};
