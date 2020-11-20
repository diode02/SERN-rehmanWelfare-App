import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { postProductStart } from "../../redux/products/products.actions";
const NewProduct = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);
  const products = useSelector((state) => state.products.products);
  const prevProducts = usePrevious(products);
  const [displayBasic, setdisplayBasic] = useState(false);
  let toast;
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prevProducts)
      if (prevProducts.length - products.length === -1 && submitted) {
        setdisplayBasic(!displayBasic);
        toast.show({
          severity: "success",
          summary: "Success Message",
          detail: "New Product Added",
          life: 3000,
        });
        setProductData({
          product_name: "",
          price: 0,
          note: "",
        });
        setSubmitted(false);
      }
  }, [products, displayBasic, prevProducts, toast]);

  const [productData, setProductData] = useState({
    product_name: "",
    // category_id: "",
    price: 0,
    note: "",
  });
  const { product_name, price, note } = productData;

  const onChange = ({ target }) => {
    const { name, value } = target;
    setProductData({ ...productData, [name]: value });
  };

  const onClick = () => {
    setdisplayBasic(true);
  };

  const onHide = () => {
    setdisplayBasic(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postProductStart(productData));
    setSubmitted(true);
  };
  return (
    <div className="card">
      <Toast ref={(el) => (toast = el)} />

      <Button
        label="Add Product"
        icon="pi pi-external-link"
        onClick={() => onClick()}
        style={{
          float: "right",
        }}
      />

      {/* <div onClick={() => onClick()}>Add Customer</div> */}
      <Dialog
        header="Add Product"
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={onHide}
      >
        <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="product_name">Product Name</label>
            <InputText
              id="product_name"
              name="product_name"
              type="text"
              value={product_name}
              onChange={onChange}
              maxLength="50"
              required
            />
          </div>
          {/* <div className="p-field p-col-12 p-md-6">
          <label htmlFor="category_id"></label>
          <InputText
            id="category_id"
            type="text"
            name="category_id"
            value={category_id}
            onChange={onChange}
            required
          />
        </div> */}
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="price">Price</label>
            <InputText
              id="price"
              type="number"
              name="price"
              value={price}
              min="0"
              max="999999999"
              onChange={onChange}
              required
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="note">Note</label>
            <InputTextarea
              id="note"
              type="text"
              rows="4"
              maxLength="97"
              value={note}
              onChange={onChange}
              name="note"
              placeholder="any note about product"
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
              label="Add Product"
              className="p-d-block p-mx-auto"
              icon="pi pi-user-plus"
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default NewProduct;
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
