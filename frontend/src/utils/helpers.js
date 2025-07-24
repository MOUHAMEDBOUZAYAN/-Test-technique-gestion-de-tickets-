import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date, pattern = 'dd/MM/yyyy') => {
  return format(new Date(date), pattern, { locale: fr });
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'dd/MM/yyyy à HH:mm', { locale: fr });
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const getStatusColor = (status) => {
  const colors = {
    todo: 'gray',
    in_progress: 'yellow',
    done: 'green'
  };
  return colors[status] || 'gray';
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'green',
    medium: 'yellow',
    high: 'red'
  };
  return colors[priority] || 'gray';
};