import { useFormik } from "formik";
import React, { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { resetPasswordBegin } from "../../actions/auth.actions";
import { useDispatch } from "react-redux";

interface Props {}

const BeforeSettingPassword: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { handleSubmit, getFieldProps, isValid } = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: yup.object().shape({
      token: yup.string().required(),
    }),
    onSubmit: (data) => {
      dispatch(resetPasswordBegin(data));
      // authActions.password(data);
      history.push("/resetPassword");
    },
  });

  return (
    <div className="flex flex-col items-center pt-8 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl">Enter your token here</h1>
        </div>
        <div className="text-green-500">
          ‣ You must enter the token sent to your email in the input given below
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="text-center">
            <input
              className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
              id="token"
              required
              {...getFieldProps("token")}
              placeholder="token"
            />
          </div>

          <div className="flex items-center justify-center ">
            <button
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
              type="submit"
              disabled={!isValid}
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
  );
};

BeforeSettingPassword.defaultProps = {};

export default memo(BeforeSettingPassword);
