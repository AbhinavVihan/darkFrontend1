import React, { FC, memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { resetPassword } from "../../api/auth";
import {
  meLoginAction,
  resetPasswordCompleted,
  resetPasswordForTokenBegin,
  resetPasswordForTokenCompleted,
  resetPasswordForTokenError,
} from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { loadingSelector, tokenSelector } from "../../selectors/auth.selectors";
import { useDispatch } from "react-redux";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const ResetPassword: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const loading = useAppSelector(loadingSelector);

  const token = useAppSelector(tokenSelector);
  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(password ? false : true);
  };
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const history = useHistory();

  const handleSubmit = (e: any) => {
    dispatch(resetPasswordForTokenBegin());
    e.preventDefault();
    resetPassword({ password: value1, passwordConfirm: value2 }, token)
      .then((c) => {
        // authActions.passwordChanged(c);
        dispatch(resetPasswordCompleted(c!));
        // authActions.login(c);
        dispatch(meLoginAction(c!));
        dispatch(resetPasswordForTokenCompleted());
        history.push("/products");
      })
      .catch((e) => {
        history.push("/forgot-password");
        dispatch(resetPasswordForTokenError());
      });
  };
  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  // useEffect(() => {
  //   if (token === 1) {
  //     alert(
  //       "you must've refreshed the page or came to this page directly , kindly restart the process again"
  //     );
  //     history.push("/forgot-password");
  //   }
  // });

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      ;
      <div className="flex flex-col items-center pt-8 space-y-28">
        <div className="flex flex-col space-y-14">
          <div className="space-y-4 ">
            <h1 className="text-4xl text-center">Reset your Password here</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center mb-10 space-y-8 text-center">
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                // id="newPassword"
                // error={errors.password}
                // touched={touched.password}
                value={value1}
                onChange={(e) => {
                  setValue1(e.target.value);
                }}
                required
                // {...getFieldProps("password")}
                placeholder="new password"
              />

              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                type={password ? "text" : "password"}
                // error={errors.passwordConfirm}
                // touched={touched.passwordConfirm}
                value={value2}
                onChange={(e) => {
                  setValue2(e.target.value);
                }}
                autoComplete="off"
                required
                // {...getFieldProps("confirmPassword")}
                placeholder="confirm new password"
              />
            </div>

            <div className="flex justify-center text-center sm:items-center sm:space-x-28">
              <div className="flex items-center justify-center space-x-1 text-center">
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  // disabled={!isValid}
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                >
                  Reset
                </button>
              </div>
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

ResetPassword.defaultProps = {};

export default memo(ResetPassword);
