import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";

import { Link } from "react-router-dom";
import { deleteAnOrder } from "../../api/products";

import { useDispatch } from "react-redux";

// import { BASE_URL } from "../../api/base";
import { retailorAllOrdersBegin } from "../../actions/order.actions";
import {
  retailorAllOrderRealSelector,
  retailorAllOrdersLoadingSelector,
} from "../../selectors/customer.selectors";
import { AiFillHome } from "react-icons/ai";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const AllOrders: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const loading = useAppSelector(retailorAllOrdersLoadingSelector);

  const orders = useAppSelector(retailorAllOrderRealSelector);

  useEffect(() => {
    dispatch(retailorAllOrdersBegin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        <div className="flex justify-end pr-5">
          <Link className="hover:text-red-500" to="retailor-overview">
            <AiFillHome></AiFillHome>
          </Link>{" "}
        </div>

        {orders.length < 1 && <div className="text-center">Nothing here</div>}

        <div className="text-center "></div>
        <div className="grid h-auto grid-flow-row gap-4">
          {orders.map((order) => (
            <div className="flex justify-center rounded bg-gray-50 hover:bg-gray-200 hover:border-black">
              <div className="flex flex-col space-y-8 text-xs border-black sm:space-x-10 sm:flex sm:flex-row">
                <Link
                  className="cursor-pointer "
                  to={
                    "/products/" +
                    (order.product && order.product._id) +
                    "/retailor"
                  }
                >
                  <img
                    className="items-center justify-center w-40 rounded-xl"
                    alt="jvbjdsbj"
                    src={order.product && order.product.imageFront}
                  />
                  <div className="flex justify-around w-40">
                    <div className="w-40 font-semibold text-center">
                      {order.product && order.product.name}
                    </div>
                    <div className="font-bold text-green-600">
                      ${order.product && order.product.price}
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col items-center justify-center mx-auto text-center">
                  Placed by: {order.customer.name}
                  <img
                    className="rounded-full w-14"
                    alt="sdhvhsvhs"
                    src={order.customer.photo}
                  />
                  <button
                    onClick={() => {
                      deleteAnOrder(order._id).then(() => {
                        dispatch(retailorAllOrdersBegin());
                      });
                      // window.location.href = "/all-orders";
                    }}
                    className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 w-28"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
};

AllOrders.defaultProps = {};

export default memo(AllOrders);
