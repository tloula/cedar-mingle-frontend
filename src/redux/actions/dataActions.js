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
// Firebase
import { analytics } from "../../firebase";

// Get Any User
export const getUserData = (uid) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/user/${uid}`)
    .then((res) => {
      analytics.logEvent("get_user");
      dispatch({
        type: SET_PROFILE,
        payload: res.data.profile,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      analytics.logEvent("get_user_error", { error: err });
      console.log(err);
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
      analytics.logEvent("explore");
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_EXPLORE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      analytics.logEvent("explore_error", { error: err });
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
      analytics.logEvent("like_user");
      if (res.data.match !== true) {
        // Explore again
        dispatch({ type: LOADING_UI });
        axios
          .get("/explore")
          .then((res) => {
            analytics.logEvent("explore");
            dispatch({ type: CLEAR_ERRORS });
            dispatch({
              type: SET_EXPLORE,
              payload: res.data,
            });
            dispatch({ type: STOP_LOADING_UI });
          })
          .catch((err) => {
            analytics.logEvent("explore_error", { error: err });
            dispatch({
              type: SET_ERRORS,
              payload: err.response.data,
            });
          });
      } else {
        analytics.logEvent("match_created");
      }
      dispatch({
        type: LIKE_USER,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      analytics.logEvent("like_user_error", { error: err });
      console.log(err);
    });
};

// Pass
export const passUser = (uid) => (dispatch) => {
  dispatch({ type: LOADING_SECONDARY_UI });
  axios
    .get(`/explore/${uid}/pass`)
    .then((res) => {
      analytics.logEvent("pass_user");
      // Explore again
      axios
        .get("/explore")
        .then((res) => {
          analytics.logEvent("explore");
          dispatch({ type: CLEAR_ERRORS });
          dispatch({
            type: SET_EXPLORE,
            payload: res.data,
          });
          dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => {
          analytics.logEvent("explore_error", { error: err });
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
          });
        });
    })
    .catch((err) => {
      analytics.logEvent("pass_user_error", { error: err });
      console.log(err);
    });
};

// Matches
export const getMatches = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/matches")
    .then((res) => {
      analytics.logEvent("get_matches");
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_MATCHES,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      analytics.logEvent("get_matches_error", { error: err });
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
      analytics.logEvent("unmatch_user");
      axios
        .get("/matches")
        .then((res) => {
          analytics.logEvent("get_matches");
          dispatch({ type: CLEAR_ERRORS });
          dispatch({
            type: SET_MATCHES,
            payload: res.data,
          });
          dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => {
          analytics.logEvent("get_matches_error", { error: err });
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
          });
        });
    })
    .catch((err) => {
      analytics.logEvent("unmatch_user_error", { error: err });
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
      analytics.logEvent("get_conversations");
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_CONVERSATIONS,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      analytics.logEvent("get_conversations_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get Specific conversation
export const getConversation = (uid) => (dispatch) => {
  dispatch({ type: LOADING_SECONDARY_UI });
  axios
    .get(`/conversations/${uid}`)
    .then((res) => {
      analytics.logEvent("get_conversation");
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_CONVERSATION,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      analytics.logEvent("get_conversation_error", { error: err });
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
      analytics.logEvent("send_message");
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_MESSAGE });
      dispatch(getConversation(message.uid));
    })
    .catch((err) => {
      analytics.logEvent("send_message_error", { error: err });
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

// Resend Verification Email
export const resendVerification = () => (dispatch) => {
  axios
    .post("/resendVerification")
    .then((res) => {
      analytics.logEvent("resend_verification");
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_VERIFICATION_RESENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      analytics.logEvent("resend_verification_error", { error: err });
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
      analytics.logEvent("report_user");
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_REPORT_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      analytics.logEvent("report_user_error", { error: err });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  analytics.logEvent("clear_errors");
  dispatch({ type: CLEAR_ERRORS });
};
