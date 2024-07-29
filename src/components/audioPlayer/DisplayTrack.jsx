/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useRef } from 'react';

/*=====================================================
Display track
=====================================================*/
const DisplayTrack = ({ 
  currentTrack, 
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
  isPlaying,
  trackIndex,
  isLoading
 }) => {
  /*=============================
  Get audio's metadata
  ==============================*/
  function onLoadedMetadata() {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }


  /*=============================
  Styling the song title
  ==============================*/
  // Reference the song title
  const trackNameRef = useRef(0);
  const trackLength = trackNameRef.current.offsetWidth;

  // Dynamically change the css-variable "--trackLength" value. The value
  // is used to determine the scroll animation's translateX calculation
  document.documentElement.style.setProperty(
    "--trackLength", `${trackLength}px`);

  // Dynamically change the css-variable "--timeLength" value. The value
  // is for making the scroll animation's speed the same, regardless of
  // the length of the track title
  const timePerCharacter = 400;
  
  document.documentElement.style.setProperty(
    "--timeLength", `${timePerCharacter * currentTrack?.title.length}ms`);

  /*=============================
  JSX
  ==============================*/
  return (
    <div className={`
      display-track ${isPlaying  ? "play" : ""}
      ${currentTrack?.title.length > 15 ? "start": ""}
      `}
    >
      <audio 
        src={currentTrack?.src} 
        ref={audioRef} 
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />

      <div className="display-track__info" ref={trackNameRef}>
        <p   
          className={`display-track__title ${currentTrack?.title.length > 11 ? "scroll": ""}`}
        >
          {isLoading ? "Loading" : 
          <>
            <span>{trackIndex + 1}:</span> {currentTrack?.title}
          </>
          }
        </p>
      </div>
    </div>
  );
};

export default DisplayTrack;