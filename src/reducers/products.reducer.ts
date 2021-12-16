import { Reducer } from "redux";

import {
  ADD_REVIEW_BEGIN,
  ADD_REVIEW_COMPLETE,
  ADD_REVIEW_ERROR,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_COMPLETE,
  CREATE_PRODUCT_ERROR,
  FETCH_PRODUCTS_FOR_CATEGORY,
  PRODUCTS_FETCH_SINGLE,
  PRODUCTS_FETCH_SINGLE_COMPLETE,
  PRODUCTS_FETCH_SINGLE_ERROR,
  PRODUCTS_QUERY_CHANGED,
  PRODUCTS_QUERY_COMPLETED,
  RETAILOR_ALL_REVIEWS_BEGIN,
  RETAILOR_ALL_REVIEWS_COMPLETED,
  RETAILOR_ALL_REVIEWS_ERROR,
  REVIEW_ID_TO_UPDATE_BEGIN,
  REVIEW_ID_TO_UPDATE_BEGIN2,
  REVIEW_ID_TO_UPDATE_COMPLETE,
  REVIEW_ID_TO_UPDATE_ERROR,
  UPLOAD_PRODUCT_BEGIN,
  UPLOAD_PRODUCT_COMPLETED,
  UPLOAD_PRODUCT_ERROR,
} from "../actions/action.constants";

import { Product } from "../models/Products";
import {
  addMany,
  addOne,
  EntityState,
  getIds,
  initialEntityState,
  select,
  setErrorForOne,
} from "./entity.reducer";

export interface ProductsState extends EntityState<Product> {
  query: string;
  queryMap: { [query: string]: string[] };
  productsByCategoryId: { [id: string]: Product[] };
  createdProduct: { [id: string]: Product };
  loadingForProduct: boolean;
  revId: string;
}

const initialState: ProductsState = {
  ...initialEntityState,
  query: "",
  queryMap: {},
  productsByCategoryId: {},
  createdProduct: {},
  loadingForProduct: false,
  revId: "",
};

export const productReducer: Reducer<ProductsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PRODUCTS_FETCH_SINGLE:
      return select(state, action.payload) as ProductsState;
    case PRODUCTS_QUERY_CHANGED:
      const { query, loadingList } = action.payload;

      return {
        ...state,
        query: query,
        loadingList: loadingList,
      };
    case CREATE_PRODUCT_BEGIN:
      return { ...state, loadingOne: true };
    case CREATE_PRODUCT_COMPLETE:
      return {
        ...state,
        createdProduct: {
          ...state.createdProduct,
          [action.payload.id]: action.payload,
        },
        selectedId: action.payload.id,
        loadingOne: false,
      };
    case CREATE_PRODUCT_ERROR:
      return { ...state, errorOne: action.payload, loadingOne: false };
    case PRODUCTS_QUERY_COMPLETED:
      const products = action.payload.products as Product[];
      const productIds = getIds(products);

      const newState = addMany(state, products) as ProductsState;

      return {
        ...newState,
        queryMap: {
          ...newState.queryMap,
          [action.payload.query]: productIds,
        },
        loadingList: false,
      };
    case PRODUCTS_FETCH_SINGLE_COMPLETE:
      return addOne(state, action.payload.doc, false) as ProductsState;
    case PRODUCTS_FETCH_SINGLE_ERROR:
      const { id, msg } = action.payload;
      return setErrorForOne(state, id, msg) as ProductsState;
    case FETCH_PRODUCTS_FOR_CATEGORY:
      return {
        ...state,
        productsByCategoryId: {
          ...state.productsByCategoryId,
          [action.payload.id]: action.payload.products,
        },
      };
    case UPLOAD_PRODUCT_BEGIN:
    case RETAILOR_ALL_REVIEWS_BEGIN:
    case ADD_REVIEW_BEGIN:
    case REVIEW_ID_TO_UPDATE_BEGIN2:
      return { ...state, loadingForProduct: true };
    case UPLOAD_PRODUCT_COMPLETED:
    case ADD_REVIEW_COMPLETE:
    case ADD_REVIEW_ERROR:
    case RETAILOR_ALL_REVIEWS_COMPLETED:
    case RETAILOR_ALL_REVIEWS_ERROR:
    case REVIEW_ID_TO_UPDATE_COMPLETE:
    case REVIEW_ID_TO_UPDATE_ERROR:
      return { ...state, loadingForProduct: false };
    case UPLOAD_PRODUCT_ERROR:
      return { ...state, errorOne: action.payload, loadingForProduct: false };
    case REVIEW_ID_TO_UPDATE_BEGIN:
      return { ...state, revId: action.payload };
    default:
      return state;
  }
};
