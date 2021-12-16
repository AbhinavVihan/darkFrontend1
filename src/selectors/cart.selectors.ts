import { createSelector } from "reselect";
import { cartStateSelector } from "./app.selectors";

export const cartIdSelector = createSelector(
  [cartStateSelector],
  (cartState) => cartState.selectedId
);

export const cartByIdSelector = createSelector(
  [cartStateSelector],
  (cartState) => cartState.byId
);

export const cartSelector = createSelector(
  [cartIdSelector, cartByIdSelector],
  (id, byId) => {
    const cart = id && byId[id];
    return cart;
  }
);

export const cartProductsSelector = createSelector([cartSelector], (cart) => {
  const products = cart && cart.product.map((el) => el);
  return products;
});

export const cartLoadingSelector = createSelector(
  [cartStateSelector],
  (cartState) => cartState.loadingOne
);
