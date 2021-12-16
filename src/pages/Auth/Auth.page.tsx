import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import FrontImage from "../../components/FrontImage";
import ChooseCategoryPage from "../AppContainer/ChooseCategory.page";
import CreateCategoryPage from "../AppContainer/CreateCategory.page";
import CreateProductPage from "../AppContainer/CreateProduct.page";
import ProductDetailForRetailorsPage from "../AppContainer/ProductDetailForRetailors.page";
import RetailorLoginPage from "../AppContainer/RetailorLogin.page";
import RetailorOverviewPage from "../AppContainer/RetailorOverview.page";
import UploadCategoryPhotoPage from "../AppContainer/UploadCategoryPhoto.page";
import UploadPhotoForProductsPage from "../AppContainer/UploadPhotoForProducts.page";
import BeforeSettingPasswordPage from "./BeforeSettingPassword.page";
import ForgotpasswordPage from "./Forgotpassword.page";
import ForgotpasswordForRetailorPage from "./ForgotpasswordForRetailor.page";
import LoginPage from "./Login.page";
import ResetpasswordPage from "./Resetpassword.page";
import RetailorSignupPage from "./RetailorSignup.page";
import SignupPage from "./Signup.page";

interface Props {}

const AppContainer: FC<Props> = (props) => {
  return (
    <div className="grid-cols-2 lg:grid sm:flex-col">
      <FrontImage></FrontImage>
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/signup">
          <SignupPage></SignupPage>
        </Route>
        <Route path="/forgot-password">
          <ForgotpasswordPage></ForgotpasswordPage>
        </Route>
        <Route path="/token">
          <BeforeSettingPasswordPage></BeforeSettingPasswordPage>
        </Route>
        <Route path="/resetPassword">
          <ResetpasswordPage></ResetpasswordPage>
        </Route>
        <Route path="/choose-category">
          <ChooseCategoryPage></ChooseCategoryPage>
        </Route>
        <Route path="/retailor-login">
          <RetailorLoginPage></RetailorLoginPage>
        </Route>
        <Route path="/retailor-signup">
          <RetailorSignupPage></RetailorSignupPage>
        </Route>
        <Route path="/create-product">
          <CreateProductPage></CreateProductPage>
        </Route>
        <Route path="/upload-photo">
          <UploadPhotoForProductsPage></UploadPhotoForProductsPage>
        </Route>
        <Route path="/retailor-overview">
          <RetailorOverviewPage></RetailorOverviewPage>
        </Route>

        <Route path="/products/:productId/retailor" exact>
          <ProductDetailForRetailorsPage></ProductDetailForRetailorsPage>
        </Route>
        <Route path="/upload-category-photo" exact>
          <UploadCategoryPhotoPage></UploadCategoryPhotoPage>
        </Route>
        <Route path="/create-category" exact>
          <CreateCategoryPage></CreateCategoryPage>
        </Route>
        <Route path="/forgot-p-retailor" exact>
          <ForgotpasswordForRetailorPage></ForgotpasswordForRetailorPage>
        </Route>
      </Switch>
    </div>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
