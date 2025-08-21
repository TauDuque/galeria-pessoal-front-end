import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { artworkService } from "../../services/artworkService";
import { MetMuseumArtwork, SearchFilters } from "../../types";

interface ArtworkSearchResponse {
  artworks: MetMuseumArtwork[];
  total: number;
  page: number;
  hasMore: boolean;
}

interface ArtworkState {
  artworks: MetMuseumArtwork[];
  total: number;
  page: number;
  hasMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ArtworkState = {
  artworks: [],
  total: 0,
  page: 1,
  hasMore: true,
  status: "idle",
  error: null,
};

// Async Thunk para buscar obras de arte
export const fetchArtworks = createAsyncThunk<
  ArtworkSearchResponse, // Tipo do valor de retorno em caso de sucesso
  { filters?: SearchFilters; page?: number; limit?: number } // Tipo do argumento que passamos
>("artworks/fetchArtworks", async (params) => {
  const response = await artworkService.searchArtworks(
    params.filters || {},
    params.page || 1,
    params.limit || 12
  );
  return response;
});

const artworkSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetArtworks: (state) => {
      state.artworks = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
    },
    updateFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      // Reset para primeira página quando filtros mudam
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchArtworks.fulfilled,
        (state, action: PayloadAction<ArtworkSearchResponse>) => {
          state.status = "succeeded";
          const { artworks, page, hasMore, total } = action.payload;

          if (page === 1) {
            state.artworks = artworks;
          } else {
            state.artworks = [...state.artworks, ...artworks];
          }

          state.page = page;
          state.hasMore = hasMore;
          state.total = total;
        }
      )
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Falha ao buscar obras de arte";
      });
  },
});

export const { clearError, resetArtworks, updateFilters } =
  artworkSlice.actions;
export default artworkSlice.reducer;
