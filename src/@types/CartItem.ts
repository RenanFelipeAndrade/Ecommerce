import { ProductItem } from "./Product";

export interface CartItem extends ProductItem {
  quantity: number;
}
