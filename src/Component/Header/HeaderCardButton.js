import React, { useContext, useEffect, useState } from "react";
import CartContext from "../store/cart-context";
import CartIcon from "./CartIcon";
import styles from "./HeaderCartButton.module.css";

function HeaderCardButton(props) {
  const [isBtnHighlited, setIsBtnHighlited] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItm = items.reduce((i, item) => i + item.amount, 0);
  const btnClasses = `${styles.button} ${isBtnHighlited ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnHighlited(true);
    const timer = setTimeout(() => {
      setIsBtnHighlited(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items, numberOfCartItm]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItm}</span>
    </button>
  );
}

export default HeaderCardButton;
