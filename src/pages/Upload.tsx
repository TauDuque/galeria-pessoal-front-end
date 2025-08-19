import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { uploadArtwork } from "../store/slices/artworkSlice";
import { addNotification } from "../store/slices/uiSlice";
import UploadForm from "../components/gallery/UploadForm";
import { CloudArrowUpIcon, PhotoIcon } from "@heroicons/react/24/outline";

const Upload: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    dispatch(
      addNotification({
        type: "success",
        message: "Obra enviada com sucesso!",
      })
    );
    navigate("/gallery");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CloudArrowUpIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Compartilhe sua <span className="text-gradient">Arte</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Faça upload da sua criação e compartilhe com nossa comunidade de
            artistas.
          </p>
        </div>

        {/* Upload Form */}
        <div className="max-w-2xl mx-auto">
          <UploadForm onSuccess={handleUploadSuccess} />
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Dicas para um <span className="text-gradient">upload perfeito</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PhotoIcon className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="font-semibold mb-2">Qualidade da Imagem</h3>
              <p className="text-sm text-muted-foreground">
                Use imagens de alta resolução (mínimo 800x600px) para melhor
                visualização.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary-500 font-bold text-xl">T</span>
              </div>
              <h3 className="font-semibold mb-2">Título Descritivo</h3>
              <p className="text-sm text-muted-foreground">
                Escolha um título que capture a essência da sua obra de arte.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-500 font-bold text-xl">📝</span>
              </div>
              <h3 className="font-semibold mb-2">Descrição Envolvente</h3>
              <p className="text-sm text-muted-foreground">
                Conte a história por trás da sua criação para engajar o público.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
