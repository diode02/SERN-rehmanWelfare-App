import OrdersActionTypes from "./orders.types";

export const fetchOrdersStart = () => ({
  type: OrdersActionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = (orders) => ({
  type: OrdersActionTypes.FETCH_ORDERS_SUCESS,
  payload: orders,
});

export const fetchOrdersFailure = (errorMessage) => ({
  type: OrdersActionTypes.FETCH_ORDERS_FAILURE,
  payload: errorMessage,
});
