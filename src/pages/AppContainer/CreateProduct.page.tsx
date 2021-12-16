import { FC, memo } from "react";
import { useAppSelector } from "../../store";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createProductBegin } from "../../actions/products.actions";
import * as yup from "yup";

import { cIdToCreateProduct } from "../../selectors/categories.selectors";
import { useFormik } from "formik";
import LoadingOverlay from "react-loading-overlay-ts";
import { selectedLoadingSelector } from "../../selectors/products.selectors";

interface Props {}

const CrateProduct: FC<Props> = (props) => {
  const categoryId = useAppSelector(cIdToCreateProduct);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useAppSelector(selectedLoadingSelector);

  const { handleSubmit, getFieldProps, isValid } = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      price: yup.string().required(),
      description: yup.string().required(),
    }),
    onSubmit: (data) => {
      dispatch(createProductBegin(categoryId, data));
      setTimeout(() => {
        history.push("/upload-photo");
      }, 3000);
    },
  });

  return (
    <LoadingOverlay className="w-full h-full " active={loading} spinner>
      <div className="flex flex-col items-center pt-8 space-y-28">
        <div className="flex flex-col space-y-7">
          <div className="text-center">
            <h1 className="text-xl md:text-4xl sm:text-2xl">
              Create your Product's credentials
            </h1>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-5 text-center">
              <div>
                <input
                  className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                  id="name"
                  required
                  {...getFieldProps("name")}
                  placeholder="Product Name"
                />
              </div>

              <div>
                <input
                  className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                  id="price"
                  required
                  {...getFieldProps("price")}
                  placeholder="Price"
                />
              </div>

              <div>
                <input
                  className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                  id="description"
                  autoComplete="off"
                  required
                  {...getFieldProps("description")}
                  placeholder="Product description"
                />
              </div>
            </div>

            <div className="text-center ">
              <button
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
                type="submit"
                disabled={!isValid}
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
        <div className="max-w-md text-center">
          <p>
            © 2021 All Rights Reserved. DARK is a product of Designreset. Cookie
            Preferences, Privacy, and Terms.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-red-500">
        ⚫Kindly do not refresh the page.
      </div>
    </LoadingOverlay>
  );
};

CrateProduct.defaultProps = {};

export default memo(CrateProduct);
