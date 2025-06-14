import {
  Box,
  Button,
  Heading,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import ClientForm from "./ClientForm";
import ClientTable from "./ClientTable";
import { v4 as uuidv4 } from "uuid";
import type { ClientData, ClientFormData } from "../../types";

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleAddClick = () => {
    setEditingClient(null);
    onOpen();
  };

  const handleSaveClient = (formData: ClientFormData) => {
    if (editingClient) {
      // Edición
      setClients((prev) =>
        prev.map((c) =>
          c.id === editingClient.id ? { ...formData, id: c.id } : c
        )
      );
    } else {
      // Nuevo cliente
      setClients((prev) => [...prev, { ...formData, id: uuidv4() }]);
    }
    onClose();
  };

  const handleEdit = (client: ClientData) => {
    setEditingClient(client);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Cliente eliminado",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Gestión de Clientes</Heading>
      <Button colorScheme="teal" onClick={handleAddClick}>
        Registrar Cliente
      </Button>

      <ClientTable
        clients={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingClient ? "Editar Cliente" : "Nuevo Cliente"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ClientForm
              isEditing={!!editingClient}
              defaultValues={editingClient ?? {}}
              onSubmitClient={handleSaveClient}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClientsPage;
