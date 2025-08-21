import React from "react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface FallbackNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

const FallbackNotification: React.FC<FallbackNotificationProps> = ({
  isVisible,
  onClose,
  message = "Usando dados de exemplo - Back-end não disponível",
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 mx-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-yellow-600" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-yellow-800">
              Modo de Desenvolvimento
            </p>
            <p className="text-sm text-yellow-700 mt-1">{message}</p>
            <p className="text-xs text-yellow-600 mt-2">
              Configure o back-end ou use{" "}
              <code className="bg-yellow-100 px-1 rounded">
                REACT_APP_USE_FALLBACK=true
              </code>
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className="text-yellow-400 hover:text-yellow-600 transition-colors duration-200"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackNotification;
