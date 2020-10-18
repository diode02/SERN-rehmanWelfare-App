import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signUpFailure,
  signUpSucess,
  signInSuccess,
  signInFailure,
  updateUserSuccess,
  updateUserFailure,
} from "./user.actions";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateUserAsync,
} from "../../utils/user.utils";

export function* signUpSaga({ payload: { email, password, displayName } }) {
  try {
    const user = yield createUserWithEmailAndPassword({
      email,
      password,
      name: displayName,
    });
    yield put(signUpSucess(user));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signinWithEmail({ payload: { username_id, password } }) {
  try {
    const user = yield signInWithEmailAndPassword({ username_id, password });
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* updateUser({ payload }) {
  console.log(payload);
  try {
    const user = yield updateUserAsync(payload);
    yield put(updateUserSuccess(user));
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpSaga);
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail);
}

export function* onUpdateUserStart() {
  yield takeLatest(UserActionTypes.UPDATE_USER_START, updateUser);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onEmailSignInStart),
    call(onUpdateUserStart),
  ]);
}
