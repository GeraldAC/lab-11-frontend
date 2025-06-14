import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import type { ClientData } from "../../types";

interface Props {
  clients: ClientData[];
  selectedClient: ClientData | null;
  setSelectedClient: (c: ClientData | null) => void;
}

export default function SaleConfirmation({
  clients,
  selectedClient,
  setSelectedClient,
}: Props) {
  const handleChange = (id: string) => {
    const client = clients.find((c) => c.id === id) || null;
    setSelectedClient(client);
  };

  return (
    <FormControl>
      <FormLabel>Seleccionar cliente</FormLabel>
      <Select
        placeholder="Seleccionar cliente"
        value={selectedClient?.id || ""}
        onChange={(e) => handleChange(e.target.value)}
      >
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
