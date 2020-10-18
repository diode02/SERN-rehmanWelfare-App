import UserActionTypes from "./user.types";

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGNIN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGNIN_FAILURE,
  payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: emailAndPassword,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSucess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export const updateUserStart = (userData) => ({
  type: UserActionTypes.UPDATE_USER_START,
  payload: userData,
});

export const updateUserSuccess = (userData) => ({
  type: UserActionTypes.UPDATE_USER_SUCCESS,
  payload: userData,
});

export const updateUserFailure = (error) => ({
  type: UserActionTypes.UPDATE_USER_FAILURE,
  payload: error,
});
