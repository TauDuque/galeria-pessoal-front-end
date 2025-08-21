import api from "./api";
import { MetMuseumArtwork, SearchFilters } from "../types";
import { fallbackService, shouldUseFallback } from "./fallbackService";
import { checkBackendHealth } from "../config/environment";

interface ArtworksResponse {
  artworks: MetMuseumArtwork[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const artworkService = {
  async getArtworks(
    page: number = 1,
    limit: number = 12,
    filters?: SearchFilters
  ): Promise<ArtworksResponse> {
    try {
      // Verificar se deve usar fallback
      if (shouldUseFallback()) {
        return fallbackService.getArtworks(page, limit, filters);
      }

      // Verificar se o back-end está disponível
      const isBackendAvailable = await checkBackendHealth();
      if (!isBackendAvailable) {
        console.warn("Back-end não disponível, usando fallback");
        return fallbackService.getArtworks(page, limit, filters);
      }

      const response = await api.get<ArtworksResponse>(
        `/api/artworks?page=${page}&limit=${limit}${
          filters ? `&filters=${JSON.stringify(filters)}` : ""
        }`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar obras:", error);

      // Em caso de erro, tentar usar fallback
      if (!shouldUseFallback()) {
        console.warn("Tentando usar fallback devido ao erro");
        return fallbackService.getArtworks(page, limit, filters);
      }

      return { artworks: [], total: 0, page, hasMore: false };
    }
  },

  async getArtworkById(id: string): Promise<MetMuseumArtwork> {
    try {
      // Verificar se deve usar fallback
      if (shouldUseFallback()) {
        return fallbackService.getArtworkById(id);
      }

      // Verificar se o back-end está disponível
      const isBackendAvailable = await checkBackendHealth();
      if (!isBackendAvailable) {
        console.warn("Back-end não disponível, usando fallback");
        return fallbackService.getArtworkById(id);
      }

      const response = await api.get<MetMuseumArtwork>(`/api/artworks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar obra ${id}:`, error);

      // Em caso de erro, tentar usar fallback
      if (!shouldUseFallback()) {
        console.warn("Tentando usar fallback devido ao erro");
        return fallbackService.getArtworkById(id);
      }

      return {
        id,
        title: "Erro ao carregar obra",
        artist: "Artista desconhecido",
        date: "Data não disponível",
        medium: "Meio não disponível",
        department: "Departamento não disponível",
      };
    }
  },

  async searchArtworks(
    filters: SearchFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<ArtworksResponse> {
    try {
      // Verificar se deve usar fallback
      if (shouldUseFallback()) {
        return fallbackService.searchArtworks(filters, page, limit);
      }

      // Verificar se o back-end está disponível
      const isBackendAvailable = await checkBackendHealth();
      if (!isBackendAvailable) {
        console.warn("Back-end não disponível, usando fallback");
        return fallbackService.searchArtworks(filters, page, limit);
      }

      const response = await api.post<ArtworksResponse>(
        `/api/artworks/search`,
        { filters, page, limit }
      );
      return response.data;
    } catch (error) {
      console.error("Erro na busca:", error);

      // Em caso de erro, tentar usar fallback
      if (!shouldUseFallback()) {
        console.warn("Tentando usar fallback devido ao erro");
        return fallbackService.searchArtworks(filters, page, limit);
      }

      return { artworks: [], total: 0, page, hasMore: false };
    }
  },

  // Método para carregar obras clássicas do back-end
  async getClassicArtworks(): Promise<MetMuseumArtwork[]> {
    try {
      // Verificar se deve usar fallback
      if (shouldUseFallback()) {
        return fallbackService.getClassicArtworks();
      }

      // Verificar se o back-end está disponível
      const isBackendAvailable = await checkBackendHealth();
      if (!isBackendAvailable) {
        console.warn("Back-end não disponível, usando fallback");
        return fallbackService.getClassicArtworks();
      }

      const response = await api.get<MetMuseumArtwork[]>(
        "/api/artworks/classics"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar obras clássicas:", error);

      // Em caso de erro, tentar usar fallback
      if (!shouldUseFallback()) {
        console.warn("Tentando usar fallback devido ao erro");
        return fallbackService.getClassicArtworks();
      }

      return [];
    }
  },
};
