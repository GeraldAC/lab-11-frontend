import type { ClientData, ProductData, SaleData } from "../types";

export const fetchFakeClients = (): Promise<ClientData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Juan Pérez",
          email: "juan@mail.com",
          phone: "987654321",
        },
        {
          id: "2",
          name: "Ana Gómez",
          email: "ana@mail.com",
          phone: "912345678",
        },
      ]);
    }, 800);
  });
};

export const fetchFakeProducts = (): Promise<ProductData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "a1", name: "Laptop", price: 2500, stock: 10 },
        { id: "a2", name: "Mouse", price: 80, stock: 50 },
        { id: "a3", name: "Teclado", price: 120, stock: 30 },
      ]);
    }, 800);
  });
};

export const fetchFakeSales = (): Promise<SaleData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          client: {
            id: "1",
            name: "Juan Pérez",
            email: "juan@mail.com",
            phone: "987654321",
          },
          items: [
            {
              product: { id: "a1", name: "Laptop", price: 2500, stock: 10 },
              quantity: 1,
            },
            {
              product: { id: "a2", name: "Mouse", price: 80, stock: 50 },
              quantity: 2,
            },
          ],
        },
        {
          client: {
            id: "2",
            name: "Ana Gómez",
            email: "ana@mail.com",
            phone: "912345678",
          },
          items: [
            {
              product: { id: "a3", name: "Teclado", price: 120, stock: 30 },
              quantity: 1,
            },
          ],
        },
      ]);
    }, 800);
  });
};
