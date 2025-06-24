import axios from "axios";
import type { ProductData, ProductFormData, ProductUpdateData } from "../types";
import type { MessageResponse } from "../types/common";

const API_URL = "http://localhost:3001/api/productos";

// Obtener todos los productos
export const getProductos = () => axios.get<ProductData[]>(API_URL);

// Crear producto
export const createProducto = (data: ProductFormData) =>
  axios.post<ProductData>(API_URL, data);

// Actualizar producto
export const updateProducto = (id: number, data: ProductUpdateData) =>
  axios.put<MessageResponse>(`${API_URL}/${id}`, data);

// Eliminar producto
export const deleteProducto = (id: number) =>
  axios.delete<MessageResponse>(`${API_URL}/${id}`);
