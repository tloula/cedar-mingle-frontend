import {
  MARK_MESSAGES_READ,
  MARK_NOTIFICATIONS_READ,
  SET_USER,
  SET_AUTHENTICATED,
  SET_SETTINGS,
  SET_NOTIFICATIONS,
  SET_UNAUTHENTICATED,
} from "../types";

const initialState = {
  authenticated: false,
  profile: {},
  settings: {},
  edited: false,
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
        ...action.payload,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SETTINGS:
      return {
        ...state,
        edited: true,
        ...action.payload,
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    case MARK_MESSAGES_READ:
      state.messages.forEach((msg) => (msg.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
