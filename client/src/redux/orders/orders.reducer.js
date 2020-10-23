import OrdersActionTypes from "./orders.types";

const INITIAL_STATE = {
  orders: [],
  isFetching: false,
  isPosting: false,
  error: undefined,
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
        error: undefined,
      };
    case OrdersActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case OrdersActionTypes.POST_ORDER_START:
      return {
        ...state,
        isPosting: true,
      };
    case OrdersActionTypes.POST_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isPosting: false,
        error: undefined,
      };
    case OrdersActionTypes.POST_ORDER_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

let getUpdatedOrder = (a, b) => {
  let c = a.customers.map((a) => {
    return a;
  });
  c.push(b);
  return c;
};

export default ordersReducer;
