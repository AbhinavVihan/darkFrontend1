import { Order } from "../models/Order";
import { Product } from "../models/Products";
import {
  MY_ORDERS_BEGIN,
  MY_ORDERS_COMPLETED,
  MY_ORDERS_ERROR,
  RETAIOR_ALL_ORDERS_BEGIN,
  RETAIOR_ALL_ORDERS_COMPLETED,
  RETAIOR_ALL_ORDERS_ERROR,
} from "./action.constants";

export const myOrdersBegin = () => ({
  type: MY_ORDERS_BEGIN,
});

export const myOrdersCompleted = (products: Product[]) => ({
  type: MY_ORDERS_COMPLETED,
  payload: products,
});

export const myOrdersError = (msg: string) => ({
  type: MY_ORDERS_ERROR,
  payload: msg,
});

export const retailorAllOrdersBegin = () => ({
  type: RETAIOR_ALL_ORDERS_BEGIN,
});

export const retailorAllOrdersCompleted = (orders: Order[]) => ({
  type: RETAIOR_ALL_ORDERS_COMPLETED,
  payload: orders,
});

export const retailorAllOrdersError = (msg: string) => ({
  type: RETAIOR_ALL_ORDERS_ERROR,
  payload: msg,
});
