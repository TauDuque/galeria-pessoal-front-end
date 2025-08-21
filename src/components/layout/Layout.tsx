import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FallbackNotification from "../common/FallbackNotification";
import { shouldUseFallback } from "../../services/fallbackService";

const Layout: React.FC = () => {
  const [showFallbackNotification, setShowFallbackNotification] =
    useState(false);

  useEffect(() => {
    // Verificar se deve mostrar a notificação de fallback
    const checkFallbackStatus = () => {
      const useFallback = shouldUseFallback();
      setShowFallbackNotification(useFallback);
    };

    checkFallbackStatus();

    // Verificar novamente quando a variável de ambiente mudar
    const interval = setInterval(checkFallbackStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Notificação de Fallback */}
      <FallbackNotification
        isVisible={showFallbackNotification}
        onClose={() => setShowFallbackNotification(false)}
        message="Usando dados de exemplo - Back-end não disponível"
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
