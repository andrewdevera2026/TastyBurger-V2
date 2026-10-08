export interface Burger {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
}

export interface CartItem {
  id: number;
  qty: number;
}

// a cart item joined with its burger details
export interface CartLine extends Burger {
  qty: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface PlacedOrder {
  customer: Customer;
  total: number;
}

export type Page = "home" | "menu" | "about" | "contact" | "cart" | "order" | "done";
