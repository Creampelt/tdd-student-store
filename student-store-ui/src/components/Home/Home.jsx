import * as React from "react";
import ProductGrid from "./ProductGrid/ProductGrid";
import { Search as SearchIcon, QuestionMark, ShoppingCart } from "@mui/icons-material";
import studentStoreIcon from "../../images/student-store-icon.svg";
import "./Home.css";
import productCategories from "../../constants/productCategories";

const Banner = () => (
  <div className={"banner"}>
    <div className={"banner-text"}>
      <h1>
        Welcome!
        <br />
        Find your merch!
      </h1>
      <p>
        We have all kinds of goodies. Click on any of the items to start filling up your shopping cart. Checkout whenever you're ready.
      </p>
    </div>
    <img src={studentStoreIcon} alt={"Student Store Icon"} />
  </div>
);

const Search = ({ categoryIndex, setCategoryIndex }) => (
  <div className={"product-grid-header"}>
    <form className={"search"}>
      <input type={"text"} className={"search-bar"} placeholder={"Search"}/>
      <button type={"submit"} className={"search-button"}>
        <SearchIcon style={{ color: "fff", fontSize: 35 }}/>
      </button>
    </form>
    <ul className={"categories"}>
      <li onClick={() => setCategoryIndex(-1)}>
        All Categories
        <span className={"underline"} style={{ transform: `translateX(${(categoryIndex + 1) * 100}%)` }}/>
      </li>
      {productCategories.map(({key, label}, i) => (
        <li key={key} onClick={() => setCategoryIndex(i)}>{label}</li>
      ))}
    </ul>
  </div>
);

const Home = ({ cart, updateProductInCart, products }) => {
  const [categoryIndex, setCategoryIndex] = React.useState(-1);
  const [cartContents, setCartContents] = React.useState({});

  const filteredProducts = categoryIndex === -1 ? products
    : products.filter(({ category }) => category === productCategories[categoryIndex].key);

  return (
    <div className={"home"}>
      <Banner />
      <Search categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} />
      <ProductGrid
        products={filteredProducts}
        category={productCategories[categoryIndex]}
        cart={cart}
        updateProductInCart={updateProductInCart}
      />
    </div>
  );
};

export default Home;