import { FC, memo, useEffect } from "react";

import { useDispatch } from "react-redux";
import { seeAllCustomers as seeAllCustomer } from "../../actions/auth.actions";

import {
  loadingSelector,
  seeAllCustomers,
} from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const RetailorAllCustomers: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const customers = useAppSelector(seeAllCustomers);
  const loading = useAppSelector(loadingSelector);
  useEffect(() => {
    dispatch(seeAllCustomer());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingOverlay className="w-full h-full" active={loading} spinner>
      <div className="flex justify-center m-auto">
        <div className="mt-5 space-y-10 gap-7 xxsm:grid-cols-1 sm:w-60 xxsm:grid ">
          {customers &&
            customers.map(
              (r) =>
                r.role === "customer" && (
                  <div
                    key={r._id}
                    className="text-center bg-gray-100 rounded-lg cursor-pointer sm:w-full hover:bg-gray-200"
                  >
                    <div className="border-black ">
                      <div className="flex justify-center">
                        <img
                          className="w-40 rounded-xl"
                          alt="jvbjdsbj"
                          src={r.photo}
                        />

                        <div className="">
                          <div className="font-extrabold">
                            Name: <span className="font-normal">{r.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </LoadingOverlay>
  );
};

RetailorAllCustomers.defaultProps = {};

export default memo(RetailorAllCustomers);
