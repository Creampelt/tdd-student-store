import * as React from "react";
import ProductGrid from "./ProductGrid/ProductGrid";
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

const Home = ({ cart, updateProductInCart, products }) => {
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
      <Banner />
      <Search categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} onSearch={search} />
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