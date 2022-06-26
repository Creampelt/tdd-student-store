import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import "./ProductGrid.css";

const ProductCard = ({ id, image, name, price, countInCart = 0, setCountInCart }) => {
  const navigate = useNavigate();
  return (
    <div className={"product-card"} onClick={() => navigate(`products/${id}`)}>
      <img src={image} alt={name}/>
      <div className={"product-description"}>
        <div className={"title-and-count"}>
          <p>{name}</p>
          <div className={"cart-count"}>
            <button onClick={(e) => {
              setCountInCart(countInCart - 1);
              e.stopPropagation();
            }}>
              <Remove/>
            </button>
            <input
              type={"number"}
              value={countInCart.toString()}
              placeholder={"0"}
              onChange={({target}) => setCountInCart(target.value)}
            />
            <button onClick={(e) => {
              setCountInCart(countInCart + 1);
              e.stopPropagation();
            }}>
              <Add/>
            </button>
          </div>
        </div>
        <p className={"price"}>${price.toFixed(2)}</p>
      </div>
    </div>
  )
};

const ProductGrid = ({ products, cart, updateProductInCart, children }) => {
  return (
    <div className={"product-grid"}>
      {products && products.length > 0 ? (
        products.map(({ id, ...product }) => (
          <ProductCard
            key={id}
            id={id}
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