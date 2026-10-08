import type { Burger } from "./types";

export const burgers: Burger[] = [
  {
    id: 1,
    name: "Crispy Chicken",
    price: 99.15,
    description: "Chicken breast, chilli sauce, tomatoes, pickles, coleslaw",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
    rating: 5
  },
  {
    id: 2,
    name: "Ultimate Bacon",
    price: 99.32,
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    rating: 4
  },
  {
    id: 3,
    name: "Black Sheep",
    price: 69.15,
    description: "American cheese, tomato relish, avocado, lettuce, red onion",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    rating: 4
  },
  {
    id: 4,
    name: "Vegan Burger",
    price: 99.25,
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360",
    rating: 3
  }
];

// prices are numbers so the cart can add them up; this shows them as ₱99.15
export const formatPrice = (value: number): string => `₱${value.toFixed(2)}`;
