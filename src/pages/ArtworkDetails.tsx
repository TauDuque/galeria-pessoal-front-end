import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  PaintBrushIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/slices/favoritesSlice";
import { addNotification } from "../store/slices/uiSlice";
import { artworkService } from "../services/artworkService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { MetMuseumArtwork } from "../types";

const ArtworkDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: favoriteItems } = useAppSelector((state) => state.favorites);

  const [artwork, setArtwork] = useState<MetMuseumArtwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = favoriteItems.some(
    (item) => item.artworkId === Number(id)
  );

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const details = await artworkService.getArtworkById(id);
        setArtwork(details);
      } catch (err) {
        setError("Erro ao carregar detalhes da obra");
        console.error("Erro ao buscar obra:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworkDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      dispatch(
        addNotification({
          type: "error",
          message: "Você precisa estar logado para favoritar obras.",
        })
      );
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites({ artworkId: Number(id) }))
        .unwrap()
        .then(() => {
          dispatch(
            addNotification({
              type: "success",
              message: "Obra removida dos favoritos!",
            })
          );
        })
        .catch((err) => {
          dispatch(
            addNotification({
              type: "error",
              message: `Erro ao remover dos favoritos: ${err.message}`,
            })
          );
        });
    } else {
      dispatch(addToFavorites({ artworkId: Number(id) }))
        .unwrap()
        .then(() => {
          dispatch(
            addNotification({
              type: "success",
              message: "Obra adicionada aos favoritos!",
            })
          );
        })
        .catch((err) => {
          dispatch(
            addNotification({
              type: "error",
              message: `Erro ao adicionar aos favoritos: ${err.message}`,
            })
          );
        });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao carregar obra
          </h2>
          <p className="text-muted-foreground mb-6">
            {error || "Obra não encontrada"}
          </p>
          <button onClick={handleGoBack} className="btn-primary">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Voltar</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={handleToggleFavorite}
                className="p-3 bg-white/80 hover:bg-white rounded-full text-red-500 hover:text-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label={
                  isFavorite
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-6 h-6" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagem da Obra */}
          <div className="space-y-6">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden shadow-lg">
              {artwork.imageUrl ? (
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/600x600.png?text=Imagem+não+disponível";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span>Imagem não disponível</span>
                </div>
              )}
            </div>

            {/* Informações básicas */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {artwork.title}
              </h1>

              {artwork.artist && (
                <div className="flex items-center gap-2 text-lg text-muted-foreground">
                  <UserIcon className="w-5 h-5" />
                  <span>por {artwork.artist}</span>
                </div>
              )}

              {artwork.date && artwork.date !== "Data desconhecida" && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{artwork.date}</span>
                </div>
              )}
            </div>
          </div>

          {/* Detalhes da Obra */}
          <div className="space-y-8">
            {/* Informações técnicas */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-2">
                Detalhes da Obra
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {artwork.medium && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <PaintBrushIcon className="w-4 h-4" />
                      <span>Técnica</span>
                    </div>
                    <p className="text-foreground">{artwork.medium}</p>
                  </div>
                )}

                {artwork.dimensions && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <span>📏</span>
                      <span>Dimensões</span>
                    </div>
                    <p className="text-foreground">{artwork.dimensions}</p>
                  </div>
                )}

                {artwork.department && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <BuildingOfficeIcon className="w-4 h-4" />
                      <span>Departamento</span>
                    </div>
                    <p className="text-foreground">{artwork.department}</p>
                  </div>
                )}

                {artwork.culture && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <span>🌍</span>
                      <span>Cultura</span>
                    </div>
                    <p className="text-foreground">{artwork.culture}</p>
                  </div>
                )}

                {artwork.period && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <span>⏰</span>
                      <span>Período</span>
                    </div>
                    <p className="text-foreground">{artwork.period}</p>
                  </div>
                )}

                {artwork.isPublicDomain !== undefined && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <span>📜</span>
                      <span>Domínio Público</span>
                    </div>
                    <p className="text-foreground">
                      {artwork.isPublicDomain ? "Sim" : "Não"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Links externos */}
            {artwork.objectURL && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Mais Informações</h3>
                <a
                  href={artwork.objectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 underline"
                >
                  Ver no Metropolitan Museum of Art
                  <span className="text-sm">↗</span>
                </a>
              </div>
            )}

            {/* Ações */}
            <div className="pt-6 border-t">
              <button onClick={handleGoBack} className="btn-secondary w-full">
                Voltar para a Galeria
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailsPage;
