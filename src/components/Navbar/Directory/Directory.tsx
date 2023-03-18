import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Flex, Icon, Menu,
    MenuButton, MenuList, Text
} from "@chakra-ui/react";

import {TiHome} from 'react-icons/ti'
import Communities from "./Communities";

const UserMenu = () => {

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2}}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center" justify="space-between" width={{ base: 'auto', blg: '200px'}}>
          <Flex align="center">
            <Icon as={TiHome} mr={{base: 1, md: 2}} fontSize={24}/>
            <Flex display={{base: 'none', lg: 'flex'}}>
            <Text fontWeight={600} fontSize={10}>Home</Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities/>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
