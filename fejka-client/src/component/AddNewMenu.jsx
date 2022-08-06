import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

export default function AddNewMenu({items, onSelect}) {
  return (
    <Menu>
    {({ isOpen }) => (
      <>
        <MenuButton isActive={isOpen}>
          {isOpen ? <CloseIcon /> : <AddIcon />}
        </MenuButton>
        <MenuList>
          {items.map((item, index) => {
            return (
              <MenuItem
                key={index}
                onClick={() => onSelect(item)}
              >
                {item?.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </>
    )}
  </Menu>
  )
}