import axios from "axios";
import type { ClientData, ClientFormData, ClientUpdateData } from "../types";
import type { MessageResponse } from "../types/common";

const API_URL = "http://localhost:3001/api/clientes";

// Obtener todos los clientes
export const getClientes = () => axios.get<ClientData[]>(API_URL);

// Crear cliente
export const createCliente = (data: ClientFormData) =>
  axios.post<ClientData>(API_URL, data);

// Actualizar cliente
export const updateCliente = (id: number, data: ClientUpdateData) =>
  axios.put<MessageResponse>(`${API_URL}/${id}`, data);

// Eliminar cliente
export const deleteCliente = (id: number) =>
  axios.delete<MessageResponse>(`${API_URL}/${id}`);
