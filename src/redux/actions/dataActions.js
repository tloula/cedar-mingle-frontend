import {
  SET_PROFILE,
  SET_EXPLORE,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  LIKE_USER,
  PASS_USER,
  SET_MATCHES,
  SET_CONVERSATION,
  SET_CONVERSATIONS,
  SET_VERIFICATION_RESENT,
  SET_REPORT_USER,
} from "../types";
import axios from "axios";

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

export const likeUser = (uid) => (dispatch) => {
  dispatch({ type: LOADING_UI });
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
      dispatch({ type: STOP_LOADING_UI });
      dispatch({
        type: LIKE_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const passUser = (uid) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/explore/${uid}/pass`)
    .then((res) => {
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
      dispatch({ type: STOP_LOADING_UI });
      dispatch({
        type: PASS_USER,
        payload: res.data,
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

// Conversations
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

export const getConversation = (uid) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/conversations/${uid}`)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_CONVERSATION,
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

export const sendMessage = (message) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/conversations`, message)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getConversation(message.uid));
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
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
