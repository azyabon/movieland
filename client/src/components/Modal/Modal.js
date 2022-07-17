import styles from "./Modal.module.scss";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const modalRootElement = document.querySelector("#modal");

const Modal = (props) => {
  const { open } = props;

  const element = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (open) {
      modalRootElement.appendChild(element);

      return () => {
        modalRootElement.removeChild(element);
      };
    }
  });

  if (open) {
    return createPortal(
      <div className={styles.modal_card}>
        <h3 className={styles.card_title}>Alert!</h3>
        {props.children}
      </div>,
      element
    );
  }

  return null;
};

export default Modal;
