import React, { useState } from "react";
import { Artwork } from "../../types";
import { UserIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      className="card group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-glow"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-muted-foreground/20 w-full h-full"></div>
              </div>
            )}
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center text-muted-foreground">
              <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm">Erro ao carregar imagem</p>
            </div>
          </div>
        )}

        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {artwork.title}
        </h3>

        {artwork.description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {artwork.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <UserIcon className="w-4 h-4" />
            <span className="truncate max-w-20">
              {artwork.user?.name || "Artista"}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(artwork.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
