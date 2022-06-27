import * as React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products, cart, updateProductInCart, handleAddItemToCart, handleRemoveItemToCart }) => {
  const selectProductFromCart = (id) => {
    const productIndex = cart.findIndex(({ itemId }) => id === itemId);
    if (productIndex === -1) return null;
    return cart[productIndex];
  }

  return (
    <div className={"product-grid"}>
      {products && products.length > 0 ? (
        products.map(({ id, ...product }) => (
          <ProductCard
            key={id}
            productId={id}
            showDescription={false}
            quantity={selectProductFromCart(id)?.quantity}
            setQuantityInCart={(value) => updateProductInCart(id, value)}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemToCart={handleRemoveItemToCart}
            product={product}
          />
        ))
      ) : <p>There are no products to display</p>}
    </div>
  )
};

export default ProductGrid;