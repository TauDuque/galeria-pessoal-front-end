import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import { deleteArtwork } from "../../store/slices/artworkSlice";
import { addNotification } from "../../store/slices/uiSlice";
import { artworkService } from "../../services/artworkService";
import { Artwork } from "../../types";
import {
  XMarkIcon,
  UserIcon,
  CalendarIcon,
  TrashIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "../common/LoadingSpinner";

interface ArtworkModalProps {
  artworkId: string;
  onClose: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artworkId, onClose }) => {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const artworkData = await artworkService.getArtworkById(artworkId);
        setArtwork(artworkData);
      } catch (error) {
        dispatch(
          addNotification({
            type: "error",
            message: "Erro ao carregar obra de arte",
          })
        );
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId, dispatch, onClose]);

  const handleDelete = async () => {
    if (
      !artwork ||
      !window.confirm("Tem certeza que deseja excluir esta obra?")
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await dispatch(deleteArtwork(String(artwork.id))).unwrap();
      dispatch(
        addNotification({
          type: "success",
          message: "Obra excluída com sucesso!",
        })
      );
      onClose();
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Erro ao excluir obra",
        })
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork?.title,
          text: artwork?.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      dispatch(
        addNotification({
          type: "success",
          message: "Link copiado para a área de transferência!",
        })
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOwner = user && artwork && String(user.id) === String(artwork.userId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden card animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : artwork ? (
          <div className="grid md:grid-cols-2 gap-0 h-full">
            {/* Image */}
            <div className="relative bg-muted">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner size="lg" />
                </div>
              )}
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
                {artwork.description && (
                  <p className="text-muted-foreground">{artwork.description}</p>
                )}
              </div>

              {/* Artist Info */}
              <div className="flex items-center space-x-3 mb-6 p-4 bg-muted rounded-lg">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">
                    {artwork.user?.name || "Artista"}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Publicado em {formatDate(artwork.createdAt)}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleShare}
                    className="btn-ghost flex items-center space-x-2"
                  >
                    <ShareIcon className="w-4 h-4" />
                    <span>Compartilhar</span>
                  </button>

                  <button className="btn-ghost flex items-center space-x-2">
                    <HeartIcon className="w-4 h-4" />
                    <span>Curtir</span>
                  </button>
                </div>

                {isOwner && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="btn-ghost text-red-500 hover:text-red-400 hover:bg-red-500/10 flex items-center space-x-2"
                  >
                    {isDeleting ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <TrashIcon className="w-4 h-4" />
                    )}
                    <span>Excluir</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArtworkModal;
