import { Customer } from "../../models/Customer";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  doc: Customer;
}

export interface forgotPasswordRequest {
  email: string;
}

export interface resetPasswordRequest {
  password: string;
  passwordConfirm: string;
}

export interface loggedinResetPasswordRequest {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}
export interface customerPhotoChangeRequest {
  photo: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  doc: Customer;
}

export interface ChangePhotoResponse {
  status: string;
  doc: Customer;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface SignupResponse {
  status: string;
  token: string;
  doc: Customer;
}

export interface updateRequest {
  name?: string;
  email?: string;
  address?: string;
}
