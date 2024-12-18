import React from "react";
import { useCart } from "../context/CartContext";
import styles from "../styles/GroceryList.module.css";

export default function Cart() {
  const {
    cartItems,
    deleteItemFromCart,
    incrementItemCount,
    decrementItemCount,
  } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartItems.map((item) => {
        if (item.count > 0) {
          return (
            <div key={item.id}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={item.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <button onClick={() => deleteItemFromCart(item.id)}>x</button>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <div className={styles.counter}>
                  <button onClick={() => decrementItemCount(item.id)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => incrementItemCount(item.id)}>+</button>
                </div>
                {/* <button className="cartitems-quantity">{item.count}</button> */}
                <p>${(item.price * item.count).toFixed(2)}</p>
                {/* <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    deleteItemFromCart(item.id);
                  }}
                  alt=""
                /> */}
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item subtotal">
              <p>Subtotal</p>
              <p> ${totalPrice.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalPrice.toFixed(2)}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here!</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Enter promo code"
              // value={promoCode}
              // onChange={(e) => setPromoCode(e.target.value)}
            />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
