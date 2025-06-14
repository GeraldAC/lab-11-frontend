import { useState } from "react";
import {
  Select,
  NumberInput,
  NumberInputField,
  Button,
  HStack,
} from "@chakra-ui/react";
import type { ProductData } from "../../types";

interface Props {
  products: ProductData[];
  onAdd: (product: ProductData, quantity: number) => void;
}

export default function ProductSelector({ products, onAdd }: Props) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    const product = products.find((p) => p.id === selectedId);
    if (product && quantity > 0) {
      onAdd(product, quantity);
      setQuantity(1);
    }
  };

  return (
    <HStack spacing={4}>
      <Select
        placeholder="Seleccionar producto"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} - ${p.price}
          </option>
        ))}
      </Select>
      <NumberInput
        min={1}
        value={quantity}
        onChange={(_, val) => setQuantity(val)}
        maxW="100px"
      >
        <NumberInputField />
      </NumberInput>
      <Button onClick={handleAdd} colorScheme="blue">
        Agregar
      </Button>
    </HStack>
  );
}
