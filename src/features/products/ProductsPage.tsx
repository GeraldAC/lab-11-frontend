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
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import type { ProductData, ProductFormData } from "../../types";
import {
  createProducto,
  deleteProducto,
  getProductos,
  updateProducto,
} from "../../services/product.service";

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
      try {
        const { data } = await getProductos();
        setProducts(data);
      } catch (error) {
        console.log({ error });
        toast({
          title: "Error al cargar productos",
          description: "No se pudieron obtener los datos",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  const handleAddClick = () => {
    setEditingProduct(null);
    onOpen();
  };

  const handleSaveProduct = async (formData: ProductFormData) => {
    try {
      if (editingProduct) {
        const { data: res } = await updateProducto(editingProduct.id, formData);
        toast({
          title: "Producto actualizado",
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id ? { ...formData, id: p.id } : p
          )
        );
      } else {
        const { data: newProduct } = await createProducto(formData);
        setProducts((prev) => [...prev, newProduct]);
        toast({
          title: "Producto registrado",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.log({ error });
      toast({
        title: "Error al guardar producto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (product: ProductData) => {
    setEditingProduct(product);
    onOpen();
  };

  const handleDelete = async (id: number) => {
    try {
      const { data: res } = await deleteProducto(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Producto eliminado",
        description: res.message,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log({ error });
      toast({
        title: "Error al eliminar producto",
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
