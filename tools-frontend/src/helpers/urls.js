const API_ROOT = "/api/user";
// const API_ROOT = "http://localhost:8000/user";
export const APIUrls = {
  login: () => `${API_ROOT}/login/`,
  signup: () => `${API_ROOT}/create/`,
  // to send otp
  forgotPassword: () => `${API_ROOT}/forgot-password/`,
  // to resend otp
  forgotPasswordResend: () => `${API_ROOT}/forgot-password-resend/`,
  forgotPasswordCheck: () => `${API_ROOT}/forgot-password-check/`,
  // verification email
  emailVerification: () => `${API_ROOT}/verification/email-otp/`,
  emailVerificationCheck: () => `${API_ROOT}/verification/email-otp/check/`,
  forgotPasswordChangePassword: () => `${API_ROOT}/reset-password/`,
  // user change password with old password
  ChangePassword: () => `${API_ROOT}/change-password/`,
  // home
  home: () => `${API_ROOT}/home/`,
  // refresh token
  refresh: () => `${API_ROOT}/login/refresh/`,
  // refresh token
  logout: () => `${API_ROOT}/logout/`,

  //********************** posts

  // Fetch post according to status
  fetchPosts: (subject, status) =>
    `${API_ROOT}/post/fetch/?search=${subject}&status=${status}`,
  // create post
  createPost: () => `${API_ROOT}/post/create/`,
  // edit post
  editPost: (id) => `${API_ROOT}/post/update/${id}`,

  //********************** profile

  // update user profile
  updateProfile: (id) => `${API_ROOT}/profile-update/${id}`,
  // create user profile
  createProfile: () => `${API_ROOT}/profile/`,

  //********************** templates

  // create user template
  postUserTemplate: () => `${API_ROOT}/template/create/`,
  // fetch user template
  fetchUserTemplate: (title) => `${API_ROOT}/template/fetch/?search=${title}`,

  //********************** accounts
  socialAccountsLogin: (platform) => `${API_ROOT}/accounts/login/${platform}`,

  // userProfile: (userId) => `${API_ROOT}/users/${userId}`,
  // userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  // addFriend: (userId) =>
  //   `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  // removeFriend: (userId) =>
  //   `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  // createComment: () => `${API_ROOT}/comments/`,
  // toggleLike: (id, likeType) =>
  //   `${API_ROOT}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
  // userSearch: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};
