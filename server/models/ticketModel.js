const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Ticket = sequelize.define('Ticket', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'closed'),
    defaultValue: 'open'
  },
  priority: {
    type: DataTypes.ENUM('basse', 'moyenne', 'haute'),
    defaultValue: 'moyenne'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'tickets',
  timestamps: false
});

// Associations
Ticket.belongsTo(User, { as: 'createdBy', foreignKey: 'createdBy' });
Ticket.belongsTo(User, { as: 'assignedTo', foreignKey: 'assignedTo' });

module.exports = Ticket; 