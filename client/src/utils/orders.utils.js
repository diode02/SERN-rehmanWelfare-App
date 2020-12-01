import axios from "axios";
import invoiceData from "../data/invoice-data";

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

export async function patchOrderApi(dataWhereUpdates) {
  const data = await axios({
    method: "patch",
    url: "orders",
    data: dataWhereUpdates,
  }).then(
    (response) => {
      // let data = Object.values(response.data);
      return response.data;
    },
    (error) => {
      throw error;
    }
  );
  return data;
}

export async function deleteOrderApi(id) {
  const data = await axios({
    method: "delete",
    url: "orders/" + id,
  }).then(
    (response) => {
      // let data = Object.values(response.data);
      return response.data;
    },
    (error) => {
      throw error.response.data.error;
    }
  );
  return data;
}

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
        note: order.note,
        date_of_entry: order.date_of_entry,
        amount_item: order.amount_item,
      },
    ],
  };
};

export function orderPrint(response) {
  let resOrderDetail = response[0];
  invoiceData.invoice_no = resOrderDetail.RID;
  invoiceData.address = resOrderDetail.ADDRESS;
  invoiceData.first_name = resOrderDetail.FNAME;
  invoiceData.last_name = resOrderDetail.LNAME;
  invoiceData.mobile = resOrderDetail.MOBILE;
  invoiceData.trans_date = resOrderDetail.ORDER_DATE;
  invoiceData.gurr_one = resOrderDetail.GU_ONE;
  invoiceData.gurr_two = resOrderDetail.GU_TWO;
  invoiceData.gurr_three = resOrderDetail.GU_THREE;
  invoiceData.discount = resOrderDetail.DISCOUNT;
  invoiceData.pid = resOrderDetail.PID;
  invoiceData.cid = resOrderDetail.CID;
  invoiceData.oid = resOrderDetail.OID;
  invoiceData.tot_int = resOrderDetail.TOT_INS;
  invoiceData.advance = resOrderDetail.ADVANCE;
  invoiceData.username = resOrderDetail.USERNAME;
  invoiceData.ins_start_date = resOrderDetail.INS_START_DATE;
  invoiceData.order.desc = resOrderDetail.PNAME;
  invoiceData.order.rate = resOrderDetail.AMOUNT_ITEM;
  invoiceData.order.qty = resOrderDetail.QUANTITY;
  invoiceData.order.pid = resOrderDetail.PID;
  invoiceData.order.tot = resOrderDetail.TOTAL;
  invoiceData.ordOrIns = "ord";
}
