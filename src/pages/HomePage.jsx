/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel/Carousel.jsx';
import Event from '../components/Event.jsx';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';
import ProductCard from "../components/ProductCard.jsx";
import { getAllCarouselCards, getAllProducts, getCopyTexts, getOneEvent } from '../API/api.js';

/*=====================================================
HomePage
=====================================================*/
const HomePage = () => {
  /*==================================
  States and useEffect
  ==================================*/
  const [products, setProducts] = useState([]);
  const [carouselCards, setCarouselCards] = useState([]);
  const [copyTexts, setCopyTexts] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [setIsLoading] = useOutletContext();
  const [eventDate, setEventDate] = useState()

  /*==================================
  Load data from server
  ==================================*/
  useEffect(() => {
    loadCarouselCards();
    loadCurrentEvent();
    loadProducts();
    loadCopywrite();
  }, []);

  async function loadCarouselCards() {
    setIsLoading(true);
    try {
      const carouselCards = await getAllCarouselCards();
      setCarouselCards(carouselCards.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadCurrentEvent() {
    try {
      const data = await getOneEvent(1);
      setEventDate(data.data);
    } catch (error) {
      setError(error);
    }
  }

  async function loadProducts() {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      setError(error);
    }
  }

  async function loadCopywrite() {
    try {
      let data = await getCopyTexts("home");
      setCopyTexts(data.data.copy);
    } catch(error) {
      setError(error);
    } 
  }

  /*==================================
  Randomizing and limiting number of
  displayed products
  ==================================*/
  // Randomizing the products [1]
  function shuffleProducts(array) {
    let currentIndex = array.length, randomIndex;
    
    // Continue as long as there remain elements to shuffle
    while (currentIndex > 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  
  // Creates a nice variation of products to display
  const randomizedProducts = shuffleProducts(products);

  // Only show products currently in stock with the filter method,
  // and displaying a limited number of randomized products (5 in this case).
  const homePageProducts = randomizedProducts
    .filter(product => product.stock > 1)
    .slice(0, 5);

  /*==================================
  Gallery elements
  ==================================*/
  const galleryElements = homePageProducts.map((product, index) => {
    return (
      <ProductCard 
        key={index}
        product_id = {product._id}
        name = {product.name}
        img = {product.img_url}
        alt = {product.img_alt}
        title = {product.name}
        desc = {product.short_desc}
        price = {product.price}
        item = {product}
        stock = {product.stock}
        searchParams={searchParams}
      />
    );
  });

  /*==================================
  Text copy elements
  ==================================*/
  const copyElements = copyTexts.map((copy, index) => {    
    return <p key={index}>
      {copy.text} 
      {copy.link &&  <Link to={copy.link} className='link link--dark-accent'>{copy.link_text}</Link>}.
    </p>
  });
 
  /*==================================
  JSX
  ==================================*/
  return (    
    <main className='home-page site__content'>
      <section className='hero'>
        <Carousel 
          cards = {carouselCards} 
        />
      </section>

      <section className='next-event'>
        <h2>Next tour date</h2>
        <Event 
          city = {eventDate?.city}
          location = {eventDate?.location}
          date = {eventDate?.date}
          link= {eventDate?.link}
        />
        <Link className='link link--dark-accent' to={"tour-dates"}>
          See complete touring schedule
        </Link>
      </section>

      <section className='merch-sample'>
        <h2>Merch</h2>
        
        <Gallery products = {galleryElements}/>

        <Link to={"shop"} className='link link--light-accent'>
          More merch
        </Link>
      </section>

      <section className='about'>
        <h2>About Blåräv</h2>
        <div className='about-wrapper'>
          <div className='about__copy'>
              {copyElements } 
          </div>
          <img src={"/src/backend/media/images/copy/band_group_shot_2.jpg"} alt="lorem ipsum" className='about__image'/>
        </div>
      </section>
    </main>
  );
};

export default HomePage;