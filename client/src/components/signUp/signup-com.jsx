import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.com";
import "./sign-up.sty.scss";
import CustomButton from "../custom-button/custom-button.com";

import { signUpStart } from "../../redux/users/user.actions";
import { Link } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();

  const [userCredentials, setUserCredetials] = useState({
    displayName: "Waqas",
    email: "gigi@hot.com",
    password: "12345678",
    confirmPassword: "12345678",
  });

  const { displayName, password, confirmPassword, email } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = userCredentials;

    if (password !== confirmPassword) {
      alert("passowrd dont match");
      return;
    }

    dispatch(signUpStart({ email, password, displayName }));
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setUserCredetials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h1>SIGNUP</h1>
      <span>Sign up by providing the following details</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          value={displayName}
          required
          handleChange={onChange}
          label="Display Name"
        />
        <FormInput
          name="email"
          type="email"
          value={email}
          required
          handleChange={onChange}
          label="Email"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          required
          handleChange={onChange}
          label="Password"
        />
        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          required
          handleChange={onChange}
          label="Confirm Password"
        />
        <CustomButton type="submit" value="Signup">
          Sign Up
        </CustomButton>
        <div className="sign__in">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
