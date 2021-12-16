import { AppState } from "../store";

export const productStateSelector = (state: AppState) => state.products;
export const authStateSelector = (state: AppState) => state.auth;
export const customerStateSelector = (state: AppState) => state.customers;
export const categoriesStateSelector = (state: AppState) => state.categories;
export const cartStateSelector = (state: AppState) => state.cart;
