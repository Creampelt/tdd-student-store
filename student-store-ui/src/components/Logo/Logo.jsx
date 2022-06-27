import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/codepath-logo.svg";

const Logo = () => (
  <Link to={"/"} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
    <div className={"logo"}>
      <img src={logo} alt={"CodePath Logo"} />
    </div>
  </Link>
);

export default Logo;