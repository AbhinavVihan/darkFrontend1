import { useFormik } from "formik";
import React, { FC, memo } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/input";
import { forgotPassword } from "../../api/auth";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

const ForgotPasswordForRetilor: FC<Props> = (props) => {
  const history = useHistory();

  const {
    handleSubmit,
    getFieldProps,
    isValid,
    touched,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
    }),
    onSubmit: (data) => {
      forgotPassword(data)
        .then((m) => {
          alert(m);
          history.push("/token");
        })
        .catch((e) => {
          alert("there is no such user");
          window.location.href = "/forgot-password";
        });
    },
  });

  return (
    <LoadingOverlay className="" active={isSubmitting} spinner>
      <div className="flex flex-col items-center pt-8 space-y-28">
        <div className="flex flex-col space-y-14">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl">
              FORGOT YOUR PASSWORD, No Worries, RESET IT HERE
            </h1>

            <div className="text-center">
              <h2>New Here?</h2>
              <Link
                to="/retailor-signup"
                className="text-blue-600 underline hover:text-red-400"
              >
                Create a retailor's account
              </Link>
            </div>
            <div className="text-center">
              {" "}
              <Link
                to="/retailor-login"
                className="text-blue-600 underline hover:text-red-400"
              >
                Login to your retailor account
              </Link>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="text-center">
              <Input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="email"
                error={errors.email}
                touched={touched.email}
                required
                {...getFieldProps("email")}
                placeholder="email address"
              />
            </div>

            <div className="text-center space-x-28">
              <button
                className="px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                type="submit"
                disabled={!isValid}
              >
                {" "}
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="text-center ">
          <p>
            © 2021 All Rights Reserved. DARK is a product of Designreset. Cookie
            Preferences, Privacy, and Terms.
          </p>
        </div>
      </div>
    </LoadingOverlay>
  );
};

ForgotPasswordForRetilor.defaultProps = {};

export default memo(ForgotPasswordForRetilor);
