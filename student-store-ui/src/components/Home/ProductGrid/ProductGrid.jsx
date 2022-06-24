import * as React from "react";
import { Add, Remove } from "@mui/icons-material";
import "./ProductGrid.css";

const ProductCard = ({ image, name, price, countInCart = 0, setCountInCart }) => (
  <div className={"product-card"}>
    <img src={image} alt={name}/>
    <div className={"product-description"}>
      <div className={"title-and-count"}>
        <p>{name}</p>
        <div className={"cart-count"}>
          <button onClick={() => setCountInCart(countInCart + 1)}>
            <Add/>
          </button>
          <input
            type={"number"}
            value={countInCart.toString()}
            placeholder={"0"}
            onChange={({target}) => setCountInCart(target.value)}
          />
          <button onClick={() => setCountInCart(countInCart - 1)}>
            <Remove/>
          </button>
        </div>
      </div>
      <p className={"price"}>${price.toFixed(2)}</p>
    </div>
  </div>
);

const ProductGrid = ({ products, cart, updateProductInCart }) => {
  return (
    <div className={"product-grid"}>
      {products && products.length > 0 ? (
        products.map(({ id, ...product }) => (
          <ProductCard
            key={id}
            countInCart={cart[id]?.count}
            setCountInCart={(value) => updateProductInCart(id, value)}
            {...product}
          />
        ))
      ) : <p>There are no products to display</p>}
    </div>
  )
};

export default ProductGrid;