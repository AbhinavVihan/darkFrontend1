import { Entity } from "./Entity";

export interface Customer extends Entity {
  name: string;
  email: string;
  photo: string;
  address: string;
  passwordResetExpires?: Date;
  passwordResetToken?: string;
  role: "customer" | "admin" | "retailor";
}

export interface CustomerForReview {
  status: string;
  doc: Customer;
}
