import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Center,
} from "@chakra-ui/react";
import type { ClientData, ProductData, SaleData } from "../../types";
import {
  fetchFakeClients,
  fetchFakeProducts,
  fetchFakeSales,
} from "../../services/fakeData";

export default function DashboardPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [sales, setSales] = useState<SaleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      const [c, p, s] = await Promise.all([
        fetchFakeClients(),
        fetchFakeProducts(),
        fetchFakeSales(),
      ]);
      setClients(c);
      setProducts(p);
      setSales(s);
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const totalVentas = sales.reduce(
    (acc, sale) =>
      acc +
      sale.items.reduce((s, item) => s + item.product.price * item.quantity, 0),
    0
  );

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
        Bienvenido al Panel de Control
      </Heading>
      <Text mb={8}>Aquí puedes ver un resumen general del sistema.</Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <StatCard label="Clientes registrados" value={clients.length} />
        <StatCard label="Productos en inventario" value={products.length} />
        <StatCard
          label="Total ventas realizadas"
          value={`$${totalVentas.toFixed(2)}`}
        />
      </SimpleGrid>
    </Box>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Stat
      p={5}
      shadow="md"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      bg="white"
    >
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
    </Stat>
  );
}
