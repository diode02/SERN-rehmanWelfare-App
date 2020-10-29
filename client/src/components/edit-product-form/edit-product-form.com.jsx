import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
// import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import { patchOrderApi } from "../../utils/orders.utils";
import { patchProductApi } from "../../utils/products.utils";
const EditProductForm = ({ selectedProduct, displayBasic, onHide }) => {
  const [order, setProduct] = useState({
    ...selectedProduct,
  });
  const [error, setError] = useState(null);
  const { product_id, product_name, price, note } = order;
  const dispatch = useDispatch();
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
      .catch((err) => setError(err));
  };

  return (
    <div>
      <Toast ref={(el) => (toast = el)} />
      <Dialog
        header="Pay order"
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={() => onHide("displayBasic")}
      >
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
              value={note ? note : ""}
              onChange={onChange}
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

export default EditProductForm;
