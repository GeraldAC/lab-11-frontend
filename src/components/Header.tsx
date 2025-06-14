import {
  Flex,
  Heading,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true }); // redirige al login
  };

  return (
    <Flex
      as="header"
      bg="teal.500"
      color="white"
      px={6}
      py={4}
      align="center"
      justify="space-between"
      boxShadow="md"
    >
      <Heading size="md">Sistema de Gestión</Heading>

      <HStack spacing={4}>
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            px={3}
            py={2}
            _hover={{ bg: "teal.600" }}
            _expanded={{ bg: "teal.700" }}
            rightIcon={<ChevronDownIcon />}
          >
            <HStack spacing={2}>
              <Avatar name={user?.username} size="sm" />
              <Text color={"teal.50"} display={{ base: "none", md: "block" }}>
                {user?.username}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem color={"red"} onClick={handleLogout}>
              Cerrar sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
