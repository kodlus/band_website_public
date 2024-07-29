/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from 'react';
import { getCopyTexts } from '../API/api';
import { useOutletContext } from 'react-router-dom';

/*=====================================================
AboutPage
=====================================================*/
const AboutPage = () => {
  /*==================================
  State
  ==================================*/
  const [copyTexts, setCopyTexts] = useState([]);
  const [error, setError] = useState(false);
  const [setIsLoading] = useOutletContext();

  /*==================================
  Loading copy text
  ==================================*/
  useEffect(() => {
    loadCopyTexts();
  }, []);
 
  async function loadCopyTexts() {
    setIsLoading(true);
    try {
      let data = await getCopyTexts("about");
      setCopyTexts(data.data.copy);
    } catch(error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  /*==================================
  Copywrite text elements
  ==================================*/
  const copyElements = copyTexts?.map((copy, index) => {
    if(copy.img_url) {
      return (
        <p key={index}> 
          <img src={copy.img_url} alt="ipsum" className='float' /> 
          {copy.text} 
        </p>
      ) 
    } else {
      return (
        <p key={index}> 
          {copy.text} 
        </p>
      )
    }
  });

  /*==================================
  JSX
  ==================================*/
  return (
    <main className='about-page site__content page-padding'>
        <div className="about-page__content">
        <h1 className='title title--dark center'>About Blåräv</h1>
          <div className="about-page__copy">
            {copyElements}
          </div>

          <img src="/src/backend/media/images/copy/band_group_shot_1.jpg" alt="#" className='about-page__band-img' />
        </div>
    </main>
  );
};

export default AboutPage;
