import './style.css'
import ListComponent from '../../components/ListComponent';
import VideoPlayer from '../../components/VideoPlayer';

function HomePage() {
  return (
    <div className="app">
      <h1 className="title">Video Player</h1>
      <div className="container">
        <div className="list-wrapper">
          <ListComponent />
        </div>
        <div className="player-wrapper">
          <VideoPlayer />
        </div>
      </div>
    </div>
  )
}

export default HomePage