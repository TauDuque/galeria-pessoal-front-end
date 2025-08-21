// Configurações de ambiente
export const config = {
  // URLs das APIs
  api: {
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3001",
    timeout: 10000, // 10 segundos
  },

  // Configurações da API externa (Metropolitan Museum)
  externalApi: {
    metmuseum: {
      baseUrl: "https://collectionapi.metmuseum.org/public/collection/v1",
      rateLimit: {
        maxRequests: 1000,
        perHour: true,
      },
    },
  },

  // Configurações da aplicação
  app: {
    name: "ArtGallery",
    version: "1.0.0",
    defaultPageSize: 12,
    maxPageSize: 50,
  },

  // Configurações de cache
  cache: {
    artworks: {
      ttl: 24 * 60 * 60 * 1000, // 24 horas em ms
      maxItems: 100,
    },
    favorites: {
      ttl: 5 * 60 * 1000, // 5 minutos em ms
    },
  },

  // Configurações de UI
  ui: {
    loadingDelay: 300, // ms antes de mostrar loading
    errorRetryDelay: 3000, // ms antes de tentar novamente
    maxRetries: 3,
  },
};

// Função para verificar se estamos em desenvolvimento
export const isDevelopment = process.env.NODE_ENV === "development";

// Função para verificar se estamos em produção
export const isProduction = process.env.NODE_ENV === "production";

// Função para obter a URL da API baseada no ambiente
export const getApiUrl = (endpoint: string = "") => {
  const baseUrl = config.api.baseUrl;
  return `${baseUrl}${endpoint}`;
};

// Função para verificar se o back-end está disponível
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${getApiUrl()}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(config.api.timeout),
    });
    return response.ok;
  } catch (error) {
    console.warn("Back-end não está disponível:", error);
    return false;
  }
};
