import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ,
  UPLOADING_PHOTO,
} from "../types";

const initialState = {
  authenticated: false,
  uploading: false,
  credentials: {},
  settings: {},
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
        uploading: false,
        ...action.payload,
      };
    case UPLOADING_PHOTO:
      return {
        ...state,
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
