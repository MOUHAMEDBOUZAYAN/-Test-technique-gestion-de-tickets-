import api from './api';

export const ticketService = {
  async getTickets(filters = {}) {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    
    return await api.get(`/tickets?${params.toString()}`);
  },

  async getTicket(id) {
    return await api.get(`/tickets/${id}`);
  },

  async createTicket(ticketData) {
    return await api.post('/tickets', ticketData);
  },

  async updateTicket(id, updates) {
    return await api.put(`/tickets/${id}`, updates);  
  },

  async deleteTicket(id) {
    return await api.delete(`/tickets/${id}`);
  },

  async getStats() {
    return await api.get('/tickets/stats');
  }
};