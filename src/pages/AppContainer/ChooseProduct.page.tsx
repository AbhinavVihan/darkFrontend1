import { useFormik } from "formik";
import React, { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";

import { deleteProduct, fetchProducts } from "../../api/products";
import { currentQueryProductsSelector } from "../../selectors/products.selectors";
import { productQueryCompletedAction } from "../../actions/products.actions";

interface Props {}

const ChooseProduct: FC<Props> = (props) => {
  const [pstate, setPstate] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const query = "";
  const products = useAppSelector(currentQueryProductsSelector);

  useEffect(() => {
    fetchProducts({ query }).then((products) => {
      dispatch(productQueryCompletedAction(query, products!));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-empty-pattern
  const {} = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: yup.object().shape({
      category: yup.string().required(),
    }),
    onSubmit: () => {},
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 space-y-14 ">
      <div className="flex flex-col space-y-6 text-center">
        <div className="pb-4 text-center">
          <h1 className="text-base font-semibold text-center md:text-4xl sm:text-2xl">
            Choose a product to delete
          </h1>
        </div>
        <div className="text-left">
          <div className=" xxsm:grid sm:grid-cols-1">
            {products.map((c) => (
              // <div onClick={setCstate(c._id)}>{c.categoryName}</div>
              <div className="pl-16">
                <Link
                  className="text-center cursor-pointer xxxsm:text-sm hover:text-red-500"
                  to="#"
                  onClick={() => {
                    setPstate(c._id);
                    setDisabled(false);
                    alert(
                      `(${c.name.toUpperCase()}) has been successfully selected. Click on Delete Product`
                    );
                  }}
                >
                  ⚫ {c.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          {!disabled && (
            <button
              onClick={() => {
                // dispatch(productChoose(pstate));
                deleteProduct(pstate)
                  .then(() => {
                    alert(pstate + " has been successfully deleted");
                    window.location.href = "/productsRetailor";
                  })
                  .catch((e) => {
                    alert(e);
                  });
              }}
              className="px-2 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900"
            >
              Delete Product
            </button>
          )}
        </div>

        <form className="space-y-8">
          <div className="text-center ">
            <div>
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="in"
                type="text"
                value={pstate}
              />
            </div>
          </div>
        </form>
        <div className="text-center">or</div>

        <div className="text-center">
          <Link
            to="/choose-category"
            className="inline-block w-48 px-2 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded hover:bg-blue-900"
          >
            Upload a new Product
          </Link>
        </div>
      </div>
      <div className="px-4 text-sm text-center sm:text-base">
        © 2021 All Rights Reserved. DARK is a product of Designreset. Cookie
        Preferences, Privacy, and Terms.
      </div>
    </div>
  );
};

ChooseProduct.defaultProps = {};

export default memo(ChooseProduct);
