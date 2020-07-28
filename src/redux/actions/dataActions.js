import {
  CLEAR_ERRORS,
  LIKE_USER,
  LOADING_UI,
  LOADING_SECONDARY_UI,
  MARK_MESSAGES_READ,
  SET_CONVERSATION,
  SET_CONVERSATIONS,
  SET_ERRORS,
  SET_EXPLORE,
  SET_MATCHES,
  SET_MESSAGE,
  SET_PROFILE,
  SET_REPORT_USER,
  SET_VERIFICATION_RESENT,
  STOP_LOADING_UI,
} from "../types";
import axios from "axios";

// Get Any User
export const getUserData = (uid) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/user/${uid}`)
    .then((res) => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data.profile,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(() => {
      dispatch({
        type: SET_PROFILE,
        payload: null,
      });
    });
};

// Explore
export const getExplore = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/explore")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_EXPLORE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like
export const likeUser = (uid) => (dispatch) => {
  dispatch({ type: LOADING_SECONDARY_UI });
  axios
    .get(`/explore/${uid}/like`)
    .then((res) => {
      if (res.data.match !== true) {
        // Explore again
        dispatch({ type: LOADING_UI });
        axios
          .get("/explore")
          .then((res) => {
            dispatch({ type: CLEAR_ERRORS });
            dispatch({
              type: SET_EXPLORE,
              payload: res.data,
            });
            dispatch({ type: STOP_LOADING_UI });
          })
          .catch((err) => {
            dispatch({
              type: SET_ERRORS,
              payload: err.response.data,
            });
          });
      }
      dispatch({
        type: LIKE_USER,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Pass
export const passUser = (uid) => (dispatch) => {
  dispatch({ type: LOADING_SECONDARY_UI });
  axios
    .get(`/explore/${uid}/pass`)
    .then((res) => {
      // Explore again
      axios
        .get("/explore")
        .then((res) => {
          dispatch({ type: CLEAR_ERRORS });
          dispatch({
            type: SET_EXPLORE,
            payload: res.data,
          });
          dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => {
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
          });
        });
    })
    .catch((err) => console.log(err));
};

// Matches
export const getMatches = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/matches")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_MATCHES,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Unmatch User
export const unmatchUser = (match) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/matches", match)
    .then((res) => {
      axios
        .get("/matches")
        .then((res) => {
          dispatch({ type: CLEAR_ERRORS });
          dispatch({
            type: SET_MATCHES,
            payload: res.data,
          });
          dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => {
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get All Conversations
export const getConversations = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/conversations")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_CONVERSATIONS,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get Specific conversation
export const getConversation = (uid) => (dispatch) => {
  axios
    .get(`/conversations/${uid}`)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_CONVERSATION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Send Message
export const sendMessage = (message) => (dispatch) => {
  axios
    .post(`/conversations`, message)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_MESSAGE });
      dispatch(getConversation(message.uid));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Mark Messages Read
export const markMessagesRead = (messageIds) => (dispatch) => {
  axios
    .post("/messages", messageIds)
    .then((res) => {
      dispatch({
        type: MARK_MESSAGES_READ,
      });
    })
    .catch((err) => console.log(err));
};

// Resend Verification Email
export const resendVerification = () => (dispatch) => {
  axios
    .post("/resendVerification")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_VERIFICATION_RESENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Report User
export const reportUser = (report) => (dispatch) => {
  axios
    .post("/report", report)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_REPORT_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
