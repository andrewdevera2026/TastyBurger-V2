import { useState } from "react";
import Header from "./Header";
import BurgerCard from "./BurgerCard";
import Cart from "./Cart";
import Order from "./Order";
import { burgers, formatPrice } from "./burgers";
import type { Burger, CartItem, CartLine, Customer, Page, PlacedOrder } from "./types";
import "./App.css";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // ---------- derived data ----------
  const cartLines: CartLine[] = cart.flatMap((item) => {
    const burger = burgers.find((b) => b.id === item.id);
    return burger ? [{ ...burger, qty: item.qty }] : [];
  });
  const total = cartLines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // ---------- actions ----------
  const addToCart = (id: number) => {
    const exists = cart.some((item) => item.id === id);
    exists
      ? setCart(cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)))
      : setCart([...cart, { id, qty: 1 }]);
  };

  const changeQty = (id: number, delta: number) =>
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0) // going down to 0 removes the item
    );

  const removeItem = (id: number) => setCart(cart.filter((item) => item.id !== id));

  const toggleLike = (id: number) =>
    likes.includes(id)
      ? setLikes(likes.filter((likedId) => likedId !== id))
      : setLikes([...likes, id]);

  const placeOrder = (customer: Customer) => {
    setPlacedOrder({ customer, total });
    setCart([]);
    setPage("done");
  };

  // ---------- reusable burger list ----------
  const renderBurgers = (list: Burger[]) => (
    <div className="burger-list">
      {list.map((burger) => (
        <BurgerCard
          key={burger.id}
          burger={burger}
          liked={likes.includes(burger.id)}
          qtyInCart={cart.find((item) => item.id === burger.id)?.qty ?? 0}
          onLike={toggleLike}
          onAdd={addToCart}
        />
      ))}
    </div>
  );

  return (
    <div>
      <Header page={page} setPage={setPage} cartCount={cartCount} />

      <main>
        {page === "home" ? (
          <section>
            <h1>Tasty Burger</h1>
            <p>
              Juicy patties, bold toppings and irresistible sauces, stacked on a
              perfectly toasted bun. Pick your favorite and we'll deliver it hot.
            </p>
            <button className="add-btn big" onClick={() => setPage("menu")}>
              See the full menu
            </button>

            <h2 className="section-title">Top rated</h2>
            {renderBurgers(burgers.filter((b) => b.rating >= 4))}

            <p className="note">
              {likes.length > 0
                ? `You liked ${likes.length} ${likes.length === 1 ? "burger" : "burgers"}.`
                : "Tap the heart on a burger to save your favorites."}
            </p>
          </section>
        ) : page === "menu" ? (
          <section>
            <h1>Our Crazy Burgers</h1>
            <p>
              Get ready for a wild ride of flavors! Every burger is loaded with
              juicy patties, bold toppings, and irresistible sauces.
            </p>
            {renderBurgers(burgers)}
          </section>
        ) : page === "about" ? (
          <section>
            <h1>About Us</h1>
            <p>
              Tasty Burger started with one idea: a burger should be messy,
              generous and worth the wait. Every patty is made fresh and every
              bun is toasted to order.
            </p>
          </section>
        ) : page === "contact" ? (
          <section>
            <h1>Contact</h1>
            <p>Questions about an order? Message us and we'll get back to you.</p>
            <div className="panel contact">
              <span>📞 0900 000 0000</span>
              <span>✉️ hello@tastyburger.example</span>
            </div>
          </section>
        ) : page === "cart" ? (
          <Cart
            lines={cartLines}
            total={total}
            onChangeQty={changeQty}
            onRemove={removeItem}
            setPage={setPage}
          />
        ) : page === "order" ? (
          <Order lines={cartLines} total={total} onPlaceOrder={placeOrder} setPage={setPage} />
        ) : (
          <section>
            <h1>Thank you!</h1>
            {placedOrder ? (
              <p>
                {placedOrder.customer.name}, your order of {formatPrice(placedOrder.total)} is
                being prepared and will be delivered to {placedOrder.customer.address}.
              </p>
            ) : null}
            <button className="add-btn big" onClick={() => setPage("home")}>
              Back to home
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
