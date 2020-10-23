import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const PayInstallmentForm = ({ selectedInstallment, displayBasic, onHide }) => {
  console.log(selectedInstallment);
  const [installment, setInstallment] = useState({
    ...selectedInstallment,
  });
  useEffect(() => {
    setInstallment({
      ...selectedInstallment,
    });
  }, [selectedInstallment]);
  const {
    order_id,
    installments_payment_id,
    due_date,
    penality,
    installment_no,
    amount_to_receive,
    amount_received,
  } = installment;
  const onChange = ({ target }) => {
    const { name, value } = target;
    setInstallment({ ...installment, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch(postCustomerStart(customerData));
  };
  return (
    <Dialog
      header="Pay Installment"
      visible={displayBasic}
      style={{ width: "70vw" }}
      onHide={() => onHide("displayBasic")}
    >
      <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
        <div className="p-field p-col-3">
          <label htmlFor="cnic">Order ID</label>
          <InputText
            id="cnic"
            name="order_id"
            type="text"
            value={order_id}
            onChange={onChange}
            required
            readOnly
          />
        </div>
        <div className="p-field p-col-3">
          <label htmlFor="cnic">Installment ID</label>
          <InputText
            id="installments_payment_id"
            name="installments_payment_id"
            type="text"
            value={installments_payment_id}
            onChange={onChange}
            required
            readOnly
          />
        </div>

        {/* <div className="p-field p-col-12">
          <label htmlFor="note">Any note about customer</label>
          <InputTextarea
            id="note"
            type="text"
            rows="4"
            value={note}
            onChange={onChange}
            name="note"
          />
        </div> */}
        <div className="p-field p-col-12">
          {/* <label>{error ? error.code : ""}</label> */}
        </div>
        <Button
          label=""
          className="p-col-2 p-justify-end"
          type="submit"
          icon="pi pi-check"
        />
      </form>
    </Dialog>
  );
};

export default PayInstallmentForm;
