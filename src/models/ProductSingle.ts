import { Categories } from "./Categories";

export interface ProductSingle {
  status: string;
  doc: Doc;
}

export interface Doc {
  quantity: number;
  productCategory: Categories;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  description: string;
  images: string[];
  slug: string;
  imageCover: string;
  imageFront: string;
  reviews: Review[];
  id: string;
}

export interface Review {
  rating: number;
  createdAt: Date;
  product: string;
  customer: null;
  id: string;
}
