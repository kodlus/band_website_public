/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

/*=====================================================
Controls
=====================================================*/
const Controls = ({ 
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
  isPlaying,
  setIsPlaying
}) => {
  /*=============================
  States
  ==============================*/

  /*=============================
  Playing/Pausing audio
  ==============================*/
  useEffect(() => {
    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef])


  /*=============================
  Switching between play/pause
  ==============================*/
  function togglePlayPause() {
    setIsPlaying(prev => !prev)
  }

  /*=============================
  Animating the progress bar
  ==============================*/
  const playAnimationRef = useRef(null);

  // memoize
  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  /*=============================
  Skipping time on current track
  ==============================*/
  function skipForward() {
    audioRef.current.currentTime += 15;
  }

  function skipBackward() {
    audioRef.current.currentTime -= 15;
  }

  /*=============================
  Change to next and previous track
  ==============================*/
  function handlePrevious() {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  }

  /*=============================
  JSX
  ==============================*/
  return (
    <div className="controls-wrapper">
      <div className="controls">
        {/* Previous track */}
        <button className='btn--audio' onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        
        {/* Play */}
        <button 
          className={`btn--audio ${isPlaying ? 
            "play--active" : "play--pause"}`} 
          onClick={togglePlayPause}
        >
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>

        {/* Next track */}
        <button className='btn--audio' onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
    </div>
  );
};

export default Controls;