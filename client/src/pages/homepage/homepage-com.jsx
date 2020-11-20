import React from "react";
import { useHistory } from "react-router-dom";
import ImportForm from "../../components/folderChoose/folderChoose.com";
import { MenuItemContainer } from "./homepage-sty";
const HomePage = (props) => {
  let history = useHistory();
  let items = [
    {
      label: "New Order",
      command: () => {
        history.push("/neworder");
      },
    },
    {
      label: "All Orders",
      command: () => {
        history.push("/orders");
      },
    },
    {
      label: "Pay Installments",
      command: () => {
        history.push("/payinstallment");
      },
    },
    {
      label: "Add Product",
      command: () => {
        history.push("/product");
      },
    },
    {
      label: "New Cutsomer",
      command: () => {
        history.push("/newcustomer");
      },
    },
    {
      label: "All Customers",
      command: () => {
        history.push("/customers");
      },
    },
  ];
  return (
    <div
      className="p-grid p-align-stretch vertical-container"
      style={{
        padding: "2%",
        color: "white",
        width: "98%",
      }}
    >
      {items.map((item) => {
        return (
          <div key={item.label} className="p-col-4">
            <MenuItemContainer
              className="box box-stretched"
              onClick={item.command}
            >
              {item.label}
            </MenuItemContainer>
          </div>
        );
      })}

      {/* <div className="p-col">
        <div className="box box-stretched">4</div>
      </div>
      <div className="p-col">
        <div className="box box-stretched">4</div>
      </div> */}
    </div>
  );
};

export default HomePage;
