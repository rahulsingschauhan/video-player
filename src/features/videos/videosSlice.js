import { createSlice } from '@reduxjs/toolkit';

const lastSelectedVideo = JSON.parse(localStorage.getItem('lastSelectedVideo'));

const initialState = {
  videos: [
    { id: 1, title: 'Video 1', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 2, title: 'Video 2', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { id: 3, title: 'Video 3', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  ],
  selectedVideo: lastSelectedVideo,
  loading: false,
  error: null,
};

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
      localStorage.setItem('lastSelectedVideo', JSON.stringify(action.payload));
    },
  },
});

export const { setSelectedVideo } = videosSlice.actions;

export default videosSlice.reducer;