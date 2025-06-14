import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import type { ProductData, ProductFormData } from "../../types";
import { fetchFakeProducts } from "../../services/fakeData";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFakeProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    onOpen();
  };

  const handleSaveProduct = (formData: ProductFormData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      setProducts((prev) => [...prev, { ...formData, id: uuidv4() }]);
    }
    onClose();
  };

  const handleEdit = (product: ProductData) => {
    setEditingProduct(product);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Producto eliminado",
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
      <Heading mb={4}>Gestión de Productos</Heading>
      <Button colorScheme="teal" onClick={handleAddClick}>
        Registrar Producto
      </Button>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingProduct ? "Editar Producto" : "Nuevo Producto"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ProductForm
              isEditing={!!editingProduct}
              defaultValues={editingProduct ?? {}}
              onSubmitProduct={handleSaveProduct}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductsPage;
