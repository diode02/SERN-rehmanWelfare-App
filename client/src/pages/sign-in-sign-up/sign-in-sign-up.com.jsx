import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// import "./sign-in-sign-up.sty.scss";
// import SignUp from "../../components/signUp/signup-com";
import SignIn from "../../components/signIn/sign-in.com";
import SignInNew from "../../components/signIn/signinnew.com";
import {
  resetUserPassword,
  signInWithEmailAndPassword,
} from "../../utils/user.utils";
import { Password } from "primereact/password";
const SignInSignUp = () => {
  const [displayPasswordDialog, setResetDialog] = useState(false);
  const [eror, setEror] = useState("");
  const [resetPermi, setResetPermi] = useState(true);
  const [userResetDetails, setUserResetDetails] = useState({
    username_id: "",
    password: "",
    confirm_password: "",
  });
  const [questions, setQuestions] = useState([
    {
      que: "Your pet name?",
      ans: "",
    },
    {
      que: "Your first phone number?",
      ans: "",
    },
    {
      que: "Your nick name?",
      ans: "",
    },
  ]);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setUserResetDetails({ ...userResetDetails, [name]: value });
  };

  const handleChnage = (e) => {
    const { name, value } = e.target;
    let tempArr = [...questions];
    tempArr[name].ans = value;

    setQuestions(tempArr);
  };

  return (
    <div>
      <SignInNew />
      <div className="p-text-center">
        <Button
          label={"Reset Password"}
          onClick={() => {
            setResetDialog(true);
            setEror("");
          }}
        />
      </div>

      <Dialog
        header={true ? "Confirm your Identity" : "Enter New Password"}
        visible={displayPasswordDialog}
        style={{ width: "20vw" }}
        onHide={() => {
          setResetDialog(false);
        }}
      >
        {resetPermi ? (
          <>
            <span className="p-field">
              <label className="p-mt-4">Enter your username here:</label>
              <InputText
                type="text"
                name="username_id"
                value={userResetDetails.username_id}
                onChange={onChange}
              />
            </span>
            <br />
            {questions.map((ques, index) => {
              return (
                <span className="p-field" key={index}>
                  <label className="p-mt-4">{ques.que}</label>
                  <br />
                  <InputText
                    id={index}
                    name={index}
                    value={ques.ans}
                    onChange={handleChnage}
                    type={"text"}
                  />
                  <br />
                </span>
              );
            })}
            <Button
              label="Submit"
              className="p-mt-4"
              onClick={() => {
                signInWithEmailAndPassword({
                  username_id: resetUserPassword.username_id,
                  sec_que_one: questions[0].ans,
                  sec_que_two: questions[1].ans,
                  sec_que_three: questions[2].ans,
                }).then((res) => {
                  if (res == "") {
                    setEror("No User Found");
                  } else {
                    setEror("");
                    setResetPermi(false);
                  }
                });
              }}
            />
          </>
        ) : (
          <>
            <span>
              <div className="p-mt-2" className="p-field">
                New Password
              </div>
              <div className="p-col-12 p-md-10">
                <Password
                  id="password"
                  type="password"
                  name="password"
                  value={userResetDetails.password}
                  onChange={onChange}
                  required
                />
              </div>
            </span>
            <span className="p-field">
              <div className="p-mt-2" className="p-field">
                Confirm New Password
              </div>
              <div className="p-col-12 p-md-10">
                <InputText
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  value={userResetDetails.confirm_password}
                  onChange={onChange}
                  required
                />
              </div>
            </span>
            <Button
              label="Reset Password"
              onClick={() => {
                if (
                  userResetDetails.password != userResetDetails.confirm_password
                ) {
                  console.log(
                    userResetDetails.password +
                      "  " +
                      userResetDetails.confirm_password
                  );
                  return alert("Password Mismatch");
                }
                resetUserPassword({
                  updates: {
                    password: userResetDetails.password,
                  },
                  username_id: userResetDetails.username_id,
                }).then((res) => {
                  setResetDialog(false);
                  setResetPermi(true);
                });
              }}
            />
          </>
        )}
        <br />
        <span style={{ color: "red" }}>{eror}</span>
      </Dialog>
    </div>
  );
};

export default SignInSignUp;
