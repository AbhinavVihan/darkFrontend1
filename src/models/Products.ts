import { Categories } from "./Categories";
import { Entity } from "./Entity";
import { Review } from "./Reviews";

export interface Products {
  doc: Product[];
}

export interface Product extends Entity {
  quantity: number;
  productCategory: Categories;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  reviews: Review[];
  slug: string;
  imageCover: string;
  imageFront: string;
}
