import React from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

const HeaderOverlay = ({ items }) => {
  let overlayToogle = 0;

  return (
    <div>
      <Button
        type="button"
        label="User"
        style={{
          marginRight: "20px",
          borderRadius: "10px",
          fontWeight: "bolder",
        }}
        onClick={(event) => overlayToogle.toggle(event)}
      />
      <Menu model={items} popup ref={(el) => (overlayToogle = el)} />
    </div>
  );
};

export default HeaderOverlay;
