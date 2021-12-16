import { Customer } from "./Customer";
import { Entity } from "./Entity";

export interface Categories {
  status: string;
  doc: Category[];
}

export interface Category extends Entity {
  categoryName: string;
  maker: Customer;
  description: string;
  photo: string;
  createdAt: string;
  slug: string;
}
