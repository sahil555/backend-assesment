import {
  // USER_PROFILE_SUCCESS,
  // USER_PROFILE_FAILURE,
  // FETCH_USER_PROFILE,
  UPDATE_USER_PROFILE_START,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getAuthAccessTokenFromCookie } from "../helpers/utils";

// update user profile
export function startUserProfileUpdate() {
  return {
    type: UPDATE_USER_PROFILE_START,
  };
}

export function userProfileUpdateSuccess(user) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileUpdateFailed(error) {
  return {
    type: UPDATE_USER_PROFILE_FAILED,
    error,
  };
}

export function updateUserProfile(data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append("state", data.state);
  formData.append("description", data.description);
  formData.append("address", data.address);
  formData.append("gender", data.gender);
  formData.append("pincode", data.pincode);
  if (data.cover_picture) {
    formData.append("cover_picture", data.cover_picture);
  }
  if (data.user_picture) {
    formData.append("user_picture", data.user_picture);
  }
  return (dispatch) => {
    dispatch(startUserProfileUpdate());
    const url = APIUrls.updateProfile(data.profile_id);
    const response = fetch(url, {
      method: "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAuthAccessTokenFromCookie()}`,
      },
      body: formData,
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          console.log("error", error);
          dispatch(userProfileUpdateFailed({ error: "Updation failed" }));
        });
      } else {
        data.json().then(function (data) {
          dispatch(userProfileUpdateSuccess(data));
        });
      }
    });
  };
}

// export function startUserProfileFetch() {
//   return {
//     type: FETCH_USER_PROFILE,
//   };
// }

// export function userProfileSuccess(user) {
//   return {
//     type: USER_PROFILE_SUCCESS,
//     user,
//   };
// }

// export function userProfileFailed(error) {
//   return {
//     type: USER_PROFILE_FAILURE,
//     error,
//   };
// }

// export function fetchUserProfile(userId) {
//   return (dispatch) => {
//     dispatch(startUserProfileFetch());

//     const url = APIUrls.userProfile(userId);
//     fetch(url, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch(userProfileSuccess(data.data.user));
//       });
//   };
// }
