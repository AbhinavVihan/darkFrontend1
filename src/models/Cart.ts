import { Entity } from "./Entity";
import { Product } from "./Products";

export interface Carts {
  status: string;
  doc: Cart;
}

export interface Cart extends Entity {
  id: string;
  product: Product[];
  customer: string;
}
