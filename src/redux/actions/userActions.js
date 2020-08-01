import {
  CLEAR_DATA,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_SECONDARY_UI,
  MARK_MESSAGES_READ,
  MARK_NOTIFICATIONS_READ,
  SET_ERRORS,
  SET_SETTINGS,
  SET_NOTIFICATIONS,
  SET_UNAUTHENTICATED,
  SET_USER,
  STOP_LOADING_UI,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
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
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({ type: CLEAR_DATA });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const getNotifications = () => (dispatch) => {
  axios
    .get("/notifications")
    .then((res) => {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getSettings = () => (dispatch) => {
  axios
    .get("/settings")
    .then((res) => {
      dispatch({
        type: SET_SETTINGS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_SECONDARY_UI });
  axios
    .post("/user/photo", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const deleteImage = (photo) => (dispatch) => {
  axios.post("/user/photo/delete", photo).catch((err) => console.log(err));
};

export const rearrangeImage = (originalImages) => () => {
  axios
    .post("/user/photo/rearrange", { images: originalImages })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .patch("/user", userDetails)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getUserData());
    })
    .catch((err) => {
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
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getSettings());
    })
    .catch((err) => {
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
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};

export const markMessagesRead = (messageIds) => (dispatch) => {
  axios
    .post("/notifications", messageIds)
    .then((res) => {
      dispatch({
        type: MARK_MESSAGES_READ,
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
