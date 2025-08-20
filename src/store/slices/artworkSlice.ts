import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArtworkState, Artwork, UploadArtworkData } from "../../types";
import { artworkService } from "../../services/artworkService";

const initialState: ArtworkState = {
  artworks: [],
  currentArtwork: null,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};

// Async Thunks
export const fetchArtworks = createAsyncThunk(
  "artworks/fetchArtworks",
  async (
    { page = 1, limit = 12 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await artworkService.getArtworks(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadArtwork = createAsyncThunk(
  "artworks/uploadArtwork",
  async (artworkData: UploadArtworkData, { rejectWithValue }) => {
    try {
      const response = await artworkService.uploadArtwork(artworkData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArtwork = createAsyncThunk(
  "artworks/deleteArtwork",
  async (id: string, { rejectWithValue }) => {
    try {
      await artworkService.deleteArtwork(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const artworkSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentArtwork: (state, action) => {
      state.currentArtwork = action.payload;
    },
    resetArtworks: (state) => {
      state.artworks = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Artworks
      .addCase(fetchArtworks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.isLoading = false;
        const { artworks, page, hasMore } = action.payload;

        if (page === 1) {
          state.artworks = artworks;
        } else {
          state.artworks = [...state.artworks, ...artworks];
        }

        state.page = page;
        state.hasMore = hasMore;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Upload Artwork
      .addCase(uploadArtwork.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadArtwork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artworks = [action.payload, ...state.artworks];
      })
      .addCase(uploadArtwork.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Artwork
      .addCase(deleteArtwork.fulfilled, (state, action) => {
        state.artworks = state.artworks.filter(
          (artwork) => String(artwork.id) !== action.payload
        );
      });
  },
});

export const { clearError, setCurrentArtwork, resetArtworks } =
  artworkSlice.actions;
export default artworkSlice.reducer;
