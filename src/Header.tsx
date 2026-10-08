import React from "react";
import type { Page } from "./types";

interface HeaderProps {
  page: Page;
  setPage: (page: Page) => void;
  cartCount: number;
}

const links: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "menu", label: "Menu" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
  { key: "cart", label: "Cart" },
  { key: "order", label: "Order" },
];

const Header: React.FC<HeaderProps> = ({ page, setPage, cartCount }) => {
  return (
    <header>
      <h2 className="logo" onClick={() => setPage("home")}>
        🍔 Tasty Burger
      </h2>

      <nav>
        {links.map((link) => (
          <button
            key={link.key}
            className={page === link.key ? "nav-link active" : "nav-link"}
            onClick={() => setPage(link.key)}
          >
            {link.label}
            {/* badge only shows on Cart, and only when something is in it */}
            {link.key === "cart" && cartCount > 0 ? (
              <span className="badge">{cartCount}</span>
            ) : null}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
