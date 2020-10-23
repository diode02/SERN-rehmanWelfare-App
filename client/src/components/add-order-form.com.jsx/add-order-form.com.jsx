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

const AddOrderForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.orders.error);
  const customers = useSelector(selectCustomersIdWithName);
  const products_id_name = useSelector(selectProductIdName);
  const prices = useSelector(selectPrices);
  const prevCustomer = usePrevious(customers);
  const [displayBasic, setdisplayBasic] = useState(false);
  let toast;

  useEffect(() => {
    if (prevCustomer)
      if (prevCustomer.length - customers.length === -1) {
        setdisplayBasic(!displayBasic);
        toast.show({
          severity: "success",
          summary: "Success Message",
          detail: "Message Content",
          life: 3000,
        });
        setOrderData({
          customer_id: "",
          product_id: "",
          guarantor_one_id: "",
          total_installments: 0,
          amount_item: 0,
          quantity: 0,
          discount: 0,
          total: 0,
        });
      }
  }, [customers, displayBasic, prevCustomer, toast]);

  const [orderData, setOrderData] = useState({
    customer_id: "",
    product_id: "",
    guarantor_one_id: "",
    guarantor_two_id: "",
    guarantor_three_id: "",
    total_installments: "",
    amount_item: 0,
    quantity: 0,
    discount: 0,
    total: 0,
    downpayment: 0,
    date_of_entry: "",
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
  } = orderData;

  const onChange = ({ target }) => {
    const { name, value } = target;
    if (name === "discount") {
      if (value > amount_item) {
        alert("discount can not be grater then amount item");
        return;
      }
      setOrderData({
        ...orderData,
        total: amount_item - value,
        [name]: value,
      });
    } else setOrderData({ ...orderData, [name]: value });
  };
  const onChangeDrop = ({ target }) => {
    const { name, value } = target;
    setOrderData({ ...orderData, [name]: value });
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
  return (
    <div className="card">
      <Toast ref={(el) => (toast = el)} />

      {/* <div onClick={() => onClick()}>Add Customer</div> */}
      <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
        <div className="p-field p-col-6">
          <label htmlFor="cnic">Customer CNIC Number</label>
          <Dropdown
            value={customer_id}
            options={customers}
            onChange={(e) => {
              setOrderData({ ...orderData, customer_id: e.value });
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
            options={customers}
            onChange={(e) => {
              setOrderData({ ...orderData, guarantor_one_id: e.value });
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
            options={customers}
            onChange={(e) => {
              setOrderData({ ...orderData, guarantor_two_id: e.value });
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
            options={customers}
            onChange={(e) => {
              setOrderData({ ...orderData, guarantor_three_id: e.value });
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
        <div className="p-field p-col-12"></div>
        <div className="p-field p-col-2">
          <label htmlFor="total_installments">Total Installments</label>
          <InputText
            id="total_installments"
            type="number"
            value={total_installments}
            onChange={onChange}
            name="total_installments"
            required
          />
        </div>
        <div className="p-field p-col-12"></div>
        <div className="p-field">
          <Calendar
            name="date_of_entry"
            dateFormat="yyyy/mm/dd"
            value={date_of_entry}
            onChange={onChange}
            inline
            showWeek
          />
        </div>
        <div className="p-field p-col-12">
          <label>{error ? error.sqlMessage : ""}</label>
        </div>
        <Button
          label="Add"
          className="p-col-2 p-justify-end"
          type="submit"
          icon="pi pi-check"
        />
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
