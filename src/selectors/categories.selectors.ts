import { createSelector } from "reselect";
import { categoriesStateSelector } from "./app.selectors";

export const categoryQuerySelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.query
);

export const categoryQueryMapSelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.queryMap
);

export const queryIdsSelector = createSelector(
  [categoryQuerySelector, categoryQueryMapSelector],
  (query, queryMap) => queryMap[query] || []
);

export const categoryByIdSelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.byId
);

export const categoriesLoadingSelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.loadingList
);

export const selectedIdSelected = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.selectedId
);

export const selectedErrorSelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.errorOne
);

export const selectedLoadingSelector = createSelector(
  [categoriesStateSelector],
  (categoryState) => categoryState.loadingOne
);

export const selectedCategorySelector = createSelector(
  [categoryByIdSelector, selectedIdSelected],
  (byId, id) => id && byId[id]
);

export const cIdToCreateProduct = createSelector(
  [categoriesStateSelector],
  (categoriesState) => categoriesState.idForRetailor
);

// export const currentQueryCategoriesSelector = createSelector(
//   [queryIdsSelector, categoryByIdSelector],
//   (categoriesIds, byId) => {
//     const categories = categoriesIds.map((id) => byId[id]);
//     return categories;
//   }
// );

// export const currentQueryCategoriesSelector = createSelector(
//   [categoryQuerySelector, categoryByIdSelector, categoryQueryMapSelector],
//   (query, byId, queryMap) => {
//     const categoryIds = queryMap[query] || [];
//     const categories = categoryIds.map((id) => byId[id]);
//     return categories;
//   }
// );

export const currentQueryCategoriesSelector = createSelector(
  [categoryQuerySelector, categoryByIdSelector, categoryQueryMapSelector],
  (query, byId, queryMap) => {
    const categoryIds = queryMap[query] || [];
    const categories = categoryIds.map((id) => byId[id]);
    return categories;
  }
);

export const createdCategorySelector = createSelector(
  [categoriesStateSelector],
  (categoriesState) => categoriesState.createdCategory
);
