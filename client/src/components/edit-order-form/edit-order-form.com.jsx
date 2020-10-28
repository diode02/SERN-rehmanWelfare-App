import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
// import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { selectCustomersIdWithName } from "../../redux/customers/customers.selector";
import { selectProductIdName } from "../../redux/products/products.selector";
import { selectPrices } from "../../redux/products/products.selector";
import { Dropdown } from "primereact/dropdown";
import { fetchCustomersStart } from "../../redux/customers/customers.actions";
import { fetchProductsStart } from "../../redux/products/products.actions";

import { patchOrderApi } from "../../utils/orders.utils";
import { useSelector } from "react-redux";
const EditOrderForm = ({
  selectedOrder,
  displayBasic,
  onHide,
  updateOrder,
}) => {
  let customers = useSelector(selectCustomersIdWithName);
  const products_id_name = useSelector(selectProductIdName);
  const prices = useSelector(selectPrices);

  const [order, setOrder] = useState({
    ...selectedOrder,
  });
  const {
    order_id,
    total,
    product_id,
    customer_id,
    // penality,
    // order_no,
    // amount_to_receive,
    // amount_received,
  } = order;
  const {
    note,
    discount,
    guarantor_one_id,
    guarantor_two_id,
    guarantor_three_id,
    total_installments,
    date_of_entry,
    amount_item,
    quantity,
    downpayment,
  } = order.subData[0];
  const dispatch = useDispatch();

  useEffect(() => {
    setOrder({
      ...selectedOrder,
    });
  }, [selectedOrder]);

  //useEffect for initially setting customers disabled
  useEffect(() => {
    let index = customers.findIndex(
      (customer) => customer_id === customer.value
    );
    if (index != -1) customers[index]["disabled"] = true;
    console.log(guarantor_one_id);
    index = customers.findIndex(
      (customer) => guarantor_one_id === customer.value
    );
    if (index != -1) customers[index]["disabled"] = true;
  }, [customers]);
  useEffect(() => {
    dispatch(fetchCustomersStart());
    dispatch(fetchProductsStart());
  }, []);
  let toast;
  const username_id = useSelector(
    (state) => state.user.currentUser.username_id
  );

  const onChange = ({ target }) => {
    const { name, value } = target;

    setOrder({ ...order, [name]: value });
  };

  const onChangeDrop = ({ target, value }) => {
    const { name } = target;

    setOrder({ ...order, [name]: value });
  };

  const onChangeDropSub = ({ target, value }) => {
    const { name } = target;

    let a = order;
    a.subData[0][name] = value;
    setOrder({ ...a });
  };

  const onChangeSub = ({ target }) => {
    const { name, value } = target;
    if (name === "discount") {
      if (parseInt(value) > parseInt(amount_item)) {
        alert("discount can not be grater then amount item");
        return;
      }
      let a = order;
      a.subData[0][name] = value;
      a["total"] = parseInt(amount_item) - parseInt(value);
      setOrder({ ...a });
    } else;
    {
      let a = order;
      a.subData[0][name] = value;
      setOrder({ ...a });
    }
  };

  const handleSelect = (id, e) => {
    if (id != "") {
      let index = customers.findIndex((customer) => id === customer.value);
      if (index != -1) customers[index]["disabled"] = false;
    } else {
      let index = customers.findIndex((customer) => e.value === customer.value);
      if (index != -1) customers[index]["disabled"] = true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchOrderApi({
      where: { order_id },
      updates: {
        note,
        username_id,
        discount,
        date_of_entry,
        customer_id,
        guarantor_one_id,
        guarantor_two_id,
        guarantor_three_id,
        total_installments,
        downpayment,
        total,
        amount_item,
        quantity,
      },
    })
      .then((res) => {
        console.log(res);
        onHide();
        updateOrder(order);
        toast.show({
          severity: "success",
          summary: "Success Message",
          detail: "Message Content",
          life: 3000,
        });
      })
      .catch((err) => console.log(err));
    // dispatch(postCustomerStart(customerData));
  };

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  let minDate = new Date();
  minDate.setMonth(month);
  minDate.setFullYear(year);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  return (
    <div>
      <Toast ref={(el) => (toast = el)} />
      <Dialog
        header="Pay order"
        visible={displayBasic}
        style={{ width: "70vw" }}
        onHide={() => onHide("displayBasic")}
      >
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
                // set values acording to new items
                if (e.value) {
                  let a = order;
                  a["total"] = prices[e.value];
                  a["product_id"] = e.value;
                  a.subData[0]["amount_item"] = prices[e.value];
                  a.subData[0]["discount"] = 0;
                  setOrder({ ...a });
                }
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
              // valueTemplate={selectedCountryTemplate}
              name="guarantor_one_id"
              options={customers}
              onChange={(e) => {
                onChangeDropSub(e);
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
                onChangeDropSub(e);
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
                onChangeDropSub(e);
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
              onChange={onChangeSub}
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
          <div className="p-field p-col-2">
            <label htmlFor="downpayment">Advance</label>
            <InputText
              id="downpayment"
              type="text"
              value={downpayment}
              onChange={onChangeSub}
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
              value={total_installments}
              onChange={onChangeSub}
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
              value={note ? note : ""}
              onChange={onChangeSub}
              name="note"
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
              onChange={onChangeSub}
              minDate={minDate}
              readOnlyInput
              inline
            />
          </div>

          <div className="p-field p-col-12">
            {/* <label>{error ? error.sqlMessage : ""}</label> */}
          </div>
          <Button
            label="Add"
            className="p-col-2 p-justify-end"
            type="submit"
            icon="pi pi-check"
          />
        </form>
      </Dialog>
    </div>
  );
};

export default EditOrderForm;
