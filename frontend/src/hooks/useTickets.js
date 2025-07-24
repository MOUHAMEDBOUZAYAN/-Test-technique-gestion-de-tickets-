import { useState, useEffect } from 'react';
import { ticketService } from '../services/ticketService';
import toast from 'react-hot-toast';

export const useTickets = (filters = {}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getTickets(filters);
      setTickets(response.tickets);
    } catch (error) {
      toast.error('Erreur lors du chargement des tickets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await ticketService.getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const createTicket = async (ticketData) => {
    try {
      const response = await ticketService.createTicket(ticketData);
      setTickets(prev => [response.ticket, ...prev]);
      toast.success('Ticket créé avec succès');
      return response.ticket;
    } catch (error) {
      toast.error('Erreur lors de la création du ticket');
      throw error;
    }
  };

  const updateTicket = async (id, updates) => {
    try {
      const response = await ticketService.updateTicket(id, updates);
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === id ? response.ticket : ticket
        )
      );
      toast.success('Ticket mis à jour avec succès');
      return response.ticket;
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du ticket');
      throw error;
    }
  };

  const deleteTicket = async (id) => {
    try {
      await ticketService.deleteTicket(id);
      setTickets(prev => prev.filter(ticket => ticket.id !== id));
      toast.success('Ticket supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du ticket');
      throw error;
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    tickets,
    stats,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    refetch: fetchTickets
  };
};