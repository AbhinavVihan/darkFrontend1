import { FC, memo, useEffect, useState } from "react";
// import { BASE_URL } from "../../api/base";

import { useDispatch } from "react-redux";
import { retailorAllReviewsBegin } from "../../actions/products.actions";
import { getAllCustomers } from "../../api/auth";
import { Customer } from "../../models/Customer";

interface Props {}

const RetailorAllCustomers: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [customers, setCustomers] = useState<Customer[]>();

  useEffect(() => {
    dispatch(retailorAllReviewsBegin());

    getAllCustomers()
      .then((customers) => setCustomers(customers))
      .catch((e) => {
        alert(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   dispatch(fetchOneProduct(pro!));
  // }, []);
  return (
    // <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
    <div className="flex justify-center m-auto">
      <div className="mt-5 space-y-10 gap-7 xxsm:grid-cols-1 sm:w-60 xxsm:grid ">
        {customers &&
          customers.map(
            (r) =>
              r.role === "customer" && (
                <div className="text-center bg-gray-100 rounded-lg cursor-pointer sm:w-full hover:bg-gray-200">
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
                    ;
                  </div>
                </div>
              )
          )}
      </div>
    </div>
    // </LoadingOverlay>
  );
};

RetailorAllCustomers.defaultProps = {};

export default memo(RetailorAllCustomers);
