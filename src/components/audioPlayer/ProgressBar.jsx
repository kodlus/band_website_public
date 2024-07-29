/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from "react";

/*=====================================================
ProgressBard
=====================================================*/
const ProgressBar = ({ 
  progressBarRef, 
  audioRef,
  timeProgress,
  duration
}) => {
  /*=============================
  Format audio metadata
  ==============================*/
  function handleProgressChange() {
    audioRef.current.currentTime = progressBarRef.current.value;
  }

  /*=============================
  Format audio metadata
  ==============================*/
  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  }

  /*=============================
  JSX
  ==============================*/
  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input 
        type="range" 
        ref={progressBarRef}
        defaultValue={0}
        onChange={handleProgressChange}
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;