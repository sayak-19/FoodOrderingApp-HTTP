import React, { useContext } from "react";
import CartContext from "../store/cart-context";
import styles from "./CartItems.module.css";

function CartItems(props) {
  const cartCtx = useContext(CartContext);
  const addBtnHndlr = () => {
    cartCtx.addItem({
      id: props.item.id,
      name: props.item.name,
      price: props.item.price,
      amount: 1,
    });
  };
  const removeBtnHndlr = () => {
    cartCtx.removeItem(props.item.id);
  };
  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{props.item.price.toFixed(2)}</span>
          <span className={styles.amount}>x{props.item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={addBtnHndlr}>+</button>
        <button onClick={removeBtnHndlr}>-</button>
      </div>
    </li>
  );
}

export default CartItems;
