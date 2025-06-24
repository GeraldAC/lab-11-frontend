import { z } from "zod";

// Formulario
export const clientSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
});

export type ClientFormData = z.infer<typeof clientSchema>;

// Cliente desde la API
export const clientDataSchema = clientSchema.extend({
  id: z.number(),
});
export type ClientData = z.infer<typeof clientDataSchema>;

// Para actualizar cliente (PUT/PATCH)
export const clientUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(7).optional(),
});
export type ClientUpdateData = z.infer<typeof clientUpdateSchema>;

// Para eliminar cliente
export const clientDeleteSchema = z.object({
  id: z.string(),
});
export type ClientDeleteData = z.infer<typeof clientDeleteSchema>;
