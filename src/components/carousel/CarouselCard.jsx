/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from 'react';
import { Link } from 'react-router-dom';

/*=====================================================
CarouselCard
=====================================================*/
const CarouselCard = ({ image, alt, routeTo }) => {
  return (
    <Link to={routeTo}> 
       <img className="carousel-card" src={image} alt={alt} />
    </Link>
  );
};

export default CarouselCard;