import * as React from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import "./Sidebar.css";

const Sidebar = ({ isOpen, handleOnToggle, shoppingCart, products, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) => (
  <section className={`sidebar ${isOpen ? "open" : ""}`}>
    <div className={"sidebar-content"}>
      <ShoppingCart shoppingCart={shoppingCart} isOpen={isOpen} products={products} />
      <CheckoutForm
        isOpen={isOpen}
        handleOnToggle={handleOnToggle}
        shoppingCart={shoppingCart}
        checkoutForm={checkoutForm}
        handleOnCheckoutFormChange={handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
      />
    </div>
    <button className={"toggle-button"} onClick={handleOnToggle}>
      <ChevronRightRounded className={"chevron"} style={{ fontSize: 40 }}/>
    </button>
  </section>
);

export default Sidebar;
