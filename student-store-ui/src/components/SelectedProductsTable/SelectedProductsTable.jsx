import * as React from "react";
import cartHeaders from "../../constants/cartHeaders";
import "./SelectedProductsTable.css";

const SelectedProductsTable = ({ selectedProducts = {} }) => {
  const price = Object.values(selectedProducts).reduce((total, { price }) => total + price, 0);
  return (
    <table className={"selected-products-table"}>
      <thead>
      <tr>
        {cartHeaders.map((header) => <th key={header}>{header}</th>)}
      </tr>
      </thead>
      <tbody>
      {Object.keys(selectedProducts).map((id) => (
        <tr key={id}>
          <td>{selectedProducts[id].name}</td>
          <td>{selectedProducts[id].count}</td>
          <td>${selectedProducts[id].price.toFixed(2)}</td>
          <td>${(selectedProducts[id].price * selectedProducts[id].count).toFixed(2)}</td>
        </tr>
      ))}
      </tbody>
      <tfoot>
      <tr>
        <th colSpan={3}>Subtotal</th>
        <td>${price.toFixed(2)}</td>
      </tr>
      <tr>
        <th colSpan={3}>Taxes &amp; Fees</th>
        <td>${(price * 0.0875).toFixed(2)}</td>
      </tr>
      <tr>
        <th colSpan={3}>Total</th>
        <td>${(price * 1.0875).toFixed(2)}</td>
      </tr>
      </tfoot>
    </table>
  )
};

export default SelectedProductsTable;