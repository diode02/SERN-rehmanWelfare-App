import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { FileUpload } from "primereact/fileupload";

import { InputTextarea } from "primereact/inputtextarea";
import { postCustomerStart } from "../../redux/customers/customers.actions";
const AddCustomerForm = () => {
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
        setCustomerData({
          customer_id: "",
          first_name: "",
          last_name: "",
          mobile_number: "",
          home_other_mobile: "",
          address: "",
          city: "",
          note: "",
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
    photo: null,
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

  const onChange = ({ target }) => {
    const { name, value } = target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postCustomerStart(customerData));
  };

  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setCustomerData({ ...customerData, photo: event.target.files[0] });
  };
  return (
    <div className="card">
      <Toast ref={(el) => (toast = el)} />

      {/* <div onClick={() => onClick()}>Add Customer</div> */}
      <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={onChangeHandler} />

        <div className="p-field p-col-12">
          <label htmlFor="cnic">Customer CNIC Number</label>
          <InputMask
            id="cnic"
            mask="999999999999999"
            name="customer_id"
            type="text"
            value={customer_id}
            onChange={onChange}
            required
            // autoClear={false}
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
            type="text"
            name="last_name"
            maxLength="45"
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
            rows="4"
            maxLength="230"
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
            type="text"
            rows="4"
            maxLength="97"
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
    </div>
  );
};

export default AddCustomerForm;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
