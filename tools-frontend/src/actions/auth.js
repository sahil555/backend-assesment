import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  CLEAR_AUTH_STATE,
  // EDIT_USER_SUCCESSFUL,
  SEND_OTP_START,
  SEND_OTP_FAILED,
  SEND_OTP_SUCCESSFULLY,
  SEND_OTP_RESEND_START,
  SEND_OTP_RESEND_FAILED,
  SEND_OTP_RESEND_SUCCESSFULLY,
  OTP_VERIFY_START,
  OTP_VERIFY_FAILED,
  OTP_VERIFY_SUCCESS,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  SEND_EMAIL_VERIFICATION_OTP_START,
  SEND_EMAIL_VERIFICATION_OTP_FAILED,
  SEND_EMAIL_VERIFICATION_OTP_SUCCESSFULLY,
  SEND_EMAIL_VERIFICATION_CHECK_OTP_START,
  SEND_EMAIL_VERIFICATION_CHECK_OTP_FAILED,
  SEND_EMAIL_VERIFICATION_CHECK_OTP_SUCCESSFULLY,
  PASSWORD_CHANGE_START,
  PASSWORD_CHANGE_FAILED,
  PASSWORD_CHANGE_SUCCESS,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import {
  getFormBody,
  getAuthAccessTokenFromCookie,
  getAuthRefreshTokenFromCookie,
  removeAuthAccessTokenFromCookie,
  removeAuthRefreshTokenFromCookie,
} from "../helpers/utils";
// ############### login begin #####################
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ username: email, password }),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(loginFailed(error.detail));
        });
      } else {
        data.json().then(function (data) {
          var now = new Date();
          now.setTime(now.getTime() + 1 * 3600 * 1000);
          var refreshexpire = new Date();
          refreshexpire.setTime(now.getTime() + 23 * 3600 * 1000);
          let access = data.access;
          let refresh = data.refresh;
          document.cookie = `access_token=${access}; expires=${now}`;
          document.cookie = `refresh_token=${refresh}; expires=${refreshexpire}`;
          dispatch(loginSuccess(data));
        });
      }
    });
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: getFormBody({ username: email, password }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("data", data);
    //     console.log("!data.detail", !data.detail);
    //     if (!data.detail) {
    //       // dispatch action to save user
    //       localStorage.setItem("access_token", data.access);
    //       localStorage.setItem("refresh_token", data.refresh);
    //       dispatch(loginSuccess(data.user));
    //       return;
    //     }
    //     dispatch(loginFailed(data.detail));
    //   });
  };
}
// ################# end login #########################
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}
// logout
export function logoutUserSuccess() {
  return {
    type: LOG_OUT,
  };
}
export function logoutUser() {
  return (dispatch) => {
    const url = APIUrls.logout();
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthAccessTokenFromCookie()}`,
      },
      body: JSON.stringify({ refresh_token: getAuthRefreshTokenFromCookie() }),
    });
    response.then(function (data) {
      if (data.status === 205) {
        removeAuthAccessTokenFromCookie();
        removeAuthRefreshTokenFromCookie();
        dispatch(logoutUserSuccess());
      }
    });
  };
}

// sign up
export function startSingup() {
  return {
    type: SIGNUP_START,
  };
}
export function signupFailed(data) {
  return {
    type: SIGNUP_FAILED,
    error: data,
  };
}
export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
export function signup(data) {
  return (dispatch) => {
    dispatch(startSingup());
    const url = APIUrls.signup();
    // axios
    //   .post(url, data)
    //   .then(function (response) {
    //     console.log("response", response);
    //     if (response.status === 201) {
    //       console.log("response", response);
    //       dispatch(signupSuccessful(data));
    //     } else {
    //       console.log("response", response);
    //       dispatch(signupFailed(data));

    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody(data),
    });
    response
      .then(function (data) {
        if (!data.ok) {
          data.json().then(function (error) {
            dispatch(signupFailed({ error }));
          });
        } else {
          data.json().then(function (data) {
            dispatch(signupSuccessful(data));
          });
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
}

// sign up email verification
export function emailVerificationStart() {
  return {
    type: SEND_EMAIL_VERIFICATION_OTP_START,
  };
}
export function emailVerificationFailed(error) {
  return {
    type: SEND_EMAIL_VERIFICATION_OTP_FAILED,
    error,
  };
}
export function emailVerificationSuccessfully(success) {
  return {
    type: SEND_EMAIL_VERIFICATION_OTP_SUCCESSFULLY,
    success,
  };
}
export function emailVerificationOTP(email) {
  return (dispatch) => {
    dispatch(emailVerificationStart());
    const url = APIUrls.emailVerification();
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(emailVerificationCheckFailed(error.Error.email[0]));
        });
      } else {
        data.json().then(function (data) {
          dispatch(emailVerificationCheckSuccessfully(data.Message));
        });
      }
    });
  };
}

// sign up email  verification check
export function emailVerificationCheckStart() {
  return {
    type: SEND_EMAIL_VERIFICATION_CHECK_OTP_START,
  };
}
export function emailVerificationCheckFailed(error) {
  return {
    type: SEND_EMAIL_VERIFICATION_CHECK_OTP_FAILED,
    error,
  };
}
export function emailVerificationCheckSuccessfully(success) {
  return {
    type: SEND_EMAIL_VERIFICATION_CHECK_OTP_SUCCESSFULLY,
    success,
  };
}
export function emailVerificationOTPCheck(data) {
  return (dispatch) => {
    dispatch(emailVerificationCheckStart());
    const url = APIUrls.emailVerificationCheck();
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(emailVerificationCheckFailed({ error: error.Error }));
        });
      } else {
        data.json().then(function (data) {
          dispatch(emailVerificationCheckSuccessfully(data.verified));
        });
      }
    });
  };
}

// forgot password OTP Sent
export function forgotPasswordStart() {
  return {
    type: SEND_OTP_START,
  };
}
export function forgotPasswordFailed(error) {
  return {
    type: SEND_OTP_FAILED,
    error,
  };
}
export function forgotPasswordSuccessfully(success) {
  return {
    type: SEND_OTP_SUCCESSFULLY,
    success,
  };
}
export function forgotPassword(email) {
  return (dispatch) => {
    dispatch(forgotPasswordStart());
    const url = APIUrls.forgotPassword();
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(forgotPasswordFailed(error.Error.email[0]));
        });
      } else {
        data.json().then(function (data) {
          dispatch(forgotPasswordSuccessfully(data.Message));
        });
      }
    });
  };
}

// forgot password resend otp
export function forgotPasswordResendStart() {
  return {
    type: SEND_OTP_RESEND_START,
  };
}
export function forgotPasswordResendFailed(error) {
  return {
    type: SEND_OTP_RESEND_FAILED,
    error,
  };
}
export function forgotPasswordResendSuccessfully(success) {
  return {
    type: SEND_OTP_RESEND_SUCCESSFULLY,
    success,
  };
}
export function forgotPasswordResend(email) {
  return (dispatch) => {
    dispatch(forgotPasswordResendStart());
    const url = APIUrls.forgotPasswordResend();
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(forgotPasswordResendFailed(error.Error.email[0]));
        });
      } else {
        data.json().then(function (data) {
          dispatch(forgotPasswordResendSuccessfully(data.Message));
        });
      }
    });
  };
}

// forgot password OTP verify
export function forgotPasswordVerifyStart() {
  return {
    type: OTP_VERIFY_START,
  };
}
export function forgotPasswordVerifyFailed(error) {
  return {
    type: OTP_VERIFY_FAILED,
    error,
  };
}
export function forgotPasswordVerifySuccess(success) {
  return {
    type: OTP_VERIFY_SUCCESS,
    success,
  };
}
export function forgotPasswordOTPVerification(data) {
  return (dispatch) => {
    dispatch(forgotPasswordVerifyStart());
    const url = APIUrls.forgotPasswordCheck();
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(forgotPasswordVerifyFailed({ error: error.Error }));
        });
      } else {
        data.json().then(function (data) {
          dispatch(forgotPasswordVerifySuccess(data.verified));
        });
      }
    });
  };
}

// forgot password Change Password
export function forgotPasswordChangePasswordStart() {
  return {
    type: CHANGE_PASSWORD_START,
  };
}
export function forgotPasswordChangePasswordFailed(error) {
  return {
    type: CHANGE_PASSWORD_FAILED,
    error,
  };
}
export function forgotPasswordChangePasswordSuccess(success) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    success,
  };
}
export function forgotPasswordChangePassword(data) {
  return (dispatch) => {
    dispatch(forgotPasswordChangePasswordStart());
    const url = APIUrls.forgotPasswordChangePassword();
    const response = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(
            forgotPasswordChangePasswordFailed(error.Error.new_password[0])
          );
        });
      } else {
        data.json().then(function (data) {
          dispatch(forgotPasswordChangePasswordSuccess(data.message));
        });
      }
    });
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

// Change Password with old password
export function userChangePasswordStart() {
  return {
    type: PASSWORD_CHANGE_START,
  };
}
export function userChangePasswordFailed(error) {
  return {
    type: PASSWORD_CHANGE_FAILED,
    error,
  };
}
export function userChangePasswordSuccess(success) {
  return {
    type: PASSWORD_CHANGE_SUCCESS,
    success,
  };
}

export function userChangePassword(data) {
  return (dispatch) => {
    dispatch(userChangePasswordStart());
    const url = APIUrls.ChangePassword();
    const response = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthAccessTokenFromCookie()}`,
      },
      body: JSON.stringify(data),
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          dispatch(userChangePasswordFailed(error.Error));
        });
      } else {
        data.json().then(function (data) {
          dispatch(userChangePasswordSuccess(data.message));
        });
      }
    });
  };
}
// export function editUserSuccessful(user) {
//   return {
//     type: EDIT_USER_SUCCESSFUL,
//     user,
//   };
// }

// export function editUserFailed(error) {
//   return {
//     type: EDIT_USER_SUCCESSFUL,
//     error,
//   };
// }

// export function editUser(name, password, confirmPassword, userId) {
//   return (dispatch) => {
//     const url = APIUrls.editProfile();

//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//       },
//       body: getFormBody({
//         name,
//         password,
//         confirm_password: confirmPassword,
//         id: userId,
//       }),
//     })
//       .then((repsonse) => repsonse.json())
//       .then((data) => {
//         console.log("EDIT PROFIle data", data);
//         if (data.success) {
//           dispatch(editUserSuccessful(data.data.user));

//           if (data.data.token) {
//             localStorage.setItem("token", data.data.token);
//           }
//           return;
//         }
//         dispatch(editUserFailed(data.message));
//       });
//   };
// }
