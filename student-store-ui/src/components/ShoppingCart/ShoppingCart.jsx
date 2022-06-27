import * as React from "react";
import SelectedProductsTable from "../SelectedProductsTable/SelectedProductsTable";
import "./ShoppingCart.css";

const ShoppingCart = ({ shoppingCart, isOpen, products }) => (
  <div className={"shopping-cart"}>
    <h2>Shopping Cart</h2>
    {shoppingCart.length === 0
      ? <p>No items added to cart yet. Start shopping now!</p>
      : <SelectedProductsTable selectedProducts={shoppingCart} products={products} />
    }
  </div>
);

export default ShoppingCart;