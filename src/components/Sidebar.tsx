import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { logoutBegin, logoutCompleted } from "../actions/auth.actions";
import { logout } from "../api/auth";
import { meSelector } from "../selectors/auth.selectors";
import { store, useAppSelector } from "../store";

interface Props {}

const Sidebar: FC<Props> = (props) => {
  const customer = useAppSelector(meSelector);

  return (
    <div className="pt-5 bg-gray-200 sm:text-center xsm:text-right">
      {customer && customer.role === "customer" && (
        <div className="font-bold text-red-700 md:text-xl sm:text-sm ">
          Hi{" "}
          <Link to="/my-account">
            <span className="text-green-700 hover:text-blue-500">
              {customer?.name}
            </span>
          </Link>
        </div>
      )}
      <div>
        {customer?.role === "customer" && (
          <button
            className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
            onClick={() => {
              authActions.logoutBegin();
              logout().then((r) => authActions.logoutCompleted());
              // eslint-disable-next-line no-restricted-globals
              // location.href = location.href;
              window.location.href = "/products";
            }}
          >
            Logout
          </button>
        )}
      </div>
      {customer?.role === "customer" && (
        <Link className="hover:text-red-500" to="/retailor-overview">
          Switch to retailor's section
        </Link>
      )}
      {customer?.role === "retailor" && (
        <Link className="hover:text-red-500" to="/retailor-overview">
          Switch to retailor's section
        </Link>
      )}
      {!customer && (
        <Link className="hover:text-red-500" to="/retailor-overview">
          Switch to retailor's section
        </Link>
      )}
    </div>
  );
};

export const authActions = bindActionCreators(
  {
    logoutBegin: logoutBegin,
    logoutCompleted: logoutCompleted,
  },
  store.dispatch
);

Sidebar.defaultProps = {};

export default memo(Sidebar);
