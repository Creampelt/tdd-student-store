import * as React from "react";
import "./CheckoutForm.css";

const CheckoutForm = ({ isOpen, shoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (shoppingCart.length === 0) return;
    handleOnSubmitCheckoutForm();
  }

  return (
    <div className={"checkout-form"}>
      <h2>Payment Info</h2>
      <form onSubmit={onFormSubmit}>
        <input
          type={"email"}
          className={"checkout-form-input"}
          name={"email"}
          required
          placeholder={"student@codepath.org"}
          value={checkoutForm.email}
          onChange={({target}) => handleOnCheckoutFormChange("email", target.value)}
        />
        <input
          type={"text"}
          className={"checkout-form-input"}
          name={"name"}
          required
          placeholder={"Student Name"}
          value={checkoutForm.name}
          onChange={({target}) => handleOnCheckoutFormChange("name", target.value)}
        />
        <button className={"checkout-button"} type={"submit"}>Checkout</button>
      </form>
    </div>
  )
};

export default CheckoutForm;