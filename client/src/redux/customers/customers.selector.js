import { createSelector } from "reselect";
const selectCustomers = (state) => state.customers;

export const selectIsCustomersFetching = createSelector(
  selectCustomers,
  (customers) => customers.isFetching
);

export const selectCustomersIdWithName = createSelector(
  selectCustomers,
  (customers) =>
    customers.customers.map((customer) => {
      return {
        label:
          customer.customer_id +
          " " +
          customer.first_name +
          " " +
          customer.last_name,
        value: customer.customer_id,
      };
    })
);
