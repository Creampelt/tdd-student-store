import * as React from "react";
import SelectedProductsTable from "../SelectedProductsTable/SelectedProductsTable";
import Modal from "../Modal/Modal";
import "./CheckoutReceipt.css";

const CheckoutReceipt = ({ receipt, hidden, name, email, onClose, products }) => (
  <Modal className={"checkout-receipt"} hidden={hidden} onClose={onClose}>
    <>
      <h2>Your Receipt</h2>
      <p>A copy of this receipt has been sent to {name} at {email}.</p>
      <SelectedProductsTable selectedProducts={receipt} products={products} />
      <button className={"done-button"} onClick={onClose}>Done</button>
    </>
  </Modal>
);

export default CheckoutReceipt;