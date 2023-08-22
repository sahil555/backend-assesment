import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE,
  UPDATE_USER_PROFILE_START,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
} from "../actions/actionTypes";

const initalProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};
export default function profile(state = initalProfileState, action) {
  switch (action.type) {
    case UPDATE_USER_PROFILE_SUCCESS:
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.user,
        inProgress: false,
      };
    case UPDATE_USER_PROFILE_FAILED:
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        success: null,
        error: action.error,
        inProgress: false,
      };
    case UPDATE_USER_PROFILE_START:
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
}
