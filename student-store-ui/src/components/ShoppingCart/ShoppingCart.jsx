import * as React from "react";
import SelectedProductsTable from "../SelectedProductsTable/SelectedProductsTable";
import "./ShoppingCart.css";

const ShoppingCart = ({ shoppingCart, isOpen, products }) => {
  const productData = shoppingCart
    .map(({ itemId }) => products.findIndex(({ id }) => itemId === id))
    .map((productIndex, i) => productIndex === -1 ? null : { ...products[productIndex], ...shoppingCart[i] })
    .filter((product) => !!product);
  return (
    <div className={"shopping-cart"}>
      <h2>Shopping Cart</h2>
      {shoppingCart.length === 0
        ? <p>No items added to cart yet. Start shopping now!</p>
        : <SelectedProductsTable selectedProducts={productData} />
      }
    </div>
  )
};

export default ShoppingCart;