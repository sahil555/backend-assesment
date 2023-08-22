import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTHENTICATE_USER,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
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
} from "../actions/actionTypes";

const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
  success: null,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
        success: null,
      };
    case PASSWORD_CHANGE_START:
    case OTP_VERIFY_START:
    case CHANGE_PASSWORD_START:
    case LOGIN_START:
    case SEND_OTP_RESEND_START:
    case SEND_OTP_START:
    case SEND_EMAIL_VERIFICATION_OTP_START:
    case SEND_EMAIL_VERIFICATION_CHECK_OTP_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
        inProgress: false,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedin: false,
        inProgress: false,
        error: null,
      };
    case PASSWORD_CHANGE_FAILED:
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        inProgress: false,
        success: null,
        error: action.error,
      };
    case OTP_VERIFY_FAILED:
      return {
        ...state,
        inProgress: false,
        success: null,
        error: action.error.error,
      };
    case SEND_OTP_RESEND_FAILED:
    case SEND_OTP_FAILED:
    case SEND_EMAIL_VERIFICATION_OTP_FAILED:
    case SEND_EMAIL_VERIFICATION_CHECK_OTP_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        success: null,
        error: action.error,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        success: null,
        error: action.error.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedin: false,
      };
    case EDIT_USER_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        error: false,
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        success: null,
        error: action.error,
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        isLoggedin: true,
        inProgress: false,
        error: null,
        success: action.success,
      };
    case CHANGE_PASSWORD_SUCCESS:
    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        isLoggedin: false,
        inProgress: false,
        error: null,
        success: action.success,
      };
    case SEND_OTP_RESEND_SUCCESSFULLY:
    case SEND_OTP_SUCCESSFULLY:
    case SEND_EMAIL_VERIFICATION_OTP_SUCCESSFULLY:
    case SEND_EMAIL_VERIFICATION_CHECK_OTP_SUCCESSFULLY:
      return {
        ...state,
        isLoggedin: false,
        inProgress: false,
        error: null,
        success: action.success,
      };
    default:
      return state;
  }
}
