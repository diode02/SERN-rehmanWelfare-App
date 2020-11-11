import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import { fetchProductsStart } from "../../redux/products/products.actions";
import { ProgressSpinner } from "primereact/progressspinner";
import EditProductForm from "../../components/edit-product-form/edit-product-form.com";

// import "./sty.css";
import NewProduct from "../../components/new-product/add-product.com";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);

  const onHide = () => {
    setDisplayBasic(false);
    dispatch(fetchProductsStart());
  };
  const onClick = () => {
    setDisplayBasic(true);
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  return (
    <div>
      <NewProduct />
      {products ? (
        <ScrollPanel
          style={{
            width: "100%",
            height: "80vh",
          }}
        >
          <DataTable
            value={products}
            dataKey="product_id"
            className="p-datatable-striped"
            selection={selectedProduct}
            onSelectionChange={(e) => {
              setSelectedProduct(e.value);
              onClick("displayBasic");
            }}
            selectionMode="single"
          >
            <Column
              field="product_id"
              header="Product ID"
              filter
              sortable
            ></Column>
            <Column
              field="product_name"
              header="Product Name"
              filter
              sortable
            ></Column>
            <Column field="price" header="Price" filter sortable></Column>
            <Column
              field="createdAt"
              header="Created At"
              filter
              sortable
            ></Column>
            <Column
              field="updatedAt"
              header="Updated At"
              filter
              sortable
            ></Column>
          </DataTable>
          {selectedProduct ? (
            <EditProductForm
              selectedProduct={selectedProduct}
              displayBasic={displayBasic}
              onHide={onHide}
              //   updateOrders={updateOrders}
            />
          ) : null}
        </ScrollPanel>
      ) : (
        <div
          style={{
            height: "100vh",
            overflow: "auto",
          }}
        >
          <ProgressSpinner
            style={{
              margin: "0 auto",
              width: "100%",
              padding: "5%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
