import React from "react";
import type { Burger } from "./types";
import { formatPrice } from "./burgers";

interface BurgerCardProps {
  burger: Burger;
  liked: boolean;
  qtyInCart: number;
  onLike: (id: number) => void;
  onAdd: (id: number) => void;
}

const BurgerCard: React.FC<BurgerCardProps> = ({
  burger,
  liked,
  qtyInCart,
  onLike,
  onAdd,
}) => {
  return (
    <div className="burger-card">
      <button
        className={liked ? "heart liked" : "heart"}
        onClick={() => onLike(burger.id)}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {liked ? "♥" : "♡"}
      </button>

      <img src={burger.image} alt={burger.name} />

      <div className="card-body">
        <div className="rating">⭐ {burger.rating}</div>
        <h2>{burger.name}</h2>
        <p>{burger.description}</p>

        <div className="card-footer">
          <span className="price-tag">{formatPrice(burger.price)}</span>
          <button className="add-btn" onClick={() => onAdd(burger.id)}>
            {qtyInCart > 0 ? `Add more (${qtyInCart})` : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BurgerCard;
