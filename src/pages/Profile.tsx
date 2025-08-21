import React from "react";
import { useAppSelector } from "../store";
import {
  HeartIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { items: favorites } = useAppSelector((state) => state.favorites);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

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
                    <span>Membro desde {formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link
                to="/favorites"
                className="btn-primary flex items-center space-x-2"
              >
                <HeartIcon className="w-4 h-4" />
                <span>Ver Favoritos</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{favorites.length}</h3>
            <p className="text-muted-foreground">Obras Favoritadas</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-500 font-bold text-xl">👁️</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">-</h3>
            <p className="text-muted-foreground">Visualizações</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 font-bold text-xl">⭐</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">-</h3>
            <p className="text-muted-foreground">Avaliações</p>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="card p-8">
          <h3 className="text-xl font-semibold mb-6">
            Estatísticas da sua Coleção
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">
                Total de obras favoritadas
              </span>
              <span className="font-semibold">{favorites.length}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Membro desde</span>
              <span className="font-semibold">
                {formatDate(user.createdAt)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground">Status da conta</span>
              <span className="font-semibold text-green-600">Ativa</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Quer expandir sua coleção?
          </p>
          <Link to="/gallery" className="btn-secondary">
            Explorar Galeria
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
