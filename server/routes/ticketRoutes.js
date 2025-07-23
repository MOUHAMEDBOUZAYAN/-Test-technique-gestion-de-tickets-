const express = require('express');
const TicketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Appliquer l'authentification à toutes les routes
router.use(authMiddleware);

router.post('/', TicketController.createTicket);
router.get('/', TicketController.getTickets);
router.get('/stats', TicketController.getStats);
router.get('/:id', TicketController.getTicket);
router.put('/:id', TicketController.updateTicket);
router.delete('/:id', TicketController.deleteTicket);

module.exports = router;