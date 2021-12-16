import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  meLoginAction,
  updateMyCredentialsBegin,
  updateMyCredentialsCompleted,
  updateMyCredentialsError,
} from "../../actions/auth.actions";
import { updateMe } from "../../api/auth";

import { loadingSelector, meSelector } from "../../selectors/auth.selectors";
import { useAppSelector } from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";

const UpdateMyAccount = () => {
  const customer = useAppSelector(meSelector);
  const [name, setName] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [address, setAddress] = useState(customer?.address);
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useAppSelector(loadingSelector);

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(updateMyCredentialsBegin(customer!._id));
    updateMe(customer!._id, { name, email, address })
      .then((c) => {
        dispatch(meLoginAction(c!));
        dispatch(updateMyCredentialsCompleted(c!));
        // window.location.href = "/my-account";
        history.push("/my-account");
      })
      .catch((e) => {
        dispatch(updateMyCredentialsError(e));
        history.push("/my-account");
      });
  };

  return (
    <LoadingOverlay className="w-screen h-screen" active={loading} spinner>
      <div className="flex flex-col items-center justify-center w-screen pt-8 space-y-10">
        <div className="flex flex-col space-y-14">
          <div className="space-y-4 ">
            <h1 className="text-4xl">Update Your credentials here.</h1>
          </div>
          <form className="space-y-8" onSubmit={(e) => submit(e)}>
            <div>
              Name:
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              Email:
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              Address:
              <input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28">
                {" "}
                Submit
              </button>
              <button
                onClick={() => history.push("/my-account")}
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-red-800 border-2 border-black rounded hover:bg-red-900 w-28"
              >
                {" "}
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

UpdateMyAccount.defaultProps = {};

export default memo(UpdateMyAccount);
