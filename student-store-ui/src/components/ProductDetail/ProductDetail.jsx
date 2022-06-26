import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./ProductDetail.css";

const ANIMATION_DURATION = 200;

const ProductDetail = ({ products, setModalShown }) => {
  const [displayedProduct, setDisplayedProduct] = React.useState({});
  const [shown, setShown] = React.useState(false);
  const { productId } = useParams();
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

  const show = (focusedProduct) => {
    if (!shown) {
      setDisplayedProduct(focusedProduct);
      setTimeout(() => {
        setShown(true);
        setModalShown(true);
      }, ANIMATION_DURATION);
    }
  }

  React.useEffect(() => {
    const focusedProducts = products?.filter(({ id }) => productId === id.toString());
    if (!focusedProducts || focusedProducts.length === 0) {
      hide();
    } else {
      show(focusedProducts[0]);
    }
  }, [productId, products]);

  return (
    <Modal className={"product-detail"} hidden={!shown} onClose={hide}>
      <>
        <h2 className={"product-title"}>{displayedProduct.name}</h2>
        <img className={"product-img"} src={displayedProduct.image} alt={displayedProduct.name} />
        <div className={"details"}>
          <p><span className={"detail-category"}>Product ID:</span> {displayedProduct.id}</p>
          <p><span className={"detail-category"}>Category:</span> {displayedProduct.category}</p>
          <p><span className={"detail-category"}>Price:</span> ${displayedProduct.price}</p>
        </div>
        <p className={"product-detailed-description"}>{displayedProduct.description}</p>
      </>
    </Modal>
  )
};

export default ProductDetail;