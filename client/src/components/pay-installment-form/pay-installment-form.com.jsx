import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import { patchInstallmentsApi } from "../../utils/installments.utils";
import { useSelector } from "react-redux";
const PayInstallmentForm = ({
  selectedInstallment,
  displayBasic,
  onHide,
  updateInstallment,
}) => {
  const [installment, setInstallment] = useState({
    ...selectedInstallment,
  });
  useEffect(() => {
    setInstallment({
      ...selectedInstallment,
    });
  }, [selectedInstallment]);
  let toast;
  const username_id = useSelector(
    (state) => state.user.currentUser.username_id
  );
  const {
    order_id,
    installments_payment_id,
    due_date,
    penality,
    installment_no,
    amount_to_receive,
    amount_received,
    note,
  } = installment;
  const onChange = ({ target }) => {
    const { name, value } = target;
    setInstallment({ ...installment, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchInstallmentsApi({
      where: { installments_payment_id },
      updates: { penality, amount_received, note, username_id },
    })
      .then((res) => {
        onHide();
        updateInstallment(installment);
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
  return (
    <div>
      <Toast ref={(el) => (toast = el)} />
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
              required
              readOnly
            />
          </div>
          <div className="p-field p-col-3">
            <label htmlFor="cnic">Installment Number</label>
            <InputText
              id="installment_no"
              name="installment_no"
              type="text"
              value={installment_no}
              required
              readOnly
            />
          </div>

          <div className="p-field p-col-3">
            <label htmlFor="cnic">Due Date</label>
            <InputText
              id="due_date"
              name="due_date"
              type="text"
              value={due_date}
              required
              readOnly
            />
          </div>

          <div className="p-field p-col-3">
            <label htmlFor="cnic">Amount To Receive</label>
            <InputText
              id="amount_to_receive"
              name="amount_to_receive"
              value={amount_to_receive}
              mode="currency"
              currency="PKR"
              required
              readOnly
            />
          </div>

          <div className="p-field p-col-3">
            <label htmlFor="cnic">Penality</label>
            <InputText
              id="penality"
              name="penality"
              value={penality}
              type="number"
              required
              onChange={onChange}
            />
          </div>

          <div className="p-field p-col-3">
            <label htmlFor="cnic">Amount Received</label>
            <InputText
              id="amount_received"
              name="amount_received"
              value={amount_received}
              type="number"
              required
              onChange={onChange}
            />
          </div>

          <div className="p-field p-col-3">
            <label htmlFor="cnic">Note</label>
            <InputTextarea
              id="note"
              name="note"
              type="text"
              value={note ? note : ""}
              rows="4"
              onChange={onChange}
            />
          </div>

          <div
            className="p-col-2 p-justify-end"
            onClick={() => {
              setInstallment({
                ...installment,
                penality: 0,
                amount_received: amount_to_receive,
                note: " ",
              });
            }}
          >
            Auto Fill
          </div>

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
    </div>
  );
};

export default PayInstallmentForm;
