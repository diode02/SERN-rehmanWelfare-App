import CustomersActionTypes from "./customers.types";

const INITIAL_STATE = {
  customers: [],
  isFetching: false,
  isPosting: false,
  error: undefined,
};

const customersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomersActionTypes.FETCH_CUSTOMERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case CustomersActionTypes.FETCH_CUSTOMERS_SUCESS:
      return {
        ...state,
        customers: action.payload,
        isFetching: false,
        error: undefined,
      };
    case CustomersActionTypes.FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case CustomersActionTypes.POST_CUSTOMER_START:
      return {
        ...state,
        isPosting: true,
      };
    case CustomersActionTypes.POST_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: getUpdatedCustomers(state, action.payload),
        isPosting: false,
        error: undefined,
      };
    case CustomersActionTypes.POST_CUSTOMER_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

let getUpdatedCustomers = (a, b) => {
  let c = a.customers.map((a) => {
    return a;
  });
  c.push(b);
  return c;
};

export default customersReducer;
