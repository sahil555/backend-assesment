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
} from "../actions/actionTypes";
const initialPostState = {
  posts: [],
  drafts: [],
  schedules: [],
  success: null,
};
export default function posts(state = initialPostState, action) {
  switch (action.type) {
    case CLEAR_POST_STATE:
      return {
        ...state,
        success: null,
      };
    case UPDATE_POSTS:
      return {
        ...state,
        success: null,
        posts: action.posts,
      };
    case UPDATE_DRAFTS:
      return {
        ...state,
        success: null,
        drafts: action.posts,
      };
    case UPDATE_SCHEDULE:
      return {
        ...state,
        success: null,
        schedules: action.posts,
      };

    case POST_CREATE_SUCCESS:
    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        success: action.success,
      };
    // case ADD_POST:
    //   return [action.post, ...state];
    // case ADD_COMMENT:
    // const newPosts = state.map((post) => {
    //   if (post._id === action.postId) {
    //     return {
    //       ...post,
    //       comments: [action.comment, ...post.comments],
    //     };
    //   }

    //   return post;
    // });
    // return newPosts;
    // case UPDATE_POST_LIKE:
    //   const updatedPosts = state.map((post) => {
    //     if (post._id === action.postId) {
    //       return {
    //         ...post,
    //         likes: [...post.likes, action.userId],
    //       };
    //     }

    //     return post;
    //   });
    //   return updatedPosts;
    default:
      return state;
  }
}
