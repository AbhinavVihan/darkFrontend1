import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// import { authActions } from "../../actions/auth.actions";
import {
  productQueryCompletedAction,
  uploadCoverImageBegin,
  uploadCoverImageCompleted,
  uploadFrontImageBegin,
  uploadFrontImageCompleted,
  uploadImage1Begin,
  uploadImage1Completed,
  uploadImage2Begin,
  uploadImage2Completed,
  uploadImage3Begin,
  uploadImage3Completed,
  uploadProductBegin,
  uploadProductCompleted,
  uploadProductError,
} from "../../actions/products.actions";
import { AUTH_TOKEN } from "../../api/base";
import { fetchProducts, uploadProductImages } from "../../api/products";
import { meSelector } from "../../selectors/auth.selectors";
import {
  selectedIdSelected,
  uploadProductLoader,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";

const UploadProductImages = () => {
  const customer = useAppSelector(meSelector);
  const id = useAppSelector(selectedIdSelected);
  const loader = useAppSelector(uploadProductLoader);

  const [imageFront, setimageFront] = useState(undefined);
  const [imageCover, setimageCover] = useState(undefined);
  const [image1, setimages1] = useState(undefined);
  const [image2, setimages2] = useState(undefined);
  const [image3, setimages3] = useState(undefined);

  const data = { imageFront, imageCover, image1, image2, image3 };

  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem(AUTH_TOKEN);
  const [previewSource, setPreviewSource] = useState();

  if (!customer && token) {
    alert("you are logged out somehow, please login again");
    window.location.href = "/retailor-login";
  }
  // useEffect(() => {
  //   alert(
  //     "do not refresh the page, else you'll need to start the whole process again"
  //   );
  // }, []);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleInputChange1 = (e) => {
    // setimageFront(e.target.files[0]);
    const file = e.target.files[0];
    setimageFront(file);
    previewFile(file);
    dispatch(uploadFrontImageBegin());
  };
  const handleInputChange2 = (e) => {
    // setimageCover(e.target.files[0]);
    const file = e.target.files[0];
    setimageCover(file);
    previewFile(file);
    dispatch(uploadCoverImageBegin());
  };
  const handleInputChange3 = (e) => {
    // setimages1(e.target.files[0]);
    const file = e.target.files[0];
    setimages1(file);
    previewFile(file);
    dispatch(uploadImage1Begin());
  };
  const handleInputChange4 = (e) => {
    // setimages2(e.target.files[0]);
    const file = e.target.files[0];
    setimages2(file);
    previewFile(file);
    dispatch(uploadImage2Begin());
  };
  const handleInputChange5 = (e) => {
    // setimages3(e.target.files[0]);
    const file = e.target.files[0];
    setimages3(file);
    previewFile(file);
    dispatch(uploadImage3Begin());
  };
  // const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoto(e.target.files[0])
  // }

  const query = "";

  const submit = (e) => {
    e.preventDefault();
    dispatch(uploadProductBegin());
    // window.location.href = "/my-account";
    uploadProductImages(id, data).then((c) => {
      fetchProducts({ query })
        .then((products) => {
          dispatch(productQueryCompletedAction(query, products));
          dispatch(uploadProductCompleted());
          // window.location.href = "/products";
          history.push("/productsRetailor");
        })
        .catch((e) => {
          dispatch(uploadProductError());
        });
      // window.location.href = "/my-account";
    });
  };

  return (
    <LoadingOverlay className="w-full h-full " active={loader} spinner>
      <div>
        <div className="mt-10 font-semibold">
          <form className="text-center" onSubmit={submit}>
            <div>
              <label
                className="inline-block px-2 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded cursor-pointer hover:bg-blue-900"
                htmlFor="photo1"
              >
                Choose a Front photo
              </label>
              <input
                className="hidden"
                onChange={(e) => {
                  handleInputChange1(e);
                  dispatch(uploadFrontImageCompleted());
                  alert(
                    "image front uploaded successfully, click on (choose a cover photo)"
                  );
                }}
                type="file"
                id="photo1"
                name="photo"
                accept="image/*"
                // name="file"
                defaultValue={imageFront}
              />
            </div>
            <div>
              <label
                className="inline-block px-2 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded cursor-pointer hover:bg-blue-900"
                htmlFor="photo2"
              >
                Choose a cover photo
              </label>
              <input
                className="hidden"
                onChange={(e) => {
                  handleInputChange2(e);
                  dispatch(uploadCoverImageCompleted());
                  alert(
                    "image Cover uploaded successfully, click on (choose image 1)"
                  );
                }}
                type="file"
                id="photo2"
                name="photo"
                accept="image/*"
                // name="file"
                defaultValue={imageCover}
              />
            </div>

            <div>
              <label
                className="inline-block px-2 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded cursor-pointer hover:bg-blue-900"
                htmlFor="photo3"
              >
                Choose image 1
              </label>
              <input
                className="hidden"
                onChange={(e) => {
                  handleInputChange3(e);
                  dispatch(uploadImage1Completed());
                  alert(
                    "1st image uploaded successfully, click on (choose image 2)"
                  );
                }}
                type="file"
                id="photo3"
                name="photo"
                accept="image/*"
                // name="file"
                defaultValue={image1}
              />
            </div>

            <div>
              <label
                className="inline-block px-2 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded cursor-pointer hover:bg-blue-900"
                htmlFor="photo4"
              >
                Choose image 2
              </label>
              <input
                className="hidden"
                onChange={(e) => {
                  handleInputChange4(e);
                  dispatch(uploadImage2Completed());
                  alert(
                    "2nd image uploaded successfully, click on (choose image 3)"
                  );
                }}
                type="file"
                id="photo4"
                name="photo"
                accept="image/*"
                // name="file"
                defaultValue={image2}
              />
            </div>

            <div>
              <label
                className="inline-block px-2 py-1 mx-3 my-2 text-white bg-transparent bg-blue-800 border-2 border-black rounded cursor-pointer hover:bg-blue-900"
                onClick={() => setDisabled(!disabled)}
                htmlFor="photo5"
              >
                Choose image 3
              </label>
              <input
                className="hidden"
                onChange={(e) => {
                  handleInputChange5(e);
                  dispatch(uploadImage3Completed());
                  alert(
                    "3rd image uploaded successfully, click on submit button"
                  );
                }}
                type="file"
                id="photo5"
                name="photo"
                accept="image/*"
                // name="file"
                defaultValue={image3}
              />
            </div>

            <div>
              {!disabled && (
                <button
                  className="px-2 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded cursor-pointer hover:bg-green-900"
                  type="submit"
                  onClick={() => submit}
                >
                  Submit
                </button>
              )}
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
        </div>
      </div>
      <div className="mt-10 text-center text-red-500">
        ⚫Kindly do not refresh the page.
      </div>
      <div className="text-center text-red-500">
        ⚫Photo you upload must only be of jpg format.
      </div>
    </LoadingOverlay>
  );
};

UploadProductImages.defaultProps = {};

export default memo(UploadProductImages);
