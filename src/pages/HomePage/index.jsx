import './style.css'
import { useSelector } from 'react-redux';
import ListComponent from '../../components/ListComponent';
import VideoPlayer from '../../components/VideoPlayer';

function HomePage() {
  const { selectedVideo } = useSelector(state => state.videos);

  return (
    <div className="app">
       <div className="header">
        <h1>Dev-tube</h1>
      </div>
      <div className="container">
        <div className="list-wrapper">
          <ListComponent />
        </div>
        <div className="player-wrapper">
          <VideoPlayer />
            {selectedVideo && (
              <div className="video-details">
                <h2>{selectedVideo.title}</h2>
                <p>{selectedVideo.description}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default HomePage