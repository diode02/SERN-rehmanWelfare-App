import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { createUserWithEmailAndPassword } from "../../utils/user.utils";

const NewUser = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [userData, setUserData] = useState({
    username_id: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    sec_que_one: "",
    sec_que_two: "",
    sec_que_three: "",
    created_by: currentUser.username_id,
  });
  const {
    username_id,
    first_name,
    last_name,
    confirm_password,
    password,
    sec_que_one,
    sec_que_two,
    sec_que_three,
  } = userData;

  const onChange = ({ target }) => {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password != confirm_password) {
      return alert("New Passwords and Confirm Paswword must be equal");
    }
    createUserWithEmailAndPassword(userData)
      .then((res) => {
        setUserData({
          username_id: "",
          first_name: "",
          last_name: "",
          password: "",
          confirm_password: "",
          sec_que_one: "",
          sec_que_two: "",
          sec_que_three: "",
        });
        alert("New User Created");
      })
      .catch((err) => {
        alert("Something went wrong, please try again later");
      });
  };

  return (
    <form
      className="p-fluid p-formgrid p-grid nested-grid"
      onSubmit={handleSubmit}
      style={{
        marginTop: "20px",
      }}
    >
      <div className="p-col-8">
        <div className="p-grid">
          <div className="p-col-12 p-mb-5">
            <div className="box">
              <label htmlFor="cnic">User Name ID</label>
              <InputText
                id="username_id"
                name="username_id"
                type="text"
                maxLength="10"
                value={username_id}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="p-col-12 p-mb-5">
            <div className="box">
              <label htmlFor="cnic">First Name</label>
              <InputText
                id="first_name"
                name="first_name"
                type="text"
                maxLength="15"
                value={first_name}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="p-col-12 p-mb-5">
            <div className="box">
              <label htmlFor="cnic">Last Name</label>
              <InputText
                id="last_name"
                name="last_name"
                type="text"
                maxLength="15"
                value={last_name}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="p-col-6 p-mb-4">
            <div className="box">
              <label htmlFor="firstname">Password</label>
              <InputText
                id="password"
                name="password"
                type="password"
                maxLength="45"
                value={password}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="p-col-6 p-mb-4">
            <div className="box">
              <label htmlFor="firstname">Confoirm Password</label>
              <InputText
                id="confirm_password"
                name="confirm_password"
                type="password"
                maxLength="45"
                value={confirm_password}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="p-col-6 p-mb-4">
            <label htmlFor="sec_que_one">
              Security Question 1: Your Pet Name?
            </label>
            <InputText
              id="sec_que_one"
              type="text"
              name="sec_que_one"
              value={sec_que_one}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-col-6 p-mb-4">
            <label htmlFor="sec_que_one">
              Security Question 2: Your First Phone Number?
            </label>
            <InputText
              id="sec_que_two"
              type="text"
              name="sec_que_two"
              value={sec_que_two}
              onChange={onChange}
              required
            />
          </div>
          <div className="p-col-6 p-mb-4">
            <label htmlFor="sec_que_one">
              Security Question 3: Your Nick Name?
            </label>
            <InputText
              id="sec_que_three"
              type="text"
              name="sec_que_three"
              value={sec_que_three}
              onChange={onChange}
              required
            />
          </div>
          <Button label="Submit" />
        </div>
      </div>
    </form>
  );
};

export default NewUser;
