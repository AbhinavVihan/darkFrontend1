import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addReviewBegin,
  addReviewComplete,
  addReviewError,
  fetchOneProduct,
} from "../../actions/products.actions";
// import { BASE_URL } from "../../api/base";
import { addAReview } from "../../api/products";
import {
  selectedProductSelector,
  uploadProductLoader,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const AddReview: FC<Props> = (props) => {
  const history = useHistory();
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const loading = useAppSelector(uploadProductLoader);
  const { productId } = useParams<{ productId: string }>();
  useEffect(() => {
    dispatch(fetchOneProduct(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const product = useAppSelector(selectedProductSelector);
  const p = product && product.image1;

  const postReview = (e: any) => {
    e.preventDefault();
    dispatch(addReviewBegin());
    addAReview({ review }, productId)
      .then((r) => {
        alert("review created on this product successfully");
        dispatch(addReviewComplete());
        history.push(`/products/${productId}`);
      })
      .catch((e) => {
        alert(
          "either you are posting your review on this product 2nd time, or some error occured."
        );
        dispatch(addReviewError());
        history.push(`/products/${productId}`);
      });
  };

  // if (loading) {
  //   <LoadingOverlay
  //     className="w-screen h-screen "
  //     active
  //     spinner
  //   ></LoadingOverlay>;
  //   console.log(loading);
  // }

  return (
    <div className="m-auto space-y-10">
      <LoadingOverlay className="w-full h-full" active={loading} spinner>
        <div className="w">
          <div className="space-y-10 xxxsm:flex xxxsm:flex-col">
            <div className="pt-10 text-2xl font-semibold text-center">
              Add a Review for this product.
            </div>
            <img alt="sdss" className="rounded-3xl w-60" src={p} />
          </div>
          <form onSubmit={(e) => postReview(e)}>
            <div className="py-6 text-center border-black ">
              <input
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="write your review here..."
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
              />
            </div>
            <div className="text-center">
              <button className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28">
                Post review
              </button>
            </div>
          </form>
        </div>
      </LoadingOverlay>
    </div>
  );
};

AddReview.defaultProps = {};

export default memo(AddReview);
