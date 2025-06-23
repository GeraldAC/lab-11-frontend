import { z } from "zod";

// Esquema base (formulario)
export const clientSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
});

// Tipos base
export type ClientFormData = z.infer<typeof clientSchema>;
export type ClientData = ClientFormData & { id: string };

// Cliente completo (por ejemplo, desde la API o DB)
export const clientFullSchema = clientSchema.extend({
  id: z.string(),
});
export type ClientFullData = z.infer<typeof clientFullSchema>;

// Para actualizar cliente (PUT/PATCH)
export const clientUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(7).optional(),
});
export type ClientUpdateData = z.infer<typeof clientUpdateSchema>;

// Para filtros/búsqueda
export const clientFilterSchema = z.object({
  search: z.string().optional(),
  email: z.string().email().optional(),
});
export type ClientFilter = z.infer<typeof clientFilterSchema>;

// Para eliminar cliente
export const clientDeleteSchema = z.object({
  id: z.string(),
});
export type ClientDeleteData = z.infer<typeof clientDeleteSchema>;
