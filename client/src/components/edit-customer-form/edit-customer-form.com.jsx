import React, { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
// import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import {
  deleteCustomerApi,
  getAvatarApi,
  getOrdersWhereUser,
} from "../../utils/customers.utils";
import { patchCustomerApi } from "../../utils/customers.utils";
const EditCustomerForm = ({ selectedCustomer, displayBasic, onHide }) => {
  const [displayBasicDelete, setDisplayBasicDelete] = useState(false);
  const [customer, setCustomer] = useState({
    ...selectedCustomer,
  });
  const [error, setError] = useState(null);
  const { customer_id, first_name, last_name, mobile_number, city } = customer;

  const { note, address, home_other_number } = customer.subData[0];
  let toast;

  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    setCustomer({
      ...selectedCustomer,
    });

    setImgData(null);

    (async function funForAsync() {
      try {
        await getAvatarApi(selectedCustomer.customer_id).then((res) => {
          setImgData(`${res}`);
        });
      } catch (error) {
        console.log("error");
      }
    })();

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
        toast.show({
          severity: "Success",
          summary: "Success Message",
          detail: "Message Content",
          life: 3000,
        });
        onHide();
      })
      .catch((err) => {
        setError("something went wrong");
      });
  };

  const handleDelete = () => {
    //check if this user have orders
    getOrdersWhereUser([
      { customer_id: customer_id },
      { guarantor_one_id: customer_id },
      { guarantor_two_id: customer_id },
      { guarantor_three_id: customer_id },
    ]).then((res) => {
      if (res.length > 0) {
        onClickDel();
      } else {
        deleteCustomerApi(customer_id)
          .then((res) => {
            toast.show({
              severity: "Success",
              summary: "Success Message",
              detail: "Message Content",
              life: 3000,
            });
            onHide();
          })
          .catch((err) => {
            setError(err.sqlMessage);
          });
      }
    });
  };

  const handleSoftDelete = () => {
    patchCustomerApi({
      where: { customer_id },
      updates: {
        soft_delete: 1,
      },
    })
      .then((res) => {
        toast.show({
          severity: "Success",
          summary: "Success Message",
          detail: "Message Content",
          life: 3000,
        });
        onHideDel();
        onHide();
      })
      .catch((err) => {
        // console.log({ err });
        setError(err.sqlMessage);
      });
  };

  const onHideDel = () => {
    setDisplayBasicDelete(false);
  };
  const onClickDel = () => {
    setDisplayBasicDelete(true);
  };

  const footer = (
    <div>
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          handleSoftDelete();
        }}
      />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => {
          onHideDel();
        }}
      />
    </div>
  );

  return (
    <div>
      <Toast ref={(el) => (toast = el)} />
      <Dialog
        header="Pay customer"
        visible={displayBasic}
        style={{ width: "70vw" }}
        onHide={() => onHide("displayBasic")}
      >
        <Button
          label="Delete"
          className="p-button-raised p-button-danger"
          onClick={handleDelete}
          style={{
            display: "flex",
            marginInlineStart: "auto",
          }}
        />

        <form
          className="p-fluid p-formgrid p-grid nested-grid"
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
          }}
        >
          <div className="p-col-8">
            <div className="p-grid">
              <div className="p-col-12 p-mb-5">
                <div className="box">
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
              </div>
              <div className="p-col-6 p-mb-4">
                <div className="box">
                  <label htmlFor="first_name">First name</label>
                  <InputText
                    id="first_name"
                    type="text"
                    name="first_name"
                    maxLength="45"
                    value={first_name}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="p-col-6 p-mb-4">
                <div className="box">
                  <label htmlFor="last_name">Last name</label>
                  <InputText
                    id="last_name"
                    type="text"
                    name="last_name"
                    maxLength="45"
                    value={last_name}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="p-col-6 p-mb-4">
                <label htmlFor="mobile_number">Mobile Number</label>
                <InputText
                  id="mobile_number"
                  type="number"
                  max="99999999999999"
                  min="99"
                  name="mobile_number"
                  value={mobile_number}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="p-col-6 p-mb-4">
                <label htmlFor="home_other_number">Other Number</label>
                <InputText
                  id="home_other_number"
                  value={home_other_number ? home_other_number : ""}
                  type="number"
                  max="99999999999999"
                  min="99"
                  name="home_other_number"
                  onChange={onChangeSub}
                />
              </div>
            </div>
          </div>
          <div className="p-col-4">
            <div
              className="box box-stretched"
              style={{
                width: "100%",
                height: "250px",
                overflow: "hidden",
              }}
            >
              {imgData ? (
                <img
                  style={{
                    width: "100%",
                    height: "85%",
                  }}
                  src={imgData}
                  alt="profile pic"
                ></img>
              ) : (
                <i
                  style={{
                    fontSize: "10em",
                    width: "100%",
                    height: "85%",
                  }}
                  className="pi pi-user"
                ></i>
              )}

              {/* <div
                style={{
                  display: "flex",
                  marginTop: "7px",
                  justifyContent: "center",
                }}
              >
                <span
                  icon="pi pi-external-link"
                  onClick={onClickChoose}
                  className="p-tag"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Choose Picture
                </span>
                <span
                  icon="pi pi-external-link"
                  onClick={clearPhoto}
                  className="p-tag"
                  style={{
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </span>
              </div> */}
            </div>
          </div>

          <div className="p-field p-col-6">
            <label htmlFor="address">address</label>
            <InputTextarea
              id="address"
              type="text"
              value={address}
              onChange={onChangeSub}
              name="address"
              maxLength="230"
              rows="4"
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="city">City</label>
            <InputText
              id="city"
              type="text"
              maxLength="42"
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
              maxLength="97"
              name="note"
              placeholder="add any note about this product (optional)"
              rows="4"
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
              label="Update Customer"
              className="p-d-block p-mx-auto"
              icon="pi pi-user-edit"
            />
          </div>
        </form>
      </Dialog>
      <Dialog
        header="Warning"
        visible={displayBasicDelete}
        style={{ width: "50vw" }}
        onHide={() => onHideDel("displayBasicDelete")}
        footer={footer}
      >
        <p>
          This customer is included in orders as a customer or gurrantor. It is
          reccomended that avoid deleting these type of customer
        </p>
      </Dialog>
    </div>
  );
};

export default EditCustomerForm;
