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
        header="Header"
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={onHide}
      >
        <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
          <div className="p-field p-col-12">
            <label htmlFor="cnic">Customer CNIC Number</label>
            <InputText
              id="cnic"
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
              value={first_name}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="lastname">Last Name</label>
            <InputText
              id="lastname"
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
              type="text"
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
              type="text"
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
              onChange={onChange}
              name="city"
              required
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="note">Any note about customer</label>
            <InputTextarea
              id="note"
              type="text"
              rows="4"
              value={note}
              onChange={onChange}
              name="note"
            />
          </div>
          <div className="p-field p-col-12">
            <label>{error ? error.code : ""}</label>
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

export default NewCustomer;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
