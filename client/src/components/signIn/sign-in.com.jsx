import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emailSignInStart } from "../../redux/users/user.actions";
import { Button, SimpleGrid } from "@chakra-ui/core";
import { Link } from "react-router-dom";

import { FormControl, FormLabel, Input, Box } from "@chakra-ui/core";

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
    <SimpleGrid columns={3}>
      <Box></Box>
      <Box>
        <h1>SIGNIN</h1>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">User Name</FormLabel>
            <Input
              id="email"
              name="username_id"
              aria-describedby="email-helper-text"
              required
              value={username_id}
              onChange={handleChange}
            />

            <FormLabel htmlFor="email">User Name</FormLabel>
            <Input
              id="email"
              label="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={handleChange}
            />
            <Button type="submit" value="Signin">
              Sign in
            </Button>
          </FormControl>
          <div className="create__new">
            Dont have an account? <Link to="/signup">Create new</Link>
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
      </Box>
      <Box></Box>
    </SimpleGrid>
  );
};

export default SignIn;
