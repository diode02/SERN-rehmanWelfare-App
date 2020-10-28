import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { postProductStart } from "../../redux/products/products.actions";
const AddProductForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);
  const products = useSelector((state) => state.products.products);
  const prevProducts = usePrevious(products);
  const [displayBasic, setdisplayBasic] = useState(false);
  let toast;

  useEffect(() => {
    if (prevProducts)
      if (prevProducts.length - products.length === -1) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postProductStart(productData));
  };
  return (
    <div className="card">
      <Toast ref={(el) => (toast = el)} />

      {/* <div onClick={() => onClick()}>Add Customer</div> */}
      <form className="p-fluid p-formgrid p-grid" onSubmit={handleSubmit}>
        <div className="p-field p-col-12 p-md-6">
          <label htmlFor="product_name">Product Name</label>
          <InputText
            id="product_name"
            name="product_name"
            type="text"
            value={product_name}
            onChange={onChange}
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
            value={note}
            onChange={onChange}
            name="note"
            placeholder="any note about product"
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
    </div>
  );
};

export default AddProductForm;
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
