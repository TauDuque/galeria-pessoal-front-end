import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/favoritesSlice";
import { addNotification } from "../../store/slices/uiSlice";

interface FavoriteButtonProps {
  artworkId: string | number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ artworkId }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: favoriteItems } = useAppSelector((state) => state.favorites);

  const isFavorite = favoriteItems.some((item) => item.artworkId === artworkId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o clique no botão propague para o card
    e.stopPropagation();

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
      dispatch(removeFromFavorites({ artworkId }))
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
      dispatch(addToFavorites({ artworkId }))
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

  return (
    <button
      onClick={handleToggleFavorite}
      className="p-2 bg-white/80 hover:bg-white rounded-full text-red-500 hover:text-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
      aria-label={
        isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
      }
    >
      {isFavorite ? (
        <HeartSolidIcon className="w-5 h-5" />
      ) : (
        <HeartIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default FavoriteButton;
