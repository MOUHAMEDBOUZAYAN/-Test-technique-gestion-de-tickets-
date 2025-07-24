import React from 'react';
import { TicketIcon } from 'lucide-react';

const Loading = ({ message = "Chargement en cours...", fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          {/* Logo animé */}
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto animate-pulse">
              <TicketIcon className="h-10 w-10 text-white" />
            </div>
            
            {/* Cercles animés autour du logo */}
            <div className="absolute inset-0 w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-2xl animate-ping"></div>
              <div className="absolute inset-2 border-2 border-purple-200 rounded-xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Spinner principal */}
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-12 h-12 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto my-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>

          {/* Texte et points animés */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              TicketFlow
            </h2>
            
            <div className="flex items-center justify-center gap-1">
              <span className="text-gray-600 font-medium">{message}</span>
              <div className="flex gap-1 ml-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="w-64 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>

            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Veuillez patenter pendant que nous préparons votre espace de travail...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Version compacte pour les chargements partiels
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading;