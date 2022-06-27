import * as React from "react";
import notFound from "../../images/not-found-icon.png";
import "./NotFound.css";

const NotFound = ({ productId }) => (
  <div className={"not-found"}>
    <img className={"not-found-icon"} src={notFound} alt={"404: Not found"} />
    <h1>404: Not Found</h1>
    <p>There is no product for sale with ID #{productId}.</p>
  </div>
);

export default NotFound;