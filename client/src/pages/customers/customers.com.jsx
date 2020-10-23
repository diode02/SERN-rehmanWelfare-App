import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import "./sty.css";
import NewCustomer from "../../components/new-customer/new-customer.com";

const CustomersPage = () => {
  const customers = useSelector((state) => state.customers.customers);
  const [expandedRows, setexpandedRows] = useState(null);

  const rowExpansionTemplate = (data) => {
    return (
      <div className="customers-subtable">
        <DataTable value={data.subData}>
          <Column field="customer_id" header="Customer ID"></Column>
          <Column field="address" header="Address"></Column>
          <Column field="current_guarantees" header="Gurrantees Given"></Column>
          <Column field="home_other_phone" header="Other Mobile"></Column>
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
        style={{ width: "100%", height: "80vh" }}
        className="custombar1"
      >
        <DataTable
          value={customers}
          onRowToggle={(e) => setexpandedRows(e.data)}
          expandedRows={expandedRows}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="customer_id"
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
          <Column
            field="mobile_number"
            header="Mobile"
            filter
            sortable
          ></Column>
        </DataTable>
      </ScrollPanel>
    </div>
  );
};

export default CustomersPage;
