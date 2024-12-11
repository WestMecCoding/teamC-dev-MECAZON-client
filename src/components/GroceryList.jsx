import styles from "../styles/GroceryList.module.css";
import { useState } from "react";
import items from "/dummy-data/groceries.json";

export default function GroceryList({ items }) {
  const [cart, setCart] = useState([]);
  const addToCart = (itemId) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === itemId);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const item = items.find((item) => item.id === itemId);
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
 const clearCart = () => setCart([]);

  return (
    <div className={styles.list}>
      {items.map(i => (
        <div key={i.id} className={styles.item}>
          <h2>{i.name}</h2>
          <p>Category: {i.category}</p>
          <p>Price: {i.price}</p>
          <button onClick={() => addToCart(item.id)} className={styles.button}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
