import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  UserPlus, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  TicketIcon,
  ArrowRight,
  CheckCircle,
  X,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { register: registerUserFromContext } = useAuth();
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isValid } 
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');
  const email = watch('email');
  const username = watch('username');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Validation en temps réel du mot de passe
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const levels = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Très faible', color: 'red' },
      { score: 2, label: 'Faible', color: 'orange' },
      { score: 3, label: 'Moyen', color: 'yellow' },
      { score: 4, label: 'Fort', color: 'green' },
      { score: 5, label: 'Très fort', color: 'emerald' }
    ];

    return levels[score] || levels[0];
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUserFromContext({
        username: data.username,
        email: data.email,
        password: data.password
      });
      toast.success('Compte créé avec succès ! Bienvenue 🎉');
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error(error.message || 'Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: 'Sécurité garantie',
      description: 'Vos données sont chiffrées et protégées'
    },
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Réduisez le temps de traitement de 60%'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Travaillez en équipe plus efficacement'
    }
  ];

  const requirements = [
    { text: 'Au moins 8 caractères', met: password?.length >= 8 },
    { text: 'Une lettre minuscule', met: /[a-z]/.test(password || '') },
    { text: 'Une lettre majuscule', met: /[A-Z]/.test(password || '') },
    { text: 'Un chiffre', met: /\d/.test(password || '') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex">
      
      {/* Section gauche - Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-emerald-600 to-blue-700 relative overflow-hidden">
        
        {/* Décoration d'arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-700/20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-48 translate-y-48"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            
            <h2 className="text-4xl font-bold mb-6">
              Rejoignez des milliers d'utilisateurs satisfaits
            </h2>
            
            <p className="text-xl text-emerald-100 mb-12 leading-relaxed">
              Créez votre compte et découvrez une nouvelle façon de gérer 
              vos tickets de support, plus simple et plus efficace.
            </p>

            {/* Avantages */}
            <div className="space-y-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={benefit.title}
                    className={`flex items-start gap-4 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 200 + 500}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-emerald-100">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className={`mt-12 grid grid-cols-3 gap-8 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10k+</div>
                <div className="text-emerald-200 text-sm">Utilisateurs actifs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50k+</div>
                <div className="text-emerald-200 text-sm">Tickets traités</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-emerald-200 text-sm">Disponibilité</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section droite - Formulaire */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-md w-full transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <TicketIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              TicketFlow
            </h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Créer votre compte
            </h2>
            <p className="text-gray-600">
              Rejoignez notre communauté en quelques clics
            </p>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Nom d'utilisateur */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4" />
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <input
                    {...register('username', {
                      required: 'Le nom d\'utilisateur est requis',
                      minLength: {
                        value: 3,
                        message: 'Minimum 3 caractères requis'
                      },
                      maxLength: {
                        value: 20,
                        message: 'Maximum 20 caractères'
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: 'Seuls les lettres, chiffres et _ sont autorisés'
                      }
                    })}
                    type="text"
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                      errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="johndoe"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.username && (
                  <p className="text-red-600 text-sm">{errors.username.message}</p>
                )}
                <div className="text-xs text-gray-500 text-right">
                  {username?.length || 0}/20 caractères
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail className="h-4 w-4" />
                  Adresse email
                </label>
                <div className="relative">
                  <input
                    {...register('email', {
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Format d\'email invalide'
                      }
                    })}
                    type="email"
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="votre@email.com"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock className="h-4 w-4" />
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Le mot de passe est requis',
                      minLength: {
                        value: 8,
                        message: 'Minimum 8 caractères requis'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Votre mot de passe sécurisé"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Indicateur de force du mot de passe */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Force du mot de passe:</span>
                      <span className={`text-xs font-medium text-${passwordStrength.color}-600`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full bg-${passwordStrength.color}-500 transition-all duration-300`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Exigences du mot de passe */}
                {password && (
                  <div className="space-y-1">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        {req.met ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-400" />
                        )}
                        <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Confirmation mot de passe */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock className="h-4 w-4" />
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword', {
                      required: 'La confirmation est requise',
                      validate: value => value === password || 'Les mots de passe ne correspondent pas'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Confirmez votre mot de passe"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-start gap-3">
                <input
                  {...register('acceptTerms', {
                    required: 'Vous devez accepter les conditions'
                  })}
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-1"
                />
                <label className="text-sm text-gray-600 leading-relaxed">
                  J'accepte les{' '}
                  <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    conditions d'utilisation
                  </button>
                  {' '}et la{' '}
                  <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    politique de confidentialité
                  </button>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-600 text-sm">{errors.acceptTerms.message}</p>
              )}

              {/* Bouton de création */}
              <button
                type="submit"
                disabled={loading || !isValid}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    Créer mon compte
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Lien vers la connexion */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Déjà un compte ?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>

          {/* Sécurité */}
          <div className="mt-6 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-900">Sécurité garantie</span>
            </div>
            <p className="text-xs text-emerald-700">
              Vos données sont chiffrées et protégées selon les standards les plus élevés. 
              Nous ne partagerons jamais vos informations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;