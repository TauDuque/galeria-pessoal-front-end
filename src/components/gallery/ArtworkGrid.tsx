import React from "react";
import { MetMuseumArtwork, FavoriteArtwork } from "../../types";
import ArtworkCard from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: (MetMuseumArtwork | FavoriteArtwork)[];
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({ artworks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={String(artwork.id)} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkGrid;
