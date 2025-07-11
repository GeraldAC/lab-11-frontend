import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  price: z.number().min(0, "Precio debe ser mayor o igual a 0"),
  stock: z.number().min(0, "Stock debe ser mayor o igual a 0"),
});

export type ProductFormData = z.infer<typeof productSchema>;

export type ProductData = ProductFormData & { id: number };

export const productUpdateSchema = z.object({
  name: z.string().min(1, "Nombre requerido").optional(),
  price: z.number().min(0, "Precio debe ser mayor o igual a 0").optional(),
  stock: z.number().min(0, "Stock debe ser mayor o igual a 0").optional(),
});

export type ProductUpdateData = z.infer<typeof productUpdateSchema>;
