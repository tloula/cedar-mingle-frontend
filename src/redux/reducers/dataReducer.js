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
  SET_VERIFICATION_RESENT,
  SET_REPORT_USER,
  CLEAR_DATA,
} from "../types";

const initialState = {
  profile: {},
  matches: [],
  conversations: [],
  conversation: {},
  match: false,
  resent: false,
  reported: false,
  sent: false,
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
    case SET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    case SET_VERIFICATION_RESENT:
      return {
        ...state,
        resent: true,
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
