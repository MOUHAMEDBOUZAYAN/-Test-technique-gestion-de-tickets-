const errorHandler = (err, req, res, next) => {
    console.error('Erreur:', err);
  
    // Erreur de validation PostgreSQL
    if (err.code === '23505') {
      return res.status(409).json({
        message: 'Violation de contrainte unique',
        details: 'Cette valeur existe déjà'
      });
    }
  
    // Erreur de validation
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Erreur de validation',
        details: err.message
      });
    }
  
    // Erreur par défaut
    res.status(err.status || 500).json({
      message: err.message || 'Erreur serveur interne',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorHandler;