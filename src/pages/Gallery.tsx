import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchArtworks, resetArtworks } from "../store/slices/artworkSlice";
import { addNotification } from "../store/slices/uiSlice";
import ArtworkGrid from "../components/gallery/ArtworkGrid";
import ArtworkModal from "../components/gallery/ArtworkModal";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const Gallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const { artworks, isLoading, error, hasMore, page } = useAppSelector(
    (state) => state.artworks
  );
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Reset e carregar primeira página
    dispatch(resetArtworks());
    loadArtworks(1);
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(
        addNotification({
          type: "error",
          message: error,
        })
      );
    }
  }, [error, dispatch]);

  const loadArtworks = async (pageNumber: number) => {
    try {
      await dispatch(fetchArtworks({ page: pageNumber, limit: 12 })).unwrap();
    } catch (error) {
      // Error já é tratado no useEffect
    }
  };

  const handleLoadMore = async () => {
    if (hasMore && !isLoading) {
      setIsLoadingMore(true);
      await loadArtworks(page + 1);
      setIsLoadingMore(false);
    }
  };

  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Galeria de <span className="text-gradient">Arte</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra obras incríveis criadas por nossa comunidade de artistas
            talentosos.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Buscar por título, descrição ou artista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{filteredArtworks.length} obras encontradas</span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-primary-500 hover:text-primary-400 transition-colors"
                >
                  Limpar busca
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading inicial */}
        {isLoading && artworks.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-muted-foreground">
                Carregando obras de arte...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Grid de Artworks */}
            {filteredArtworks.length > 0 ? (
              <>
                <ArtworkGrid
                  artworks={filteredArtworks}
                  onArtworkClick={setSelectedArtwork}
                />

                {/* Load More Button */}
                {hasMore && !searchTerm && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="btn-secondary flex items-center space-x-2 mx-auto"
                    >
                      {isLoadingMore ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Carregando...</span>
                        </>
                      ) : (
                        <span>Carregar mais obras</span>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <MagnifyingGlassIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm
                    ? "Nenhuma obra encontrada"
                    : "Nenhuma obra disponível"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm
                    ? "Tente ajustar sua busca ou limpar os filtros."
                    : "Seja o primeiro a compartilhar sua arte!"}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="btn-secondary"
                  >
                    Limpar busca
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Modal de Artwork */}
        {selectedArtwork && (
          <ArtworkModal
            artworkId={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
