import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EditOrderForm from "../../components/edit-order-form/edit-order-form.com";
import { fetchOrdersStart } from "../../redux/orders/orders.actions";
import invoiceData from "../../data/invoice-data";
import { getInvoiceDataByOrder } from "../../utils/invoices.utils";
import { getInstallmentsApi } from "../../utils/installments.utils";

const AllOrders = () => {
  const ordersModi = useSelector((state) => state.orders.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onHide = (name) => {
    setDisplayBasic(false);
    dispatch(fetchOrdersStart());
  };
  const onClick = (name, position) => {
    setDisplayBasic(true);
  };

  // useEffect(() => {
  //   if (displayBasic == true) ;
  // }, [displayBasic]);

  const updateOrders = (install) => {
    // setOrders(
    //   installments.map((installment) => {
    //     if (
    //       installment.installments_payment_id ===
    //       install.installments_payment_id
    //     ) {
    //       return install;
    //     }
    //     return installment;
    //   })
    // );
  };

  const handlePrint = (_id) => {
    getInvoiceDataByOrder(_id).then((res) => {
      let reD = res[0];
      invoiceData.invoice_no = reD.RID;
      invoiceData.address = reD.ADDRESS;
      invoiceData.first_name = reD.FNAME;
      invoiceData.last_name = reD.LNAME;
      invoiceData.mobile = reD.MOBILE;
      invoiceData.trans_date = reD.ORDER_DATE;
      invoiceData.gurr_one = reD.GU_ONE;
      invoiceData.gurr_two = reD.GU_TWO;
      invoiceData.gurr_three = reD.GU_THREE;
      invoiceData.discount = reD.DISCOUNT;
      invoiceData.pid = reD.PID;
      invoiceData.cid = reD.CID;
      invoiceData.oid = reD.OID;
      invoiceData.tot_int = reD.TOT_INS;
      invoiceData.advance = reD.ADVANCE;
      invoiceData.username = reD.USERNAME;
      invoiceData.ins_start_date = reD.INS_START_DATE;
      invoiceData.order.desc = reD.PNAME;
      invoiceData.order.rate = reD.AMOUNT_ITEM;
      invoiceData.order.qty = reD.QUANTITY;
      invoiceData.order.pid = reD.PID;
      invoiceData.order.tot = reD.TOTAL;
      invoiceData.ordOrIns = "ord";

      getInstallmentsApi({
        where: {
          order_id: reD.OI,
        },
      }).then((resp) => {
        invoiceData.insts = resp;
        history.push("/invoice");
      });
    });
  };

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
          <Column field="note" header="Note"></Column>
        </DataTable>
      </div>
    );
  };
  return (
    <div>
      <DataTable
        value={ordersModi}
        onRowToggle={(e) => setexpandedRows(e.data)}
        expandedRows={expandedRows}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="order_id"
        className="p-datatable-striped"
        selection={selectedOrder}
        onSelectionChange={(e) => {
          setSelectedOrder(e.value);
          onClick("displayBasic");
        }}
        selectionMode="single"
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
      {selectedOrder ? (
        <EditOrderForm
          selectedOrder={selectedOrder}
          displayBasic={displayBasic}
          onHide={onHide}
          updateOrders={updateOrders}
          handlePrint={handlePrint}
        />
      ) : null}
    </div>
  );
};

export default AllOrders;
