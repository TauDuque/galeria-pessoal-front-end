import React from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-main py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <PhotoIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gradient">ArtGallery</span>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2024 ArtGallery. Desenvolvido com ❤️ por Tau.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
