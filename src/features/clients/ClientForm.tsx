import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, type ClientFormData } from "../../types";

type Props = {
  onSubmitClient: (data: ClientFormData) => void;
  defaultValues?: Partial<ClientFormData>;
  isEditing?: boolean;
};

const ClientForm = ({
  onSubmitClient,
  defaultValues = {},
  isEditing = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  const onSubmit = (data: ClientFormData) => {
    onSubmitClient(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nombre</FormLabel>
          <Input placeholder="Nombre completo" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Correo electrónico" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Teléfono</FormLabel>
          <Input placeholder="Número de teléfono" {...register("phone")} />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          isLoading={isSubmitting}
        >
          {isEditing ? "Actualizar cliente" : "Registrar cliente"}
        </Button>
      </VStack>
    </form>
  );
};

export default ClientForm;
