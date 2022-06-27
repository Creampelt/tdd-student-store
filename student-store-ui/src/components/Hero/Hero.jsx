import * as React from "react";
import "./Hero.css";
import studentStoreIcon from "../../images/student-store-icon.svg";

const Hero = () => (
  <div className={"hero"}>
    <div className={"intro"}>
      <h1>
        Welcome!
        <br />
        Find your merch!
      </h1>
      <p>
        We have all kinds of goodies. Click on any of the items to start filling up your shopping cart. Checkout whenever you're ready.
      </p>
    </div>
    <img className={"hero-img"} src={studentStoreIcon} alt={"Student Store Icon"} />
  </div>
);

export default Hero;