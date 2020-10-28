import { takeLatest, call, put, all } from "redux-saga/effects";
import { getProductsApi, postProductApi } from "../../utils/products.utils";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  postProductSuccess,
  postProductFailure,
} from "./products.actions";
import ProductsActionTypes from "./products.types";

export function* fetchProductsStartAsync({ payload }) {
  try {
    const tasks = yield getProductsApi(payload);
    yield put(fetchProductsSuccess(tasks));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(
    ProductsActionTypes.FETCH_PRODUCTS_START,
    fetchProductsStartAsync
  );
}

export function* postProductStartAsync({ payload }) {
  try {
    const product = yield postProductApi(payload);
    yield put(postProductSuccess(product));
  } catch (error) {
    yield put(postProductFailure(error));
  }
}

export function* onPostProductStart() {
  yield takeLatest(
    ProductsActionTypes.POST_PRODUCT_START,
    postProductStartAsync
  );
}

export function* productsSagas() {
  yield all([call(onFetchProductsStart), call(onPostProductStart)]);
}
