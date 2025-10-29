import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedVideo } from '../../features/videos/videosSlice';
import './style.css';

const ListComponent = () => {
  const { videos, selectedVideo } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleVideoClick = (video) => {
    dispatch(setSelectedVideo(video));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Video Playlist</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-search-btn">
              &#x2715;
            </button>
          )}
        </div>
      </div>
      <ul className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <li
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className={`video-item ${
                selectedVideo && selectedVideo.id === video.id ? 'selected' : ''
              }`}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <span className="video-title">{video.title}</span>
                <p className="video-description">{video.description}</p>
                <span className="video-duration">{video.duration}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="no-videos-found">No videos found</p>
        )}
      </ul>
    </div>
  );
};

export default ListComponent;