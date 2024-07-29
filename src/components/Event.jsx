/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from "react";
import { Link } from "react-router-dom";

/*=====================================================
Event
=====================================================*/
const Event = ({ date, city, location, link }) => {
  /*=============================
  Function
  ==============================*/
  function handleClick() {
    alert("If this was a real website, you would have been redirected to an external ticket merchant")
  }


  /*=============================
  JSX
  ==============================*/
  return (
    <div className="event">
      <div className="event__info">
        <p className="event__date">{ date }</p>
        <div className="event__location">
          <h3>{city}</h3>
          <p>{location}</p>
        </div>
      </div>
      {/* TODO: Aria label */}
      <Link 
        to={link}className=" btn--event link--reset"
        onClick={handleClick}
      > 
        Get tickets 
      </Link>
    </div>
  );
};

export default Event;