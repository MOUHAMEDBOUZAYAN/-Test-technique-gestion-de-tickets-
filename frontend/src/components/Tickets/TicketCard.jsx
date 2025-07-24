import React, { useState } from 'react';
import { 
  Edit, 
  Trash2,
  Calendar,
  Clock,
  Zap,
  CheckCheck,
  AlertCircle,
  MoreVertical,
  Eye,
  Copy,
  Archive
} from 'lucide-react';
import { TICKET_STATUS, TICKET_PRIORITY } from '../../utils/constants';

const TicketCard = ({ ticket, onEdit, onDelete, onView }) => {
  const [showActions, setShowActions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Configuration des statuts avec icônes
  const statusConfig = {
    todo: { 
      label: 'À faire', 
      className: 'bg-slate-100 text-slate-800 border-slate-200', 
      icon: Clock,
      color: 'slate' 
    },
    in_progress: { 
      label: 'En cours', 
      className: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: Zap,
      color: 'blue' 
    },
    done: { 
      label: 'Terminé', 
      className: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
      icon: CheckCheck,
      color: 'emerald' 
    }
  };

  // Configuration des priorités
  const priorityConfig = {
    low: { 
      label: 'Faible', 
      className: 'bg-green-100 text-green-800 border-green-200',
      dotColor: 'bg-green-500'
    },
    medium: { 
      label: 'Moyenne', 
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      dotColor: 'bg-yellow-500'
    },
    high: { 
      label: 'Élevée', 
      className: 'bg-red-100 text-red-800 border-red-200',
      dotColor: 'bg-red-500'
    }
  };

  const status = statusConfig[ticket.status] || statusConfig.todo;
  const priority = priorityConfig[ticket.priority] || priorityConfig.medium;
  const StatusIcon = status.icon;

  const handleEdit = () => {
    setIsAnimating(true);
    onEdit(ticket);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
      onDelete(ticket.id);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${ticket.title}\n${ticket.description}`);
    // Vous pouvez ajouter une notification toast ici
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden ${
      isAnimating ? 'scale-95' : 'hover:scale-[1.02]'
    }`}>
      
      {/* Décoration d'arrière-plan */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${status.color}-50 to-${status.color}-100 rounded-full transform translate-x-16 -translate-y-16 opacity-30 group-hover:opacity-50 transition-opacity`}></div>
      
      {/* En-tête avec priorité */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-3 h-3 rounded-full ${priority.dotColor} mt-2 shadow-sm`}></div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {ticket.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Menu actions */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {/* Dropdown des actions */}
            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                {onView && (
                  <button
                    onClick={() => {
                      onView(ticket);
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Voir les détails
                  </button>
                )}
                <button
                  onClick={() => {
                    handleEdit();
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Modifier
                </button>
                <button
                  onClick={() => {
                    handleCopy();
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copier
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Badges et informations */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${status.className}`}>
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priority.className}`}>
              {priority.label}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {formatDate(ticket.created_at)}
          </div>
        </div>

        {/* Barre de progression visuelle pour le statut */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-500 bg-gradient-to-r ${
                ticket.status === 'done' ? 'from-emerald-500 to-green-500 w-full' :
                ticket.status === 'in_progress' ? 'from-blue-500 to-purple-500 w-2/3' :
                'from-gray-400 to-gray-500 w-1/3'
              }`}
            />
          </div>
        </div>

        {/* Actions rapides au survol */}
        <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit className="h-3 w-3" />
            Modifier
          </button>
          {onView && (
            <button
              onClick={() => onView(ticket)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
            >
              <Eye className="h-3 w-3" />
              Détails
            </button>
          )}
        </div>

        {/* Indicateur de mise à jour récente */}
        {ticket.updated_at && ticket.updated_at !== ticket.created_at && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Overlay pour fermer le menu d'actions */}
      {showActions && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default TicketCard;