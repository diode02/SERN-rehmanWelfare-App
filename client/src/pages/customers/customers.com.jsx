import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import "./sty.css";
import NewCustomer from "../../components/new-customer/new-customer.com";
import { fetchCustomersStart } from "../../redux/customers/customers.actions";
import EditCustomerForm from "../../components/edit-customer-form/edit-customer-form.com";

const CustomersPage = () => {
  const customers = useSelector((state) => state.customers.customers);
  const [expandedRows, setexpandedRows] = useState(null);
  const dispatch = useDispatch();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const onHide = (name) => {
    setDisplayBasic(false);
    dispatch(fetchCustomersStart());
  };
  const onClick = (name, position) => {
    setDisplayBasic(true);
  };
  const rowExpansionTemplate = (data) => {
    return (
      <div className="customers-subtable">
        <DataTable value={data.subData}>
          <Column field="customer_id" header="Customer ID"></Column>
          <Column field="address" header="Address"></Column>
          <Column field="current_guarantees" header="Gurrantees Given"></Column>
          <Column field="home_other_number" header="Other Mobile"></Column>
          <Column field="note" header="Note"></Column>
          <Column field="createdAt" header="Created At"></Column>
        </DataTable>
      </div>
    );
  };
  return (
    <div>
      <NewCustomer />
      <ScrollPanel
        style={{
          width: "100%",
          height: "80vh",
          // display: "absolute",
          // top: "150px",
          // zIndex: "5",
        }}
        className="custombar1"
      >
        <DataTable
          value={customers}
          onRowToggle={(e) => setexpandedRows(e.data)}
          expandedRows={expandedRows}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="customer_id"
          className="p-datatable-striped"
          selection={selectedCustomer}
          onSelectionChange={(e) => {
            setSelectedCustomer(e.value);
            onClick("displayBasic");
          }}
          selectionMode="single"
        >
          <Column expander style={{ width: "3em" }} />
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
          <Column field="city" header="City" filter sortable></Column>
          <Column
            field="mobile_number"
            header="Mobile"
            filter
            sortable
          ></Column>
        </DataTable>
      </ScrollPanel>
      {selectedCustomer ? (
        <EditCustomerForm
          selectedCustomer={selectedCustomer}
          displayBasic={displayBasic}
          onHide={onHide}
          //   updateOrders={updateOrders}
        />
      ) : null}
    </div>
  );
};

export default CustomersPage;
