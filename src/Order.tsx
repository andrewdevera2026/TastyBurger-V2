import React, { useState } from "react";
import type { CartLine, Customer, Page } from "./types";
import { formatPrice } from "./burgers";

interface OrderProps {
  lines: CartLine[];
  total: number;
  onPlaceOrder: (customer: Customer) => void;
  setPage: (page: Page) => void;
}

const Order: React.FC<OrderProps> = ({ lines, total, onPlaceOrder, setPage }) => {
  const [form, setForm] = useState<Customer>({ name: "", address: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const nameOk = form.name.trim() !== "";
  const addressOk = form.address.trim() !== "";
  const phoneOk = form.phone.trim().length >= 7;

  const handleSubmit = () => {
    setSubmitted(true);
    nameOk && addressOk && phoneOk ? onPlaceOrder(form) : null;
  };

  return (
    <section>
      <h1>Place Your Order</h1>

      {lines.length === 0 ? (
        <div className="panel">
          <p>Your cart is empty, so there is nothing to order yet.</p>
          <button className="add-btn" onClick={() => setPage("menu")}>
            Go to menu
          </button>
        </div>
      ) : (
        <div className="order-grid">
          <div className="panel">
            <h2>Order summary</h2>
            {lines.map((line) => (
              <div className="summary-row" key={line.id}>
                <span>{line.qty} × {line.name}</span>
                <strong>{formatPrice(line.price * line.qty)}</strong>
              </div>
            ))}
            <div className="total">Total: {formatPrice(total)}</div>
          </div>

          <div className="panel form">
            <h2>Delivery details</h2>

            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
            {submitted && !nameOk ? <small className="err">Enter your name.</small> : null}

            <label htmlFor="address">Address</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} />
            {submitted && !addressOk ? <small className="err">Enter your delivery address.</small> : null}

            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
            {submitted && !phoneOk ? <small className="err">Enter a phone number with at least 7 digits.</small> : null}

            <button className="add-btn big" onClick={handleSubmit}>
              Place order
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Order;
