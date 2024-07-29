/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useRef, useState } from 'react';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';
import useWindowDimensions from '../../customHooks/useWindowDimensions.jsx';

/*=====================================================
Volume control
=====================================================*/
const VolumeControl = ({ audioRef}) => {
  /*=============================
  States
  ==============================*/
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const {width} = useWindowDimensions();

  /*=============================
  Reference
  ==============================*/
  const volumeRef = useRef();

  /*=============================
  Handling clicking outside
  the volume wrapper 
  (for tablets/phones)
  ==============================*/
  useEffect(() => {
    const handleClickOutside = (event) => { 
      if(!volumeRef.current?.contains(event.target) ) {
        setIsHidden(true)
      }
    }

    window.addEventListener("click", handleClickOutside)

    // remove onclick
    return () => window.removeEventListener("click", handleClickOutside)
  }, []);

  /*=============================
  Handling volume change
  ==============================*/
  useEffect(() => {
    if (audioRef.current) {
      // Max volume for audio element is 1,
      // and for the volume state it is 100.
      //Thus, volume is divided by 100
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume])
  
  /*=============================
  JSX
  ==============================*/
  return (
    <div className="volume">
      {/* Desktop */}
      {width > 1200 ? (
        <>
          <button className='btn--audio' onClick={()=> setMuteVolume(prev => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input 
          className='volume-range'
          type="range" 
          min={0} 
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
          />
        </>
      ) : ( /* Tablet and mobile */
        <>
          <button 
            className={`btn--audio ${!isHidden ? "btn--active": ""}`}
            
            onClick={(event)=> {
            // [29]
            event.stopPropagation(); 
            setIsHidden(!isHidden);
          }}>
            {muteVolume || volume < 5 ? (
              <IoMdVolumeOff />
            ) : volume < 40 ? (
              <IoMdVolumeLow />
            ) : (
              <IoMdVolumeHigh />
            )}
          </button>
          
          <div  
            className={`volume-range-wrapper ${isHidden ? "hidden": ""}`}
            ref={volumeRef} 
          >
            <input 
              className='volume-range--mobile'
              type="range" 
              min={0} 
              max={100}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              style={{
                background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
              }} 
            />
          </div>
        </>
      )
    }
   </div>
  );
};

export default VolumeControl;