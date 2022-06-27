import * as React from "react";
import { Twitter, Instagram, Facebook } from "@mui/icons-material";
import Logo from "../Logo/Logo";
import "./Navbar.css";

const Navbar = () => (
  <nav className={"navbar"}>
    <div className={"right-content"}>
      <Logo />
      <div className={"icons"}>
        <a href={"https://twitter.com"} target={"_blank"}>
          <Twitter style={{ fontSize: 40 }} />
        </a>
        <a href={"https://instagram.com"} target={"_blank"}>
          <Instagram style={{ fontSize: 40 }} />
        </a>
        <a href={"https://facebook.com"} target={"_blank"}>
          <Facebook style={{ fontSize: 40 }} />
        </a>
      </div>
    </div>
    <ul className={"nav-links"}>
      <li><a href={"/"} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>Home</a></li>
      <li><a href={"/#about"}>About Us</a></li>
      <li><a href={"/#contact"}>Contact Us</a></li>
      <li><a href={"/#buy"}>Buy Now</a></li>
    </ul>
  </nav>
);

export default Navbar;