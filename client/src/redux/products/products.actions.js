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

export const postProductStart = (product) => ({
  type: ProductsActionTypes.POST_PRODUCT_START,
  payload: product,
});

export const postProductSuccess = (product) => ({
  type: ProductsActionTypes.POST_PRODUCT_SUCCESS,
  payload: product,
});

export const postProductFailure = (error) => ({
  type: ProductsActionTypes.POST_PRODUCT_FAILURE,
  payload: error,
});
