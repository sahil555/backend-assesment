import {
  UPDATE_POSTS,
  UPDATE_DRAFTS,
  UPDATE_SCHEDULE,
  // ADD_POST,
  POST_CREATE_SUCCESS,
  POST_UPDATE_SUCCESS,
  CLEAR_POST_STATE,
  // ADD_COMMENT,
  // UPDATE_POST_LIKE,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getAuthAccessTokenFromCookie } from "../helpers/utils";

// fetch posts
export function fetchPosts(subject, status) {
  return (dispatch) => {
    const url = APIUrls.fetchPosts(subject, status);
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthAccessTokenFromCookie()}`,
      },
    });
    response.then(function (data) {
      if (!data.ok) {
        data.json().then(function (error) {
          console.log("error", error);
        });
      } else {
        data.json().then(function (data) {
          if (status === "post") {
            dispatch(updatePosts(data));
          }
          if (status === "draft") {
            dispatch(updateDafts(data));
          }
          if (status === "schedule") {
            dispatch(updateSchedule(data));
          }
        });
      }
    });
  };
}
export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
export function updateDafts(posts) {
  return {
    type: UPDATE_DRAFTS,
    posts,
  };
}
export function updateSchedule(posts) {
  return {
    type: UPDATE_SCHEDULE,
    posts,
  };
}
export function updateSuccess(success) {
  return {
    type: POST_UPDATE_SUCCESS,
    success,
  };
}
export function createSuccess(success) {
  return {
    type: POST_CREATE_SUCCESS,
    success,
  };
}
// export function addPost(post) {
//   return {
//     type: ADD_POST,
//     post,
//   };
// }
// create post
export function createPost(content) {
  const formData = new FormData();
  formData.append("image", content.image);
  formData.append("post_scheduled", content.post_scheduled);
  formData.append("status", content.status);
  formData.append("title", content.title);
  formData.append("caption", content.caption);
  return (dispatch) => {
    const url = APIUrls.createPost();
    const response = fetch(url, {
      method: "POST",
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
          // dispatch(signupFailed({ error }));
        });
      } else {
        data.json().then(function (data) {
          dispatch(createSuccess("Post Created Successfully"));
        });
      }
    });
  };
}

// edit post
export function editPost(content) {
  const formData = new FormData();
  if (typeof content.image !== "string") {
    formData.append("image", content.image);
  }
  formData.append("post_scheduled", content.post_scheduled);
  formData.append("status", content.status);
  formData.append("title", content.title);
  formData.append("caption", content.caption);
  return (dispatch) => {
    const url = APIUrls.editPost(content.u_id);
    const response = fetch(url, {
      method: typeof content.image === "string" ? "PATCH" : "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAuthAccessTokenFromCookie()}`,
      },
      body: formData,
    });
    response.then(function (data) {
      // console.log("response", response);
      if (!data.ok) {
        data.json().then(function (error) {
          console.log("error", error);
        });
      } else {
        data.json().then(function (data) {
          dispatch(updateSuccess("Post Updated Successfully"));
        });
      }
    });
  };
}
export function clearPostState() {
  return {
    type: CLEAR_POST_STATE,
  };
}
// export function createComment(content, postId) {
//   return (dispatch) => {
//     const url = APIUrls.createComment();
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//       },
//       body: getFormBody({ content, post_id: postId }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           dispatch(addComment(data.data.comment, postId));
//         }
//       });
//   };
// }

// export function addComment(comment, postId) {
//   return {
//     type: ADD_COMMENT,
//     comment,
//     postId,
//   };
// }

// export function addLike(id, likeType, userId) {
//   return (dispatch) => {
//     const url = APIUrls.toggleLike(id, likeType);

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('LIKE DATA', data);

//         if (data.success) {
//           dispatch(addLikeToStore(id, userId));
//         }
//       });
//   };
// }

// export function addLikeToStore(postId, userId) {
//   return {
//     type: UPDATE_POST_LIKE,
//     postId,
//     userId,
//   };
// }
