import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  padding: 0 2%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
  background-color: #406ac4;
  color: white;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 20px;
  textdecoration: "none";
`;

export const OptionLinkContainer = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  textdecoration: "none";
`;
