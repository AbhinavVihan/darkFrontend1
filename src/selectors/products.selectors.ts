import { createSelector } from "reselect";
import { productStateSelector } from "./app.selectors";
import { selectedIdSelected as selectedIdSelector } from "./categories.selectors";

export const productQuerySelector = createSelector(
  [productStateSelector],
  (productState) => productState.query
);

export const productQueryMapSelector = createSelector(
  [productStateSelector],
  (productState) => productState.queryMap
);

export const queryIdsSelector = createSelector(
  [productQuerySelector, productQueryMapSelector],
  (query, queryMap) => queryMap[query] || []
);

export const productByIdSelector = createSelector(
  [productStateSelector],
  (productState) => productState.byId
);

export const productCategoryIdSelector = createSelector(
  [productStateSelector],
  (productState) => productState.productsByCategoryId
);

export const categoryProducts = createSelector(
  [productStateSelector],
  (productState) => productState.productsByCategoryId
);

export const productsLoadingSelector = createSelector(
  [productStateSelector],
  (productState) => productState.loadingList
);

export const selectedIdSelected = createSelector(
  [productStateSelector],
  (productState) => productState.selectedId
);

export const selectedErrorSelector = createSelector(
  [productStateSelector],
  (productState) => productState.errorOne
);

export const selectedLoadingSelector = createSelector(
  [productStateSelector],
  (productState) => productState.loadingOne
);

export const selectedProductSelector = createSelector(
  [productByIdSelector, selectedIdSelected],
  (byId, id) => id && byId[id]
);

export const currentQueryProductsSelector = createSelector(
  [productQuerySelector, productByIdSelector, productQueryMapSelector],
  (query, byId, queryMap) => {
    const productIds = queryMap[query] || [];
    const products = productIds.map((id) => byId[id]);
    return products;
  }
);

export const currentCategoryProductsSelector = createSelector(
  [categoryProducts, selectedIdSelector],
  (productss, selectedId) => {
    const products = selectedId && productss[selectedId];
    return products;
  }
);

export const uploadProductLoader = createSelector(
  [productStateSelector],
  (productState) => {
    const loader = productState.loadingForProduct;
    return loader;
  }
);
