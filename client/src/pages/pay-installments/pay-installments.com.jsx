import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ScrollPanel } from "primereact/scrollpanel";
import { InputText } from "primereact/inputtext";
import { selectCustomersIdWithName } from "../../redux/customers/customers.selector";
import { getOdersApiInstallment } from "../../utils/orders.utils";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getInstallmentsApi } from "../../utils/installments.utils";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PayInstallmentForm from "../../components/pay-installment-form/pay-installment-form.com";
const PayInstallmentsPage = () => {
  const customers = useSelector((state) => state.customers.customers);
  const [expandedRows, setexpandedRows] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [installment, setInstallment] = useState({
    order_id: "",
  });
  const [displayBasic, setDisplayBasic] = useState(false);
  const [customerID, setCustomerID] = useState(null);
  const { order_id } = installment;
  const [orders, setOrders] = useState(undefined);
  const [installments, setInstallments] = useState(undefined);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  // const [payment, setPayment] = useState(0);
  const orderTemplate = (order) => {
    return (
      <div>
        <div className="card">
          <DataTable value={this.state.products}>
            <Column field="order_id" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
          </DataTable>
        </div>
      </div>
    );
  };
  const onHide = (name) => {
    setDisplayBasic(false);
  };
  const onClick = (name, position) => {
    setDisplayBasic(true);
  };
  const onRowEditInit = (event) => {
    console.log("on row edit init called");
    // this.originalRows[event.index] = { ...this.state.products3[event.index] };
  };
  const onEditorSubmit = (props) => {
    console.log("submit called");
    // const { rowIndex: index, field } = props;
    // delete this.editingCellRows[index][field];
  };
  const onRowEditCancel = (event) => {
    console.log("on row edit cancel called");
    // let products = [...this.state.products3];
    // products[event.index] = this.originalRows[event.index];
    // delete this.originalRows[event.index];

    // this.setState({ products3: products });
  };
  const onEditorValueChange = (productKey, props, value) => {
    console.log("on editor value change called");
    // let updatedProducts = [...props.value];
    // updatedProducts[props.rowIndex][props.field] = value;
    // this.setState({ [`${productKey}`]: updatedProducts });
  };
  const inputTextEditor = (productKey, props, field) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(productKey, props, e.target.value)}
      />
    );
  };
  const payment_received_editor = (installment_key, props) => {
    return inputTextEditor(installment_key, props, "amount_received");
  };

  return (
    <div className="p-grid">
      <ScrollPanel
        style={{ width: "50%", height: "40vh" }}
        className="p-col-6 custombar1"
      >
        <DataTable
          header="Select Customer"
          className="p-datatable-sm"
          value={customers}
          selection={selectedCustomer}
          onSelectionChange={(e) => {
            setSelectedCustomer(e.value);
            getOdersApiInstallment({
              where: { customer_id: e.value.customer_id },
            }).then((res) => setOrders(res));
          }}
          selectionMode="single"
          dataKey="customer_id"
        >
          <Column field="customer_id" header="Customer ID"></Column>
          <Column field="first_name" header="First Name"></Column>
          <Column field="last_name" header="Last Name"></Column>
        </DataTable>
      </ScrollPanel>

      <ScrollPanel
        style={{ width: "50%", height: "40vh" }}
        className="custombar1 p-col-6"
      >
        {orders ? (
          <div className="card">
            <DataTable
              value={orders}
              selection={selectedOrder}
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
          <ProgressSpinner
            style={{
              width: "100%",
              margin: "20%   auto",
            }}
          />
        )}
      </ScrollPanel>
      <ScrollPanel
        style={{ width: "100%", height: "40vh" }}
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
              selectionMode="single"
              dataKey="installments_payment_id"
              editMode="row"
              onRowEditInit={onRowEditInit}
              onRowEditCancel={onRowEditCancel}
              onEditorSubmit={onEditorSubmit}
            >
              <Column
                field="installments_payment_id"
                header="Installment ID"
              ></Column>
              <Column
                field="amount_to_receive"
                header="Total Receiveable"
              ></Column>
              <Column field="due_date" header="Due Date"></Column>
              <Column
                field="amount_received"
                value="0"
                header="Total Received"
                editor={(props) => payment_received_editor("products3", props)}
              ></Column>
              <Column
                rowEditor
                headerStyle={{ width: "7rem" }}
                bodyStyle={{ textAlign: "center" }}
                onClick={() => {
                  console.log("called");
                  onClick("displayBasic");
                }}
              ></Column>
            </DataTable>
          </div>
        ) : (
          <ProgressSpinner
            style={{
              width: "80%",
              margin: "20%   auto",
            }}
          />
        )}
      </ScrollPanel>

      {selectedInstallment ? (
        <PayInstallmentForm
          selectedInstallment={selectedInstallment}
          displayBasic={displayBasic}
          onHide={onHide}
        />
      ) : null}
    </div>
  );
};

export default PayInstallmentsPage;
