import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
// import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";

import { patchOrderApi } from "../../utils/orders.utils";
import { useSelector } from "react-redux";
const EditOrderForm = ({
  selectedOrder,
  displayBasic,
  onHide,
  updateOrder,
}) => {
  const [order, setOrder] = useState({
    ...selectedOrder,
  });
  useEffect(() => {
    setOrder({
      ...selectedOrder,
    });
  }, [selectedOrder]);
  let toast;
  const username_id = useSelector(
    (state) => state.user.currentUser.username_id
  );
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
  const onChange = ({ target }) => {
    const { name, value } = target;

    setOrder({ ...order, [name]: value });
  };

  const onChangeSub = ({ target }) => {
    const { name, value } = target;
    if (name === "discount") {
      if (parseInt(value) > parseInt(amount_item)) {
        alert("discount can not be grater then amount item");
        return;
      }
      setOrder({
        ...order,
        total: amount_item - value,
        [name]: value,
      });
    } else;
    {
      let a = order;
      a.subData[0][name] = value;
      setOrder({ ...a });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchOrderApi({
      where: { order_id },
      updates: { note, username_id, discount },
    })
      .then((res) => {
        console.log(res);
        console.log("updated");
        onHide();
        updateOrder(order);
        // toast.show({
        //   severity: "success",
        //   summary: "Success Message",
        //   detail: "Message Content",
        //   life: 3000,
        // });
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

  const [date4, setDate4] = useState(null);

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
          {/* <div className="p-field p-col-6">
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
          </div> */}
          {/* <div className="p-field p-col-12 p-md-6">
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
          </div> */}
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
              value={note}
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
