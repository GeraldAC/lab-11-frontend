import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import type { CartItem } from "../../types";

interface Props {
  cart: CartItem[];
}

export default function CartView({ cart }: Props) {
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>
        Carrito
      </Text>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th isNumeric>Cantidad</Th>
            <Th isNumeric>Subtotal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map((item) => (
            <Tr key={item.product.id}>
              <Td>{item.product.name}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td isNumeric>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={3} fontWeight="semibold">
        Total: ${total.toFixed(2)}
      </Text>
    </Box>
  );
}
