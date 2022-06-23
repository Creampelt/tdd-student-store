import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import defaultCart from "../../constants/cart";

const API_LINK = "https://codepath-store-api.herokuapp.com/store";

export default function App() {
  const [cart, setCart] = React.useState(defaultCart);
  const [products, setProducts] = React.useState();
  const updateProductInCart = (id, count) => setCart((prev) => ({ ...prev, [id]: count }));

  React.useEffect(() => {
    axios.get(API_LINK).then(({ data }) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Sidebar cart={cart} />
          <div className={"content"}>
            <Navbar />
            <Home cart={cart} updateProductInCart={updateProductInCart} products={products} />
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}
