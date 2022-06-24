import * as React from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import SelectedProductsTable from "../SelectedProductsTable/SelectedProductsTable";
import "./Sidebar.css";

const Sidebar = ({ cart, name, setName, email, setEmail, onCheckout }) => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) return;
    setOpen(false);
    onCheckout();
  }

  return (
    <section className={`sidebar ${open ? "open" : ""}`}>
      <div className={"shopping-cart"}>
        <h2>Shopping Cart</h2>
        {Object.keys(cart).length === 0
          ? <p>No items added to cart yet. Start shopping now!</p>
          : <SelectedProductsTable selectedProducts={cart} />
        }
      </div>
      <div className={"payment-info"}>
        <h2>Payment Info</h2>
        <form className={"payment-form"} onSubmit={onFormSubmit}>
          <input type={"text"} required placeholder={"Name"} value={name} onChange={({ target }) => setName(target.value)} />
          <input type={"email"} required placeholder={"Email"} value={email} onChange={({ target }) => setEmail(target.value)} />
          <input type={"submit"} value={"Check out"} />
        </form>
      </div>
      <button className={"toggle-open"} onClick={toggleOpen}>
        <ChevronRightRounded className={"chevron"} style={{ fontSize: 40 }}/>
      </button>
    </section>
  )
};

export default Sidebar;
