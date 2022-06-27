import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import "./ProductCard.css";

const ProductCard = ({ productId, showDescription, product, quantity = 0, setQuantityInCart, handleAddItemToCart, handleRemoveItemToCart }) => {
  const navigate = useNavigate();
  return (
    <div className={"product-card"} onClick={() => navigate(`/products/${productId}`)}>
      <div className={"media"}>
        <Link to={`/products/${productId}`}>
          <img src={product.image} alt={product.name}/>
        </Link>
      </div>
      <div className={"product-card-details"}>
        <div className={"title-and-count"}>
          <p className={"product-name"}>{product.name}</p>
          <div className={"cart-count"}>
            <button className={"remove"} onClick={(e) => {
              handleRemoveItemToCart(productId);
              e.stopPropagation();
            }}>
              <Remove/>
            </button>
            <input
              type={"number"}
              value={quantity.toString()}
              placeholder={"0"}
              className={"product-quantity"}
              onClick={(e) => e.stopPropagation()}
              onChange={({target}) => setQuantityInCart(target.value)}
            />
            <button className={"add"} onClick={(e) => {
              handleAddItemToCart(productId);
              e.stopPropagation();
            }}>
              <Add/>
            </button>
          </div>
        </div>
        <p className={"product-price"}>${product.price.toFixed(2)}</p>
        {showDescription && <p className={"product-description"}>{product.description}</p>}
      </div>
    </div>
  )
};

export default ProductCard;