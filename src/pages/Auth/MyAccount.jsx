import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  customerUpdatemeBegin,
  customerUpdatemeCompleted,
  loginActionBegin,
} from "../../actions/auth.actions";
import { changeCustomerPhoto } from "../../api/auth";
import { AUTH_TOKEN } from "../../api/base";
import { meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";
import { AiFillHome } from "react-icons/ai";

const MyAccount = () => {
  const dispatch = useDispatch();

  const customer = useAppSelector(meSelector);

  const [photo, setPhoto] = useState(undefined);
  const [disabled, setDisabled] = useState(true);

  const token = localStorage.getItem(AUTH_TOKEN);
  // const baseUrl = BASE_URL;
  const [previewSource, setPreviewSource] = useState();

  if (!customer && token) {
    return (
      <LoadingOverlay
        className="w-screen h-screen"
        active
        spinner
      ></LoadingOverlay>
    );
  }
  const imageName = customer?.photo;

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

  const submit = (e) => {
    e.preventDefault();
    // window.location.href = "/my-account";
    changeCustomerPhoto(photo).then((c) => {
      // authActions.updatemeCompleted(c);
      dispatch(customerUpdatemeCompleted(c));

      dispatch(loginActionBegin(c));
      window.location.href = "/my-account";
    });
  };

  return (
    <div className="flex flex-col justify-around w-screen h-screen font-bold bg-gray-100">
      <div className="flex justify-end mr-5">
        {customer?.role === "retailor" && (
          <Link className="cursor-default" to="/retailor-overview">
            <AiFillHome className="cursor-pointer hover:text-red-500"></AiFillHome>
          </Link>
        )}
        {customer?.role === "customer" && (
          <Link className="cursor-default" to="/products">
            <AiFillHome className="cursor-pointer hover:text-red-500"></AiFillHome>
          </Link>
        )}
      </div>
      <div className="text-4xl text-center ">My Account</div>

      <div className="flex flex-col justify-start mx-auto space-y-5 xxsm:text-xs xxsm:w-72 sm:w-96 sm:text-base">
        <div className="">
          NAME : <span className="text-blue-700">{customer?.name}</span>
        </div>
        <div>
          EMAIL: <span className="text-blue-700">{customer?.email}</span>
        </div>
        <div>
          ADDRESS: <span className="text-blue-700">{customer?.address}</span>
        </div>
        <div className="flex justify-center">
          {<img className="rounded-full" alt="customer" src={imageName} />}
        </div>
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
        <form onSubmit={submit}>
          <div className="text-center">
            {customer?.photo.startsWith("default") ? (
              <label
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded cursor-pointer hover:bg-red-900 w-28"
                onClick={() => setDisabled(!disabled)}
                htmlFor="photo"
              >
                Upload my photo
              </label>
            ) : (
              <label
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded cursor-pointer hover:bg-red-900 "
                onClick={() => setDisabled(!disabled)}
                htmlFor="photo"
              >
                Choose new photo
              </label>
            )}

            <input
              className="hidden"
              onChange={(e) => {
                handleInputChange(e);
                alert("click on submit button");
                dispatch(customerUpdatemeBegin());
              }}
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              // name="file"
              defaultValue={photo}
              // value={photo}
            />
            <div>
              {!disabled && (
                <button
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
                  type="submit"
                  onClick={() => submit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
        <div>
          ROLE: <span className="text-blue-700">{customer?.role}</span>
        </div>
      </div>
      <div className="flex justify-center sm:text-base xxsm:text-sm">
        <div className="flex items-center justify-end">
          <Link
            className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 "
            to="update-myaccount"
          >
            Update my credentials
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <Link
            className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 "
            to="/my-password"
          >
            Change My Password
          </Link>
        </div>
      </div>
    </div>
  );
};

MyAccount.defaultProps = {};

export default memo(MyAccount);
