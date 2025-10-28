import React from 'react';
import './style.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCog } from 'react-icons/fa';

const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
};

const VideoControls = (props) => {
    const {
        isPlaying, isMuted, volume, progress, duration, currentTime, isFullScreen, playbackRate,
        volumeSliderVisible, playbackRateMenuVisible, onPlayPause, onVolumeChange, onMute,
        onToggleFullScreen, onChangePlaybackRate, onToggleVolumeSlider, onTogglePlaybackRateMenu,
        onSeekMouseDown, onSeekChange, onSeekMouseUp
    } = props;

    return (
        <div className="video-controls-container">
            <div className="progress-bar-container">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onMouseDown={onSeekMouseDown}
                    onChange={onSeekChange}
                    onMouseUp={onSeekMouseUp}
                    className="progress-bar"
                    style={{ background: `linear-gradient(to right, var(--accent-primary) ${progress}%, #555 ${progress}%)` }}
                />
            </div>
            <div className="controls-row">
                <div className="left-controls">
                    <button onClick={onPlayPause} className="control-button">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <div className="volume-control">
                        <button onClick={onMute} className="control-button">
                            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => onVolumeChange(e.target.value)}
                            className="volume-slider"
                        />
                    </div>
                    <span className="time-display">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div className="right-controls">
                    <div className="playback-rate-control">
                        <button onClick={onTogglePlaybackRateMenu} className="control-button">
                            <FaCog />
                        </button>
                        {playbackRateMenuVisible && (
                            <div className="playback-rate-menu">
                                {[0.5, 1, 1.5, 2].map(rate => (
                                    <button
                                        key={rate}
                                        onClick={() => onChangePlaybackRate(rate)}
                                        className={playbackRate === rate ? 'active' : ''}
                                    >
                                        {rate}x
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={onToggleFullScreen} className="control-button">
                        <FaExpand />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoControls;
