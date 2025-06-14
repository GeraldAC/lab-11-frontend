import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { registerSchema, type RegisterData } from "../../types";

const RegisterForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    // Simular payload y token
    const fakePayload = {
      username: data.username,
      email: data.email,
      role: "user",
    };

    const base64Payload = btoa(JSON.stringify(fakePayload));
    const fakeToken = `header.${base64Payload}.signature`;

    login(fakeToken);

    toast({
      title: "Registro exitoso",
      description: "Has iniciado sesión automáticamente",
      status: "success",
      duration: 2500,
      isClosable: true,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Usuario</FormLabel>
          <Input
            type="text"
            placeholder="Nombre de usuario"
            {...register("username")}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Correo electrónico"
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          isLoading={isSubmitting}
        >
          Registrarse
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterForm;
