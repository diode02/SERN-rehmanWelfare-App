import ProductsActionTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  isFetching: false,
  error: undefined,
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
        error: undefined,
      };
    case ProductsActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case ProductsActionTypes.POST_PRODUCT_START:
      return {
        ...state,
        isPosting: true,
      };
    case ProductsActionTypes.POST_PRODUCT_SUCCESS:
      return {
        ...state,
        products: getUpdatedProducts(state, action.payload),
        isPosting: false,
        error: undefined,
      };
    case ProductsActionTypes.POST_PRODUCT_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;

let getUpdatedProducts = (a, b) => {
  let c = a.products.map((a) => {
    return a;
  });
  c.push(b);
  return c;
};
