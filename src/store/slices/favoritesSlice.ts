import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { favoritesService } from "../../services/favoritesService";
import { FavoriteArtwork } from "../../types";

interface UserFavoritesResponse {
  artworks: FavoriteArtwork[];
  total: number;
}

interface FavoritesState {
  items: FavoriteArtwork[];
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  total: 0,
  status: "idle",
  error: null,
};

// Thunks para interagir com a API de favoritos
export const fetchFavorites = createAsyncThunk<UserFavoritesResponse, void>(
  "favorites/fetchFavorites",
  async () => {
    return await favoritesService.getFavorites();
  }
);

export const addToFavorites = createAsyncThunk<
  FavoriteArtwork,
  { artworkId: string | number }
>("favorites/addToFavorites", async ({ artworkId }) => {
  return await favoritesService.addToFavorites(artworkId);
});

export const removeFromFavorites = createAsyncThunk<
  string | number, // Retorna o artworkId da obra removida para fácil remoção do estado
  { artworkId: string | number }
>("favorites/removeFromFavorites", async ({ artworkId }) => {
  await favoritesService.removeFromFavorites(artworkId);
  return artworkId; // Retorna o ID para o reducer
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearFavorites: (state) => {
      state.items = [];
      state.total = 0;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<UserFavoritesResponse>) => {
          state.status = "succeeded";
          state.items = action.payload.artworks;
          state.total = action.payload.total;
        }
      )
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Falha ao buscar favoritos";
      })
      // Add Favorite
      .addCase(
        addToFavorites.fulfilled,
        (state, action: PayloadAction<FavoriteArtwork>) => {
          state.items.push(action.payload);
          state.total += 1;
        }
      )
      // Remove Favorite
      .addCase(
        removeFromFavorites.fulfilled,
        (state, action: PayloadAction<string | number>) => {
          state.items = state.items.filter(
            (item) => item.artworkId !== action.payload
          );
          state.total = Math.max(0, state.total - 1);
        }
      );
  },
});

export const { clearError, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
