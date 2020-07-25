import {
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
};

export default function (state = initialState, action) {
  switch (action.type) {
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
      };
    case PASS_USER:
      return {
        ...state,
        match: false,
      };
    case SET_MATCHES:
      return {
        ...state,
        matches: action.payload.matches,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_UNMATCH:
      return {
        ...state,
      };
    default:
      return state;
  }
}
