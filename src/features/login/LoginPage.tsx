import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Heading } from "@chakra-ui/react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        w={{ base: "100%", sm: "400px" }}
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading mb={6} textAlign="center" size="lg">
          Sistema de Ventas
        </Heading>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
