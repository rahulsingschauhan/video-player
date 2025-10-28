import React from 'react';
import './style.css';

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
    const { isPlaying, isMuted, volume, progress, duration, currentTime, isFullScreen, playbackRate, onPlayPause, onVolumeChange, onMute, onSeek, onToggleFullScreen, onChangePlaybackRate } = props;

    return (
        <div className="video-controls-container">
            <div className="progress-bar-container">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => onSeek(e.target.value)}
                    className="progress-bar"
                />
            </div>
            <div className="controls-row">
                <div className="left-controls">
                    <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                    <button onClick={onMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => onVolumeChange(e.target.value)}
                        className="volume-slider"
                    />
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div className="right-controls">
                    <select onChange={(e) => onChangePlaybackRate(e.target.value)} value={playbackRate}>
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                    <button onClick={onToggleFullScreen}>{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</button>
                </div>
            </div>
        </div>
    );
};

export default VideoControls;
