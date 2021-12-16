import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchOneProduct } from "../../actions/products.actions";
import {
  selectedProductSelector,
  selectedErrorSelector,
  selectedLoadingSelector,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";

// import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const ProductsDetailForRetailor: FC<Props> = (props) => {
  const { productId } = useParams<{ productId: string }>();

  const product = useAppSelector(selectedProductSelector);
  const error = useAppSelector(selectedErrorSelector);
  const loading = useAppSelector(selectedLoadingSelector);

  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const img = product && [product.image1, product.image2, product.image3];

  useEffect(() => {
    dispatch(fetchOneProduct(productId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const onClickForward = () => {
    if (index + 1 === img!.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const onClickBack = () => {
    if (index - 1 === -1) {
      setIndex(img!.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  if (error) {
    return (
      <div>
        <div className="text-red-500">{error}</div>
        <Link to={"/products/" + (productId + 1)}>next product</Link>
      </div>
    );
  }

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        {product && (
          <div className="mt-10 xsm:flex xsm:justify-center xsm:flex-row xxsm:flex xxsm:flex-col">
            <div className="ml-6 mr-6">
              <img
                className=" md:w-96 sm:w-64 xsm:w-60 rounded-2xl"
                alt="imhfdb"
                src={img![index]}
              />
              <div className="text-center mt-7 xsm:space-x-2 xxsm:space-x-3 sm:space-x-5">
                <button
                  className="inline-block text-white bg-transparent bg-gray-800 border-2 border-black rounded xxxsm:w-5 xxsm:w-7 hover:bg-black w-28"
                  onClick={onClickBack}
                >
                  {"<"}
                </button>
                <button
                  className="inline-block text-white bg-transparent bg-gray-800 border-2 border-black rounded xxxsm:w-5 xxsm:w-7 hover:bg-black w-28"
                  onClick={onClickForward}
                >
                  {">"}
                </button>
              </div>
            </div>

            <div className="space-y-8 font-bold tracking-wider text-center xxsm:text-xs xxsm:mt-20 xsm:text-xs pl-9 sm:text-sm sm:w-56 md:w-64 lg:w-96">
              <div>{product.name}</div>
              <div>${product.price}</div>

              <div>{product.description}</div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </LoadingOverlay>
  );
};

ProductsDetailForRetailor.defaultProps = {};

export default memo(ProductsDetailForRetailor);
