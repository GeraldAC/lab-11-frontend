import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "El usuario es obligatorio"),
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type RegisterData = z.infer<typeof registerSchema>;
