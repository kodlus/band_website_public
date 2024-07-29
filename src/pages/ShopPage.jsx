/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from "react";
import Gallery from "../components/Gallery.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getAllProducts } from "../API/api.js";

/*=====================================================
ShopPage
=====================================================*/
const ShopPage = () => {
  /*===========================================
  States and useEffect
  ============================================*/
  // The original array
  const [products, setProducts] = useState([]);
  // The mutable array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHidden, setIsHidden] = useState(true);
  const [setIsLoading] = useOutletContext();
  const [value, setValue] = useState({
    category: "",
    price: ""
  });

  /*===========================================
  Load products
  ============================================*/
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  /*===========================================
  Filter products based on their price
  ============================================*/
  function priceFilterUpdate(event, price) {
    event.preventDefault();
  
    // Creates a deep copy, because: 
    // I noticed that products also got permanently sorted either high-to-low 
    // or low-to high when the pricefilter was activated. 
    // The deep copy allows the user remove the price filtering and view
    // the products in their original order
    const productsCopy = JSON.parse(JSON.stringify(products));

    if(price === "descending") {
      setFilteredProducts(prev => 
        [...prev].sort(function(a, b){return b.price - a.price}))
        setIsHidden(false);
    } else if (price === "ascending") {
      setFilteredProducts(prev =>
        [...prev].sort(function(a, b){return a.price - b.price}));
        setIsHidden(false);
    } else if (price === "reset") {
      setFilteredProducts([...productsCopy]);
      setIsHidden(true);
    }
  }

  function handlePriceFilterChange(event) {
    // [8]
    setValue(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }), priceFilterUpdate(event, event.target.value));
  }

  /*===========================================
  Filter products based on their type
  (a React-router feature)
  ============================================*/
  // A filter getting elements matching the searchParam key "type"
  const typeFilter = searchParams.get("type");
  
  const displayedProducts = typeFilter 
    // if typeFilter is active, show products of a specific type
    ? filteredProducts.filter(product => product.type === typeFilter)
    // Otherwise, display all products
    : filteredProducts; 

  
  function handleCategoryChange(key, category) {
    // Only active if the key is not undefined
    if(key !== undefined) {
      // A React-router hook. It behaves similarly to setState [19]
      setSearchParams(prevParams => {
        // If the user clears the search params
        if(category === "null") {
          // Deletes all instances of the key in the searchParam object
          prevParams.delete(key);
        } else {
          // Sets the new query to the searchParams objects
          prevParams.set(key, category);
        }
        // Returns the searchParams object
        return prevParams;
      }); 
    }
  }

  function handleCategoryFilterChange(event) {
    // [8]
    setValue(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }), handleCategoryChange("type", event.target.value));
  }

  /*===========================================
  Gallery elements
  ============================================*/
  const galleryElements = displayedProducts.map((product, index) => {
    return( 
      <ProductCard 
        key={index}
        product_id = {product.id}
        name = {product.name}
        img = {product.img_url}
        alt = {product.img_alt}
        title = {product.name}
        desc = {product.short_desc}
        price = {product.price}
        item = {product}
        stock = {product?.stock}
        searchParams={searchParams}
      />
    );
  });

  /*===========================================
  JSX
  ============================================*/
  return (
    <main className="shop-page site__content">
      <div className="shop-page-header">
        <h1 className="title title--dark center">Welcome to ze shôp</h1>
          <p className="shop-page__copy">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor eu augue ut lectus arcu bibendum at. Ac ut consequat semper viverra.
          </p>

          <hr />
          <div className="shop-page-header__filters">
            <form 
              className="filter" 
              action="" 
            >
              <label htmlFor="category">Filter by Category:</label>
              <select 
                value={value.category} 
                name="category" 
                id="category" 
                onChange={(event) => handleCategoryFilterChange(event)}
              >
                <option value="null" >Default</option>
                <option value="music">Music</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="print">Print</option>
              </select>
            </form>
            
            <form 
              className="filter" 
              action="" 
            >
              <label htmlFor="price">Filter by Price:</label>
              <select 
                value={value.price} 
                name="price" 
                id="price" 
                onChange={(event) => handlePriceFilterChange(event)}
              >
                <option value="reset" >Default</option>
                <option value="ascending" >Low to high</option>
                <option value="descending" >High to low</option>
              </select>
            </form>
          </div>
        </div>

      <div className="shop-page-wrapper page-padding">
        <Gallery 
          products={galleryElements}
        />
      </div>
    </main>
  );
};

export default ShopPage;