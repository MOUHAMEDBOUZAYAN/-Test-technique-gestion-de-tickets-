import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  X, 
  Save, 
  Clock, 
  Zap, 
  CheckCheck, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle,
  FileText,
  Tag
} from 'lucide-react';
import { TICKET_STATUS, TICKET_PRIORITY } from '../../utils/constants';

const TicketForm = ({ ticket, onSubmit, onClose, loading }) => {
  const [step, setStep] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    formState: { errors, isValid } 
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium'
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority
      });
    } else {
      reset({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium'
      });
    }
  }, [ticket, reset]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  // Configuration des statuts avec icônes et couleurs
  const statusOptions = [
    {
      value: 'todo',
      label: 'À faire',
      icon: Clock,
      description: 'Le ticket est en attente de traitement',
      color: 'slate',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      textColor: 'text-slate-700'
    },
    {
      value: 'in_progress',
      label: 'En cours',
      icon: Zap,
      description: 'Le ticket est actuellement en traitement',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      value: 'done',
      label: 'Terminé',
      icon: CheckCheck,
      description: 'Le ticket a été résolu avec succès',
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700'
    }
  ];

  const priorityOptions = [
    {
      value: 'low',
      label: 'Faible',
      icon: CheckCircle,
      description: 'Peut être traité plus tard',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    {
      value: 'medium',
      label: 'Moyenne',
      icon: AlertCircle,
      description: 'Priorité normale',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700'
    },
    {
      value: 'high',
      label: 'Élevée',
      icon: AlertTriangle,
      description: 'Nécessite une attention immédiate',
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700'
    }
  ];

  const selectedStatus = statusOptions.find(s => s.value === watchedValues.status);
  const selectedPriority = priorityOptions.find(p => p.value === watchedValues.priority);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        
        {/* En-tête */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {ticket ? 'Modifier le ticket' : 'Nouveau ticket'}
              </h2>
              <p className="text-gray-600 text-sm">
                {ticket ? 'Mettez à jour les informations du ticket' : 'Créez une nouvelle demande de support'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Titre */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="h-4 w-4" />
              Titre du ticket *
            </label>
            <input
              {...register('title', {
                required: 'Le titre est requis',
                minLength: {
                  value: 3,
                  message: 'Le titre doit contenir au moins 3 caractères'
                },
                maxLength: {
                  value: 100,
                  message: 'Le titre ne peut pas dépasser 100 caractères'
                }
              })}
              type="text"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ex: Problème de connexion, Bug d'affichage..."
            />
            {errors.title && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.title.message}
              </p>
            )}
            <div className="text-xs text-gray-500 text-right">
              {watchedValues.title?.length || 0}/100 caractères
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="h-4 w-4" />
              Description détaillée *
            </label>
            <textarea
              {...register('description', {
                required: 'La description est requise',
                minLength: {
                  value: 10,
                  message: 'La description doit contenir au moins 10 caractères'
                }
              })}
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Décrivez en détail le problème rencontré ou la demande..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.description.message}
              </p>
            )}
            <div className="text-xs text-gray-500 text-right">
              {watchedValues.description?.length || 0} caractères
            </div>
          </div>

          {/* Statut */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Tag className="h-4 w-4" />
              Statut du ticket
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = watchedValues.status === option.value;
                return (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer transition-all ${
                      isSelected ? 'transform scale-105' : ''
                    }`}
                  >
                    <input
                      {...register('status')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? `${option.bgColor} ${option.borderColor} shadow-md` 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? option.bgColor : 'bg-gray-100'}`}>
                          <Icon className={`h-5 w-5 ${isSelected ? option.textColor : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <div className={`font-semibold ${isSelected ? option.textColor : 'text-gray-900'}`}>
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-600">
                            {option.description}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className={`h-5 w-5 ${option.textColor}`} />
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Priorité */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <AlertTriangle className="h-4 w-4" />
              Niveau de priorité
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {priorityOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = watchedValues.priority === option.value;
                return (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer transition-all ${
                      isSelected ? 'transform scale-105' : ''
                    }`}
                  >
                    <input
                      {...register('priority')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? `${option.bgColor} ${option.borderColor} shadow-md` 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? option.bgColor : 'bg-gray-100'}`}>
                          <Icon className={`h-5 w-5 ${isSelected ? option.textColor : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <div className={`font-semibold ${isSelected ? option.textColor : 'text-gray-900'}`}>
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-600">
                            {option.description}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className={`h-5 w-5 ${option.textColor}`} />
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Résumé des sélections */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Résumé</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Statut :</span>
                <span className={`flex items-center gap-2 ${selectedStatus?.textColor}`}>
                  {selectedStatus && <selectedStatus.icon className="h-4 w-4" />}
                  {selectedStatus?.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Priorité :</span>
                <span className={`flex items-center gap-2 ${selectedPriority?.textColor}`}>
                  {selectedPriority && <selectedPriority.icon className="h-4 w-4" />}
                  {selectedPriority?.label}
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            * Champs obligatoires
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit(handleFormSubmit)}
              disabled={loading || !isValid}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {ticket ? 'Modifier le ticket' : 'Créer le ticket'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;