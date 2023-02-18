import React, { Fragment } from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

function Modal(props) {
  const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClick}></div>;
  };
  const ModalOverlay = (props) => {
    return (
      <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
      </div>
    );
  };
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("overlay-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
}

export default Modal;
