import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchFavorites } from "../store/slices/favoritesSlice";
import ArtworkGrid from "../components/gallery/ArtworkGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: favoriteArtworks,
    status,
    error,
  } = useAppSelector((state) => state.favorites);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Busca os favoritos apenas se o estado estiver 'idle' (para evitar buscas repetidas)
    // e se o usuário estiver autenticado.
    if (status === "idle" && isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [status, dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen py-8">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartIcon className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Minha <span className="text-gradient">Coleção</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Suas obras de arte favoritas em um só lugar
          </p>
        </div>

        {/* Content */}
        {status === "loading" && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-muted-foreground">
                Carregando seus favoritos...
              </p>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-red-600">
              Erro ao carregar favoritos
            </h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={() => dispatch(fetchFavorites())}
              className="btn-secondary"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {status === "succeeded" && favoriteArtworks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-muted-foreground mb-6">
              Você ainda não favoritou nenhuma obra de arte.
            </p>
            <Link to="/gallery" className="btn-primary">
              Explorar Galeria
            </Link>
          </div>
        )}

        {status === "succeeded" && favoriteArtworks.length > 0 && (
          <>
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground">
                {favoriteArtworks.length} obra
                {favoriteArtworks.length !== 1 ? "s" : ""} favoritada
                {favoriteArtworks.length !== 1 ? "s" : ""}
              </p>
            </div>
            <ArtworkGrid artworks={favoriteArtworks} />
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
