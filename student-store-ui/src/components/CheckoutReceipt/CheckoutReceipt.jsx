import * as React from "react";
import SelectedProductsTable from "../SelectedProductsTable/SelectedProductsTable";
import "./CheckoutReceipt.css";

const CheckoutReceipt = ({ receipt, hidden, name, email, onClose }) => (
  <div className={`checkout-receipt-wrapper ${hidden ? "hidden" : ""}`} onClick={onClose}>
    <div className={"checkout-receipt"} onClick={(e) => e.stopPropagation()}>
      <h2>Your Receipt</h2>
      <p>A copy of this receipt has been sent to {name} at {email}.</p>
      <SelectedProductsTable selectedProducts={receipt}/>
      <button className={"done-button"} onClick={onClose}>Done</button>
    </div>
  </div>
);

export default CheckoutReceipt;