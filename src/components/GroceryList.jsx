import React from "react";
import styles from "../styles/GroceryList.module.css";
import { useCart } from "../context/CartContext";

export default function GroceryList({ items }) {
  const { addToCart } = useCart();

  return (
    <div className={styles.list}>
      {items.map((i) => (
        <div key={i.id} className={styles.item}>
          <h2>{i.name}</h2>
          <p>Category: {i.category}</p>
          <p>Price: {i.price}</p>
          <button onClick={() => addToCart(i)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
