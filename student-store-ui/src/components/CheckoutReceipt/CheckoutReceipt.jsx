import * as React from "react";
import SelectedProductsTable from "../SelectedProductsTable/SelectedProductsTable";
import Modal from "../Modal/Modal";
import "./CheckoutReceipt.css";

const CheckoutReceipt = ({ receipt, hidden, onClose }) => (
  <Modal className={"checkout-receipt"} hidden={hidden} onClose={onClose}>
    <>
      <h2>Your Receipt</h2>
      <p>Showing receipt for {receipt?.userInfo?.name} available at {receipt?.userInfo?.email}.</p>
      <SelectedProductsTable selectedProducts={receipt?.productRows} />
      <button className={"done-button"} onClick={onClose}>Done</button>
    </>
  </Modal>
);

export default CheckoutReceipt;