import axios from "axios";

export async function getCustomersApi(dataWhere) {
  const data = await axios({
    method: "get",
    url: "customers",
    data: dataWhere,
  }).then(
    (response) => {
      let data = Object.values(response.data);
      return data.map((a) => getInGoodShape(a));
    },
    (error) => {
      throw error;
    }
  );
  return data;
}

export async function postCustomerApi(customer) {
  const data = await axios({
    method: "post",
    url: "customers",
    data: customer,
  }).then(
    (response) => {
      return getInGoodShape(response.data);
    },
    (error) => {
      throw error.response.data;
    }
  );
  return data;
}

const getInGoodShape = (customer) => {
  return {
    customer_id: customer.customer_id,
    first_name: customer.first_name,
    last_name: customer.last_name,
    mobile_number: customer.mobile_number,
    createdAt: customer.createdAt,
    subData: [
      {
        customer_id: customer.customer_id,
        address: customer.address,
        current_guarantees: customer.current_guarantees,
        home_other_phone: customer.home_other_phone,
        createdAt: customer.createdAt,
        note: customer.note,
      },
    ],
  };
};