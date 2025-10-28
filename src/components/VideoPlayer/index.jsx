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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(video.currentTime);
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
  }, [selectedVideo]);

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

  const handleSeek = (seekTime) => {
    const video = videoRef.current;
    video.currentTime = seekTime;
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
  };

  return (
    <div ref={containerRef} className="video-player-container">
      {selectedVideo ? (
        <>
          <video ref={videoRef} src={selectedVideo.url} className="video-element" />
          <VideoControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            isFullScreen={isFullScreen}
            playbackRate={playbackRate}
            onPlayPause={togglePlay}
            onVolumeChange={handleVolumeChange}
            onMute={toggleMute}
            onSeek={handleSeek}
            onToggleFullScreen={toggleFullScreen}
            onChangePlaybackRate={changePlaybackRate}
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
