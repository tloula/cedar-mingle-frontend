import {
  CLEAR_DATA,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_SECONDARY_UI,
  MARK_MESSAGES_READ,
  MARK_NOTIFICATIONS_READ,
  SET_AUTHENTICATED,
  SET_ERRORS,
  SET_SETTINGS,
  SET_NOTIFICATIONS,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_FORGOT_PASSWORD_SENT,
  STOP_LOADING_UI,
} from "../types";
import axios from "axios";
// Firebase
import { analytics } from "../../firebase";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      analytics.logEvent("login");
      let idToken = res.data.idToken;
      let refreshToken = res.data.refreshToken;
      setAuthorizationHeader(idToken, refreshToken);
      dispatch(getUserData());
      dispatch(getNotifications());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/profile");
    })
    .catch((err) => {
      analytics.logEvent("login_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      analytics.logEvent("signup");
      let idToken = res.data.idToken;
      let refreshToken = res.data.refreshToken;
      setAuthorizationHeader(idToken, refreshToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/profile");
    })
    .catch((err) => {
      analytics.logEvent("signup_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  analytics.logEvent("logout");
  localStorage.removeItem("FBIdToken");
  localStorage.removeItem("FBRefreshToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({ type: CLEAR_DATA });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/user")
    .then((res) => {
      analytics.logEvent("get_authenticated_user");
      analytics.setUserProperties({
        email: res.data.profile.email,
        gender: res.data.profile.gender,
        hometown: res.data.profile.hometown,
        major: res.data.profile.major,
        year: res.data.profile.year,
      });
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      analytics.logEvent("authenticated_user_error", { error: err });
      console.log(err);
    });
};

export const getNotifications = () => (dispatch) => {
  analytics.logEvent("get_notifications");
  axios
    .get("/notifications")
    .then((res) => {
      analytics.logEvent("get_notifications");
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      analytics.logEvent("get_notifications_error", { error: err });
      console.log(err);
    });
};

export const getSettings = () => (dispatch) => {
  axios
    .get("/settings")
    .then((res) => {
      analytics.logEvent("get_settings");
      dispatch({
        type: SET_SETTINGS,
        payload: res.data,
      });
    })
    .catch((err) => {
      analytics.logEvent("get_settings_error", { error: err });
      console.log(err);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_SECONDARY_UI });
  axios
    .post("/user/photo", formData)
    .then(() => {
      analytics.logEvent("upload_image");
      dispatch(getUserData());
    })
    .catch((err) => {
      analytics.logEvent("upload_image_error", { error: err });
      console.log(err);
    });
};

export const deleteImage = (photo) => (dispatch) => {
  axios
    .post("/user/photo/delete", photo)
    .then(() => {
      analytics.logEvent("delete_image");
    })
    .catch((err) => {
      analytics.logEvent("delete_image_error", { error: err });
      console.log(err);
    });
};

export const rearrangeImage = (originalImages) => () => {
  axios
    .post("/user/photo/rearrange", { images: originalImages })
    .then(() => {
      analytics.logEvent("rearrange_image");
    })
    .catch((err) => {
      analytics.logEvent("rearrange_image_error", { error: err });
      console.log(err);
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  axios
    .patch("/user", userDetails)
    .then(() => {
      analytics.logEvent("edit_profile");
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getUserData());
    })
    .catch((err) => {
      analytics.logEvent("edit_profile_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const editUserSettings = (userSettings) => (dispatch) => {
  axios
    .patch("/settings", userSettings)
    .then(() => {
      analytics.logEvent("edit_settings");
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getSettings());
    })
    .catch((err) => {
      analytics.logEvent("edit_settings_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const changePassword = (data) => (dispatch) => {
  axios
    .post("/password", data)
    .then(() => {
      analytics.logEvent("change_password");
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getSettings());
    })
    .catch((err) => {
      analytics.logEvent("change_password_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const forgotPassword = (email) => (dispatch) => {
  axios
    .post("/forgot", email)
    .then(() => {
      analytics.logEvent("forgot_password");
      dispatch({ type: SET_FORGOT_PASSWORD_SENT });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      analytics.logEvent("forgot_password_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      analytics.logEvent("mark_notifications_read");
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => {
      analytics.logEvent("mark_notifications_read_error", { error: err });
      console.log(err);
    });
};

export const markMessagesRead = (messageIds) => (dispatch) => {
  axios
    .post("/notifications", messageIds)
    .then((res) => {
      analytics.logEvent("mark_messages_read");
      dispatch({
        type: MARK_MESSAGES_READ,
      });
    })
    .catch((err) => {
      analytics.logEvent("mark_messages_read_error", { error: err });
      console.log(err);
    });
};

function setAuthorizationHeader(idToken, refreshToken) {
  const FBIdToken = `Bearer ${idToken}`;
  const FBRefreshToken = refreshToken;
  localStorage.setItem("FBIdToken", FBIdToken);
  localStorage.setItem("FBRefreshToken", FBRefreshToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
}
