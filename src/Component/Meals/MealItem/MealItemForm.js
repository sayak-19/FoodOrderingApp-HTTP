import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

function MealItemForm(props) {
  const amountInpRef = useRef();
  const [invalidAmt, setInvalidAmt] = useState(false);

  const submitHndlr = (e) => {
    e.preventDefault();
    const enteredAmt = +amountInpRef.current.value;
    if (
      amountInpRef.current.value.trim().length === 0 ||
      enteredAmt < 1 ||
      enteredAmt > 5
    ) {
      setInvalidAmt(true);
      return;
    }
    props.onAddToCart(enteredAmt);
  };
  return (
    <form className={styles.form} onSubmit={submitHndlr}>
      <Input
        ref={amountInpRef}
        lable="Amount:"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {invalidAmt && <p>Invalid</p>}
    </form>
  );
}

export default MealItemForm;
