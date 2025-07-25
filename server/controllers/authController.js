const User = require('../models/userModel');
const { generateToken } = require('../config/jwt');
const { validateRegister, validateLogin } = require('../utils/validators');

class AuthController {
  static async register(req, res, next) {
    try {
      const { error } = validateRegister(req.body);
      if (error) {
        return res.status(400).json({ 
          message: 'Données invalides', 
          details: error.details[0].message 
        });
      }

      const { username, email, password } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ 
          message: 'Un utilisateur avec cet email existe déjà' 
        });
      }

      // Créer l'utilisateur
      const user = await User.create({ username, email, password });
      
      // Générer le token
      const token = generateToken({ 
        userId: user.id, 
        email: user.email 
      });

      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { error } = validateLogin(req.body);
      if (error) {
        return res.status(400).json({ 
          message: 'Données invalides', 
          details: error.details[0].message 
        });
      }

      const { email, password } = req.body;

      // Trouver l'utilisateur
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          message: 'Email ou mot de passe incorrect' 
        });
      }

      // Vérifier le mot de passe
      const isValidPassword = await User.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          message: 'Email ou mot de passe incorrect' 
        });
      }

      // Mettre à jour la dernière connexion
      await User.updateLastLogin(user.id);

      // Générer le token
      const token = generateToken({ 
        userId: user.id, 
        email: user.email 
      });

      res.json({
        message: 'Connexion réussie',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async health(req, res) {
    res.status(200).json({ status: 'ok' });
  }
}

module.exports = AuthController;