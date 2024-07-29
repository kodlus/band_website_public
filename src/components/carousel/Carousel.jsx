/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useRef, useState } from 'react';
import CarouselCard from './CarouselCard';

/*=====================================================
Carousel [2][3]

I recommend reading [3] for a comprehensive explanation
about how the carousel main features work
=====================================================*/
const Carousel = ({ cards }) => {
  /*================================
  States, variables, ref
  ================================*/
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(cards?.length);
  const delay = 2500;
  const timeoutRef = useRef(null);

  /*================================
  UseEffects
  ================================*/
  useEffect(() => {
    setLength(cards.length);
  }, [cards]);

  // Autoplay slideshow
  useEffect(()=> {
    resetTimeout();
    timeoutRef.current = 
      setTimeout(() => {
        if (currentIndex === 0) {
          setCurrentIndex(1);
        } else if (currentIndex < (length - 1)) {
          setCurrentIndex(prev => prev + 1)
        } else {
          setCurrentIndex(0);
        } 
    }, delay);

    return () => {
      resetTimeout();
    }
  }, [currentIndex, length])

  /*================================
  Functions
  ================================*/
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function nextSlide() {
    if (currentIndex < (length - 1)) {
      // Move to the next slide
      setCurrentIndex(prev => prev + 1);
    } else {
      // Return to the first slide
      setCurrentIndex(0);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      // Move to the previous slide
      setCurrentIndex(prev => prev - 1);
    } else {
      // Return to the last slide
      setCurrentIndex(length - 1);
    }
  }
  
  // Makes the indicator elements interactive
  function returnToIndex(index) {
    setCurrentIndex(index)
  }

  /*================================
  indicatorElements
  ================================*/
  //TODO: add aria labels
  const indicatorElements = [];
  for (let i = 0; i < length; i++) {
    indicatorElements.push(
      <div 
        key={i} 
        className={
          `carousel__indicator ${
          currentIndex === i ? "active" : ""}` }
        onClick={() => returnToIndex(i)}
        tabIndex={0}
      >
      </div>
    );
  }

  const carouselCards = cards?.map((card, index) => {
    return <CarouselCard 
      key={index}
      image={card.img_url}
      alt={card.img_alt}
      routeTo={card.routeTo}
      text = {card.text}
    />
  });
  
  /*================================
  JSX
  ================================*/
  return (
    <div className='carousel'>
      <div className="carousel-wrapper">
        <button 
          className='btn carousel__btn carousel__btn--left'
          onClick={prevSlide}
        >
            &lt;
        </button>

        <div className="carousel-content-wrapper">
          <div 
            className="carousel__content"
            style={{transform: `translateX(-${currentIndex * 100}%)`}}
          >
            { carouselCards }
          </div>
        </div>

        <button 
          className='btn btn--carousel carousel__btn carousel__btn--right'
          onClick={nextSlide}
        >
            &gt;
        </button>
      </div>

      <div className='carousel__indicators'>
        {indicatorElements}
      </div>

      {/* Each card can have a corresponding text. 
      Though, it is not necessary */}
      <a className='carousel-card__text' href={cards[currentIndex]?.routeTo}>
        <p className='' >{cards[currentIndex]?.text}</p>
      </a>
    </div>
  );
};

export default Carousel;

