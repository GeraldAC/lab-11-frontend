import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Flex flex="1">
        <Sidebar />
        <Box flex="1" p={6} overflowY="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default MainLayout;
