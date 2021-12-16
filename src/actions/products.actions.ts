import { createProductRequest } from "../api/interfaces/productInterfaces";
import { Product, Products } from "../models/Products";
import {
  ADD_REVIEW_BEGIN,
  ADD_REVIEW_COMPLETE,
  ADD_REVIEW_ERROR,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_COMPLETE,
  FETCH_PRODUCTS_FOR_CATEGORY,
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_FETCH_SINGLE_COMPLETE,
  PRODUCTS_FETCH_SINGLE_ERROR,
  PRODUCTS_QUERY_CHANGED,
  PRODUCTS_QUERY_COMPLETED,
  PRODUCT_CHOOSE,
  RETAILOR_ALL_REVIEWS_BEGIN,
  RETAILOR_ALL_REVIEWS_COMPLETED,
  RETAILOR_ALL_REVIEWS_ERROR,
  REVIEW_ID_TO_UPDATE_BEGIN,
  REVIEW_ID_TO_UPDATE_BEGIN2,
  REVIEW_ID_TO_UPDATE_COMPLETE,
  REVIEW_ID_TO_UPDATE_ERROR,
  UPLOAD_IMAGE_1_BEGIN,
  UPLOAD_IMAGE_1_COMPLETED,
  UPLOAD_IMAGE_2_BEGIN,
  UPLOAD_IMAGE_2_COMPLETED,
  UPLOAD_IMAGE_3_BEGIN,
  UPLOAD_IMAGE_3_COMPLETED,
  UPLOAD_IMAGE_COVER_BEGIN,
  UPLOAD_IMAGE_COVER_COMPLETED,
  UPLOAD_IMAGE_FRONT_BEGIN,
  UPLOAD_IMAGE_FRONT_COMPLETED,
  UPLOAD_PRODUCT_BEGIN,
  UPLOAD_PRODUCT_COMPLETED,
  UPLOAD_PRODUCT_ERROR,
} from "./action.constants";

export const productQueryChangedAction = (
  query: string,
  loadingList: boolean
) => ({
  type: PRODUCTS_QUERY_CHANGED,
  payload: { query, loadingList },
});

export const productQueryCompletedAction = (
  query: string,
  products: Product[]
) => ({
  type: PRODUCTS_QUERY_COMPLETED,
  payload: { query, products },
});

export const fetchOneProduct = (id: string) => ({
  type: PRODUCTS_FETCH_SINGLE,
  payload: id,
});

export const fetchProductsForCategory = (id: string, products: Product[]) => ({
  type: FETCH_PRODUCTS_FOR_CATEGORY,
  payload: { id, products },
});

export const fetchOneProductComplete = (product: Products) => ({
  type: PRODUCTS_FETCH_SINGLE_COMPLETE,
  payload: product,
});

export const fetchSingleProductError = (id: string, msg: string) => ({
  type: PRODUCTS_FETCH_SINGLE_ERROR,
  payload: { id, msg },
});

export const createProductBegin = (id: string, data: createProductRequest) => ({
  type: CREATE_PRODUCT_BEGIN,
  payload: { id, data },
});

export const createProductComplete = (product: Product) => ({
  type: CREATE_PRODUCT_COMPLETE,
  payload: product,
});

export const createProductError = (msg: string) => ({
  type: CREATE_PRODUCT_COMPLETE,
  payload: msg,
});

export const uploadProductBegin = () => ({
  type: UPLOAD_PRODUCT_BEGIN,
});

export const uploadProductCompleted = () => ({
  type: UPLOAD_PRODUCT_COMPLETED,
});

export const uploadProductError = () => ({
  type: UPLOAD_PRODUCT_ERROR,
});

export const uploadFrontImageBegin = () => ({
  type: UPLOAD_IMAGE_FRONT_BEGIN,
});

export const uploadFrontImageCompleted = () => ({
  type: UPLOAD_IMAGE_FRONT_COMPLETED,
});

export const uploadCoverImageBegin = () => ({
  type: UPLOAD_IMAGE_COVER_BEGIN,
});

export const uploadCoverImageCompleted = () => ({
  type: UPLOAD_IMAGE_COVER_COMPLETED,
});

export const uploadImage1Begin = () => ({
  type: UPLOAD_IMAGE_1_BEGIN,
});

export const uploadImage1Completed = () => ({
  type: UPLOAD_IMAGE_1_COMPLETED,
});

export const uploadImage2Begin = () => ({
  type: UPLOAD_IMAGE_2_BEGIN,
});

export const uploadImage2Completed = () => ({
  type: UPLOAD_IMAGE_2_COMPLETED,
});

export const uploadImage3Begin = () => ({
  type: UPLOAD_IMAGE_3_BEGIN,
});

export const uploadImage3Completed = () => ({
  type: UPLOAD_IMAGE_3_COMPLETED,
});

export const productChoose = (id: string) => ({
  type: PRODUCT_CHOOSE,
  payload: id,
});

export const retailorAllReviewsBegin = () => ({
  type: RETAILOR_ALL_REVIEWS_BEGIN,
});

export const retailorAllReviewsCompleted = () => ({
  type: RETAILOR_ALL_REVIEWS_COMPLETED,
});

export const retailorAllReviewsError = () => ({
  type: RETAILOR_ALL_REVIEWS_ERROR,
});

export const updateMyReviewBegin = (id: string) => ({
  type: REVIEW_ID_TO_UPDATE_BEGIN,
  payload: id,
});

export const updateMyReviewBegin2 = () => ({
  type: REVIEW_ID_TO_UPDATE_BEGIN2,
});

export const updateMyReviewComplete = () => ({
  type: REVIEW_ID_TO_UPDATE_COMPLETE,
});

export const updateMyReviewError = () => ({
  type: REVIEW_ID_TO_UPDATE_ERROR,
});

export const addReviewBegin = () => ({
  type: ADD_REVIEW_BEGIN,
});

export const addReviewComplete = () => ({
  type: ADD_REVIEW_COMPLETE,
});

export const addReviewError = () => ({
  type: ADD_REVIEW_ERROR,
});
