import * as React from "react";
import "./Modal.css";

const Modal = ({ className, hidden, onClose, children }) => (
  <div className={`modal-wrapper ${className}-wrapper ${hidden ? "hidden" : ""}`} onClick={onClose}>
    <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

export default Modal;