import React from "react";
import { useNavigate } from "react-router-dom";
import { MetMuseumArtwork, FavoriteArtwork } from "../../types";
import FavoriteButton from "./FavoriteButton";

interface ArtworkCardProps {
  artwork: MetMuseumArtwork | FavoriteArtwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const navigate = useNavigate();

  // Validação de segurança
  if (!artwork) {
    console.error("ArtworkCard recebeu artwork null/undefined");
    return null;
  }

  // Normaliza os dados para exibição baseado no tipo
  let title: string;
  let artist: string;
  let imageUrl: string;
  let date: string;
  let metId: string | number; // ID correto para favoritos

  if ("artwork" in artwork) {
    // É um FavoriteArtwork
    if (!artwork.artwork) {
      console.error("FavoriteArtwork com artwork null:", artwork);
      return null;
    }
    title = artwork.artwork.title || "Título não disponível";
    artist = artwork.artwork.artist || "Artista desconhecido";
    imageUrl =
      artwork.artwork.imageUrl ||
      "https://via.placeholder.com/400x300.png?text=Sem+Imagem";
    date = artwork.artwork.date || "Data desconhecida";
    metId = artwork.artworkId; // Usar artworkId do favorito
  } else {
    // É um MetMuseumArtwork
    title = artwork.title || "Título não disponível";
    artist = artwork.artist || "Artista desconhecido";
    imageUrl =
      artwork.imageUrl ||
      "https://via.placeholder.com/400x300.png?text=Sem+Imagem";
    date = artwork.date || "Data desconhecida";
    metId = artwork.id; // Usar id da obra do Met
  }

  const handleCardClick = () => {
    navigate(`/artwork/${metId}`);
  };

  return (
    <div
      className="card group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-glow"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://via.placeholder.com/400x300.png?text=Erro+na+Imagem";
          }}
        />

        {/* Favorite Button */}
        <div
          className="absolute top-2 right-2"
          onClick={(e) => e.stopPropagation()}
        >
          <FavoriteButton artworkId={metId} />
        </div>

        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {title}
        </h3>

        {artist && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            por {artist}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <span className="truncate max-w-20">{artist || "Artista"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
