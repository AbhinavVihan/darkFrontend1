import { useFormik } from "formik";
import React, { FC, memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";

import { useAppSelector } from "../../store";
import { fetchCategories as fetchCategoriesStart } from "../../api/categories";
import { useDispatch } from "react-redux";
import {
  categoryChoose,
  categoryQueryCompletedAction,
} from "../../actions/categories.actions";
import { currentQueryCategoriesSelector } from "../../selectors/categories.selectors";

interface Props {}

const ChooseCategory: FC<Props> = (props) => {
  const [cstate, setCstate] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const query = "";
  const categories = useAppSelector(currentQueryCategoriesSelector);

  useEffect(() => {
    fetchCategoriesStart({ query }).then((categories) => {
      dispatch(categoryQueryCompletedAction(query, categories!));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const { handleSubmit } = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: yup.object().shape({
      category: yup.string().required(),
    }),
    onSubmit: (data) => {
      dispatch(categoryChoose(cstate));
      history.push("/create-product");
    },
  });

  return (
    <div className="flex flex-col items-center pt-8 space-y-14 ">
      <div className="flex flex-col space-y-6">
        <div className="pb-4 text-center">
          <h1 className="text-base font-semibold md:text-4xl sm:text-2xl">
            Choose a category for your product
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {categories.map((c) => (
            // <div onClick={setCstate(c._id)}>{c.categoryName}</div>
            <div className="pl-16">
              <button
                className="text-center cursor-pointer hover:text-red-500"
                onClick={() => {
                  setCstate(c._id);
                  setDisabled(false);
                  alert(
                    `(${c.categoryName.toUpperCase()}) has been successfully selected. Click on choose category`
                  );
                }}
              >
                ‣ {c.categoryName}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          {!disabled && (
            <Link
              to="/create-product"
              onClick={() => {
                dispatch(categoryChoose(cstate));
              }}
              className="px-2 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900"
            >
              Choose Category
            </Link>
          )}
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="text-center ">
            <div>
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="in"
                type="text"
                value={cstate}
              />
            </div>
          </div>
        </form>
        <div className="text-center">or</div>

        <div className="text-center">
          <Link
            to="/create-category"
            className="inline-block w-48 px-2 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded hover:bg-blue-900"
          >
            Create a new Category
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

ChooseCategory.defaultProps = {};

export default memo(ChooseCategory);
