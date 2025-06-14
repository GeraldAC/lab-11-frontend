import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import ProductSelector from "./ProductSelector";
import CartView from "./CartView";
import SaleConfirmation from "./SaleConfirmation";
import type { CartItem, ClientData, ProductData, SaleData } from "../../types";
import { fetchFakeClients, fetchFakeProducts } from "../../services/fakeData";

export default function SalesPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [c, p] = await Promise.all([
        fetchFakeClients(),
        fetchFakeProducts(),
      ]);
      setClients(c);
      setProducts(p);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleAddProduct = (product: ProductData, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleConfirmSale = () => {
    if (!selectedClient || cart.length === 0) return;
    const sale: SaleData = {
      client: selectedClient,
      items: cart,
    };
    console.log("Venta confirmada:", sale);
    // Aquí podrías enviar la venta a tu backend
    setCart([]);
    setSelectedClient(null);
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
      <Heading size="lg" mb={4}>
        Nueva Venta
      </Heading>
      <VStack align="stretch" spacing={6}>
        <SaleConfirmation
          clients={clients}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
        <ProductSelector products={products} onAdd={handleAddProduct} />
        <CartView cart={cart} />
        <Button
          colorScheme="teal"
          onClick={handleConfirmSale}
          isDisabled={!selectedClient || cart.length === 0}
        >
          Confirmar venta
        </Button>
      </VStack>
    </Box>
  );
}
