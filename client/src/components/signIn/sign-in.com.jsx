import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emailSignInStart } from "../../redux/users/user.actions";
import { Link } from "react-router-dom";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const SignIn = () => {
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    username_id: "qaskhan02",
    password: "khankhan",
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
      <div
        style={{
          width: "15%",
          margin: "0 auto",
        }}
      >
        <h1>SIGNIN</h1>
        <form className="p-field p-grid" onSubmit={handleSubmit}>
          <div>
            <label
              className="p-col-fixed"
              htmlFor="email"
              style={{ width: "100px" }}
            >
              User Name
            </label>
            <div className="p-col">
              <InputText
                id="email"
                name="username_id"
                required
                value={username_id}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <InputText
                id="password"
                label="Password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />
          <Button type="submit" value="Signin">
            Sign in
          </Button>
          <div className="create__new">
            Dont have an account? <Link to="/login">Create new</Link>
          </div>
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
    </div>
  );
};

export default SignIn;
