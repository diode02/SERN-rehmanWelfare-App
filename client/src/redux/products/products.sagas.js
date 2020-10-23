import { takeLatest, call, put, all } from "redux-saga/effects";
import { getProductsApi } from "../../utils/products.utils";
import { fetchProductsSuccess, fetchProductsFailure } from "./products.actions";
import ProductsActionTypes from "./products.types";

export function* fetchProductsStartAsync({ payload }) {
  console.log(payload);
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

export function* productsSagas() {
  yield all([call(onFetchProductsStart)]);
}
