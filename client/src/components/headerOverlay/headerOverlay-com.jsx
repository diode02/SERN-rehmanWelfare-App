import React from "react";
import { Button } from "@chakra-ui/core";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";

const HeaderOverlay = ({ items }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon="chevron-down">
        Actions
      </MenuButton>
      <MenuList>
        {items.map((item) => {
          return (
            <MenuItem key={item.label} onClick={item.command}>
              {item.label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default HeaderOverlay;
