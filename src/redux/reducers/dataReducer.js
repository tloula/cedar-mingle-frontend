import {
  LOADING_DATA,
  SET_EXPLORE,
  LIKE_USER,
  PASS_USER,
  SET_MATCHES,
  SET_UNMATCH,
  SET_PROFILE,
} from "../types";

const initialState = {
  profile: {},
  matches: [],
  match: false,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_EXPLORE:
      return {
        ...state,
        match: false,
        profile: action.payload.profile,
      };
    case LIKE_USER:
      return {
        ...state,
        match: action.payload.match,
        loading: false,
      };
    case PASS_USER:
      return {
        ...state,
        match: false,
        loading: false,
      };
    case SET_MATCHES:
      return {
        ...state,
        loading: false,
        matches: action.payload.matches,
      };
    case SET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case SET_UNMATCH:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
