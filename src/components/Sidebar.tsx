import { VStack, Link, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Inicio" },
    { to: "/products", label: "Productos" },
    { to: "/clients", label: "Clientes" },
    { to: "/sales", label: "Ventas" },
  ];

  return (
    <Box
      as="nav"
      bg="gray.100"
      minW="200px"
      h="100vh"
      p={4}
      borderRight="1px solid #e2e8f0"
    >
      <VStack align="start" spacing={4}>
        {links.map((link) => (
          <Link
            key={link.to}
            as={NavLink}
            to={link.to}
            fontWeight="medium"
            _hover={{ textDecoration: "none", color: "teal.600" }}
            _activeLink={{ color: "teal.700", fontWeight: "bold" }}
          >
            {link.label}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
