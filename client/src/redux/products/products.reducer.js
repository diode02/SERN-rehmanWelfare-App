import ProductsActionTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  isFetching: false,
  errorMessage: undefined,
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ProductsActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isFetching: false,
        errorMessage: undefined,
      };
    case ProductsActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
