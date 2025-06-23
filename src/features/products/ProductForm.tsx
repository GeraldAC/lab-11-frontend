import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  VStack,
  useToast,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "../../types";

type Props = {
  onSubmitProduct: (data: ProductFormData) => void;
  defaultValues?: Partial<ProductFormData>;
  isEditing?: boolean;
};

const ProductForm = ({
  onSubmitProduct,
  defaultValues = {},
  isEditing = false,
}: Props) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = (data: ProductFormData) => {
    onSubmitProduct(data);
    toast({
      title: isEditing ? "Producto actualizado" : "Producto registrado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nombre del producto</FormLabel>
          <Input placeholder="Nombre del producto" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.price}>
          <FormLabel>Precio</FormLabel>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <NumberInput
                precision={2}
                step={0.01}
                min={0}
                value={field.value}
                onChange={(valueString) => field.onChange(Number(valueString))}
              >
                <NumberInputField placeholder="Precio en soles" />
              </NumberInput>
            )}
          />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.stock}>
          <FormLabel>Stock</FormLabel>
          <Controller
            control={control}
            name="stock"
            render={({ field }) => (
              <NumberInput
                min={0}
                value={field.value}
                onChange={(valueString) => field.onChange(Number(valueString))}
              >
                <NumberInputField placeholder="Cantidad en inventario" />
              </NumberInput>
            )}
          />
          <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          isLoading={isSubmitting}
        >
          {isEditing ? "Actualizar producto" : "Registrar producto"}
        </Button>
      </VStack>
    </form>
  );
};

export default ProductForm;
