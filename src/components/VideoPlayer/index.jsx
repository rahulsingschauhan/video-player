import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import VideoControls from '../VideoControls';
import './style.css';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { selectedVideo } = useSelector(state => state.videos);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [volumeSliderVisible, setVolumeSliderVisible] = useState(false);
  const [playbackRateMenuVisible, setPlaybackRateMenuVisible] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [playingBeforeSeek, setPlayingBeforeSeek] = useState(false);
  const clickTimeout = useRef(null);

  let controlsTimeout;

  const showControls = () => {
    setControlsVisible(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (!playbackRateMenuVisible) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  const hideControls = () => {
    if (!playbackRateMenuVisible) {
      clearTimeout(controlsTimeout);
      setControlsVisible(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!seeking) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
    };

    const setVideoDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setIsMuted(video.muted);
      setVolume(video.volume);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [selectedVideo, seeking]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVolumeChange = (newVolume) => {
    const video = videoRef.current;
    video.volume = newVolume;
    video.muted = newVolume === 0;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
  };

  const handleSeekMouseDown = () => {
    setPlayingBeforeSeek(isPlaying);
    if (isPlaying) {
      videoRef.current.pause();
    }
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      setProgress((time / videoRef.current.duration) * 100);
    }
  };

  const handleSeekMouseUp = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setSeeking(false);
    if (playingBeforeSeek) {
      videoRef.current.play();
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const changePlaybackRate = (rate) => {
    const video = videoRef.current;
    video.playbackRate = rate;
    setPlaybackRate(rate);
    setPlaybackRateMenuVisible(false);
  };

  const toggleVolumeSlider = () => {
    setVolumeSliderVisible(!volumeSliderVisible);
  };

  const togglePlaybackRateMenu = () => {
    setPlaybackRateMenuVisible(!playbackRateMenuVisible);
  };

  const handleVideoClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      toggleFullScreen();
    } else {
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 200);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`video-player-container ${!controlsVisible ? 'hide-controls' : ''}`}
      onMouseMove={showControls}
      onMouseLeave={hideControls}
    >
      {selectedVideo ? (
        <>
          <video
            ref={videoRef}
            src={selectedVideo.url}
            className="video-element"
            onClick={handleVideoClick}
          />
          <VideoControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            isFullScreen={isFullScreen}
            playbackRate={playbackRate}
            volumeSliderVisible={volumeSliderVisible}
            playbackRateMenuVisible={playbackRateMenuVisible}
            onPlayPause={togglePlay}
            onVolumeChange={handleVolumeChange}
            onMute={toggleMute}
            onToggleFullScreen={toggleFullScreen}
            onChangePlaybackRate={changePlaybackRate}
            onToggleVolumeSlider={toggleVolumeSlider}
            onTogglePlaybackRateMenu={togglePlaybackRateMenu}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekChange={handleSeekChange}
            onSeekMouseUp={handleSeekMouseUp}
          />
        </>
      ) : (
        <div className="no-video-selected">
          <p>Select a video to play</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
