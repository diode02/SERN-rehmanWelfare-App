import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ScrollPanel } from "primereact/scrollpanel";
import { InputText } from "primereact/inputtext";
import { getOdersApiInstallment } from "../../utils/orders.utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getInstallmentsApi } from "../../utils/installments.utils";
import PayInstallmentForm from "../../components/pay-installment-form/pay-installment-form.com";
const PayInstallmentsPage = () => {
  const customers = useSelector((state) => state.customers.customers);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [orders, setOrders] = useState(undefined);
  const [installments, setInstallments] = useState(undefined);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  // const [payment, setPayment] = useState(0);
  const onHide = (name) => {
    setDisplayBasic(false);
  };
  const onClick = (name, position) => {
    setDisplayBasic(true);
  };
  const updateInstallment = (install) => {
    setInstallments(
      installments.map((installment) => {
        if (
          installment.installments_payment_id ===
          install.installments_payment_id
        ) {
          return install;
        }
        return installment;
      })
    );
  };

  return (
    <div
      className="p-grid"
      style={{
        width: "99%",
        margin: "0 auto",
      }}
    >
      <ScrollPanel
        style={{ width: "50%", height: "40vh", border: "solid 2px gray" }}
        className="p-col-6 custombar1"
      >
        <DataTable
          // header="Select Customer"
          className="p-datatable-sm"
          value={customers}
          selection={selectedCustomer}
          className="p-datatable-striped"
          onSelectionChange={(e) => {
            setSelectedCustomer(e.value);
            getOdersApiInstallment({
              where: { customer_id: e.value.customer_id },
            }).then((res) => setOrders(res));
            if (installments) setInstallments(null);
            if (selectedOrder) setSelectedOrder(null);
          }}
          selectionMode="single"
          dataKey="customer_id"
        >
          <Column
            field="customer_id"
            header="Customer ID"
            filter
            sortable
          ></Column>
          <Column
            field="first_name"
            header="First Name"
            filter
            sortable
          ></Column>
          <Column field="last_name" header="Last Name" filter sortable></Column>
        </DataTable>
      </ScrollPanel>

      <ScrollPanel
        style={{ width: "50%", height: "40vh", border: "solid 2px gray" }}
        className="custombar1 p-col-6"
      >
        {orders ? (
          <div className="card">
            <DataTable
              value={orders}
              selection={selectedOrder}
              className="p-datatable-striped"
              onSelectionChange={(e) => {
                setSelectedOrder(e.value);
                getInstallmentsApi({
                  where: { order_id: e.value.order_id },
                }).then((res) => setInstallments(res));
              }}
              selectionMode="single"
              dataKey="order_id"
            >
              <Column field="order_id" header="Order ID"></Column>
              <Column field="product_id" header="Product ID"></Column>
              <Column field="total" header="Total"></Column>
              <Column field="createdAt" header="Date"></Column>
            </DataTable>
          </div>
        ) : (
          <div>Select any cutomer to view his/her orders</div>
        )}
      </ScrollPanel>
      <ScrollPanel
        style={{ height: "40vh", border: "solid 2px gray" }}
        className="custombar1 p-col-12"
      >
        {installments ? (
          <div className="card">
            <DataTable
              value={installments}
              selection={selectedInstallment}
              onSelectionChange={(e) => {
                setSelectedInstallment(e.value);
                onClick("displayBasic");
              }}
              className="p-datatable-striped"
              selectionMode="single"
              dataKey="installments_payment_id"
            >
              <Column
                field="installments_payment_id"
                header="Installment ID"
              ></Column>
              <Column field="installment_no" header="Installment No"></Column>
              <Column
                field="amount_to_receive"
                header="Total Receiveable"
              ></Column>
              <Column field="due_date" header="Due Date"></Column>
              <Column
                field="amount_received"
                value="0"
                header="Total Received"
                // editor={(props) => payment_received_editor("products3", props)}
              ></Column>
              {/* <Column
                rowEditor
                headerStyle={{ width: "7rem" }}
                bodyStyle={{ textAlign: "center" }}
                onClick={() => {
                  onClick("displayBasic");
                }}
              ></Column> */}
            </DataTable>
          </div>
        ) : (
          <div>Select any cutomer to view his/her orders</div>
        )}
      </ScrollPanel>

      {selectedInstallment ? (
        <PayInstallmentForm
          selectedInstallment={selectedInstallment}
          displayBasic={displayBasic}
          onHide={onHide}
          updateInstallment={updateInstallment}
        />
      ) : null}
    </div>
  );
};

export default PayInstallmentsPage;

{
  /* <ProgressSpinner
  style={{
    width: "80%",
    margin: "20%   auto",
  }}
/>; */
}
