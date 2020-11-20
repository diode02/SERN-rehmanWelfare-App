import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emailSignInStart } from "../../redux/users/user.actions";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const SignIn = () => {
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    username_id: "rehman",
    password: "rehmanrehman",
  });

  const { username_id, password } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailSignInStart(userCredentials));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div>
      <h1 className="p-text-center">SIGNIN</h1>
      <form
        className="p-fluid"
        onSubmit={handleSubmit}
        style={{
          textAlign: "left",
          padding: "40px",
        }}
      >
        <span className="p-float-label">
          <InputText
            id="in"
            name="username_id"
            value={username_id}
            onChange={handleChange}
          />
          <label htmlhtmlFor="in">Username</label>
        </span>
        <span className="p-float-label p-mt-4">
          <InputText
            id="in"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <label htmlhtmlFor="in">Password</label>
        </span>

        <br />
        <Button
          type="submit"
          label="Sign In"
          style={{
            width: "20%",
            color: "white",
            fontWeight: "bolder",
            fontSize: "1.1rem",
            backgroundColor: "#406AC4",
            padding: "10px 15px",
            borderRadius: "7px",
          }}
        />
      </form>
      <span
        style={{
          color: "red",
          marginTop: "10px",
        }}
      >
        {errorMessage === "Request failed with status code 400"
          ? "Please check your email and password"
          : ""}
      </span>
    </div>
  );
};

export default SignIn;
