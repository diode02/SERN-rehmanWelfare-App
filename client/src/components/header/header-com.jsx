import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { ReactComponent as Logo } from "../../assests/trello.svg";
import HeaderOverlay from "../headerOverlay/headerOverlay-com";
import { signOutStart } from "./../../redux/users/user.actions";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  HeaderContainer,
  LogoContainer,
  OptionLinkContainer,
  OptionsContainer,
} from "./header-sty";
import { generateBackup } from "../../utils/user.utils";

const Header = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [logoutDisplay, setLogoutDisplay] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  let items = [
    {
      label: "Account",
      icon: "pi pi-user",
      command: () => {
        history.push("/account");
      },
    },
    {
      label: "Signout",
      icon: "pi pi-sign-out",
      command: () => {
        // dispatch(signOutStart());
        onClick();
      },
    },
  ];

  const onClick = () => {
    setLogoutDisplay(true);
  };

  const onHide = () => {
    setLogoutDisplay(false);
  };

  const onSignoutBackup = async () => {
    setLogoutDisplay(false);
    try {
      await generateBackup();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(signOutStart());
    }
  };

  const onSignOut = () => {
    setLogoutDisplay(false);
    dispatch(signOutStart());
  };

  function BackupDialoge() {
    const renderFooter = () => {
      return (
        <div>
          <Button
            label="No"
            icon="pi pi-times"
            onClick={onSignOut}
            className="p-button-text"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            onClick={onSignoutBackup}
            autoFocus
          />
        </div>
      );
    };

    return (
      <>
        <Dialog
          header="Confirm Database Backup"
          visible={logoutDisplay}
          modal
          style={{ width: "350px" }}
          footer={renderFooter()}
          onHide={onHide}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            <span>Are you sure you want to proceed?</span>
          </div>
        </Dialog>
      </>
    );
  }

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <h1>REHMAN LIAQAT WELFARE</h1>
      </LogoContainer>

      <OptionsContainer>
        {currentUser ? (
          <HeaderOverlay items={items} />
        ) : (
          <OptionLinkContainer
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
            to="/login"
          >
            LOGIN
          </OptionLinkContainer>
        )}
        {currentUser ? null : (
          <OptionLinkContainer
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
            }}
            to="/signup"
          >
            SIGNUP
          </OptionLinkContainer>
        )}
      </OptionsContainer>
      <BackupDialoge />
    </HeaderContainer>
  );
};

export default Header;
