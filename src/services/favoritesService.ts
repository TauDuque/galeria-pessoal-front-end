import api from "./api";
import { FavoriteArtwork, MetMuseumArtwork } from "../types";

export const favoritesService = {
  async getFavorites(): Promise<{
    artworks: FavoriteArtwork[];
    total: number;
  }> {
    // TODO: Implementar chamada para seu backend
    // const response = await api.get<{ artworks: FavoriteArtwork[]; total: number }>("/api/favorites");
    // return response.data;

    // Mock data para desenvolvimento
    return {
      artworks: [],
      total: 0,
    };
  },

  async addToFavorites(artworkId: string | number): Promise<FavoriteArtwork> {
    // TODO: Implementar chamada para seu backend
    // const response = await api.post<FavoriteArtwork>("/api/favorites", { artworkId });
    // return response.data;

    // Mock data para desenvolvimento
    return {
      id: Date.now().toString(),
      artworkId,
      userId: 1, // TODO: Pegar do estado de auth
      artwork: {
        id: artworkId,
        title: "Mock Artwork",
        artist: "Unknown Artist",
        date: "Unknown Date",
        medium: "Unknown Medium",
        department: "Unknown Department",
      },
      createdAt: new Date().toISOString(),
    };
  },

  async removeFromFavorites(artworkId: string | number): Promise<void> {
    // TODO: Implementar chamada para seu backend
    // await api.delete(`/api/favorites/${artworkId}`);
  },

  async isFavorite(artworkId: string | number): Promise<boolean> {
    // TODO: Implementar verificação no seu backend
    // const response = await api.get<boolean>(`/api/favorites/check/${artworkId}`);
    // return response.data;

    // Mock data para desenvolvimento
    return false;
  },
};
