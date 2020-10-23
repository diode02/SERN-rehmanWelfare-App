import axios from "axios";

export async function getOdersAPI() {
  const data = await axios({
    method: "get",
    url: "orders",
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

export async function getOdersApiInstallment(dataWhere) {
  const data = await axios({
    method: "post",
    url: "orders/get",
    data: dataWhere,
  }).then(
    (response) => {
      let data = Object.values(response.data);
      return data;
    },
    (error) => {
      throw error;
    }
  );
  return data;
}

export async function postOdersAPI(order) {
  // return;
  const data = await axios({
    method: "post",
    url: "orders",
    data: order,
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

const getInGoodShapeInst = (order) => {
  return {
    ...order,
    order_id: order.order_id.toString(),
  };
};

const getInGoodShape = (order) => {
  return {
    order_id: order.order_id,
    product_id: order.product_id,
    customer_id: order.customer_id,
    total: order.total,
    order_status: order.order_status,
    username_id: order.username_id,
    createdAt: order.createdAt,
    subData: [
      {
        order_id: order.order_id,
        guarantor_one_id: order.guarantor_one_id,
        guarantor_two_id: order.guarantor_two_id,
        guarantor_three_id: order.guarantor_three_id,
        discount: order.discount,
        downpayment: order.downpayment,
        total_installments: order.total_installments,
        quantity: order.quantity,
      },
    ],
  };
};
