import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import iconCart from "/cart.png";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/groceries">Groceries</Link>
      <Link to="/cart">
        <div className={styles.nav}>
          <img src={iconCart} alt="" className={styles.nav} />
          <span>0</span>
        </div>
      </Link>
    </nav>
  );
}
