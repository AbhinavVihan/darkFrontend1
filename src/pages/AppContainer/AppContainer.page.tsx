import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import MyAccount from "../Auth/MyAccount";
import CategoriesPage from "./Categories.page";
import CategoriesDetailPage from "./CategoriesDetail.page";
import OverViewPage from "./OverView.page";
import ProductsPage from "./Products.page";
import ProductsDetailPage from "./ProductsDetail.page";
import LoggedinResetPasswordPage from "../Auth/LoggedinResetPassword";
import CategoryProductsPage from "./Category-Products.page";
import CartPage from "./Cart.page";
import ProductDetailForRetailorsPage from "./ProductDetailForRetailors.page";
import MyOrdersPage from "./MyOrders.page";
import RetailorAllOrdersPage from "./RetailorAllOrders.page";
import UpdateMyCredentialsPage from "../Auth/UpdateMyCredentials.page";
import ProductsForRetailorPage from "./ProductsForRetailor.page";
import ChooseProductPage from "./ChooseProduct.page";
import CategoriesForRetailorPage from "./CategoriesForRetailor.page";
import CategoryProductsForRetailorPage from "./CategoryProductsForRetailor.page";
import AddReviewPage from "./AddReview.page";
import RetailorAllReviewsPage from "./RetailorAllReviews.page";
import UpdateReviewPage from "./UpdateReview.page";

interface Props {}

const AppContainer: FC<Props> = () => {
  return (
    <div className="flex flex-row">
      <Switch>
        <Route path="/overview">
          <OverViewPage></OverViewPage>
        </Route>
        <Route path="/my-account" exact>
          <MyAccount></MyAccount>
        </Route>
        <Route path="/my-password" exact>
          <LoggedinResetPasswordPage></LoggedinResetPasswordPage>
        </Route>
        <Route path="/categories" exact>
          <CategoriesPage></CategoriesPage>
        </Route>
        <Route path="/products" exact>
          <ProductsPage></ProductsPage>
        </Route>
        <Route path="/cart" exact>
          <CartPage></CartPage>
        </Route>
        <Route path="/categories/:categoryId" exact>
          <CategoriesDetailPage></CategoriesDetailPage>
        </Route>
        <Route path="/categories/:categoryId/products" exact>
          <CategoryProductsPage></CategoryProductsPage>
        </Route>
        <Route path="/categories/:categoryId/productsRetailor" exact>
          <CategoryProductsForRetailorPage></CategoryProductsForRetailorPage>
        </Route>
        productsRetailor
        <Route path="/products/:productId" exact>
          <ProductsDetailPage></ProductsDetailPage>
        </Route>
        <Route path="/products/:productId/retailor" exact>
          <ProductDetailForRetailorsPage></ProductDetailForRetailorsPage>
        </Route>
        <Route path="/my-orders" exact>
          <MyOrdersPage></MyOrdersPage>
        </Route>
        <Route path="/all-orders" exact>
          <RetailorAllOrdersPage></RetailorAllOrdersPage>
        </Route>
        <Route path="/update-myaccount" exact>
          <UpdateMyCredentialsPage></UpdateMyCredentialsPage>
        </Route>
        <Route path="/productsRetailor">
          <ProductsForRetailorPage></ProductsForRetailorPage>
        </Route>
        <Route path="/choose-product" exact>
          <ChooseProductPage></ChooseProductPage>
        </Route>
        categoriesRetailor
        <Route path="/categoriesRetailor" exact>
          <CategoriesForRetailorPage></CategoriesForRetailorPage>
        </Route>
        <Route path="/products/:productId/review" exact>
          <AddReviewPage></AddReviewPage>
        </Route>
        <Route path="/reviewsRetailor" exact>
          <RetailorAllReviewsPage></RetailorAllReviewsPage>
        </Route>
        <Route path="/products/:productId/updateReview/:reviewId" exact>
          <UpdateReviewPage></UpdateReviewPage>
        </Route>
      </Switch>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
