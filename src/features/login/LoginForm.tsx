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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
  username: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    // Simular payload y token JWT
    const fakePayload = {
      username: data.username,
      email: `${data.username}@example.com`,
      role: "user",
    };

    const base64Payload = btoa(JSON.stringify(fakePayload));
    const fakeToken = `header.${base64Payload}.signature`;

    // Login con token simulado
    login(fakeToken);

    toast({
      title: "Inicio de sesión exitoso",
      status: "success",
      duration: 2000,
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
            placeholder="Ingrese su usuario"
            {...register("username")}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="Ingrese su contraseña"
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
          Iniciar Sesión
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
