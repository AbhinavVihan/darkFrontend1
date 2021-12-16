import { takeEvery, call, put, all } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import {
  ADD_TO_CART_BEGIN,
  BUYING_PROCESS_BEGIN,
  CATEGORIES_FETCH_SINGLE,
  CREATE_PRODUCT_BEGIN,
  GET_CART_BEGIN,
  MY_ORDERS_BEGIN,
  PRODUCTS_FETCH_SINGLE,
  RETAIOR_ALL_ORDERS_BEGIN,
  // UPDATE_MY_CREDENTIALS_BEGIN,
} from "../actions/action.constants";
import {
  fetchOneCategoryComplete,
  fetchSingleCategoryError,
} from "../actions/categories.actions";
import {
  createProductComplete,
  createProductError,
  fetchOneProductComplete,
  fetchSingleProductError,
} from "../actions/products.actions";
import {
  fetchOneProduct as fetchOneProd,
  getCart,
  addToCart as addProdToCart,
  deleteFromCart,
  createProduct,
  fetchMyOrders,
  fetchAllOrders,
} from "../api/products";
import { fetchOneCategory as fetchOneCate } from "../api/categories";
import {
  addToCartComplete,
  addToCartError,
  buyingComplete,
  buyingError,
  getCartComplete as getYourCart,
  getCartError,
} from "../actions/cart.actions";
import {
  myOrdersCompleted,
  myOrdersError,
  retailorAllOrdersCompleted,
  retailorAllOrdersError,
} from "../actions/order.actions";
// import { updateMe } from "../api/auth";
// import {
//   updateMyCredentialsCompleted,
//   updateMyCredentialsError,
// } from "../actions/auth.actions";

function* fetchOneProduct(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchOneProd, action.payload);
    yield put(fetchOneProductComplete(res.data));
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    // console.log(e.response);
    yield put(fetchSingleProductError(action.payload, error));
  }
}

function* fetchOneCart(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(getCart);
    // console.log(res.data.doc);
    yield put(getYourCart(res.data.doc));
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(getCartError(error));
  }
}

function* deleteProductFromCart(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(
      deleteFromCart,
      action.payload.pId,
      action.payload.cId
    );
    // console.log(res.data.doc);
    yield put(buyingComplete(res.data.doc));
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(buyingError(error));
  }
}

function* fetchOneCategory(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchOneCate, action.payload);
    yield put(fetchOneCategoryComplete(res.data));
    // console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    // console.log(e.response);
    yield put(fetchSingleCategoryError(action.payload, error));
  }
}

function* addToCart(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(
      addProdToCart,
      action.payload.pId,
      action.payload.cId
    );
    // console.log(action.payload.pId);
    yield put(addToCartComplete(res.data));
    alert("added successfully");
    // console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(addToCartError(error));
    alert("this product is already in your cart");
  }
}

function* createproduct(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(createProduct, action.payload.id, {
      name: action.payload.data.name,
      price: action.payload.data.price,
      description: action.payload.data.description,
    });
    yield put(createProductComplete(res.data));
    alert("created successfully");
    // console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(createProductError(error));
    alert("Some error occured");
  }
}

function* FetchMyOrders(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchMyOrders);
    yield put(myOrdersCompleted(res.data));
    // alert("created successfully");
    // console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(myOrdersError(error));
    // alert("Some error occured");
  }
}

function* FetchAllOrders(action: AnyAction): Generator<any> {
  try {
    const res: any = yield call(fetchAllOrders);

    // console.log(res.data);
    yield put(retailorAllOrdersCompleted(res.data));
    // alert("created successfully");
    // console.log(res.data);
  } catch (e: any) {
    const error = e.response.statusText || "some error occured";
    yield put(retailorAllOrdersError(error));
    // alert("Some error occured");
  }
}

// function* Login(action: AnyAction): Generator<any> {
//   try {
//     const res: any = yield call(login, {
//       email: action.payload.email,
//       password: action.payload.password,
//     });

//     console.log(action.payload.email);
//     console.log(res);
//     yield put(loginActionComplete(res));
//     window.location.href = "/products";
//     // alert("created successfully");
//     // console.log(res.data);
//   } catch (e: any) {
//     const error = e || "some error occured";
//     yield put(LoginActionError(error));
//     alert(e);
//   }
// }

// function* RetailorLogin(action: AnyAction): Generator<any> {
//   try {
//     const res: any = yield call(loginAsRetailor, {
//       email: action.payload.email,
//       password: action.payload.password,
//     });

//     console.log(action.payload.email);
//     console.log(res);
//     yield put(RetailorLoginActionComplete(res));
//     window.location.href = "/retailor-overview";
//     // alert("created successfully");
//     // console.log(res.data);
//   } catch (e: any) {
//     const error = e || "some error occured";
//     yield put(retailorLoginActionError(error));
//     // alert(e);
//   }
// }

// function* updateMyCredentials(action: AnyAction): Generator<any> {
//   try {
//     const res: any = yield call(updateMe, action.payload.id, {
//       name: action.payload.data.name,
//       email: action.payload.data.email,
//       address: action.payload.data.address,
//     });

//     console.log(res.data.doc);
//     yield put(updateMyCredentialsCompleted(res.data.doc));
//     // alert("created successfully");
//     // console.log(res.data);
//   } catch (e: any) {
//     console.log(e);
//     const error = e || "some error occured";
//     yield put(updateMyCredentialsError(error));
//     // alert("Some error occured");
//   }
// }

// function* getC(action: AnyAction): Generator<any> {
//   const res: any = yield call(getCustomer, action.payload);

//   console.log(res.data);
//   yield put(getCustomerComplete(res.data));
//   alert("got customer successfully");
//   console.log(res.data);
// }

export function* watchAll() {
  yield all([
    takeEvery(PRODUCTS_FETCH_SINGLE, fetchOneProduct),
    takeEvery(CATEGORIES_FETCH_SINGLE, fetchOneCategory),
    takeEvery(GET_CART_BEGIN, fetchOneCart),
    takeEvery(ADD_TO_CART_BEGIN, addToCart),
    takeEvery(BUYING_PROCESS_BEGIN, deleteProductFromCart),
    takeEvery(CREATE_PRODUCT_BEGIN, createproduct),
    takeEvery(MY_ORDERS_BEGIN, FetchMyOrders),
    takeEvery(RETAIOR_ALL_ORDERS_BEGIN, FetchAllOrders),
    // takeEvery(UPDATE_MY_CREDENTIALS_BEGIN, updateMyCredentials),
    // takeEvery(LOGIN_BEGIN, Login),
    // takeEvery(RETAILOR_LOGIN_BEGIN, RetailorLogin),
    // takeEvery(GET_CUSTOMER_BEGIN, getC),

    // takeEvery(CREATE_CATEGORY_BEGIN, createcategory),

    // takeEvery(FETCH_PRODUCTS_FOR_CATEGORY, fetchProductsForCategory),
  ]);
}
