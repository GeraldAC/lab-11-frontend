import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  Center,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import ClientForm from "./ClientForm";
import ClientTable from "./ClientTable";
import type { ClientData, ClientFormData } from "../../types";
import { fetchFakeClients } from "../../services/fakeData";

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchFakeClients();
      setClients(data);
      setLoading(false);
    };

    loadClients();
  }, []);

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

  if (loading) {
    return (
      <Center h="100%">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>Gestión de Clientes</Heading>
      <Button colorScheme="teal" onClick={handleAddClick} mb={4}>
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
