import type { ClientData } from "./client";
import type { ProductData } from "./product";

export type CartItem = {
  product: ProductData;
  quantity: number;
};

export type SaleData = {
  client: ClientData;
  items: CartItem[];
};
