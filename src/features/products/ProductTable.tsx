import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import type { ProductData } from "../../types";

type Props = {
  products: ProductData[];
  onEdit: (product: ProductData) => void;
  onDelete: (productId: string) => void;
};

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
  if (products.length === 0) {
    return (
      <Box mt={4}>
        <Text>No hay productos registrados.</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto" mt={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Precio</Th>
            <Th>Stock</Th>
            <Th isNumeric>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>S/ {product.price.toFixed(2)}</Td>
              <Td>{product.stock}</Td>
              <Td isNumeric>
                <IconButton
                  aria-label="Editar producto"
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => onEdit(product)}
                />
                <IconButton
                  aria-label="Eliminar producto"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(product.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductTable;
