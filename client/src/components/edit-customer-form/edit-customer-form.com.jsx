import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
// import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import { patchProductApi } from "../../utils/products.utils";
import { patchCustomerApi } from "../../utils/customers.utils";
const EditCustomerForm = ({ selectedCustomer, displayBasic, onHide }) => {
  const [customer, setCustomer] = useState({
    ...selectedCustomer,
  });
  const [error, setError] = useState(null);
  const { customer_id, first_name, last_name, mobile_number, city } = customer;

  const { note, address, home_other_number } = customer.subData[0];

  let toast;

  useEffect(() => {
    setCustomer({
      ...selectedCustomer,
    });
    setError(null);
  }, [selectedCustomer]);

  const onChange = ({ target }) => {
    const { name, value } = target;

    setCustomer({ ...customer, [name]: value });
  };

  const onChangeSub = ({ target }) => {
    const { name, value } = target;
    let a = customer;
    a.subData[0][name] = value;
    setCustomer({ ...a });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchCustomerApi({
      where: { customer_id },
      updates: {
        first_name,
        last_name,
        mobile_number,
        home_other_number,
        address,
        city,
        note,
        customer_id,
      },
    })
      .then((res) => {
        console.log(res);
        toast.show({
          severity: "Success",
          summary: "Success Message",
          detail: "Message Content",
          life: 3000,
        });
        onHide();
      })
      .catch((err) => {
        setError(err.response.data.error.sqlMessage);
      });
  };

  return (
    <div>
      <Toast ref={(el) => (toast = el)} />
      <Dialog
        header="Pay customer"
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={() => onHide("displayBasic")}
      >
        <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
          <div className="p-field p-col-4">
            <label htmlFor="customer_id">Customer CNIC</label>
            <InputText
              id="customer_id"
              type="number"
              name="customer_id"
              value={customer_id}
              onChange={onChange}
              readOnly
              required
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="first_name">Product name</label>
            <InputText
              id="first_name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="last_name">Last name</label>
            <InputText
              id="last_name"
              type="text"
              name="last_name"
              value={last_name}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="mobile_number">Mobile Number</label>
            <InputText
              id="mobile_number"
              type="text"
              name="mobile_number"
              value={mobile_number}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="home_other_number">Other Number</label>
            <InputText
              id="home_other_number"
              value={home_other_number ? home_other_number : ""}
              type="number"
              name="home_other_number"
              onChange={onChangeSub}
            />
          </div>
          <div className="p-field p-col-12"></div>
          <div className="p-field p-col-6">
            <label htmlFor="address">address</label>
            <InputTextarea
              id="address"
              type="text"
              value={address}
              onChange={onChangeSub}
              name="address"
              rows="4"
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="city">City</label>
            <InputText
              id="city"
              type="text"
              name="city"
              value={city}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-6">
            <label htmlFor="note">Note</label>
            <InputTextarea
              id="note"
              type="text"
              value={note ? note : ""}
              onChange={onChangeSub}
              name="note"
              placeholder="add any note about this product (optional)"
              rows="4"
            />
          </div>

          <div className="p-field p-col-12">
            <label>{error ? error : ""}</label>
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

export default EditCustomerForm;
