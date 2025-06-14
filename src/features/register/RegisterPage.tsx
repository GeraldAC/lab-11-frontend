// src/features/login/RegisterPage.tsx
import { Box, Heading, Text } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Crear una cuenta
      </Heading>
      <Text mb={6} textAlign="center">
        Ingresa tus datos para registrarte
      </Text>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
