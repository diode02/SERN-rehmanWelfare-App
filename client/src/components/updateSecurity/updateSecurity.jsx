import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Password } from "primereact/password";

import { updateUserStart } from "../../redux/users/user.actions";

const UpdateSecurity = ({}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [data, setData] = useState({
    current_password: "",
    password: "",
    confirm_password: "",
  });

  const { current_password, password, confirm_password } = data;

  const handleChange = (event) => {
    const { value, name } = event.target;

    setData({ ...data, [name]: value });
  };

  const handleClick = () => {
    if (password != confirm_password) {
      return alert("New Passwords and Confirm Paswword must be equal");
    }
    dispatch(
      updateUserStart({
        data: { current_password, password },
        username_id: currentUser.username_id,
      })
    );
    setData({ current_password: "", password: "", confirm_password: "" });
  };

  return (
    <Panel
      expandIcon="pi pi-pencil"
      header="Change Password"
      toggleable
      collapsed={panelCollapsed}
      onToggle={(e) => setPanelCollapsed(e.value)}
    >
      <form className="p-fluid" onSubmit={handleClick}>
        <div className="p-field p-grid">
          <label className="p-col-12 p-md-2">Current Password</label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="current_password"
              placeholder="Enter your old passowrd here...."
              type="password"
              name="current_password"
              value={current_password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="p-field p-grid">
          <label className="p-col-12 p-md-2">New Password</label>
          <div className="p-col-12 p-md-10">
            <Password
              id="password"
              placeholder="Enter your new passowrd here...."
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="p-field p-grid">
          <label className="p-col-12 p-md-2">Confirm Password</label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="confirm_password"
              placeholder="Confirm your new passowrd here...."
              type="password"
              name="confirm_password"
              // promptLabel="Enter new password"
              value={confirm_password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <Button label="submit" type="submit" />
      </form>
    </Panel>
  );
};

export default UpdateSecurity;
