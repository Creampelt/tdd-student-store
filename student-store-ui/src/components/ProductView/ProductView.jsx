import * as React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductView.css";

const ProductView = ({ product, productId, quantity, handleAddItemToCart, handleRemoveItemToCart, setQuantityInCart }) => (
  <div className={"product-view"}>
    <h1 className={"product-id"}>Product #{productId}</h1>
    <ProductCard
      product={product}
      productId={productId}
      quantity={quantity}
      handleAddItemToCart={handleAddItemToCart}
      handleRemoveItemToCart={handleRemoveItemToCart}
      showDescription
      setQuantityInCart={setQuantityInCart}
    />
  </div>
);

export default ProductView;