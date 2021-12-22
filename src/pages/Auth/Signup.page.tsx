import { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { signup } from "../../api/auth";
import LoadingOverlay from "react-loading-overlay-ts";

import {
  meLoginAction,
  signupBegin,
  signupComplete,
  signupError,
} from "../../actions/auth.actions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { loadingSelector } from "../../selectors/auth.selectors";

const Signup = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector(loadingSelector);

  const history = useHistory();
  const [password, setPassword] = useState(false);

  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
      role: "customer",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
      passwordConfirm: yup.string().required().min(8),
      address: yup.string().required(),
      role: yup.string().required(),
    }),
    onSubmit: (data) => {
      dispatch(signupBegin());
      signup(data)
        .then((c) => {
          // authActions.login(c);
          dispatch(meLoginAction(c!));
          dispatch(signupComplete());
          alert("signed up successfully");
          history.push("/products");
        })
        .catch((e) => {
          dispatch(signupError());
        });
    },
  });

  return (
    <LoadingOverlay className="w-full h-full" active={loading} spinner>
      <div className="flex flex-col items-center pt-8">
        <div className="flex flex-col space-y-6">
          <div className="space-y-4 ">
            <h1 className="text-2xl text-center lg:text-2xl sm:text-2xl">
              Get started with a free account
            </h1>

            <div className="text-center ">
              <h2>Already have an account?</h2>
              <Link
                to="/login"
                className="text-blue-600 underline hover:text-red-500"
              >
                Log In
              </Link>
            </div>
          </div>

          <form className="space-y-8 text-center" onSubmit={handleSubmit}>
            <div>
              <div className="text-left xxsm:invisible sm:visible sm:w-96 md:w-96 lg:w-96">
                Name:
              </div>
              <input
                className="h-10 border-2 border-black rounded xxsm:w-60 sm:w-96 md:w-96 lg:w-96"
                id="name"
                type="name"
                autoComplete="name"
                {...getFieldProps("name")}
                required
                placeholder="name"
              />
            </div>

            <div>
              <div className="text-left xxsm:invisible sm:visible sm:w-96 md:w-96 lg:w-96">
                Email:
              </div>
              <input
                className="h-10 border-2 border-black rounded xxsm:w-60 sm:w-96 md:w-96 lg:w-96"
                id="email"
                type="email"
                autoComplete="email"
                {...getFieldProps("email")}
                required
                placeholder="email"
              />
            </div>

            <div>
              <div className="text-left xxsm:invisible sm:visible sm:w-96 md:w-96 lg:w-96">
                Password:
              </div>
              <input
                className="h-10 border-2 border-black rounded xxsm:w-60 sm:w-96 md:w-96 lg:w-96"
                id="password"
                type={password ? "text" : "password"}
                autoComplete="current-password"
                {...getFieldProps("password")}
                required
                placeholder="password"
              />
            </div>

            <div>
              <div className="text-left xxsm:invisible sm:visible sm:w-96 md:w-96 lg:w-96">
                Confirm Password
              </div>
              <input
                className="h-10 border-2 border-black rounded xxsm:w-60 sm:w-96 md:w-96 lg:w-96"
                id="passwordConfirm"
                type="password"
                autoComplete="off"
                {...getFieldProps("passwordConfirm")}
                required
                placeholder="passwordConfirm"
              />
            </div>

            <div>
              <div className="text-left xxsm:invisible sm:visible sm:w-96 md:w-96 lg:w-96">
                Address:
              </div>
              <input
                className="h-10 border-2 border-black rounded xxsm:w-60 sm:w-96 md:w-96 lg:w-96"
                id="address"
                type="address"
                autoComplete="off"
                {...getFieldProps("address")}
                required
                placeholder="address"
              />
            </div>
            <div className="hidden">
              role:{" "}
              <input
                className="h-10 border-2 border-black rounded xxsm:w-60 sm:w-96 md:w-96 lg:w-96"
                id="role"
                type="role"
                autoComplete="off"
                {...getFieldProps("role")}
                required
                value="customer"
              />
            </div>

            <div className="flex justify-center text-center sm:items-center sm:space-x-28">
              <div className="flex items-center">
                <label htmlFor="tick" className="cursor-pointer">
                  Show Password
                </label>
                <input
                  className="cursor-pointer"
                  id="tick"
                  onClick={togglePassword}
                  type="checkbox"
                />
              </div>

              <button
                className="inline-block px-0 py-1 mx-3 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900"
                type="submit"
              >
                Get started
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

Signup.defaultProps = {};

export default memo(Signup);
