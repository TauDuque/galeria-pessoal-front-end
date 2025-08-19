import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store";
import {
  ArrowRightIcon,
  PhotoIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const features = [
    {
      icon: PhotoIcon,
      title: "Compartilhe sua Arte",
      description: "Faça upload das suas criações e compartilhe com o mundo.",
    },
    {
      icon: UserGroupIcon,
      title: "Comunidade Criativa",
      description:
        "Conecte-se com outros artistas e descubra novas inspirações.",
    },
    {
      icon: SparklesIcon,
      title: "Galeria Moderna",
      description:
        "Interface elegante e moderna para exibir suas obras de arte.",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>

        <div className="container-main relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Sua <span className="text-gradient">Arte</span> merece
              <br />
              ser <span className="text-gradient">vista</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crie, compartilhe e descubra arte incrível em nossa galeria
              moderna e intuitiva.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/upload" className="btn-primary text-lg px-8 py-4">
                    Fazer Upload
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
                  <Link
                    to="/register"
                    className="btn-primary text-lg px-8 py-4"
                  >
                    Começar Agora
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
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

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-gradient p-8 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
