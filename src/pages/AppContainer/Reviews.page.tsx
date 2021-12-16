import { FC, memo, useEffect, useState } from "react";

// import { BASE_URL } from "../../api/base";
import { getAllReviews } from "../../api/products";
import { Link, useParams } from "react-router-dom";
import { Reviewss } from "../../models/Reviews";
import { useAppSelector } from "../../store";
import { meSelector } from "../../selectors/auth.selectors";
import { useDispatch } from "react-redux";
import { updateMyReviewBegin } from "../../actions/products.actions";

interface Props {}

const Reviews: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();
  const customer = useAppSelector(meSelector);

  const [arrr, setArrr] = useState<Reviewss[]>();

  useEffect(() => {
    getAllReviews(productId).then((r) => {
      setArrr(r);
      // console.log(r);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {arrr &&
        arrr.map((r) => (
          <div className="flex flex-row items-center justify-center text-center border-2 border-black rounded xxxsm:w-40 xxsm:w-56 xsm:w-64 sm:w-96 w-96">
            <div className="items-center">
              <div className="flex justify-center">
                <img
                  className="w-20 rounded-full"
                  src={r.customer.photo}
                  alt="whdgwh"
                />
              </div>
              <div className="text-left">
                <div className="font-extrabold">
                  Review:{"    "}
                  <span className="font-normal">{r.review}</span>
                </div>
                <div className="font-extrabold">
                  Placed By:{" "}
                  <span className="font-normal">{r.customer.name}</span>
                </div>

                <div className="font-extrabold">
                  Created At:{"    "}
                  <span className="font-normal">
                    {r.createdAt.slice(0, 10)}
                  </span>
                </div>
              </div>
              {customer?._id === r.customer._id && (
                <div>
                  <Link
                    to={"/products/" + productId + "/updateReview/" + r._id}
                    onClick={() => dispatch(updateMyReviewBegin(r._id))}
                    className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 w-28"
                  >
                    Update my review
                  </Link>
                </div>
              )}
            </div>
            ;
          </div>
        ))}
    </div>
  );
};

Reviews.defaultProps = {};

export default memo(Reviews);
