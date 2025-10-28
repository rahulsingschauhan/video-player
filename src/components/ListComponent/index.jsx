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

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Video List</h2>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <ul>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <li
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className={`video-item ${selectedVideo && selectedVideo.id === video.id ? 'selected' : ''}`}>
              <div className="video-info">
                <span className="video-title">{video.title}</span>
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