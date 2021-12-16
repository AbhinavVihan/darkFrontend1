import {
  takeLatest,
  takeEvery,
  call,
  put,
  delay,
} from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CATEGORIES_FETCH_SINGLE } from "../actions/action.constants";
import {
  fetchOneCategoryComplete,
  fetchSingleCategoryError,
} from "../actions/categories.actions";
import { fetchOneCategory } from "../api/categories";

// function* fetchProducts(action: AnyAction): Generator<any> {
//   const { query } = action.payload;
//   yield delay(800);

//   const res: any = yield call(fetchProductsApi, { query });
//   yield put(productQueryCompletedAction(query, res));
// }

function* fetchOne(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchOneCategory, action.payload);
    yield put(fetchOneCategoryComplete(res.data));
    console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    // console.log(e.response);
    yield put(fetchSingleCategoryError(action.payload, error));
  }
}

export function* watchCategoryQueryChanged() {
  // yield takeLatest(PRODUCTS_QUERY_CHANGED, fetchProducts);
  yield takeEvery(CATEGORIES_FETCH_SINGLE, fetchOne);
}
