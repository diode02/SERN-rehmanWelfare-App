import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

// import "./sign-in-sign-up.sty.scss";
import SignUp from "../../components/signUp/signup-com";
import { Input, Box } from "@chakra-ui/core";

const SignInSignUp = ({ match }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  if (match.url === "/login") {
    return (
      // <div className="sign-in-sign-up">
      // <SignIn />
      // </div>
      <Box>
        <Input placeholder="Basic usage" />
      </Box>
    );
  } else
    return (
      <div className="sign-in-sign-up">
        <SignUp />
      </div>
    );
};

export default SignInSignUp;
