import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../store";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  buyingStart,
  getCartBegin,
  buyingBegin,
} from "../../actions/cart.actions";
import {
  cartIdSelector,
  cartLoadingSelector,
  cartProductsSelector,
} from "../../selectors/cart.selectors";
import { orderProduct } from "../../stripe/public/checkout";
// import { BASE_URL } from "../../api/base";
import LoadingOverlay from "react-loading-overlay-ts";
import { deleteFromCart } from "../../api/products";
import sadImoji from "../../../src/sad-emoji.png";

interface Props {}

const Cart: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const cartProducts = useAppSelector(cartProductsSelector);
  const loading = useAppSelector(cartLoadingSelector);
  const cartId = useAppSelector(cartIdSelector);

  useEffect(() => {
    dispatch(getCartBegin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const price = () => {
    let total = 0;
    if (cartProducts) {
      for (let i = 0; i < cartProducts.length; i++) {
        total = total + cartProducts[i].price;
      }
      console.log(total);
      return total;
    }
  };

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div>
        {cartProducts?.length === 0 && (
          <div className="text-center">There is nothing in your cart</div>
        )}
        <div className="grid grid-flow-row gap-4 m-4 space-x-10 h-96">
          {cartProducts &&
            cartProducts.map((product) => (
              <div className="rounded bg-gray-50">
                <div className="border-black ">
                  <div className="hover:bg-gray-100">
                    <Link
                      to={"/products/" + product._id}
                      className="items-center hover:bg-gray-200"
                    >
                      <div className="flex justify-center">
                        <img
                          className="w-64 rounded-2xl"
                          alt="jvbjdsbj"
                          src={product.image1}
                        />
                      </div>
                      <div className="flex flex-col text-center">
                        <div className="font-semibold">
                          {product && product.name}
                        </div>
                        <div className="font-bold text-green-600">
                          ${product.price}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => {
                        orderProduct(product._id);
                        dispatch(buyingBegin());
                        deleteFromCart(product._id, cartId!);
                      }}
                      className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => {
                        dispatch(buyingStart(product._id, cartId!));
                        // dispatch(getCartBegin());
                      }}
                      className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 w-28"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {cartProducts && cartProducts?.length > 0 && (
            <div className="font-extrabold text-center">Total: ${price()}</div>
          )}
          {cartProducts && cartProducts?.length === 0 && (
            <div className="flex justify-center">
              <img className="w-52 h-52" alt="sjwhsvbjws" src={sadImoji} />
            </div>
          )}
        </div>
      </div>
    </LoadingOverlay>
  );
};

Cart.defaultProps = {};

export default memo(Cart);
