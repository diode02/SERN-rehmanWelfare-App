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
    // if (name === "amount_received") {
    //   setInstallment({
    //     ...installment,
    //     [name]: parseInt(value) + parseInt(penality),
    //   });
    //   return;
    // } else if (name === "penality" && amount_received !== 0) {
    //   setInstallment({
    //     ...installment,
    //     [name]: value,
    //     amount_received: parseInt(value) + parseInt(amount_received),
    //   });
    //   return;
    // }
    setInstallment({ ...installment, [name]: value });
  };

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    patchInstallmentsApi({
      where: { installments_payment_id },
      updates: { penality, amount_received, note, username_id },
    })
      .then((res) => {
        updateInstallment(installment);
        // toast.show({
        //   severity: "success",
        //   summary: "Success Message",
        //   detail: "Message Content",
        //   life: 3000,
        // });
        onHide();
      })
      .catch((err) => setError("something went wrong"));
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
              max="999999"
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
              max="99999999"
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
              maxLength="95"
              onChange={onChange}
            />
          </div>

          <span
            className="p-col-2 p-justify-end"
            onClick={() => {
              setInstallment({
                ...installment,
                penality: 0,
                amount_received: amount_to_receive,
                note: " ",
              });
            }}
            style={{
              fontWeight: "bolder",
              fontSize: "1.2rem",
            }}
          >
            Auto Fill
          </span>

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
              label="Pay Installment"
              className="p-d-block p-mx-auto"
              icon="pi pi-user-plus"
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default PayInstallmentForm;
