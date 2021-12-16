import { FC, memo, useState } from "react";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  createCategoryBegin,
  createCategoryComplete,
  createCategoryError,
} from "../../actions/categories.actions";
import { createCategory } from "../../api/categories";
import LoadingOverlay from "react-loading-overlay-ts";
import { useAppSelector } from "../../store";
import { selectedLoadingSelector } from "../../selectors/categories.selectors";

interface Props {}

const CrateCategory: FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useAppSelector(selectedLoadingSelector);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createCategoryBegin());
    createCategory({ categoryName: name, description: description })
      .then((c) => {
        alert("category created successfully");
        dispatch(createCategoryComplete(c!));
        history.push("/upload-category-photo");
      })
      .catch((e) => {
        dispatch(createCategoryError(e));
        history.push("/retailor-overview");
      });
  };

  return (
    <LoadingOverlay className="w-full h-full" active={loading} spinner>
      <div className="flex flex-col items-center pt-8 space-y-28">
        <div className="flex flex-col space-y-8">
          <div className="text-center ">
            <h1 className="text-xl md:text-4xl sm:text-2xl">
              Create a new Category
            </h1>
          </div>

          <form className="space-y-8" onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-5 text-center lg:flex-col md:flex md:flex-col lg:flex">
              <div>
                <input
                  className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="Category Name"
                  required
                  placeholder="Category Name"
                />
              </div>

              <div>
                <input
                  className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96 "
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  autoComplete="off"
                  required
                  placeholder="description"
                ></input>
              </div>
            </div>

            <div className="flex justify-center space-x-28">
              <button
                onClick={() => {
                  dispatch(createCategoryBegin());
                }}
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-green-800 border-2 border-black rounded bg-transparen hover:bg-green-900 "
              >
                Create Category
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
    </LoadingOverlay>
  );
};

CrateCategory.defaultProps = {};

export default memo(CrateCategory);
