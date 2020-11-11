import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { postOrderStart } from "../../redux/orders/orders.actions";
import { selectCustomersIdWithName } from "../../redux/customers/customers.selector";
import { selectProductIdName } from "../../redux/products/products.selector";
import { selectPrices } from "../../redux/products/products.selector";
import { useHistory } from "react-router-dom";
import invoiceData from "../../data/invoice-data";
import { getInvoiceDataByOrder } from "../../utils/invoices.utils";

const AddOrderForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.orders.error);
  const orders = useSelector((state) => state.orders.orders);
  let customers = useSelector(selectCustomersIdWithName);
  const products_id_name = useSelector(selectProductIdName);
  const prices = useSelector(selectPrices);
  const prevOrders = usePrevious(orders);
  const history = useHistory();
  const [displayBasic, setdisplayBasic] = useState(false);
  let toast;

  useEffect(() => {
    if (prevOrders)
      if (prevOrders.length - orders.length === -1) {
        setdisplayBasic(!displayBasic);
        toast.show({
          severity: "success",
          summary: "New Order",
          detail: "New Order Added",
          life: 3000,
        });
        getInvoiceDataByOrder(orders[orders.length - 1].order_id).then(
          (res) => {
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
            invoiceData.tot_int = reD.TOT_INS;
            invoiceData.advance = reD.ADVANCE;
            invoiceData.username = reD.USERNAME;
            invoiceData.ins_start_date = reD.INS_START_DATE;
            invoiceData.items[0].desc = reD.PNAME;
            invoiceData.items[0].rate = reD.AMOUNT_ITEM;
            invoiceData.items[0].qty = reD.QUANTITY;
            invoiceData.items[0].pid = reD.PID;
            invoiceData.items[0].tot = reD.TOTAL;
            history.push("/invoice");
          }
        );

        // setOrderData({
        //   customer_id: "",
        //   product_id: "",
        //   guarantor_one_id: "",
        //   total_installments: 0,
        //   amount_item: 0,
        //   quantity: 1,
        //   discount: 0,
        //   total: 0,
        //   note: "",
        //   downpayment: 0,
        // });
        //history.push("/orders");
      }
  }, [orders, displayBasic, prevOrders, toast]);
  const username_id = useSelector(
    (state) => state.user.currentUser.username_id
  );
  const [orderData, setOrderData] = useState({
    customer_id: "",
    product_id: "",
    guarantor_one_id: "",
    guarantor_two_id: "",
    guarantor_three_id: "",
    total_installments: "",
    amount_item: 0,
    quantity: 1,
    discount: 0,
    total: 0,
    downpayment: 0,
    date_of_entry: "",
    username_id,
  });
  const {
    customer_id,
    product_id,
    guarantor_one_id,
    guarantor_two_id,
    guarantor_three_id,
    total_installments,
    amount_item,
    quantity,
    discount,
    total,
    date_of_entry,
    note,
    downpayment,
  } = orderData;

  const onChange = ({ target }) => {
    const { name, value } = target;
    console.log("discount");

    //for discount check
    if (name === "discount") {
      if (parseInt(value) > amount_item) {
        alert("Discount can not be grater then amount item");
        return;
      }
    }

    // //for downpayment check
    if (name === "downpayment") {
      if (parseInt(value) > total) {
        alert("Advance can not be grater then total");
        return;
      }
    }

    if (name === "discount") {
      setOrderData({
        ...orderData,
        total: amount_item - value,
        [name]: value,
      });
      return;
    }
    setOrderData({ ...orderData, [name]: value });
  };

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  let minDate = new Date();
  minDate.setMonth(month);
  minDate.setFullYear(year);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  const onChangeDrop = ({ target, value }) => {
    const { name } = target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSelect = (id, e) => {
    if (id !== "") {
      let index = customers.findIndex((customer) => id === customer.value);
      customers[index]["disabled"] = false;
    }
    let index = customers.findIndex((customer) => e.value === customer.value);
    customers[index]["disabled"] = true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let a = Object.keys(orderData);
    for (let i = 0; i < a.length; i++) {
      if (orderData[a[i]] === "" || orderData[a[i]] === null) {
        alert("Please enter value for " + a[i]);
        return;
      }
    }
    dispatch(postOrderStart(orderData));
  };

  const gurrantorTemplate = (option) => {
    return <div>{option.label}</div>;
  };
  return (
    <div className="card">
      <Toast ref={(el) => (toast = el)} />

      {/* <div onClick={() => onClick()}>Add Customer</div> */}
      <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
        <div className="p-field p-col-6">
          <label htmlFor="cnic">Customer CNIC Number</label>
          <Dropdown
            value={customer_id}
            name="customer_id"
            options={customers}
            onChange={(e) => {
              onChangeDrop(e);
              handleSelect(customer_id, e);
            }}
            placeholder="Select CNIC"
            filter
            showClear
          />
        </div>
        <div className="p-field p-col-12 p-md-6">
          <label htmlFor="product_id">Prodcut ID</label>
          <Dropdown
            value={product_id}
            name="product_id"
            options={products_id_name}
            onChange={(e) => {
              // setOrderData({ ...orderData, product_id: e.value });
              if (e.value)
                setOrderData({
                  ...orderData,
                  product_id: e.value,
                  amount_item: prices[e.value],
                  total: prices[e.value],
                  discount: 0,
                });
            }}
            placeholder="Select Product"
            filter
            showClear
          />
        </div>
        <div className="p-field p-col-4">
          <label htmlFor="cnic">Gurantor One</label>
          <Dropdown
            value={guarantor_one_id}
            itemTemplate={gurrantorTemplate}
            // valueTemplate={selectedCountryTemplate}
            name="guarantor_one_id"
            options={customers}
            onChange={(e) => {
              onChangeDrop(e);
              handleSelect(guarantor_one_id, e);
            }}
            placeholder="Select CNIC"
            filter
            showClear
          />
        </div>
        <div className="p-field p-col-4">
          <label htmlFor="cnic">Gurantor Two</label>
          <Dropdown
            value={guarantor_two_id}
            name="guarantor_two_id"
            options={customers}
            onChange={(e) => {
              onChangeDrop(e);
              handleSelect(guarantor_two_id, e);
            }}
            placeholder="Select CNIC"
            filter
            showClear
          />
        </div>
        <div className="p-field p-col-4">
          <label htmlFor="cnic">Gurantor Three</label>
          <Dropdown
            value={guarantor_three_id}
            name="guarantor_three_id"
            options={customers}
            onChange={(e) => {
              onChangeDrop(e);
              handleSelect(guarantor_three_id, e);
            }}
            placeholder="Select CNIC"
            filter
            showClear
          />
        </div>
        <div className="p-field p-col-2">
          <label htmlFor="amount_item">Amount Item</label>
          <InputText
            id="amount_item"
            type="number"
            name="amount_item"
            value={amount_item}
            onChange={onChange}
            required
            readOnly
          />
        </div>
        <div className="p-field p-col-2">
          <label htmlFor="quantity">Quantity</label>
          <InputText
            id="quantity"
            type="number"
            name="quantity"
            value={quantity}
            onChange={onChange}
            required
            readOnly
          />
        </div>
        <div className="p-field p-col-2">
          <label htmlFor="discount">Discount</label>
          <InputText
            id="discount"
            name="discount"
            type="number"
            value={discount}
            onChange={onChange}
            required
            readOnly={
              amount_item === 0 || parseInt(downpayment) !== 0 ? true : false
            }
          />
        </div>
        <div className="p-field p-col-2">
          <label htmlFor="total">Total</label>
          <InputText
            id="total"
            type="text"
            value={total}
            onChange={onChange}
            name="total"
            required
            readOnly
          />
        </div>
        <div className="p-field p-col-2">
          <label htmlFor="downpayment">Advance</label>
          <InputText
            id="downpayment"
            type="number"
            value={downpayment}
            onChange={onChange}
            name="downpayment"
            required
          />
        </div>
        <div className="p-field p-col-12"></div>
        <div className="p-field p-col-2">
          <label htmlFor="total_installments">Total Installments</label>
          <InputText
            id="total_installments"
            type="number"
            max="499"
            value={total_installments}
            onChange={onChange}
            name="total_installments"
            required
          />
        </div>
        <div className="p-field p-col-12"></div>
        <div className="p-field p-col-2">
          <label htmlFor="note">Note</label>
          <InputTextarea
            id="note"
            type="text"
            value={note}
            onChange={onChange}
            name="note"
            maxLength="97"
            placeholder="add any note about this order"
            rows="16"
          />
        </div>
        <div className="p-fluid p-col-2"></div>
        <div className="p-field">
          <label htmlFor="date_of_entry">Select Date</label>

          <Calendar
            id="date_of_entry"
            name="date_of_entry"
            dateFormat="yyyy/mm/dd"
            value={date_of_entry}
            onChange={onChange}
            minDate={minDate}
            readOnlyInput
            inline
          />
        </div>
        <div className="p-field p-col-12">
          <label>{error ? "something went wrong" : ""}</label>
        </div>
        <div
          className="p-p-4"
          style={{
            marginInlineStart: "auto",
          }}
        >
          <Button
            type="submit"
            label="Add Order"
            className="p-d-block p-mx-auto"
            icon="pi pi-plus"
          />
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
