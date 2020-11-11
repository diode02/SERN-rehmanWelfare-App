import React from "react";

// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { ReactComponent as Logo } from "../../assests/trello.svg";
import HeaderOverlay from "../headerOverlay/headerOverlay-com";
import { signOutStart } from "./../../redux/users/user.actions";

import {
  HeaderContainer,
  LogoContainer,
  OptionLinkContainer,
  OptionsContainer,
} from "./header-sty";

const Header = () => {
  // let history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  let items = [
    {
      label: "Account",
      icon: "pi pi-user",
      command: () => {
        // history.push("/dashboard");
      },
    },
    {
      label: "Signout",
      icon: "pi pi-sign-out",
      command: () => {
        dispatch(signOutStart());
      },
    },
  ];

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <h1
          style={{
            fontWeight: "bold",
          }}
        >
          LOGO
        </h1>
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
    </HeaderContainer>
  );
};

export default Header;
