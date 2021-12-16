import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../api/auth";
import { meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";

interface Props {}

const RetailorOverview: FC<Props> = (props) => {
  const customer = useAppSelector(meSelector);

  return (
    <div className="pt-5 space-y-5 text-center">
      <h1 className="text-2xl font-semibold lg:pl-10">Retailor's Menu</h1>
      <div className="pb-12 space-y-5 lg:ml-20 md:ml-48 sm:ml-32">
        <div className="ml-20 text-left">
          {customer?.role === "retailor" ? (
            <Link className=" hover:text-red-500" to="/create-category">
              ⚫ Create a new category
            </Link>
          ) : (
            <Link className=" hover:text-red-500" to="/retailor-login">
              ⚫ Create a new category
            </Link>
          )}
        </div>
        <div className="ml-20 text-left">
          {customer && customer.role === "retailor" ? (
            <Link className="hover:text-red-500" to="/choose-category">
              ⚫ Upload a Product
            </Link>
          ) : (
            <Link className="hover:text-red-500" to="/retailor-login">
              ⚫ Upload a Product
            </Link>
          )}
        </div>
        <div></div>

        <div className="ml-20 text-left">
          <Link className=" hover:text-red-500" to="/productsRetailor">
            ⚫ See all Products
          </Link>
        </div>
        <div className="ml-20 text-left">
          <Link className=" hover:text-red-500" to="/categoriesRetailor">
            ⚫ See all Categories
          </Link>
        </div>

        <div className="ml-20 text-left">
          {customer?.role === "retailor" ? (
            <Link className=" hover:text-red-500" to="/all-orders">
              ⚫ Delete an order
            </Link>
          ) : (
            <Link className=" hover:text-red-500" to="/retailor-login">
              ⚫ Delete an order
            </Link>
          )}
        </div>
        <div className="ml-20 text-left">
          {customer?.role === "retailor" ? (
            <Link className=" hover:text-red-500" to="/all-orders">
              ⚫ See all orders
            </Link>
          ) : (
            <Link className=" hover:text-red-500" to="/retailor-login">
              ⚫ See all orders
            </Link>
          )}
        </div>
        <div className="ml-20 text-left">
          {customer?.role === "retailor" ? (
            <Link className=" hover:text-red-500" to="/reviewsRetailor">
              ⚫ See all reviews
            </Link>
          ) : (
            <Link className=" hover:text-red-500" to="/retailor-login">
              ⚫ See all reviews
            </Link>
          )}
        </div>
        <div className="ml-20 text-left">
          {customer?.role === "retailor" ? (
            <Link className=" hover:text-red-500" to="/choose-product">
              ⚫ Delete a Product
            </Link>
          ) : (
            <Link className=" hover:text-red-500" to="/retailor-login">
              ⚫ Delete a Product
            </Link>
          )}
        </div>
        <div className="ml-20 text-left">
          {customer?.role === "retailor" ? (
            <Link className=" hover:text-red-500" to="/my-account">
              ⚫ My Account
            </Link>
          ) : (
            <Link className=" hover:text-red-500" to="/retailor-login">
              ⚫ My Account
            </Link>
          )}
        </div>
      </div>

      <div className="pb-5">
        <Link
          className="h-20 px-2 py-1 text-white bg-transparent bg-red-800 border-2 border-black rounded-lg hover:bg-red-900 w-28"
          to="/products"
        >
          Go Back to customer's Section
        </Link>
      </div>
      {customer?.role === "customer" && (
        <Link
          to="/retailor-login"
          className="inline-block px-0 py-1 mx-3 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
        >
          Login
        </Link>
      )}
      {!customer && (
        <Link
          to="/retailor-login"
          className="inline-block px-0 py-1 mx-3 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
        >
          Login
        </Link>
      )}
      {customer?.role === "retailor" && (
        <button
          className="inline-block px-0 py-1 mx-3 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
          onClick={() => {
            logout();
            // eslint-disable-next-line no-restricted-globals
            // location.href = location.href;
            window.location.href = "/retailor-overview";
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

RetailorOverview.defaultProps = {};

export default memo(RetailorOverview);
