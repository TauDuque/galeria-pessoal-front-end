import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { fetchArtworks, resetArtworks } from "../store/slices/artworkSlice";
import { logout } from "../store/slices/authSlice";
import { addNotification } from "../store/slices/uiSlice";
import ArtworkGrid from "../components/gallery/ArtworkGrid";
import ArtworkModal from "../components/gallery/ArtworkModal";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  PhotoIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { artworks, isLoading } = useAppSelector((state) => state.artworks);
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"artworks" | "stats">("artworks");

  // Filtrar apenas as obras do usuário logado
  const userArtworks = artworks.filter(
    (artwork) => String(artwork.userId) === String(user?.id)
  );

  useEffect(() => {
    // Carregar todas as obras para filtrar as do usuário
    dispatch(resetArtworks());
    dispatch(fetchArtworks({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      dispatch(logout());
      dispatch(
        addNotification({
          type: "success",
          message: "Logout realizado com sucesso!",
        })
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const stats = {
    totalArtworks: userArtworks.length,
    joinDate: user?.createdAt
      ? formatDate(user.createdAt)
      : "Data não disponível",
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-main">
        {/* Profile Header */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-white" />
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Membro desde {stats.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link
                to="/upload"
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Nova Obra</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn-ghost text-red-500 hover:text-red-400 hover:bg-red-500/10 flex items-center space-x-2"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PhotoIcon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{stats.totalArtworks}</h3>
            <p className="text-muted-foreground">Obras Publicadas</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-secondary-500 font-bold text-xl">👁️</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">-</h3>
            <p className="text-muted-foreground">Visualizações</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-accent-500 font-bold text-xl">❤️</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">-</h3>
            <p className="text-muted-foreground">Curtidas</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("artworks")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "artworks"
                  ? "border-primary-500 text-primary-500"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              Minhas Obras ({userArtworks.length})
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "stats"
                  ? "border-primary-500 text-primary-500"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              Estatísticas
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "artworks" && (
          <div>
            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : userArtworks.length > 0 ? (
              <ArtworkGrid
                artworks={userArtworks}
                onArtworkClick={setSelectedArtwork}
              />
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <PhotoIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Nenhuma obra ainda
                </h3>
                <p className="text-muted-foreground mb-6">
                  Compartilhe sua primeira criação com nossa comunidade!
                </p>
                <Link to="/upload" className="btn-primary">
                  Fazer Upload
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="card p-8">
            <h3 className="text-xl font-semibold mb-6">
              Estatísticas Detalhadas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Total de obras</span>
                <span className="font-semibold">{stats.totalArtworks}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Membro desde</span>
                <span className="font-semibold">{stats.joinDate}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Última atividade</span>
                <span className="font-semibold">
                  {userArtworks.length > 0
                    ? formatDate(userArtworks[0].createdAt)
                    : "Nenhuma atividade"}
                </span>
              </div>
            </div>
          </div>
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

export default Profile;
