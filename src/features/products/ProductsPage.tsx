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
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { v4 as uuidv4 } from "uuid";
import type { ProductData, ProductFormData } from "../../types";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
