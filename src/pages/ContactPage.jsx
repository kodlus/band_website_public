/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { getCopyTexts } from "../API/api.js";
import { useOutletContext } from 'react-router-dom';

/*=====================================================
ContactPage
=====================================================*/
const ContactPage = () => {
  /*==================================
  State
  ==================================*/
  const [copyTexts, setCopyTexts] = useState([]);
  const [error, setError] = useState(false);
  const [setIsLoading] = useOutletContext();

  /*==================================
  Loading copywrite text
  ==================================*/
  useEffect(() => {
    loadCopyTexts();
  }, []);
 
  async function loadCopyTexts() {
    setIsLoading(true);
    try {
      let data = await getCopyTexts("contact");
      setCopyTexts(data.data.copy);
    } catch(error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }


  /*==================================
  Copy text elements
  ==================================*/
  const copyElements = copyTexts?.map((copy, index) => {
      return <p key={index}> {copy.text} </p>
    }
  );

  /*==================================
  JSX
  ==================================*/
  return (
    <main className='contact-page site__content page-padding'>
      <div className="contact-page__content">
        <h1 className='title center title--no-margin-bottom title--dark'>
          Book us for a gig or private tutoring!
        </h1>

        <div className='contact-page__copy'> 
          {copyElements}
        </div>

        <br />

        <div className="contact-card">
          <div className='contact-card__email'>
            <p>Contact us via email:</p>
            <a href="mailto:" className='link link--simple'>
              blaaraev@band.com
            </a>
          </div>

          <div className='contact-card__social-media'>
            <p>Or social media:</p>
            <a href="" className='link link--reset'>
              <TiSocialFacebook className='icon--social-media'/>
            </a>
            <a href="" className='link link--reset'>
              <TiSocialInstagram className='icon--social-media'/>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;