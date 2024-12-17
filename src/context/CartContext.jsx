import React, { createContext, useContext, useState, useEffect } from "react";

// Create a React context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext easily
export const useCart = () => useContext(CartContext);

// CartProvider manages cart items
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // 1. Load cart items from local storage when the app initializes
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")); // Get cart from local storage
    if (savedCart) {
      setCartItems(savedCart); // Set the cart state with saved items
    }
  }, []);

  // 2. Save cart items to local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update local storage with current cart state
  }, [cartItems]);

  // 3. Add an item to the cart
  //    - If the item already exists, increase its count by 1
  //    - If it doesn't exist, add it to the cart with a count of 1
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        // If the item exists, increase its count
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
      } else {
        // If the item doesn't exist, add it to the cart with count 1
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };

  // 4. Delete an item from the cart based on its ID
  const deleteItemFromCart = (id) => {
    setCartItems(
      (prevItems) => prevItems.filter((item) => item.id !== id) // Remove the item with the matching ID
    );
  };

  // 5. Increment the quantity (count) of a specific item in the cart
  const incrementItemCount = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // 6. Decrement the quantity (count) of a specific item in the cart
  //    - Prevent the count from going below 1
  //    - Optionally remove the item if its count becomes 0
  const decrementItemCount = (id) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id && item.count > 1
              ? { ...item, count: item.count - 1 } // Decrease count if greater than 1
              : item
          )
          .filter((item) => item.count > 0) // Remove items with count 0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems, // Current list of items in the cart
        addToCart, // Function to add an item to the cart
        deleteItemFromCart, // Function to remove an item from the cart
        incrementItemCount, // Function to increase the count of an item
        decrementItemCount, // Function to decrease the count of an item
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
