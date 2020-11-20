import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { updateUserSecAsync } from "../../utils/user.utils";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart } from "../../redux/users/user.actions";
import { Panel } from "primereact/panel";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

const SecurityQuestions = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [queHide, setQueHide] = useState(true);
  const [displayPasswordDialog, setDisplayPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [eror, setEror] = useState("");
  let toast;

  useEffect(() => {
    // setCustomer({
    //   ...selectedCustomer,
    // });
    // setImgData(null);
    // (async function funForAsync() {
    //   try {
    //     await getAvatarApi(selectedCustomer.customer_id).then((res) => {
    //       setImgData(`${res}`);
    //     });
    //   } catch (error) {
    //     console.log("error");
    //   }
    // })();
  });

  const [questions, setQuestions] = useState([
    {
      que: "Your pet name?",
      ans: currentUser.sec_que_one,
    },
    {
      que: "Your first phone number?",
      ans: currentUser.sec_que_two,
    },
    {
      que: "Your nick name?",
      ans: currentUser.sec_que_three,
    },
  ]);

  const handleChnage = (e) => {
    const { name, value } = e.target;
    let tempArr = [...questions];
    tempArr[name].ans = value;

    setQuestions(tempArr);
  };

  const handleUpdate = () => {
    updateUserSecAsync({
      where: { username_id: currentUser.username_id },
      updates: {
        sec_que_one: questions[0].ans,
        sec_que_two: questions[1].ans,
        sec_que_three: questions[2].ans,
      },
    }).then((res) => {
      toast.show({
        severity: "Success",
        summary: "Success Message",
        detail: "Updated",
      });

      dispatch(
        emailSignInStart({
          username_id: currentUser.username_id,
          password: currentUser.password,
        })
      );
    });
  };

  return (
    <Panel
      expandIcon="pi pi-pencil"
      header="Update Security Questions"
      toggleable
      collapsed={panelCollapsed}
      onToggle={(e) => setPanelCollapsed(e.value)}
    >
      <Toast ref={(el) => (toast = el)} />

      <Button
        label={queHide ? "Show Answers" : "Hide Answer"}
        onClick={() => {
          if (queHide == false) {
            setQueHide(true);
          } else {
            setDisplayPasswordDialog(true);
            setEror("");
          }
        }}
      />
      <Dialog
        header="Confirm your Identity"
        visible={displayPasswordDialog}
        style={{ width: "25vw" }}
        onHide={() => {
          setDisplayPasswordDialog(false);
        }}
      >
        <InputText
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          label="Submit"
          className="p-ml-4"
          onClick={() => {
            if (currentUser.password == password) {
              setQueHide(false);
              setDisplayPasswordDialog(false);
              setPassword("");
            } else {
              setEror("Wrong Password");
            }
          }}
        />
        <br />
        <span style={{ color: "red" }}>{eror}</span>
      </Dialog>
      <div>
        {questions.map((ques, index) => {
          return (
            <span className="p-field" key={index}>
              <label className="p-mt-4" htmlFor="in">
                {ques.que}
              </label>
              <br />
              <InputText
                id={index}
                name={index}
                value={ques.ans}
                onChange={handleChnage}
                type={queHide ? "password" : "text"}
              />
              <br />
            </span>
          );
        })}
        {queHide ? null : (
          <Button className="p-mt-4" label="Update" onClick={handleUpdate} />
        )}
      </div>
    </Panel>
  );
};

export default SecurityQuestions;
