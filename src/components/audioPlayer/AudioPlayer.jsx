/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useRef, useState } from 'react';
import DisplayTrack from './DisplayTrack.jsx';
import Controls from './Controls.jsx';
import ProgressBar from './ProgressBar.jsx';
import VolumeControl from './VolumeControl.jsx';
import { getAllSongs } from '../../API/api.js';

/*=====================================================
Audio player [27]
=====================================================*/
const AudioPlayer = ({ endOfPage }) => {
  /*=============================
  States
  ==============================*/
  const [trackIndex, setTrackIndex] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /*=============================
  References
  ==============================*/
  const audioRef = useRef();
  const progressBarRef = useRef();

  function handleNext() {
    if (trackIndex >= tracks?.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  }

  /*=============================
  Load song tracks
  ==============================*/
  useEffect(() => {
    loadTracks();
  }, []);

  async function loadTracks() {
    setIsLoading(true);
    try {
      const songs = await getAllSongs();
      setTracks(songs.data);
      setCurrentTrack(songs.data[trackIndex]);
    } catch(error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  /*=============================
  JSX
  ==============================*/
  return (
    <div className={`audio-player ${endOfPage ? "audio-player-boost" : ""}`}>
      <div className="audio-player__inner">
        <DisplayTrack 
          currentTrack={currentTrack}
          audioRef={audioRef}
          setDuration={setDuration}
          progressBarRef={progressBarRef}
          handleNext={handleNext}
          isPlaying={isPlaying}
          trackIndex={trackIndex}
          isLoading={isLoading}
        />
        
        <Controls 
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          duration={duration}
          setTimeProgress={setTimeProgress}
          tracks={tracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          setCurrentTrack={setCurrentTrack}
          handleNext={handleNext}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />

        <ProgressBar 
          audioRef={audioRef}
          progressBarRef={progressBarRef} 
          timeProgress={timeProgress}
          duration={duration}
        />

        <VolumeControl audioRef={audioRef}/>
      </div>
    </div>
  );
};

export default AudioPlayer;