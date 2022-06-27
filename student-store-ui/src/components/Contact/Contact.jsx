import * as React from "react";
import { Instagram, Twitter, LinkedIn, Facebook } from "@mui/icons-material";
import "./Contact.css";

const Contact = () => (
  <div className={"contact"}>
    <h2>Contact Us</h2>
    <table className={"contact-table"}>
      <tr>
        <th>Email:</th>
        <td>code@path.org</td>
      </tr>
      <tr>
        <th>Phone:</th>
        <td>1-800-CODEPATH</td>
      </tr>
      <tr>
        <th>Address:</th>
        <td>123 Fake Street, San Francisco, CA</td>
      </tr>
      <tr>
        <th>Socials:</th>
        <td>
          <a href={"https://instagram.com"} target={"_blank"}>
            <Instagram />
          </a>
          <a href={"https://twitter.com"} target={"_blank"}>
            <Twitter />
          </a>
          <a href={"https://linkedin.com"} target={"_blank"}>
            <LinkedIn />
          </a>
          <a href={"https://facebook.com"} target={"_blank"}>
            <Facebook />
          </a>
        </td>
      </tr>
    </table>
  </div>
);

export default Contact;