import api from "./api";
import { Artwork, UploadArtworkData, ApiResponse } from "../types";

interface ArtworksResponse {
  artworks: Artwork[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const artworkService = {
  async getArtworks(
    page: number = 1,
    limit: number = 12
  ): Promise<ArtworksResponse> {
    const response = await api.get<ArtworksResponse>(
      `/api/artworks?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getArtworkById(id: string): Promise<Artwork> {
    const response = await api.get<Artwork>(`/api/artworks/${id}`);
    return response.data;
  },

  async uploadArtwork(artworkData: UploadArtworkData): Promise<Artwork> {
    const formData = new FormData();
    formData.append("title", artworkData.title);
    if (artworkData.description) {
      formData.append("description", artworkData.description);
    }
    formData.append("image", artworkData.image);

    const response = await api.post<Artwork>("/api/artworks/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deleteArtwork(id: string): Promise<void> {
    await api.delete(`/api/artworks/${id}`);
  },

  async updateArtwork(
    id: string,
    data: Partial<UploadArtworkData>
  ): Promise<Artwork> {
    const response = await api.put<Artwork>(`/api/artworks/${id}`, data);
    return response.data;
  },
};
