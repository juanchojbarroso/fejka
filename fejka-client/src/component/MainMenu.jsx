import React from "react";
import {
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { VscHome, VscPieChart, VscGithubInverted } from "react-icons/vsc";

export default function MainMenu() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <Link href={"/"}>
          <MenuItem icon={<Icon as={VscHome} />}>
            Home
          </MenuItem>
        </Link>
        <Link href={"/charts"}>
          <MenuItem icon={<Icon as={VscPieChart} />}>Charts</MenuItem>
        </Link>
        <Link href={"https://github.com/juanchojbarroso/fejka"} isExternal>
          <MenuItem
            icon={<Icon as={VscGithubInverted} />}
            command={<ExternalLinkIcon mx="2px" />}
          >
            Code Repository
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}
