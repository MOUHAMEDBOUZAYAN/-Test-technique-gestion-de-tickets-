const Ticket = require('../models/ticketModel');
const { validateTicket, validateTicketUpdate } = require('../utils/validators');

class TicketController {
  static async createTicket(req, res, next) {
    try {
      const { error } = validateTicket(req.body);
      if (error) {
        return res.status(400).json({ 
          message: 'Données invalides', 
          details: error.details[0].message 
        });
      }

      const { title, description, status, priority } = req.body;
      const userId = req.user.userId; v

      const ticket = await Ticket.create({
        title,
        description,
        status: status || 'todo',
        priority: priority || 'medium',
        user_id: userId
      });

      res.status(201).json({
        message: 'Ticket créé avec succès',
        ticket
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTickets(req, res, next) {
    try {
      const userId = req.user.userId;
      const { status, priority } = req.query;

      const filters = {};
      if (status) filters.status = status;
      if (priority) filters.priority = priority;

      const tickets = await Ticket.findByUserId(userId, filters);

      res.json({
        tickets,
        count: tickets.length
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTicket(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const ticket = await Ticket.findById(id, userId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket non trouvé' });
      }

      res.json({ ticket });
    } catch (error) {
      next(error);
    }
  }

  static async updateTicket(req, res, next) {
    try {
      const { error } = validateTicketUpdate(req.body);
      if (error) {
        return res.status(400).json({ 
          message: 'Données invalides', 
          details: error.details[0].message 
        });
      }

      const { id } = req.params;
      const userId = req.user.userId;
      const updates = req.body;

      const ticket = await Ticket.update(id, userId, updates);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket non trouvé' });
      }

      res.json({
        message: 'Ticket mis à jour avec succès',
        ticket
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTicket(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const ticket = await Ticket.delete(id, userId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket non trouvé' });
      }

      res.json({ message: 'Ticket supprimé avec succès' });
    } catch (error) {
      next(error);
    }
  }

  static async getStats(req, res, next) {
    try {
      const userId = req.user.userId;
      const stats = await Ticket.getStats(userId);

      res.json({ stats });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TicketController;