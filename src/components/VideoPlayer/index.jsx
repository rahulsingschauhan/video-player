import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

const VideoPlayer = () => {
  const selectedVideo = useSelector((state) => state.videos.selectedVideo);

  return (
    <div className="video-player-container">
      {selectedVideo ? (
        <div>
          <h3>{selectedVideo.title}</h3>
          <video controls src={selectedVideo.url} width="100%"></video>
        </div>
      ) : (
        <div className="no-video-selected">
          <p>Select a video to play</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;