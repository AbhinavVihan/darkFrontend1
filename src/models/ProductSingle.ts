import { Categories } from "./Categories";

export interface ProductSingle {
  status: string;
  doc: Doc;
}

export interface Doc {
  description: string;
  id: string;
  image1: string;
  image2: string;
  image3: string;
  imageCover: string;
  imageFront: string;
  name: string;
  price: number;
  productCategory: string;
  public_id: string;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  reviews: Review[];
  slug: string;
  version: string;
  _id: string;
}

export interface Review {
  rating: number;
  createdAt: Date;
  product: string;
  customer: null;
  id: string;
}
