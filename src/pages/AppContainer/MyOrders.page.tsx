import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

// import { BASE_URL } from "../../api/base";
import {
  myOrdersSelectors,
  ordersLoadingSelector,
} from "../../selectors/customer.selectors";
import { myOrdersBegin } from "../../actions/order.actions";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const MyOrders: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const loading = useAppSelector(ordersLoadingSelector);
  const orders = useAppSelector(myOrdersSelectors);

  var todayDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    dispatch(myOrdersBegin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div className="flex justify-center">
        <div className="mt-5 gap-7 xxsm:grid-cols-1 xxsm:grid ">
          <div className="flex flex-col justify-center space-y-10">
            {orders.length < 1 && (
              <div>You do not have any orders placed yet.</div>
            )}
            {orders.length < 1 && (
              <Link
                className="text-blue-500 underline hover:text-red-500"
                to="/products"
              >
                Continue shopping
              </Link>
            )}
          </div>
          <div className="text-2xl font-bold text-center">My Orders</div>
          {orders.map((order) => (
            <div className="text-center bg-gray-100 rounded-lg cursor-pointer sm:w-full hover:bg-gray-200">
              <div className="border-black ">
                <Link className="" to={"/products/" + order._id}>
                  <div className="flex justify-center">
                    <img
                      className="w-40 rounded-xl"
                      alt="jvbjdsbj"
                      src={order.imageCover}
                    />
                  </div>
                  <div className="">
                    <div className="font-semibold">{order && order.name}</div>
                    <div className="font-bold text-green-600">
                      ${order.price}
                    </div>
                    <div>Paid on: {todayDate}</div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
};

MyOrders.defaultProps = {};

export default memo(MyOrders);
