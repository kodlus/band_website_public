/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import Gallery from "../components/Gallery.jsx";
import { ShopContext } from '../contexts/ShopContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
import useWindowDimensions from '../customHooks/useWindowDimensions.jsx';
import { getAllProducts, getOneProduct } from '../API/api.js';

/*=====================================================
ProductPage
=====================================================*/
const ProductPage = () => {
  /*============================
  States & context
  ============================*/
  const [product, setProduct] = useState([]);
  const [productsArray, setProductsArray] = useState([])
  const [error, setError] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);  
  const [setIsLoading] = useOutletContext();
  const { addToCart } = useContext(ShopContext);
  const { width } = useWindowDimensions();

  /*============================
  Navigation
  ============================*/
  // For accessing the product id via url
  const params = useParams();
  const location = useLocation();
  const search =  location.state?.search;

  /*============================
  Load products
  ============================*/
  useEffect(() => {
    loadProduct();
    loadProducts();
  }, []);

  // The current product
  async function loadProduct() {
    setIsLoading(true);
    try {
      const data = await getOneProduct(params.id);
      setProduct(data);
      setProductsArray([data])
    } catch (error){
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // All products
  async function loadProducts() {
    try {
      const data = await getAllProducts();
      setAllProducts(data);
    } catch(error) {
      setError(error);
    } 
  }

  /*============================
  Recommended products
  ============================*/
  useEffect(() => {
    setFilteredProducts(productFilter())
  }, [product]);

    // Filtering products by type 
  // = Recommended products
  function productFilter() {
    let array = [];

    for (let prod of allProducts) {
      // Get all products sharing the same product type, excluding
      // the 
      if (prod.type === product.type && prod.id !== product.id) {
        array.push(prod);
      }
    }
    return array;
  }

  /*============================
  Functions
  ============================*/
  function handleChange(event) {
    // To increment, decrement, etc., the value of input:number, 
    // one must first convert its value to an integer 
    if(parseInt(event.target.value) === productsArray.length + 1) {
      let productsArrayCopy = [...productsArray];
      productsArrayCopy.push(product);
      setProductsArray(productsArrayCopy);
    } 
    
    if(parseInt(event.target.value) === productsArray.length - 1) {
      const newArray = productsArray.slice(1)
      setProductsArray(newArray);
    }
  }


  function decreaseProductValue() {
    const newArray = productsArray.slice(1)
    setProductsArray(newArray);
  }

  function increaseProductValue() {
    let productsArrayCopy = [...productsArray];
    productsArrayCopy.push(product);
    setProductsArray(productsArrayCopy);
  }





  /*============================
  Related products
  ============================*/
  const relatedProductElements = filteredProducts
    .filter(product => product.stock > 0) // Only display products in stock
    .map((product, index) => {
      return (
        <ProductCard 
          key={index}
          product_id = {product.id}
          name = {product.name}
          img = {product.img_url}
          alt = {product.alt}
          title = {product.name}
          desc = {product.short_desc}
          price = {product.price}
          item = {product}
          stock = {product.stock}
        />
      );
    });

  /*============================
  JSX
  ============================*/
  return (
    <>
    {/* If the product was filtered with the product filter function, i.e. if the search parameter is present, return to shop and keep the selected filter active. Location.state.search becomes returns undefined if the user navigates to a related product. This value should not be included in the URL, so if location.state.search === "undefined", ignore it and go back to the store without any product filters activated (a solution based on my current understanding react-router-dom). */}
    <Breadcrumb  
      linkText={"Back to the Shop"}
      origin={search && search !== "undefined" ? `../..?${search}` : "../.."} 
    />
   
    
    <main 
      className='product-page site__content page-padding'
    >   
      <div className="product-wrapper">
        <img 
          className={`product__images ${product.stock > 0 && !undefined ? "" : "sold-out"}`}

          src={product.img_url} alt="ipsum loruem" />
        
        
        
        {product.stock === 0 && 
          <span className="product-card__img-banner">Sold out</span>
        }
        
        
        <div className="product__information">
          
          
          <h1 className='information__name'>{product.name}</h1>
          <span className='information__price'>Kr {product.price}</span>
          <p className='information__desc'>{product.desc}</p>

          {width >= 1200 ? 
          /* Desktop */
            (<div className="product__add">
              <input 
                type="number" 
                name="" 
                id=""
                value={productsArray.length} 
                min={1}
                disabled={product.stock > 0 && !undefined ? false: true}
                onChange={(event) => handleChange(event, product)}
              />
              
              <button 
                className= "btn btn--rect" 
                onClick={() => addToCart(productsArray)}
                disabled={product.stock > 0 && !undefined ? false: true}
              >
                {product.stock > 0 ? "Add to cart" : "Sold out!"}
              </button>
            </div>) :

           /* Tablet/Mobile */
            (<div className="product__add--mobile">
              <div className='product__steppers'>
                <button 
                  className='product__stepper'
                  onClick={decreaseProductValue}
                >
                  -
                </button>
                
                <div className='product__quantity--mobile'>
                  {productsArray.length}
                </div>

                <button 
                  className='product__stepper'
                  onClick={increaseProductValue}  
                >
                  +
                </button>
              </div>
              
              <button 
                className= "btn btn--rect" 
                onClick={() => addToCart(productsArray)}
                disabled={product.stock > 0 && !undefined ? false: true}
              >
                {product.stock > 0 ? "Add to cart" : "Sold out!"}
              </button>
            </div>)
          }


        </div>
        <div className="product-page__additional-information">
          <h2>Additional information</h2>
          <p>{product.additional_info}</p>
      </div>
      </div>
      
      <div className="product-page__related-products">
        {filteredProducts.length > 0 && 
          (
            <>
              <h2 className='center'>Related products</h2>
              <Gallery 
                products={relatedProductElements}
              />
            </>
          )
        }
      </div>
    </main>
    </>
  );
};

export default ProductPage;