import React, { FC, memo, useState } from "react";
import { loggedinResetResetPassword } from "../../api/auth";
import {
  loggedinResetPasswordBegin,
  loggedinResetPasswordCompleted,
  meLoginAction,
} from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { loadingSelector } from "../../selectors/auth.selectors";
import LoadingOverlay from "react-loading-overlay-ts";
import { useDispatch } from "react-redux";

interface Props {}

const LoggedinResetPassword: FC<Props> = (props) => {
  const loading = useAppSelector(loadingSelector);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    loggedinResetResetPassword({
      passwordCurrent: value1,
      password: value2,
      passwordConfirm: value3,
    })
      .then((c) => {
        // authActions.loggedinPasswordChangeCompleted();
        dispatch(loggedinResetPasswordCompleted());
        // authActions.login(c);
        dispatch(meLoginAction(c!));
        alert("your password has been successfully changed");
        window.location.href = "/my-account";
      })
      .catch((e) => {
        alert(
          "you must've entered mismatched passwords or your current password is wrong, kindly try again"
        );
        window.location.href = "/my-account";
      });
  };

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div className="flex flex-col items-center justify-center pt-8 space-y-28">
        <div className="flex flex-col space-y-14">
          <div className="space-y-4 ">
            <h1 className="text-4xl">Change your Password</h1>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="text"
                value={value1}
                type="password"
                onChange={(e) => {
                  setValue1(e.target.value);
                }}
                required
                placeholder="Current Password"
              />
            </div>
            <div>
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="text"
                value={value2}
                onChange={(e) => {
                  setValue2(e.target.value);
                }}
                required
                placeholder="new password"
              />
            </div>
            <div>
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="password"
                type="password"
                value={value3}
                onChange={(e) => {
                  setValue3(e.target.value);
                }}
                required
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex items-center justify-center space-x-28">
              <button
                onClick={() => dispatch(loggedinResetPasswordBegin())}
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
                type="submit"
              >
                {" "}
                Submit
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

LoggedinResetPassword.defaultProps = {};

export default memo(LoggedinResetPassword);
