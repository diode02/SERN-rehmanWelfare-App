import CustomersActionTypes from "./customers.types";

export const fetchCustomersStart = () => ({
  type: CustomersActionTypes.FETCH_CUSTOMERS_START,
});

export const fetchCustomersSuccess = (customers) => ({
  type: CustomersActionTypes.FETCH_CUSTOMERS_SUCESS,
  payload: customers,
});

export const fetchCustomersFailure = (errorMessage) => ({
  type: CustomersActionTypes.FETCH_CUSTOMERS_FAILURE,
  payload: errorMessage,
});

export const postCustomerStart = (customer) => ({
  type: CustomersActionTypes.POST_CUSTOMER_START,
  payload: customer,
});

export const postCustomerSuccess = (customer) => ({
  type: CustomersActionTypes.POST_CUSTOMER_SUCCESS,
  payload: customer,
});

export const postCustomerFailure = (errorMessage) => ({
  type: CustomersActionTypes.POST_CUSTOMER_FAILURE,
  payload: errorMessage,
});
export const getAvatarStart = (customer_id) => ({
  type: CustomersActionTypes.GET_AVATAR_START,
  payload: customer_id,
});

export const getAvatarSucess = (pictureAndId) => ({
  type: CustomersActionTypes.GET_AVATAR_SUCCESS,
  payload: pictureAndId,
});

export const getAvatarFailure = (error) => ({
  type: CustomersActionTypes.GET_AVATAR_FAILURE,
  payload: error,
});
