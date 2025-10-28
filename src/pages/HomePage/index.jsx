import './style.css'
import ListComponent from '../../components/ListComponent';
import VideoPlayer from '../../components/VideoPlayer';

function HomePage() {
  return (
    <div className="app">
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