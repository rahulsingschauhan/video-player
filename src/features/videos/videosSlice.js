import { createSlice } from '@reduxjs/toolkit';

const lastSelectedVideo = JSON.parse(localStorage.getItem('lastSelectedVideo'));

const initialState = {
  videos: [
    { id: 1, title: 'Big Buck Bunny', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg', description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain\'t no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.' },
    { id: 2, title: 'Elephants Dream', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg', description: 'The first Blender Open Movie from 2006' },
    { id: 3, title: 'For Bigger Blazes', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg', description: 'HBO GO now works with Chromecast -- get it...' },
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