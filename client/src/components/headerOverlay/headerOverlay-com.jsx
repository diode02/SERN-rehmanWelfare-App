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
        style={
          {
            // backgroundImage: `url(${imgData})`,
            // borderRadius: "50%",
            // height: "50px",
            // width: "50px",
            // backgroundSize: "cover",
            // backgroundPosition: "center center",
          }
        }
        onClick={(event) => overlayToogle.toggle(event)}
      />
      <Menu model={items} popup ref={(el) => (overlayToogle = el)} />
    </div>
  );
};

export default HeaderOverlay;
