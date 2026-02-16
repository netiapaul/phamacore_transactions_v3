//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
// import { postJwtLogin } from "../../../helpers/fakebackend_helper";

import {
  loginSuccess,
  // logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";
import { postJwtLogin, postJwtLogout } from "../../../services/auth";
import { parseApiError } from "../../../utils/api_error";

export const loginUser = (user: any, history: any) => async (dispatch: any) => {
  try {
    let response = postJwtLogin({
      username: user.username,
      password: user.password,
    });

    var data = await response;

    if (Object.keys(data).length) {
      // sessionStorage.setItem("authUser", JSON.stringify(data["user"]));
      localStorage.setItem("authUser", JSON.stringify(data));
      // localStorage.setItem("token", JSON.stringify(data["token"]));
      // dispatch(loginSuccess(data));
      history("/dashboard", { replace: true });
      // if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      //   var finallogin: any = JSON.stringify(data);
      //   finallogin = JSON.parse(finallogin);
      //   data = finallogin.data;
      //   if (finallogin.status === "success") {
      //     dispatch(loginSuccess(data));
      //     history("/dashboard");
      //   } else {
      //     dispatch(apiError(finallogin));
      //   }
      // } else {

      // }
    }
  } catch (error) {
    let message = parseApiError(error as any);
    dispatch(apiError(message));
  }
};

export const logoutUser = () => async () => {
  try {
    localStorage.clear();

    let response = postJwtLogout();

    let data = await response;

    console.log(data);
  } catch (error) {
    console.log(error);
    // dispatch(apiError(error));
  }
};

export const socialLogin =
  (type: any, history: any) => async (dispatch: any) => {
    try {
      let response;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const fireBaseBackend: any = getFirebaseBackend();
        response = fireBaseBackend.socialLoginUser(type);
      }
      //  else {
      //   response = postSocialLogin(data);
      // }

      const socialdata = await response;
      if (socialdata) {
        sessionStorage.setItem("authUser", JSON.stringify(response));
        dispatch(loginSuccess(response));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(apiError(error));
    }
  };

export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
