import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import CheckoutReceipt from "../CheckoutReceipt/CheckoutReceipt";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import api from "../../constants/api";
import ProductDetail from "../ProductDetail/ProductDetail";

export default function App() {
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  // TODO: add loading indicator when fetching
  const [isFetching, setIsFetching] = React.useState(true);
  // TODO: display error message
  const [error, setError] = React.useState("");
  // whether sidebar is open
  const [isOpen, setIsOpen] = React.useState(false);
  const [receipt, setReceipt] = React.useState([]);
  const [hideReceipt, setHideReceipt] = React.useState(true);
  const [modalShown, setModalShown] = React.useState(false);
  const [checkoutForm, setCheckoutForm] = React.useState({ name: "", email: "" });

  const updateProductInCart = (id, quantity) => {
    setShoppingCart((prev) => {
      // don't update if products haven't loaded
      if (products.length === 0) return prev;
      let newQuantity = parseInt(quantity);
      // if value written isn't a number or is less than zero, set cart value to 0
      if (isNaN(newQuantity) || newQuantity < 0) newQuantity = 0;
      // if this product is already in the cart...
      const existingProduct = shoppingCart.findIndex(({ itemId }) => id === itemId);
      const nextState = [ ...prev ];
      if (existingProduct > -1) {
        if (newQuantity === 0) {
          // remove product from cart if new quantity is 0
          nextState.splice(existingProduct, 1);
        } else {
          // update quantity in cart
          nextState[existingProduct] = { itemId: id, quantity: newQuantity };
        }
      } else if (newQuantity !== 0) {
        // only add product to cart if new quantity > 0
        nextState.push({ itemId: id, quantity: newQuantity });
      }
      return nextState;
    });
  };

  const handleAddItemToCart = (productId) => {
    const existingProduct = shoppingCart.findIndex(({ itemId }) => productId === itemId);
    if (existingProduct === -1) {
      updateProductInCart(productId, "1");
    } else {
      updateProductInCart(productId, shoppingCart[existingProduct].quantity + 1);
    }
  }

  const handleRemoveItemToCart = (productId) => {
    const existingProduct = shoppingCart.findIndex(({ itemId }) => productId === itemId);
    if (existingProduct > -1) {
      updateProductInCart(productId, shoppingCart[existingProduct].quantity - 1);
    }
  }

  const handleOnCheckoutFormChange = (name, value) => (
    setCheckoutForm((prev) => ({ ...prev, [name]: value }))
  );

  const handleOnSubmitCheckoutForm = () => {
    setReceipt(shoppingCart);
    setShoppingCart([]);
    setHideReceipt(false);
    setModalShown(true);
  };

  const handleOnToggle = () => setIsOpen((prev) => !prev);

  React.useEffect(() => {
    setIsFetching(true);
    axios.get(api).then(({ data }) => {
      setProducts(data.products);
      setIsFetching(false);
    }).catch((error) => setError(error.message));
  }, []);

  return (
    <div className={`app ${modalShown ? "modal-shown" : ""}`}>
      <BrowserRouter>
        <main>
          <Sidebar
            isOpen={isOpen}
            handleOnToggle={handleOnToggle}
            shoppingCart={shoppingCart}
            products={products}
            name={name}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange}
            checkoutForm={checkoutForm}
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
          />
          <div className={"content"}>
            <Navbar />
            <Home
              cart={shoppingCart}
              isFetching={isFetching}
              setIsFetching={setIsFetching}
              updateProductInCart={updateProductInCart}
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemToCart={handleRemoveItemToCart}
              setQuantityInCart={updateProductInCart}
              products={products}
              setModalShown={setModalShown}
            />
          </div>
          <CheckoutReceipt
            receipt={receipt}
            hidden={hideReceipt}
            name={checkoutForm.name}
            email={checkoutForm.email}
            products={products}
            onClose={() => { setHideReceipt(true); setModalShown(false) }}
          />
          <Routes>
            <Route path={"products"}>
              <Route path={":productId"} element={(
                <ProductDetail
                  setIsFetching={setIsFetching}
                  setModalShown={setModalShown}
                  shoppingCart={shoppingCart}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemToCart={handleRemoveItemToCart}
                  setQuantityInCart={updateProductInCart}
                  isFetching={isFetching}
                />
              )} />
            </Route>
            <Route path={"/"} element={null} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
