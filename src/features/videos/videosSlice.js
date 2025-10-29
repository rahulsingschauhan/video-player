import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const lastSelectedVideo = JSON.parse(localStorage.getItem('lastSelectedVideo'));

const initialState = {
  videos: [],
  selectedVideo: lastSelectedVideo,
  loading: false,
  error: null,
};

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
  const response = await fetch('/videos.json');
  const data = await response.json();
  return data;
});

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
      localStorage.setItem('lastSelectedVideo', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedVideo } = videosSlice.actions;

export default videosSlice.reducer;