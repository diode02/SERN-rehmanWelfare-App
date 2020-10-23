import { Box } from "@chakra-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AllOrders = () => {
  const ordersModi = useSelector((state) => state.orders.orders);
  // let ordersModi = orders.map((order) => {
  //   return {
  //     order_id: order.order_id,
  //     product_id: order.product_id,
  //     customer_id: order.customer_id,
  //     total: order.total,
  //     order_status: order.order_status,
  //     username_id: order.username_id,
  //     createdAt: order.createdAt,
  //     subData: [
  //       {
  //         order_id: order.order_id,
  //         guarantor_one_id: order.guarantor_one_id,
  //         guarantor_two_id: order.guarantor_two_id,
  //         guarantor_three_id: order.guarantor_three_id,
  //         discount: order.discount,
  //         downpayment: order.downpayment,
  //         total_installments: order.total_installments,
  //         quantity: order.quantity,
  //       },
  //     ],
  //   };
  // });
  const formateStatus = (rowData) => {
    return rowData.order_status ? "Paid" : "Un Paid";
  };
  const [expandedRows, setexpandedRows] = useState(null);

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable value={data.subData}>
          <Column field="guarantor_one_id" header="Gurantor 1"></Column>
          <Column field="guarantor_two_id" header="Gurantor 2"></Column>
          <Column field="guarantor_three_id" header="Gurantor 3"></Column>
          <Column field="total_installments" header="Installments"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column field="discount" header="Discount"></Column>
          <Column field="downpayment" header="Advance"></Column>
        </DataTable>
      </div>
    );
  };
  return (
    <Box>
      <DataTable
        value={ordersModi}
        onRowToggle={(e) => setexpandedRows(e.data)}
        expandedRows={expandedRows}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="order_id"
      >
        <Column expander style={{ width: "3em" }} />
        <Column field="order_id" header="Order ID" filter sortable></Column>
        <Column
          field="customer_id"
          header="Customer ID"
          filter
          sortable
        ></Column>
        <Column field="product_id" header="Product ID" filter sortable></Column>
        <Column field="total" header="Total" filter sortable></Column>
        <Column field="createdAt" header="Date" filter sortable></Column>
        <Column
          field="order_status"
          header="Status"
          body={formateStatus}
          filter
          sortable
        ></Column>
        <Column field="username_id" header="Bill By" filter sortable></Column>
      </DataTable>
    </Box>
  );
};

export default AllOrders;
