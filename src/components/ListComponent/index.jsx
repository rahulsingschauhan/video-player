import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedVideo } from '../../features/videos/videosSlice';
import './style.css';

const ListComponent = () => {
  const videos = useSelector((state) => state.videos.videos);
  const dispatch = useDispatch();

  const handleVideoClick = (video) => {
    dispatch(setSelectedVideo(video));
  };

  return (
    <div className="list-container">
      <h2>Video List</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id} onClick={() => handleVideoClick(video)}>
            {video.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;