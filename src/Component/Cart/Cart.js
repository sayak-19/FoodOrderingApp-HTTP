import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItems from "./CartItems";
import CheckoutForm from "./CheckoutForm";

function Cart(props) {
  const [isOrderBtnClicked, setIsOrderBtnClicked] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const [error, setError] = useState(null);
  const cartCtx = useContext(CartContext);

  const orderBtnHndlr = (e) => {
    e.preventDefault();
    setIsOrderBtnClicked(true);
  };

  const orderSubmitHndlr = async (userInfo) => {
    setSavingOrder(true);
    try {
      await fetch(
        "https://dbforreact-httpreq-default-rtdb.asia-southeast1.firebasedatabase.app/userorder.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userInfo,
            orderedItems: cartCtx.items,
            totalPrice: cartCtx.amount,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSavingOrder(false);
      setOrderSaved(true);
      cartCtx.removeAllItems();
    } catch (err) {
      setSavingOrder(false);
      setError(err.message || "Something went wrong!");
    }
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return <CartItems key={item.id} item={item} />;
      })}
    </ul>
  );

  const closeAndOrderBtn = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={styles.button} onClick={orderBtnHndlr}>
          Order
        </button>
      )}
    </div>
  );

  let cartContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartCtx.amount.toFixed(2)}</span>
      </div>
      {isOrderBtnClicked && (
        <CheckoutForm onConfirm={orderSubmitHndlr} onCancel={props.onClose} />
      )}
      {!isOrderBtnClicked && closeAndOrderBtn}
    </React.Fragment>
  );

  if (savingOrder) {
    cartContent = <p>Saving Order...</p>;
  }
  if (orderSaved) {
    cartContent = (
      <React.Fragment>
        <p>Order Successful!</p>
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  }
  if (error) {
    cartContent = <p>{error.message}</p>;
  }

  return <Modal onClose={props.onClose}>{cartContent}</Modal>;
}

export default Cart;
