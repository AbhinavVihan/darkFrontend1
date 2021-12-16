import { Cart, Carts } from "../models/Cart";
import {
  CREATE_CART_REQUEST_BEGIN,
  CREATE_CART_REQUEST_COMPLETE,
  GET_CART_COMPLETE,
  GET_CART_BEGIN,
  GET_CART_ERROR,
  ADD_TO_CART_COMPLETE,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_BEGIN,
  BUYING_PROCESS_BEGIN,
  BUYING_PROCESS_COMPLETE,
  BUYING_PROCESS_ERROR,
  BUYING_BEGIN,
  BUYING_COMPLETE,
} from "./action.constants";

export const createCartBegin = () => ({
  type: CREATE_CART_REQUEST_BEGIN,
});

export const getCartBegin = () => ({
  type: GET_CART_BEGIN,
});

export const createCartCompleted = (cart: Cart) => ({
  type: CREATE_CART_REQUEST_COMPLETE,
  payload: cart,
});

export const getCartComplete = (cart: Carts) => ({
  type: GET_CART_COMPLETE,
  payload: cart,
});

export const getCartError = (msg: string) => ({
  type: GET_CART_ERROR,
  payload: msg,
});

export const addToCartBegin = (pId: string, cId: string) => ({
  type: ADD_TO_CART_BEGIN,
  payload: { pId, cId },
});

export const addToCartComplete = (cart: Carts) => ({
  type: ADD_TO_CART_COMPLETE,
  payload: cart,
});

export const addToCartError = (msg: string) => ({
  type: ADD_TO_CART_ERROR,
  payload: msg,
});

export const buyingStart = (pId: string, cId: string) => ({
  type: BUYING_PROCESS_BEGIN,
  payload: { pId, cId },
});

export const buyingBegin = () => ({
  type: BUYING_BEGIN,
});

export const buyingCompleted = () => ({
  type: BUYING_COMPLETE,
});

export const buyingError = (msg: string) => ({
  type: BUYING_PROCESS_ERROR,
  payload: msg,
});

export const buyingComplete = (cart: Carts) => ({
  type: BUYING_PROCESS_COMPLETE,
  payload: cart,
});
