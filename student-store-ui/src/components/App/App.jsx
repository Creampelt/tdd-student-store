import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import CheckoutReceipt from "../CheckoutReceipt/CheckoutReceipt";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const API_LINK = "https://codepath-store-api.herokuapp.com/store";

export default function App() {
  const [cart, setCart] = React.useState({});
  const [products, setProducts] = React.useState();
  const [receipt, setReceipt] = React.useState({});
  const [hideReceipt, setHideReceipt] = React.useState(true);
  const [modalShown, setModalShown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const updateProductInCart = (id, count) => {
    setCart((prev) => {
      // don't update if products haven't loaded
      if (!products) return prev;
      let newCount = parseInt(count);
      // if value written isn't a number or is less than zero, set cart value to 0
      if (isNaN(newCount) || newCount < 0) newCount = 0;
      // if this product is already in the cart...
      if (prev[id]) {
        // remove product from cart if new count is 0
        if (newCount === 0) {
          const nextState = { ...prev };
          delete nextState[id];
          return nextState;
        }
        // update count in cart
        return {
          ...prev,
          [id]: {...prev[id], count: newCount }
        };
      }
      // only add product to cart if new count > 0
      if (newCount !== 0) {
        const matchingProducts = products.filter((product) => product.id === id);
        // make sure that there is a product with the given cart key (should always have length 1)
        if (matchingProducts.length === 0) return prev;
        return {
          ...prev,
          [id]: { ...matchingProducts[0], count: newCount }
        }
      }
      return prev;
    });
  };

  const onCheckout = () => {
    setReceipt(cart);
    setCart({});
    setHideReceipt(false);
    setModalShown(true);
  };

  React.useEffect(() => {
    axios.get(API_LINK).then(({ data }) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <div className={`app ${modalShown ? "modal-shown" : ""}`}>
      <BrowserRouter>
        <main>
          <Sidebar
            cart={cart}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            onCheckout={onCheckout}
          />
          <div className={"content"}>
            <Navbar />
            <Home
              cart={cart}
              updateProductInCart={updateProductInCart}
              products={products}
              setModalShown={setModalShown}
            />
          </div>
          <CheckoutReceipt
            receipt={receipt}
            hidden={hideReceipt}
            name={name}
            email={email}
            onClose={() => { setHideReceipt(true); setModalShown(false) }}
          />
        </main>
      </BrowserRouter>
    </div>
  )
}
