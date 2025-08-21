import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { addNotification } from "../../store/slices/uiSlice";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  PhotoIcon,
  ArrowRightOnRectangleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      dispatch(logout());
      dispatch(
        addNotification({
          type: "success",
          message: "Logout realizado com sucesso!",
        })
      );
      navigate("/");
      setProfileMenuOpen(false);
    }
  };

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Galeria", href: "/gallery" },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <nav className="container-main">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <PhotoIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">
                ArtGallery
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/favorites"
                  className="btn-secondary flex items-center space-x-2"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>Favoritos</span>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <UserCircleIcon className="w-6 h-6" />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 card animate-slide-up">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          Meu Perfil
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          <span>Sair</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-ghost">
                  Entrar
                </Link>
                <Link to="/register" className="btn-primary">
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border pt-4">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <Link
                      to="/favorites"
                      className="block btn-secondary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <HeartIcon className="w-4 h-4 inline mr-2" />
                      Favoritos
                    </Link>
                    <Link
                      to="/profile"
                      className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Meu Perfil
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      className="block btn-ghost text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/register"
                      className="block btn-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cadastrar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
