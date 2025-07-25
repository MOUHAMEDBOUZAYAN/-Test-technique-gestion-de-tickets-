import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { TICKET_STATUS, TICKET_PRIORITY } from '../../utils/constants';

const TicketCard = ({ ticket, onEdit, onDelete }) => {
  const status = TICKET_STATUS[ticket.status] || { label: ticket.status, className: 'bg-gray-100 text-gray-800' };
  const priority = TICKET_PRIORITY[ticket.priority] || { label: ticket.priority, className: 'bg-gray-100 text-gray-800' };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border hover:shadow-lg transition group relative h-full min-h-[220px]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg text-gray-900 truncate max-w-[70%]">{ticket.title}</span>
        <div className="flex gap-2 items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priority.className}`}>{priority.label}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2 line-clamp-3 flex-1">{ticket.description}</p>
      <div className="flex items-center gap-2 mt-auto">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.className}`}>{status.label}</span>
        <span className="text-xs text-gray-400 ml-auto">Créé le {new Date(ticket.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
      </div>
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(ticket); }}
          className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 shadow-sm"
          title="Modifier"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(ticket.id); }}
          className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 shadow-sm"
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TicketCard;