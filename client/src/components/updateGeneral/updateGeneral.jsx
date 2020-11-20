import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";

import { updateUserStart } from "../../redux/users/user.actions";
// import { useEffect } from "react";

const UpdateGeneral = ({ field_title, field_value, field_name }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [data, setData] = useState({
    [field_name]: "",
    current_password: "",
  });
  // useEffect(() => {
  //   console.log(currentUser.errorMessage);
  //   if (currentUser.hasOwnProperty("errorMessage")) {
  //     if (currentUser.errorMessage.hasOwnProperty("message")) {
  //       return alert("Please Enter Correct Password");
  //     }
  //   }
  // }, [currentUser]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChange = (event) => {
    const { value, name } = event.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserStart({ data, username_id: currentUser.username_id }));
    setData({ [field_name]: "", current_password: "" });
  };

  const { current_password } = data;
  const field_new_value = data.field_name;
  return (
    <Panel
      expandIcon="pi pi-pencil"
      header={`${capitalizeFirstLetter(field_title)}: ${field_value}`}
      toggleable
      collapsed={panelCollapsed}
      onToggle={(e) => setPanelCollapsed(e.value)}
    >
      <form className="p-fluid" onSubmit={handleSubmit}>
        <div className="p-field p-grid">
          <label htmlFor="firstname4" className="p-col-12 p-md-2">
            {capitalizeFirstLetter(field_title)}
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              placeholder={`Enter New ${capitalizeFirstLetter(
                field_title
              )} Here....`}
              required
              id="firstname4"
              name={field_name}
              type={"text"}
              value={field_new_value}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-field p-grid">
          <label htmlFor="password4" className="p-col-12 p-md-2">
            Password
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="current_password"
              placeholder="Enter Password Here..."
              type="password"
              required
              name="current_password"
              value={current_password}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button label="submit" type="submit" />
      </form>
    </Panel>
  );
};

export default UpdateGeneral;
