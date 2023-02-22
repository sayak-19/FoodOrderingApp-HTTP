import React, { useRef, useState } from "react";
import styles from "./CheckoutForm.module.css";

const isEmpty = (val) => val.trim() === "";

function CheckoutForm(props) {
  const [formValidity, setFormValidity] = useState({
    inpNameValid: null,
    addressValid: null,
    pinValid: null,
    stateValid: null,
  });
  const inpNameRef = useRef();
  const addressRef = useRef();
  const pinRef = useRef();
  const stateRef = useRef();
  console.log(formValidity);

  const confirmBtnHndlr = (e) => {
    e.preventDefault();
    const inpName = inpNameRef.current.value;
    const address = addressRef.current.value;
    const pin = pinRef.current.value;
    const state = stateRef.current.value;

    const inpNameInvalid = isEmpty(inpName);
    const addressInvalid = isEmpty(address);
    const pinInvalid = pin.trim().length !== 6;
    const stateInvalid = isEmpty(state);

    setFormValidity({
      inpNameInvalid,
      addressInvalid,
      pinInvalid,
      stateInvalid,
    });
    if (inpNameInvalid || addressInvalid || pinInvalid || stateInvalid) {
      return;
    }
    console.log("submitted");
    props.onConfirm({
      name: inpName,
      address,
      pin,
      state,
    });
  };
  return (
    <form>
      <div
        className={`${styles.control} ${
          formValidity.inpNameInvalid ? styles.invalid : ""
        }`}
      >
        <label>Name</label>
        <input ref={inpNameRef} type="text" />
        {formValidity.inpNameInvalid && <p>Field cannot be empty</p>}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.addressInvalid ? styles.invalid : ""
        }`}
      >
        <label>Address</label>
        <input ref={addressRef} type="text" />
        {formValidity.addressInvalid && <p>Field cannot be empty</p>}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.pinInvalid ? styles.invalid : ""
        }`}
      >
        <label>Pin Code</label>
        <input ref={pinRef} type="text" />
        {formValidity.pinInvalid && (
          <p>Field cannot be empty and must have 6 digits</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.stateInvalid ? styles.invalid : ""
        }`}
      >
        <label>State</label>
        <input ref={stateRef} type="text" />
        {formValidity.stateInvalid && <p>Field cannot be empty</p>}
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCancel}>Cancel</button>
        <button className={styles.submit} onClick={confirmBtnHndlr}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
