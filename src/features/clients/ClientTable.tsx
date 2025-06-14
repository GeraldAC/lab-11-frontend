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
import type { ClientData } from "../../types";

type Props = {
  clients: ClientData[];
  onEdit: (client: ClientData) => void;
  onDelete: (clientId: string) => void;
};

const ClientTable = ({ clients, onEdit, onDelete }: Props) => {
  if (clients.length === 0) {
    return (
      <Box mt={4}>
        <Text>No hay clientes registrados.</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto" mt={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Teléfono</Th>
            <Th isNumeric>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((client) => (
            <Tr key={client.id}>
              <Td>{client.name}</Td>
              <Td>{client.email}</Td>
              <Td>{client.phone}</Td>
              <Td isNumeric>
                <IconButton
                  aria-label="Editar cliente"
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => onEdit(client)}
                />
                <IconButton
                  aria-label="Eliminar cliente"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(client.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ClientTable;
