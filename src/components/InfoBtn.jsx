/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { infoBtnCopy } from '../infoBtnContent.js';

/*=====================================================
InfoBtn
=====================================================*/
// eslint-disable-next-line react/prop-types
const InfoBtn = ({ endOfPage }) => {
  /*=============================
  States, location & useStates
  ==============================*/
  const [isOpen, setIsOpen] = useState(false);
  const [copy, setCopy] = useState("");
  
  const { location } = useContext(ShopContext);

  // Update info if user changes page
  useEffect(() => {
    for (const object of infoBtnCopy) {
      if (object.path === location.pathname) {
        setCopy(object.copy);
        break
      } else {
        setCopy("Oops, this page does not have a copy text yet");
      }
    }
  }, [location]);

  /*=============================
  Functions
  ==============================*/
  function handleClick() {
    for (const object of infoBtnCopy) {
      if (object.path === location.pathname) {
        setCopy(object.copy);
        break
      } else {
        setCopy("Oops, this page does not have a copy text yet");
      }
    }

    setIsOpen(prev => !prev);
  }

  function closeInfoBox() {
      setIsOpen(false)
  }


  /*=============================
  JSX
  ==============================*/
  return (
    <>
      {!isOpen ? 
        (
          <button 
            onClick={handleClick} 
            className={`${endOfPage ? "audio-player-boost" : ""} btn btn--info`}
          >
            Info Btn
          </button>
        ): 
        (
          <div 
            className={`${endOfPage ? "audio-player-boost" : ""} info-box`}
          >
            <div className='info-box__header'>
              <h4>Information</h4>
              
              <button className='btn btn--close' onClick={closeInfoBox}> 
                x 
              </button>
            </div>

            
            <div className='info-box__copy'>
              <p >{copy}</p>
            </div>
          </div>
        )
      }
    </>
    
  )
}

export default InfoBtn;