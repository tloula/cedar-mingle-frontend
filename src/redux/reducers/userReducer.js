import {
  LOADING_USER,
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ,
  UPLOADING_PHOTO,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  uploading: false,
  credentials: {},
  settings: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        uploading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
        uploading: false,
      };
    case UPLOADING_PHOTO:
      return {
        ...state,
        loading: false,
        uploading: true,
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
