import { MetMuseumArtwork, SearchFilters } from "../types";
import { config } from "../config/environment";

// Dados de fallback para desenvolvimento quando o back-end não estiver disponível
const FALLBACK_ARTWORKS: MetMuseumArtwork[] = [
  {
    id: "436535",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    date: "1889",
    medium: "Oil on canvas",
    department: "European Paintings",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1500.jpg",
    dimensions: "73.7 x 92.1 cm",
    culture: "Dutch",
    period: "19th century",
    isPublicDomain: true,
  },
  {
    id: "436105",
    title: "Self-Portrait with a Straw Hat",
    artist: "Vincent van Gogh",
    date: "1887",
    medium: "Oil on canvas",
    department: "European Paintings",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1500.jpg",
    dimensions: "40.6 x 31.8 cm",
    culture: "Dutch",
    period: "19th century",
    isPublicDomain: true,
  },
  {
    id: "437024",
    title: "Wheat Field with Cypresses",
    artist: "Vincent van Gogh",
    date: "1889",
    medium: "Oil on canvas",
    department: "European Paintings",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1500.jpg",
    dimensions: "73.2 x 93.4 cm",
    culture: "Dutch",
    period: "19th century",
    isPublicDomain: true,
  },
  {
    id: "436533",
    title: "Irises",
    artist: "Vincent van Gogh",
    date: "1890",
    medium: "Oil on canvas",
    department: "European Paintings",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1500.jpg",
    dimensions: "92.7 x 73.9 cm",
    culture: "Dutch",
    period: "19th century",
    isPublicDomain: true,
  },
  {
    id: "436534",
    title: "Cypresses",
    artist: "Vincent van Gogh",
    date: "1889",
    medium: "Oil on canvas",
    department: "European Paintings",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1500.jpg",
    dimensions: "93.4 x 74.2 cm",
    culture: "Dutch",
    period: "19th century",
    isPublicDomain: true,
  },
  {
    id: "436536",
    title: "Olive Trees",
    artist: "Vincent van Gogh",
    date: "1889",
    medium: "Oil on canvas",
    department: "European Paintings",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1500.jpg",
    dimensions: "72.6 x 91.4 cm",
    culture: "Dutch",
    period: "19th century",
    isPublicDomain: true,
  },
];

interface ArtworksResponse {
  artworks: MetMuseumArtwork[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const fallbackService = {
  // Simular busca de obras
  async searchArtworks(
    filters: SearchFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<ArtworksResponse> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredArtworks = [...FALLBACK_ARTWORKS];

    // Aplicar filtros básicos
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredArtworks = filteredArtworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query) ||
          (artwork.artist && artwork.artist.toLowerCase().includes(query))
      );
    }

    // Paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArtworks = filteredArtworks.slice(startIndex, endIndex);

    return {
      artworks: paginatedArtworks,
      total: filteredArtworks.length,
      page,
      hasMore: endIndex < filteredArtworks.length,
    };
  },

  // Simular busca de obras clássicas
  async getClassicArtworks(): Promise<MetMuseumArtwork[]> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Retornar obras aleatórias do fallback
    const shuffled = [...FALLBACK_ARTWORKS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  },

  // Simular busca de obra por ID
  async getArtworkById(id: string): Promise<MetMuseumArtwork> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 200));

    const artwork = FALLBACK_ARTWORKS.find((art) => art.id === id);
    if (artwork) {
      return artwork;
    }

    throw new Error(`Obra com ID ${id} não encontrada`);
  },

  // Simular busca geral de obras
  async getArtworks(
    page: number = 1,
    limit: number = 12,
    filters?: SearchFilters
  ): Promise<ArtworksResponse> {
    if (filters && Object.keys(filters).length > 0) {
      return this.searchArtworks(filters, page, limit);
    }

    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 400));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArtworks = FALLBACK_ARTWORKS.slice(startIndex, endIndex);

    return {
      artworks: paginatedArtworks,
      total: FALLBACK_ARTWORKS.length,
      page,
      hasMore: endIndex < FALLBACK_ARTWORKS.length,
    };
  },
};

// Função para determinar se deve usar o fallback
export const shouldUseFallback = (): boolean => {
  // Em desenvolvimento, sempre usar fallback se configurado
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_USE_FALLBACK === "true";
  }

  // Em produção, nunca usar fallback
  return false;
};
