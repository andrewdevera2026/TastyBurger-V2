import React from "react";
import type { CartLine, Page } from "./types";
import { formatPrice } from "./burgers";

interface CartProps {
  lines: CartLine[];
  total: number;
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  setPage: (page: Page) => void;
}

const Cart: React.FC<CartProps> = ({ lines, total, onChangeQty, onRemove, setPage }) => {
  return (
    <section>
      <h1>Your Cart</h1>

      {lines.length === 0 ? (
        <div className="panel">
          <p>Your cart is empty. Add a burger from the menu.</p>
          <button className="add-btn" onClick={() => setPage("menu")}>
            Go to menu
          </button>
        </div>
      ) : (
        <div className="panel">
          {lines.map((line) => (
            <div className="cart-row" key={line.id}>
              <img src={line.image} alt={line.name} />
              <div className="cart-info">
                <strong>{line.name}</strong>
                <span>{formatPrice(line.price)} each</span>
              </div>

              <div className="qty">
                <button onClick={() => onChangeQty(line.id, -1)} aria-label="Decrease">−</button>
                <span>{line.qty}</span>
                <button onClick={() => onChangeQty(line.id, 1)} aria-label="Increase">+</button>
              </div>

              <span className="line-total">{formatPrice(line.price * line.qty)}</span>
              <button className="remove" onClick={() => onRemove(line.id)} aria-label="Remove">✕</button>
            </div>
          ))}

          <div className="total">Total: {formatPrice(total)}</div>
          <button className="add-btn big" onClick={() => setPage("order")}>
            Proceed to order
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
