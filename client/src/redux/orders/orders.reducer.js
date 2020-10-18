import OrdersActionTypes from "./orders.types";

const INITIAL_STATE = {
  orders: [],
  isFetching: false,
  errorMessage: undefined,
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case OrdersActionTypes.FETCH_ORDERS_SUCESS:
      return {
        ...state,
        orders: action.payload,
        isFetching: false,
        errorMessage: undefined,
      };
    case OrdersActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default ordersReducer;
