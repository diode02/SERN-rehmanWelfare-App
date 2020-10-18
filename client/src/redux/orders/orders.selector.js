import { createSelector } from "reselect";
const selectOrders = (state) => state.orders;

export const selectIsOrdersFetching = createSelector(
  selectOrders,
  (orders) => orders.isFetching
);
