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

export const postOrderStart = (order) => ({
  type: OrdersActionTypes.POST_ORDER_START,
  payload: order,
});

export const postOrderSuccess = (order) => ({
  type: OrdersActionTypes.POST_ORDER_SUCCESS,
  payload: order,
});

export const postOrderFailure = (errorMessage) => ({
  type: OrdersActionTypes.POST_ORDER_FAILURE,
  payload: errorMessage,
});
