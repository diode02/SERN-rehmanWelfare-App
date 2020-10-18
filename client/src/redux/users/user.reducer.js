import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        errorMessage: null,
      };
    case UserActionTypes.SIGNIN_FAILURE:
    case UserActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case UserActionTypes.SIGNIN_SUCCESS:
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default userReducer;
