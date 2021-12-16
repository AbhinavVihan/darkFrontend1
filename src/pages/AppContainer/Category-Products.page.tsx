import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProductsForCategory } from "../../api/products";
import { fetchProductsForCategory as fetchProductsForCategories } from "../../actions/products.actions";

import {
  selectedErrorSelector,
  selectedLoadingSelector,
  currentCategoryProductsSelector,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import { fetchOneCategory } from "../../actions/categories.actions";
// import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";
import { meSelector } from "../../selectors/auth.selectors";
import Sidebar from "../../components/Sidebar";

interface Props {}

const ProductsForCategories: FC<Props> = (props) => {
  const productss = useAppSelector(currentCategoryProductsSelector);
  const { categoryId } = useParams<{ categoryId: string }>();

  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);
  const customer = useAppSelector(meSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductsForCategory(categoryId).then((p) => {
      dispatch(fetchOneCategory(categoryId));
      dispatch(fetchProductsForCategories(categoryId, p!));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (error) {
    return (
      <div>
        <div className="text-red-500">{error}</div>
        {/* <Link to={"/products/" + (productId + 1)}>next product</Link> */}
      </div>
    );
  }

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div className="h-20 pt-5 pr-3 space-x-2 text-xs font-semibold text-right text-white bg-black sm:space-x-3 md:text-base justify-items-end sm:text-sm">
        <Link className=" hover:text-red-500" to="/categories">
          Back to categories
        </Link>
        {!customer && (
          <Link className=" hover:text-red-500" to="/login">
            Login
          </Link>
        )}
        {customer && customer.role === "customer" && (
          <Link className=" hover:text-red-500" to="/my-account">
            MyAccount
          </Link>
        )}
        {customer && customer.role === "retailor" && (
          <Link className=" hover:text-red-500" to="/login">
            Login
          </Link>
        )}
        {customer && customer.role === "customer" && (
          <Link className=" hover:text-red-500" to="/my-orders">
            Orders
          </Link>
        )}
        {customer && customer.role === "customer" && (
          <Link className=" hover:text-red-500" to="/cart">
            Cart
          </Link>
        )}
      </div>
      <div className="flex flex-col sm:flex sm:flex-row ">
        <div className="hidden">
          <Sidebar></Sidebar>
        </div>

        <div className="m-auto mt-10 xxsm:grid-cols-1 xxsm:grid 2xl:grid 2xl:grid-cols-5 xsm:grid xsm:grid-cols-2 xxsm:gap-8 lg:gap-14 md:grid md:grid-cols-3 md:gap-14 xl:mx-auto 2xl:gap-10 lg:mx-auto sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {productss &&
            productss.map((product) => (
              <div className="rounded cursor-pointer bg-gray-50 hover:bg-gray-200">
                <div className="border-black ">
                  <Link to={"/products/" + product._id}>
                    <img
                      className="rounded-lg xxxsm:w-48 xsm:w-52 sm:w-44 md:w-52"
                      alt="jvbjdsbj"
                      src={product.imageFront}
                    />
                    <div className="flex justify-around pb-5 xxxsm:w-48 ">
                      <div className="font-semibold xxxsm:text-xs sm:text-sm md:text-base">
                        {product && product.name}
                      </div>
                      <div className="font-bold text-green-600">
                        ${product.price}
                      </div>
                    </div>
                    <div className="pb-5 text-xl font-bold text-center text-green-600">
                      Free Delivery
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      {productss && productss.length < 1 && (
        <div className="text-center">
          There is no product found for this category yet.
        </div>
      )}
      {productss && productss.length < 1 && loading && (
        <LoadingOverlay
          className="w-screen h-screen"
          active
          spinner
        ></LoadingOverlay>
      )}
    </LoadingOverlay>
  );
};

ProductsForCategories.defaultProps = {};

export default memo(ProductsForCategories);
