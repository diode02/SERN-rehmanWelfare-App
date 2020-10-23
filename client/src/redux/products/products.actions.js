import ProductsActionTypes from "./products.types";

export const fetchProductsStart = (whereAtrri) => ({
  type: ProductsActionTypes.FETCH_PRODUCTS_START,
  payload: whereAtrri,
});

export const fetchProductsSuccess = (products) => ({
  type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (errorMessage) => ({
  type: ProductsActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage,
});
