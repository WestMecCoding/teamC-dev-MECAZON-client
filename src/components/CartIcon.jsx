import React from "react";
import { Link } from "react-router-dom";
import iconCart from "/cartIcon/cart.svg";
import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { cartItems } = useCart();
  return (
    <Link to="/cart">
      <div>
        <img src={iconCart} alt="" />
        <span>{cartItems.length}</span>
      </div>
    </Link>
  );
}
