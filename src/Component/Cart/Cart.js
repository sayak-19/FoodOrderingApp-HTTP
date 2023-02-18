import React, { useContext } from "react";
import CartContext from "../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItems from "./CartItems";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return <CartItems key={item.id} item={item} />;
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartCtx.amount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button className={styles.button}>Order</button>
        )}
      </div>
    </Modal>
  );
}

export default Cart;
