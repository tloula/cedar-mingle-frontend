import {
  SET_EXPLORE,
  LIKE_USER,
  MARK_MESSAGES_READ,
  SET_MATCHES,
  SET_MESSAGE,
  SET_UNMATCH,
  SET_PROFILE,
  SET_CONVERSATION,
  SET_CONVERSATIONS,
  SET_REPORT_USER,
  CLEAR_DATA,
} from "../types";

const initialState = {
  profile: {},
  matches: [],
  conversations: [],
  conversation: {},
  match: false,
  reported: false,
  sent: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EXPLORE:
      return {
        ...state,
        match: false,
        reported: false,
        profile: action.payload,
      };
    case LIKE_USER:
      return {
        ...state,
        reported: false,
        match: action.payload.match,
      };
    case SET_MATCHES:
      return {
        ...state,
        matches: action.payload.matches,
      };
    case SET_PROFILE:
      return {
        ...state,
        reported: false,
        profile: action.payload,
      };
    case SET_UNMATCH:
      return {
        ...state,
      };
    case SET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
        sent: false,
      };
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.conversations,
        sent: false,
      };
    case SET_REPORT_USER:
      return {
        ...state,
        reported: true,
      };
    case SET_MESSAGE:
      return {
        ...state,
        sent: true,
      };
    case MARK_MESSAGES_READ:
      state.conversation.messages.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
