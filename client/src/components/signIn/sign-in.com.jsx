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
          width: "40%",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "rgb(96%, 96%, 96%)",
          borderRadius: "10px",
          fontWeight: "bolder",
          marginTop: "10%",
        }}
      >
        <h1
          style={{
            fontWeight: "bolder",
            fontSize: "1.7rem",
            color: "gray",
          }}
        >
          SIGNIN
        </h1>
        <form
          className="p-fluid"
          onSubmit={handleSubmit}
          style={{
            textAlign: "left",
            padding: "40px",
          }}
        >
          <div>
            <label className="" htmlFor="email">
              User Name
            </label>
            <div className="">
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
          <Button
            type="submit"
            value="Signin"
            style={{
              width: "23%",
            }}
          >
            Sign in
          </Button>
          <div
            className=""
            style={{
              fontWeight: "bolder",
            }}
          >
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
