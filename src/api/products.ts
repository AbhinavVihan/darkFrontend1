import axios from "axios";
import { Cart, Carts } from "../models/Cart";
import { Order } from "../models/Order";
import { Product } from "../models/Products";
import { ProductSingle } from "../models/ProductSingle";
import { Revi, Review } from "../models/Reviews";
import { BASE_URL } from "./base";
import { AUTH_TOKEN } from "./base";
import { createProductRequest } from "./interfaces/productInterfaces";

export interface ProductRequest {
  query: string;
}

export const fetchProducts = (data: ProductRequest) => {
  const url = BASE_URL + "/products";

  return axios
    .get<Product[]>(url, { params: data })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((e) => console.log(e));
};

export const fetchOneProduct = (id: string) => {
  const url = BASE_URL + "/products/" + id;

  return axios.get<ProductSingle>(url);
};

export const fetchProductsForCategory = (id: string) => {
  const url = BASE_URL + "/categories/" + id + "/products";
  // console.log(id);

  return axios
    .get<Product[]>(url)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((e) => console.log(e));
};

export const createProduct = (id: string, data: createProductRequest) => {
  const url = BASE_URL + "/categories/" + id + "/products";
  // console.log(id);

  return axios.post<Product>(url, data);
};

export const uploadProductImages = (id: string, data: any) => {
  const form = new FormData();
  // console.log(form);
  form.append("imageFront", data.imageFront);
  form.append("imageCover", data.imageCover);
  form.append("image1", data.image1);
  form.append("image2", data.image2);
  form.append("image3", data.image3);

  // form.append("image", data);
  const url = BASE_URL + "/products/" + id;

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
      alert("photos uploaded successfully");
      return response.data.doc;
    })
    .catch((e) => {
      alert("some error occured, please upload your product again.");
      axios.delete(url, { headers: { Authorization: AUTH_TOKEN } });
      window.location.href = "/choose-category";
    });
};

export const createCart = () => {
  const url = BASE_URL + "/cart/create";

  return axios
    .post<Cart>(url, { headers: { Authorization: AUTH_TOKEN } })
    .then((response) => {
      return response.data;
    });
};

export const getCart = () => {
  const url = BASE_URL + "/cart/myCart";
  return axios.get<Carts>(url, { headers: { Authorization: AUTH_TOKEN } });
};

export interface addToCartRequest {
  pId: string;
  cId: string;
}

export const addToCart = (pId: string, cId: string) => {
  const url = BASE_URL + "/products/" + pId + "/cart/" + cId;
  return axios
    .post<Carts>(url, { headers: { Authorization: AUTH_TOKEN } })
    .then((response) => {
      return response.data.doc;
    });
};

export const deleteFromCart = (pId: string, cId: string) => {
  const url = BASE_URL + "/products/" + pId + "/cart/" + cId;
  return axios.delete<Carts>(url, { headers: { Authorization: AUTH_TOKEN } });
};

export const fetchMyOrders = () => {
  const url = BASE_URL + "/orders/my-orders";
  return axios.get<Product[]>(url, { headers: { Authorization: AUTH_TOKEN } });
};

export const fetchAllOrders = () => {
  const url = BASE_URL + "/orders";
  return axios.get<Order[]>(url, { headers: { Authorization: AUTH_TOKEN } });
};

export const deleteAnOrder = (id: string) => {
  const url = BASE_URL + "/orders/" + id;
  return axios.delete(url, { headers: { Authorization: AUTH_TOKEN } });
};

export const deleteProduct = (id: string) => {
  const url = BASE_URL + "/products/" + id;
  return axios.delete(url, { headers: { Authorization: AUTH_TOKEN } });
};

export interface ReviewRequest {
  review: string;
}

export const addAReview = (data: ReviewRequest, id: string) => {
  const url = BASE_URL + "/products/" + id + "/reviews";
  return axios
    .post(url, data, { headers: { Authorization: AUTH_TOKEN } })
    .then((r) => {
      return r.data;
    });
};

export const getAllReviews = (id: string) => {
  const url = BASE_URL + "/products/" + id + "/reviews";
  return axios.get<Review>(url).then((r) => {
    // console.log(r.data.doc);
    return r.data.doc;
  });
};

export const getAllReviewsRetailor = () => {
  const url = BASE_URL + "/reviews";
  return axios.get<Review>(url).then((r) => {
    // console.log(r.data.doc);
    return r.data.doc;
  });
};

export const updateReview = (data: ReviewRequest, id: string) => {
  const url = BASE_URL + "/reviews/" + id;
  return axios
    .patch<Revi>(url, data, { headers: { Authorization: AUTH_TOKEN } })
    .then((r) => {
      return r.data.doc;
    });
};
