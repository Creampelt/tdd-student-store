import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import ProductView from "../ProductView/ProductView";
import NotFound from "../NotFound/NotFound";
import "./ProductDetail.css";
import axios from "axios";
import api from "../../constants/api";

const ANIMATION_DURATION = 200;

const ProductDetail = ({ isFetching, setIsFetching, setModalShown, handleAddItemToCart, handleRemoveItemToCart, setQuantityInCart, shoppingCart }) => {
  const [product, setProduct] = React.useState();
  const [shown, setShown] = React.useState(false);
  const productId = parseInt(useParams().productId);
  const navigate = useNavigate();

  const hide = () => {
    if (shown) {
      setShown(false);
      setModalShown(false);
      setTimeout(() => navigate("/"), ANIMATION_DURATION);
    } else {
      navigate("/");
    }
  }

  const show = () => {
    setShown(true);
    setModalShown(true);
  }

  const getQuantity = (id) => {
    const cartIndex = shoppingCart.findIndex(({ itemId }) => itemId === id);
    if (cartIndex === -1) return 0;
    return shoppingCart[cartIndex].quantity;
  }

  React.useEffect(() => {
    if (!productId) {
      hide();
      return;
    }
    setIsFetching(true);
    show();
    axios.get(`${api}/${productId}`).then(({ data }) => {
      setProduct(data.product);
    }).catch(() => {
      setProduct(null);
    }).finally(() => setIsFetching(false));
  }, [productId]);

  return (
    <Modal className={"product-detail"} hidden={!shown} onClose={hide}>
      {isFetching
        ? <h1 className={"loading"}>Loading...</h1>
        : product ? (
          <ProductView
            quantity={getQuantity(productId)}
            product={product}
            productId={productId}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemToCart={handleRemoveItemToCart}
            setQuantityInCart={setQuantityInCart}
          />
        ) : <NotFound productId={productId} />
      }
    </Modal>
  )
};

export default ProductDetail;