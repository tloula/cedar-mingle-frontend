import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_SECONDARY_UI,
  STOP_LOADING_UI,
} from "../types";

const initialState = {
  loading: false,
  loadingSecondary: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case LOADING_SECONDARY_UI:
      return {
        ...state,
        loadingSecondary: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
        loadingSecondary: false,
      };
    default:
      return state;
  }
}
