export const TICKET_STATUS = {
    todo: {
      label: 'À faire',
      className: 'bg-gray-100 text-gray-800'
    },
    in_progress: {
      label: 'En cours',
      className: 'bg-yellow-100 text-yellow-800'
    },
    done: {
      label: 'Terminé',
      className: 'bg-green-100 text-green-800'
    }
  };
  
  export const TICKET_PRIORITY = {
    low: {
      label: 'Basse',
      className: 'bg-green-100 text-green-800'
    },
    medium: {
      label: 'Moyenne',
      className: 'bg-yellow-100 text-yellow-800'
    },
    high: {
      label: 'Haute',
      className: 'bg-red-100 text-red-800'
    }
  };
  
  export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile'
    },
    TICKETS: {
      BASE: '/tickets',
      STATS: '/tickets/stats'
    }
  };