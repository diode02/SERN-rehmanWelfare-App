import React, { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
// import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import { deleteProductApi, patchProductApi } from "../../utils/products.utils";
import { getOrdersWhereUser } from "../../utils/customers.utils";
const EditProductForm = ({ selectedProduct, displayBasic, onHide }) => {
  const [displayBasicDelete, setDisplayBasicDelete] = useState(false);
  const [order, setProduct] = useState({
    ...selectedProduct,
  });
  const [error, setError] = useState(null);
  const { product_id, product_name, price, note } = order;
  let toast;

  useEffect(() => {
    setProduct({
      ...selectedProduct,
    });
  }, [selectedProduct]);

  const onChange = ({ target }) => {
    const { name, value } = target;

    setProduct({ ...order, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchProductApi({
      where: { product_id },
      updates: {
        note,
        price,
        product_name,
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
      .catch((err) => setError("something went wrong"));
  };

  const handleDelete = () => {
    getOrdersWhereUser([{ product_id: product_id }]).then((res) => {
      if (res.length > 0) {
        onClickDel();
      } else {
        deleteProductApi(product_id)
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
            // console.log({ err });
            setError(err.sqlMessage);
          });
      }
    });
  };

  const handleSoftDelete = () => {
    patchProductApi({
      where: { product_id },
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
        header="Pay order"
        visible={displayBasic}
        style={{ width: "50vw" }}
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
        <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
          <div className="p-field p-col-4">
            <label htmlFor="product_id">Product ID</label>
            <InputText
              id="product_id"
              type="number"
              name="product_id"
              value={product_id}
              onChange={onChange}
              required
              readOnly
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="product_name">Product name</label>
            <InputText
              id="product_name"
              type="text"
              name="product_name"
              value={product_name}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-4">
            <label htmlFor="price">Product Price</label>
            <InputText
              id="price"
              type="number"
              name="price"
              min="0"
              max="999999999"
              value={price}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12"></div>
          <div className="p-field p-col-6">
            <label htmlFor="note">Note</label>
            <InputTextarea
              id="note"
              type="text"
              maxLength="97"
              value={note ? note : ""}
              onChange={onChange}
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
              label="Update Product"
              className="p-d-block p-mx-auto"
              icon="pi pi-user-plus"
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
          This Product is included in orders. It is reccomended that avoid
          deleting these type of Products.
        </p>
      </Dialog>
    </div>
  );
};

export default EditProductForm;
