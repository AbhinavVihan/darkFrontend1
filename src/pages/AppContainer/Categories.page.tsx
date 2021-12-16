import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";
import {
  currentQueryCategoriesSelector,
  categoriesLoadingSelector,
  categoryQuerySelector,
} from "../../selectors/categories.selectors";
import { Link } from "react-router-dom";
import { fetchCategories as fetchCategoriesStart } from "../../api/categories";

import { useDispatch } from "react-redux";
import {
  categoryQueryChangedAction,
  categoryQueryCompletedAction,
} from "../../actions/categories.actions";
// import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";
import { loadingSelector, meSelector } from "../../selectors/auth.selectors";
import Sidebar from "../../components/Sidebar";

interface Props {}

const Categories: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const query = useAppSelector(categoryQuerySelector);

  const loading = useAppSelector(categoriesLoadingSelector);
  const loadingForLogout = useAppSelector(loadingSelector);

  const categories = useAppSelector(currentQueryCategoriesSelector);
  const customer = useAppSelector(meSelector);

  useEffect(() => {
    fetchCategoriesStart({ query }).then((categories) => {
      dispatch(categoryQueryCompletedAction(query, categories!));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <LoadingOverlay
      className="w-screen h-screen"
      active={loading || loadingForLogout}
      spinner
    >
      <div className="h-20 pt-5 pr-3 space-x-2 text-xs font-semibold text-right text-white bg-black sm:space-x-3 md:text-base justify-items-end sm:text-sm">
        <Link className=" hover:text-red-500" to="/products">
          Search by products
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

      <div className="py-6 text-center bg-gray-800 border-black ">
        <input
          className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
          type="text"
          value={query}
          placeholder="search for categories here"
          onChange={(e) => {
            // productActions.queryChanged(e.target.value, true);
            dispatch(categoryQueryChangedAction(e.target.value, true));
          }}
        ></input>
      </div>

      <div className="flex flex-col sm:flex sm:flex-row ">
        <Sidebar></Sidebar>

        <div className="m-auto mt-10 xxsm:grid-cols-1 xxsm:grid 2xl:grid 2xl:grid-cols-5 xsm:grid xsm:grid-cols-2 xxsm:gap-8 lg:gap-14 md:grid md:grid-cols-3 md:gap-14 xl:mx-auto 2xl:gap-10 lg:mx-auto sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {categories.map((category) => (
            <div className="rounded cursor-pointer bg-gray-50 hover:bg-gray-200">
              <div className="border-black ">
                <Link to={"/categories/" + category._id + "/products"}>
                  <img
                    className="rounded-lg xxxsm:w-48 xsm:w-52 sm:w-44 md:w-52"
                    alt="djhsuk"
                    src={category.photo}
                  />
                  <div className="flex justify-around pb-5">
                    <div className="text-sm font-semibold sm:text-sm md:text-base">
                      {category && category.categoryName}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {categories.length < 1 && !loading && (
        <div className="text-center ">No categories found for that query.</div>
      )}
    </LoadingOverlay>
  );
};

Categories.defaultProps = {};

export default memo(Categories);
