import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
});

// Solo los campos del formulario
export type ClientFormData = z.infer<typeof clientSchema>;

// Cliente completo (por ejemplo, en la tabla)
export type ClientData = ClientFormData & { id: string };
