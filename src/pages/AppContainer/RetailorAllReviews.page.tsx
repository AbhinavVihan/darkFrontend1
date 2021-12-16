import { FC, memo, useEffect, useState } from "react";
// import { BASE_URL } from "../../api/base";
import { getAllReviewsRetailor } from "../../api/products";
import { Reviewss } from "../../models/Reviews";
import {
  selectedProductSelector,
  uploadProductLoader,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";
import { useDispatch } from "react-redux";
import {
  fetchOneProduct,
  retailorAllReviewsBegin,
  retailorAllReviewsCompleted,
  retailorAllReviewsError,
} from "../../actions/products.actions";

interface Props {}

const RetailorAllReviews: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const loading = useAppSelector(uploadProductLoader);
  const [reviews, setReviews] = useState<Reviewss[]>();
  // const re = reviews?.map((r) => r.product);
  // const pro = re?.toString();
  const product = useAppSelector(selectedProductSelector);
  // console.log(product);

  useEffect(() => {
    dispatch(retailorAllReviewsBegin());

    getAllReviewsRetailor()
      .then((r) => {
        setReviews(r);
        // eslint-disable-next-line array-callback-return
        r.map((r) => {
          dispatch(fetchOneProduct(r.product));
        });
        dispatch(retailorAllReviewsCompleted());
        // console.log(reviews);
      })
      .catch((e) => {
        dispatch(retailorAllReviewsError());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   dispatch(fetchOneProduct(pro!));
  // }, []);
  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div className="flex justify-center m-auto">
        <div className="mt-5 space-y-10 gap-7 xxsm:grid-cols-1 sm:w-60 xxsm:grid ">
          {reviews?.map((r) => (
            <div className="text-center bg-gray-100 rounded-lg cursor-pointer sm:w-full hover:bg-gray-200">
              <div className="border-black ">
                <div className="flex justify-center">
                  {product && (
                    <img
                      className="w-40 rounded-xl"
                      alt="jvbjdsbj"
                      src={product.image1}
                    />
                  )}
                </div>
                <div className="">
                  <div className="font-extrabold">
                    Review: <span className="font-normal">{r.review}</span>
                  </div>
                  <div className="font-extrabold">
                    Posted By:{" "}
                    <span className="font-normal">
                      {r.customer && r.customer.name}
                    </span>
                    <div className="flex justify-center">
                      <img
                        className="rounded-full w-14"
                        alt="jvbjdsbj"
                        src={r.customer && r.customer.photo}
                      />
                    </div>
                  </div>
                  <div className="font-extrabold">
                    Created On:{" "}
                    <span className="font-normal">
                      {r.createdAt.slice(0, 10)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
};

RetailorAllReviews.defaultProps = {};

export default memo(RetailorAllReviews);
