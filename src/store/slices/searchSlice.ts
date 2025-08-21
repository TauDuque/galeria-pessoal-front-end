import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilters } from "../../types";

interface SearchState {
  filters: SearchFilters;
  searchHistory: string[];
  recentSearches: string[];
}

const initialState: SearchState = {
  filters: {
    query: "",
    department: "",
    period: "",
    culture: "",
    medium: "",
    isPublicDomain: true,
    hasImage: true,
  },
  searchHistory: [],
  recentSearches: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.searchHistory.includes(query)) {
        state.searchHistory.unshift(query);
        // Manter apenas as últimas 10 buscas
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },
    addToRecentSearches: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query);
        // Manter apenas as últimas 5 buscas recentes
        if (state.recentSearches.length > 5) {
          state.recentSearches = state.recentSearches.slice(0, 5);
        }
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
});

export const {
  updateFilters,
  resetFilters,
  addToSearchHistory,
  addToRecentSearches,
  clearSearchHistory,
  clearRecentSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
