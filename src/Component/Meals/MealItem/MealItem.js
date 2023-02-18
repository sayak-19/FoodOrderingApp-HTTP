import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = props.item.price.toFixed(2);

  const addToCartHndlr = (enteredAmt) => {
    cartCtx.addItem({
      id: props.item.id,
      name: props.item.name,
      price: props.item.price,
      amount: enteredAmt,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.item.name}</h3>
        <div className={styles.description}>{props.item.description}</div>
        <div className={styles.price}>${price}</div>
      </div>

      <div>
        <MealItemForm onAddToCart={addToCartHndlr} />
      </div>
    </li>
  );
}

export default MealItem;
