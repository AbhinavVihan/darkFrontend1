import { Customer } from "./Customer";
import { Entity } from "./Entity";

export interface Review {
  status: string;
  results: number;
  doc: Reviewss[];
}

export interface Reviewss extends Entity {
  review: string;
  rating: number;
  createdAt: string;
  customer: Customer;
  product: string;
}

export interface Revi {
  status: string;
  doc: Rev;
}

export interface Rev {
  review: string;
  rating: number;
  createdAt: string;
  customer: Customer;
  product: string;
}
