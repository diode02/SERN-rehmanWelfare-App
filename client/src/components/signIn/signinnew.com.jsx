import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { emailSignInStart } from "../../redux/users/user.actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInNew() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.user.errorMessage);

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormControl>
          {" "}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              id="email"
              label="User Name"
              name="username_id"
              autoFocus
              value={username_id}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </FormControl>

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
    </Container>
  );
}
