import React from 'react';
import { TICKET_STATUS, TICKET_PRIORITY } from '../../utils/constants';
import { Calendar, Clock } from 'lucide-react';

const TicketDetail = ({ ticket, onClose }) => {
  if (!ticket) return null;
  const status = TICKET_STATUS[ticket.status] || { label: ticket.status, className: 'bg-gray-100 text-gray-800' };
  const priority = TICKET_PRIORITY[ticket.priority] || { label: ticket.priority, className: 'bg-gray-100 text-gray-800' };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
          {ticket.title}
        </h2>
        <div className="flex gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>{status.label}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.className}`}>{priority.label}</span>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Créé le {new Date(ticket.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
          {ticket.updated_at && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Modifié le {new Date(ticket.updated_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail; 