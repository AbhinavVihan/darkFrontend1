import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { authActions } from "../../actions/auth.actions";
import {
  uploadCategoryPhotoBegin,
  uploadCategoryPhotoComplete,
  uploadCategoryPhotoError,
} from "../../actions/categories.actions";
import { AUTH_TOKEN } from "../../api/base";
import { changeCategoryPhoto } from "../../api/categories";
import { meSelector } from "../../selectors/auth.selectors";
import {
  createdCategorySelector,
  selectedLoadingSelector,
} from "../../selectors/categories.selectors";
import { useAppSelector } from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";

const UploadCategoryPhoto = () => {
  const customer = useAppSelector(meSelector);
  const id = useAppSelector(createdCategorySelector);
  const [photo, setPhoto] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const token = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();
  const loading = useAppSelector(selectedLoadingSelector);
  const [previewSource, setPreviewSource] = useState();

  if (!customer && token) {
    <LoadingOverlay
      className="w-screen h-screen"
      active
      spinner
    ></LoadingOverlay>;
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoto(e.target.files[0])
  // }

  const submit = (e) => {
    dispatch(uploadCategoryPhotoBegin());
    e.preventDefault();
    // window.location.href = "/my-account";
    changeCategoryPhoto(id, photo)
      .then((c) => {
        uploadCategoryPhotoComplete();

        dispatch(uploadCategoryPhotoComplete());
        history.push("/retailor-overview");
      })
      .catch((e) => {
        dispatch(uploadCategoryPhotoError());
      });
    // changeCustomerPhoto(photo).then((c) => {
    //   authActions.updatemeCompleted(c);
    //   authActions.login(c);
    // window.location.href = "/my-account";
    // });
  };

  return (
    <LoadingOverlay className="w-full h-full" active={loading} spinner>
      <div className="h-screen font-bold bg-gray-100">
        <div className="mb-10 text-xl text-center md:text-4xl sm:text-2xl">
          Upload an Image for your Category!
        </div>
        <form onSubmit={submit}>
          <div className="text-center">
            <label
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded cursor-pointer hover:bg-blue-900 w-28"
              onClick={() => setDisabled(!disabled)}
              htmlFor="photo"
            >
              Choose photo
            </label>
            <input
              className="hidden"
              onChange={(e) => {
                handleInputChange(e);
                // dispatch(uploadCategoryPhotoBegin());
                alert("image uploaded successfully, click on (Submit) button");
              }}
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              // name="file"
              defaultValue={photo}
              // value={photo}
            />
            <div className="text-center">
              {!disabled && (
                <button
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded cursor-pointer hover:bg-green-900 w-28"
                  type="submit"
                  onClick={() => submit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
        {previewSource && (
          <div className="mt-10 text-2xl font-bold text-center">
            <div>Preview</div>
            <div className="flex justify-center ">
              <img
                className="w-40 rounded-full"
                src={previewSource}
                alt="chosen"
              />
            </div>
          </div>
        )}
        <div className="text-center text-red-500">
          ⚫Kindly do not refresh the page.
        </div>
        <div className="text-center text-red-500">
          ⚫Photo you upload must only be of jpg format.
        </div>
      </div>
    </LoadingOverlay>
  );
};

UploadCategoryPhoto.defaultProps = {};

export default memo(UploadCategoryPhoto);
