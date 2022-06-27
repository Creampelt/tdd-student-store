import * as React from "react";
import { Instagram, Twitter, LinkedIn, Facebook } from "@mui/icons-material";
import "./Footer.css";

const Footer = () => (
  <footer className={"footer"}>
    <a href={"https://instagram.com"} target={"_blank"}>
      <Instagram style={{ fontSize: 40 }} />
    </a>
    <a href={"https://twitter.com"} target={"_blank"}>
      <Twitter style={{ fontSize: 40 }} />
    </a>
    <a href={"https://linkedin.com"} target={"_blank"}>
      <LinkedIn style={{ fontSize: 40 }} />
    </a>
    <a href={"https://facebook.com"} target={"_blank"}>
      <Facebook style={{ fontSize: 40 }} />
    </a>
  </footer>
);

export default Footer;