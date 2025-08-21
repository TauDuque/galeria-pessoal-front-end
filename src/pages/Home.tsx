import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import {
  ArrowRightIcon,
  PhotoIcon,
  UserGroupIcon,
  SparklesIcon,
  HeartIcon,
  LightBulbIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/gallery");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>

        <div className="container-main relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              A arte que <span className="text-gradient">merece ser vista</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Descubra artes incríveis em nossa galeria moderna e intuitiva
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/gallery" className="btn-primary text-lg px-8 py-4">
                    Explorar Galeria
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    to="/gallery"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Ver Galeria
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleGetStarted}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    Começar
                  </button>
                  <Link
                    to="/gallery"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Explorar Galeria
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher nossa{" "}
              <span className="text-gradient">plataforma</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos as melhores ferramentas para artistas compartilharem e
              descobrirem arte.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Compartilhe suas artes favoritas
              </h3>
              <p className="text-muted-foreground">
                Construa sua coleção pessoal e compartilhe suas obras de arte
                preferidas com amigos e familiares.
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <LightBulbIcon className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Inspiração Criativa
              </h3>
              <p className="text-muted-foreground">
                Conecte-se com grandes artistas e descubra novas inspirações
                para expandir seu horizonte artístico.
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ComputerDesktopIcon className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Interface Moderna</h3>
              <p className="text-muted-foreground">
                Interface elegante e moderna para exibir as maiores obras de
                arte com navegação intuitiva.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
