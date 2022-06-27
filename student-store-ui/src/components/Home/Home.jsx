import * as React from "react";
import Hero from "../Hero/Hero";
import ProductGrid from "../ProductGrid/ProductGrid";
import ProductDetail from "../ProductDetail/ProductDetail";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import studentStoreIcon from "../../images/student-store-icon.svg";
import productCategories from "../../constants/productCategories";
import { Route, Routes } from "react-router-dom";
import "./Home.css";

const Search = ({ categoryIndex, setCategoryIndex, onSearch }) => {
  const [query, setQuery] = React.useState("");
  React.useEffect(() => onSearch(query), [query]);

  return (
    <div className={"product-grid-header"}>
      <form className={"search"} onSubmit={(e) => e.preventDefault()}>
        <input
          type={"text"}
          className={"search-bar"}
          placeholder={"Search"}
          value={query}
          onChange={({target}) => setQuery(target.value)}
        />
      </form>
      <ul className={"categories"}>
        <li onClick={() => setCategoryIndex(-1)}>
          All Categories
          <span className={"underline"} style={{transform: `translateX(${(categoryIndex + 1) * 100}%)`}}/>
        </li>
        {productCategories.map(({key, label}, i) => (
          <li key={key} onClick={() => setCategoryIndex(i)}>{label}</li>
        ))}
      </ul>
    </div>
  )
};

const Home = ({ cart, isFetching, setIsFetching, updateProductInCart, handleAddItemToCart, handleRemoveItemToCart, setQuantityInCart, products, setModalShown }) => {
  const [categoryIndex, setCategoryIndex] = React.useState(-1);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  const search = (query) => {
    if (query.length === 0)
      filterProductsByCategory();
    else
      setFilteredProducts(products.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase())));
  };

  const filterProductsByCategory = () => {
    setFilteredProducts(categoryIndex === -1
      ? products
      : products.filter(({ category }) => category === productCategories[categoryIndex].key)
    );
  };

  React.useEffect(filterProductsByCategory, [products, categoryIndex]);

  return (
    <div className={"home"}>
      <Hero />
      <Search categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} onSearch={search} />
      <ProductGrid
        products={filteredProducts}
        category={productCategories[categoryIndex]}
        cart={cart}
        updateProductInCart={updateProductInCart}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemToCart={handleRemoveItemToCart}
      />
      <div className={"about-and-contact"}>
        <About />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Home;