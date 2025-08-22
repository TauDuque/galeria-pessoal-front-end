import api from "./api";
import { FavoriteArtwork, MetMuseumArtwork } from "../types";

export const favoritesService = {
  async getFavorites(): Promise<{
    artworks: FavoriteArtwork[];
    total: number;
  }> {
    const response = await api.get<{ items: any[]; total: number }>(
      "/api/favorites"
    );

    // Mapear a resposta do back-end para o formato esperado pelo front-end
    const mappedArtworks = response.data.items
      .filter((item) => item.artwork) // Filtrar apenas itens com artwork válido
      .map((item) => ({
        id: item.id.toString(),
        artworkId: item.artworkId, // Usar artworkId do backend (que é o metId)
        userId: item.userId,
        artwork: item.artwork as MetMuseumArtwork, // Garantir que artwork seja válido
        createdAt: item.createdAt,
      }));

    return {
      artworks: mappedArtworks,
      total: response.data.total,
    };
  },

  async addToFavorites(artworkId: string | number): Promise<FavoriteArtwork> {
    const response = await api.post<any>("/api/favorites", {
      metId: artworkId,
    });

    // Validar se a resposta tem artwork válido
    if (!response.data.artwork) {
      throw new Error("Resposta da API não contém dados da obra");
    }

    // Mapear a resposta para o formato esperado
    const mappedFavorite = {
      id: response.data.id.toString(),
      artworkId: response.data.artworkId, // Usar artworkId do backend
      userId: response.data.userId,
      artwork: response.data.artwork as MetMuseumArtwork,
      createdAt: response.data.createdAt,
    };

    return mappedFavorite;
  },

  async removeFromFavorites(artworkId: string | number): Promise<void> {
    // Buscar favoritos para encontrar o ID do registro
    const favorites = await this.getFavorites();

    // Converter para número para comparação consistente
    const targetArtworkId =
      typeof artworkId === "string" ? parseInt(artworkId, 10) : artworkId;

    const favorite = favorites.artworks.find((item) => {
      const itemArtworkId =
        typeof item.artworkId === "string"
          ? parseInt(item.artworkId, 10)
          : item.artworkId;
      return itemArtworkId === targetArtworkId;
    });

    if (favorite) {
      await api.delete(`/api/favorites/${favorite.id}`);
    } else {
      throw new Error("Favorito não encontrado");
    }
  },

  async isFavorite(artworkId: string | number): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      const targetArtworkId =
        typeof artworkId === "string" ? parseInt(artworkId, 10) : artworkId;

      return favorites.artworks.some((item) => {
        const itemArtworkId =
          typeof item.artworkId === "string"
            ? parseInt(item.artworkId, 10)
            : item.artworkId;
        return itemArtworkId === targetArtworkId;
      });
    } catch (error) {
      console.error("Erro ao verificar se é favorito:", error);
      return false;
    }
  },
};
