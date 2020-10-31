import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";

// import { store } from "../../redux/store";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { postCustomerStart } from "../../redux/customers/customers.actions";
const NewCustomer = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.customers.error);
  const customers = useSelector((state) => state.customers.customers);
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
      }
  }, [customers, displayBasic, prevCustomer, toast]);

  const [customerData, setCustomerData] = useState({
    customer_id: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    home_other_mobile: "",
    address: "",
    city: "",
    note: "",
  });
  const {
    customer_id,
    first_name,
    last_name,
    mobile_number,
    home_other_mobile,
    address,
    city,
    note,
  } = customerData;
  const onClick = () => {
    setdisplayBasic(true);
  };

  const onHide = () => {
    setdisplayBasic(false);
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postCustomerStart(customerData));
  };
  return (
    <div className="card">
      <Toast ref={(el) => (toast = el)}></Toast>

      <Button
        label="Add Customer"
        icon="pi pi-external-link"
        onClick={() => onClick()}
        style={{
          float: "right",
        }}
      />
      {/* <div onClick={() => onClick()}>Add Customer</div> */}
      <Dialog
        header="Add Customer"
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={onHide}
      >
        <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
          <div className="p-field p-col-12">
            <label htmlFor="cnic">Customer CNIC Number</label>
            <InputText
              id="cnic"
              mask="999999999999999"
              name="customer_id"
              type="text"
              value={customer_id}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="firstname">First Name</label>
            <InputText
              id="firstname"
              name="first_name"
              type="text"
              maxLength="45"
              value={first_name}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="lastname">Last Name</label>
            <InputText
              id="lastname"
              maxLength="45"
              type="text"
              name="last_name"
              value={last_name}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="mobile">Mobile Number</label>
            <InputText
              id="mobile"
              type="number"
              max="99999999999999"
              min="99"
              name="mobile_number"
              value={mobile_number}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="other_mobile">Other Number</label>
            <InputText
              id="other_mobile"
              type="number"
              max="99999999999999"
              min="99"
              name="home_other_number"
              value={home_other_mobile}
              onChange={onChange}
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="address">Address</label>
            <InputTextarea
              id="address"
              name="address"
              type="text"
              maxLength="230"
              rows="4"
              value={address}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="city">City</label>
            <InputText
              id="city"
              type="text"
              value={city}
              maxLength="42"
              onChange={onChange}
              name="city"
              required
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="note">Any note about customer</label>
            <InputTextarea
              id="note"
              maxLength="97"
              type="text"
              rows="4"
              value={note}
              onChange={onChange}
              name="note"
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
              label="Add Customer"
              className="p-d-block p-mx-auto"
              icon="pi pi-user-plus"
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default NewCustomer;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
