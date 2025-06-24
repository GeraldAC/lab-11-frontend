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
import ClientForm from "./ClientForm";
import ClientTable from "./ClientTable";
import type { ClientData, ClientFormData } from "../../types";
import {
  createCliente,
  deleteCliente,
  getClientes,
  updateCliente,
} from "../../services/client.service";

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const { data } = await getClientes();
        setClients(data);
      } catch (error) {
        console.log({ error });
        toast({
          title: "Error al cargar clientes",
          description: "No se pudieron obtener los datos",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, [toast]);

  const handleAddClick = () => {
    setEditingClient(null);
    onOpen();
  };

  const handleSaveClient = async (formData: ClientFormData) => {
    try {
      if (editingClient) {
        // Editar cliente
        const { data: res } = await updateCliente(editingClient.id, formData);
        toast({
          title: "Cliente actualizado",
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setClients((prev) =>
          prev.map((c) =>
            c.id === editingClient.id ? { ...formData, id: c.id } : c
          )
        );
      } else {
        // Crear cliente
        const { data: newClient } = await createCliente(formData);
        setClients((prev) => [...prev, newClient]);
        toast({
          title: "Cliente registrado",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.log({ error });
      toast({
        title: "Error al guardar cliente",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (client: ClientData) => {
    setEditingClient(client);
    onOpen();
  };

  const handleDelete = async (id: number) => {
    try {
      const { data: res } = await deleteCliente(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
      toast({
        title: "Cliente eliminado",
        description: res.message,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log({ error });
      toast({
        title: "Error al eliminar cliente",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
        onDelete={(id) => handleDelete(id)}
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
