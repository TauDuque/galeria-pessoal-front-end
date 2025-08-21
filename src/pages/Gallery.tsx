import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchArtworks, resetArtworks } from "../store/slices/artworkSlice";
import { artworkService } from "../services/artworkService";
import ArtworkGrid from "../components/gallery/ArtworkGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Gallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const { artworks, status, error } = useAppSelector((state) => state.artworks);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [classicArtworks, setClassicArtworks] = useState<any[]>([]);
  const [loadingClassics, setLoadingClassics] = useState(false);

  // Carregar obras clássicas automaticamente quando a página carrega
  useEffect(() => {
    const loadClassicArtworks = async () => {
      setLoadingClassics(true);
      try {
        const classics = await artworkService.getClassicArtworks();
        setClassicArtworks(classics);
      } catch (error) {
        console.error("Erro ao carregar obras clássicas:", error);
      } finally {
        setLoadingClassics(false);
      }
    };

    loadClassicArtworks();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setHasSearched(true);
      dispatch(
        fetchArtworks({
          filters: { query: searchTerm.trim() },
          limit: 20,
        })
      );
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setHasSearched(false);
    dispatch(resetArtworks());
  };

  const handleLoadClassics = async () => {
    setHasSearched(false);
    dispatch(resetArtworks());
    setLoadingClassics(true);
    try {
      const classics = await artworkService.getClassicArtworks();
      setClassicArtworks(classics);
    } catch (error) {
      console.error("Erro ao carregar obras clássicas:", error);
    } finally {
      setLoadingClassics(false);
    }
  };

  // Determinar quais obras exibir
  const displayArtworks = hasSearched ? artworks : classicArtworks;
  const isLoading = hasSearched ? status === "loading" : loadingClassics;
  const hasError = hasSearched ? status === "failed" : false;
  const errorMessage = hasSearched ? error : null;

  return (
    <div className="min-h-screen py-8">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore a <span className="text-gradient">Coleção</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra obras incríveis do Metropolitan Museum of Art
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 justify-center mb-8 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busque por artista (ex: Monet, Rembrandt, Van Gogh...)"
              className="input pl-10 w-full"
            />
          </div>
          <button
            type="submit"
            className="btn-primary px-8 py-3"
            disabled={isLoading || !searchTerm.trim()}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {hasSearched && (
            <button onClick={handleClearSearch} className="btn-secondary">
              Limpar Busca
            </button>
          )}
          <button
            onClick={handleLoadClassics}
            className="btn-secondary flex items-center justify-center space-x-2"
            disabled={isLoading}
          >
            <SparklesIcon className="w-4 h-4" />
            <span>Ver Obras Clássicas</span>
          </button>
        </div>

        {/* Content */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-muted-foreground">
                {hasSearched
                  ? "Buscando obras de arte..."
                  : "Carregando obras clássicas..."}
              </p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlassIcon className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-red-600">
              Erro na busca
            </h3>
            <p className="text-muted-foreground mb-6">{errorMessage}</p>
            <button onClick={handleLoadClassics} className="btn-secondary">
              Tentar novamente
            </button>
          </div>
        )}

        {!isLoading &&
          !hasError &&
          displayArtworks.length === 0 &&
          hasSearched && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Nenhuma obra encontrada
              </h3>
              <p className="text-muted-foreground mb-6">
                Tente outro termo de busca ou artista.
              </p>
              <button onClick={handleLoadClassics} className="btn-secondary">
                Ver Obras Clássicas
              </button>
            </div>
          )}

        {!isLoading && !hasError && displayArtworks.length > 0 && (
          <>
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground">
                {hasSearched
                  ? `${displayArtworks.length} obra${
                      displayArtworks.length !== 1 ? "s" : ""
                    } encontrada${
                      displayArtworks.length !== 1 ? "s" : ""
                    } para "${searchTerm}"`
                  : `${displayArtworks.length} obra${
                      displayArtworks.length !== 1 ? "s" : ""
                    } clássica${
                      displayArtworks.length !== 1 ? "s" : ""
                    } do Metropolitan Museum`}
              </p>
            </div>
            <ArtworkGrid artworks={displayArtworks} />
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
