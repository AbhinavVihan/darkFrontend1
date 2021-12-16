import React, { Suspense, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { me } from "./api/auth";
import { AUTH_TOKEN } from "./api/base";
import AppContainerPageLazy from "./pages/AppContainer/AppContainer.lazy";
import AuthPageLazy from "./pages/Auth/AuthPageLazy";
import NotFoundPage from "./pages/NotFound.page";
import { meSelector } from "./selectors/auth.selectors";
import { useAppSelector } from "./store";
import LoadingOverlay from "react-loading-overlay-ts";
import { useDispatch } from "react-redux";
import { meFetchActionBegin } from "./actions/auth.actions";

function App() {
  // const customer = useSelector<AppState, Customer | undefined>(
  //   (state) => state.me
  // );

  const dispatch = useDispatch();
  const customer = useAppSelector(meSelector);

  const token = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    if (!token) {
      return;
    }

    me().then((c) => {
      dispatch(meFetchActionBegin(c!));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!customer && token) {
    <LoadingOverlay
      className="w-screen h-screen"
      active
      spinner
    ></LoadingOverlay>;
  }

  return (
    <Suspense
      fallback={
        <LoadingOverlay
          className="w-screen h-screen"
          active
          spinner
        ></LoadingOverlay>
      }
    >
      <BrowserRouter>
        <Switch>
          {/* <Route path="/cart" exact>
            {!customer && <Redirect to="/products" />}
          </Route> */}

          <Route path="/" exact>
            <Redirect to="/products" />
          </Route>
          {!customer && !token && (
            <Route path="/my-account" exact>
              <Redirect to="/login" />
            </Route>
          )}
          <Route
            path={[
              "/overview",
              "/categories",
              "/products",
              "/categories/:categoryId",
              "/categories/:categoryId/products",
              "/categories/:categoryId/productsRetailor",
              "/products/:productId",
              "/my-account",
              "/my-password",
              "/cart",
              "/products/:productId/retailor",
              "/my-orders",
              "/all-orders",
              "/update-myaccount",
              "/productsRetailor",
              "/reviewsRetailor",
              "/categoriesRetailor",
              "/choose-product",
              "/products/:productId/review",
              "/products/:productId/updateReview/:reviewId",
            ]}
            exact
          >
            {/* {customer ? <AppContainerPageLazy /> : <Redirect to="/login" />} */}
            <AppContainerPageLazy />
          </Route>
          <Route
            path={[
              "/login",
              "/signup",
              "/forgot-password",
              "/forgot-p-retailor",
              "/token",
              "/resetPassword",
              "/choose-category",
              "/retailor-login",
              "/retailor-signup",
              "/create-product",
              "/create-category",
              "/upload-photo",
              "/retailor-overview",
              "/upload-category-photo",
            ]}
            exact
          >
            {/* {customer ? <Redirect to="/products" /> : <AuthPageLazy />} */}
            <AuthPageLazy />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
