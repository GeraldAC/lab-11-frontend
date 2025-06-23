import axios from "axios";
import type { ClientFormData, ClientUpdateData } from "../types";

const API_URL = "http://localhost:3001/api/clientes";

export const getClientes = () => axios.get(API_URL);

export const createCliente = (data: ClientFormData) =>
  axios.post(API_URL, data);

export const updateCliente = (id: number, data: ClientUpdateData) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteCliente = (id: number) => axios.delete(`${API_URL}/${id}`);
