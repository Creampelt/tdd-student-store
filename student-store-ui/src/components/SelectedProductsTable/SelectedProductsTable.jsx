import * as React from "react";
import cartHeaders from "../../constants/cartHeaders";
import "./SelectedProductsTable.css";

const SelectedProductsTable = ({ selectedProducts = [], products = [] }) => {
  const productData = selectedProducts
    .map(({ itemId }) => products.findIndex(({ id }) => itemId === id))
    .map((productIndex, i) => productIndex === -1 ? null : { ...products[productIndex], ...selectedProducts[i] })
    .filter((product) => !!product);
  const price = productData.reduce((total, { price, quantity }) => total + price * quantity, 0);

  return (
    <table className={"selected-products-table"}>
      <thead>
      <tr>
        {cartHeaders.map((header) => <th key={header}>{header}</th>)}
      </tr>
      </thead>
      <tbody>
      {productData.map(({ itemId, name, quantity, price }) => (
        <tr key={itemId}>
          <td className={"cart-product-name"}>{name}</td>
          <td className={"cart-product-quantity"}>{quantity}</td>
          <td>${price.toFixed(2)}</td>
          <td>${(price * quantity).toFixed(2)}</td>
        </tr>
      ))}
      </tbody>
      <tfoot>
      <tr>
        <th colSpan={3}>Subtotal</th>
        <td className={"subtotal"}>${price.toFixed(2)}</td>
      </tr>
      <tr>
        <th colSpan={3}>Taxes &amp; Fees</th>
        <td>${(price * 0.0875).toFixed(2)}</td>
      </tr>
      <tr>
        <th colSpan={3}>Total</th>
        <td className={"total-price"}>${(price * 1.0875).toFixed(2)}</td>
      </tr>
      </tfoot>
    </table>
  )
};

export default SelectedProductsTable;