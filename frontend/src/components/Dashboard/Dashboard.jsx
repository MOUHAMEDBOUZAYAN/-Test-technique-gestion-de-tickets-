import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TicketIcon, 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  User,
  ArrowRight,
  Calendar,
  AlertCircle,
  BarChart3,
  Zap,
  CheckCheck,
  Filter,
  Activity
} from 'lucide-react';
import { useTickets } from '../../hooks/useTickets';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../Common/Loading';
import TicketDetail from '../Tickets/TicketDetail';

const Dashboard = () => {
  const { user } = useAuth();
  const { tickets, stats, loading } = useTickets();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (loading) {
    return <Loading />;
  }

  const recentTickets = tickets?.slice(0, 5) || [];

  // Calcul des statistiques améliorées
  const enhancedStats = {
    total: stats?.total || 0,
    todo: stats?.todo || 0,
    in_progress: stats?.in_progress || 0,
    done: stats?.done || 0,
    completion_rate: stats?.total ? Math.round((stats?.done / stats?.total) * 100) : 0,
    recent_activity: recentTickets.length
  };

  const statCards = [
    {
      name: 'Total des tickets',
      value: enhancedStats.total,
      icon: TicketIcon,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-700',
      trend: '+12% ce mois',
      subtitle: 'Tous vos tickets'
    },
    {
      name: 'À faire',
      value: enhancedStats.todo,
      icon: Clock,
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-yellow-600',
      bgLight: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      trend: `${enhancedStats.todo > 0 ? 'À traiter' : 'Aucun en attente'}`,
      subtitle: 'En attente de traitement'
    },
    {
      name: 'En cours',
      value: enhancedStats.in_progress,
      icon: TrendingUp,
      color: 'orange',
      bgGradient: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-700',
      trend: 'En traitement actuel',
      subtitle: 'Tickets actifs'
    },
    {
      name: 'Terminés',
      value: enhancedStats.done,
      icon: CheckCircle,
      color: 'green',
      bgGradient: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      trend: `${enhancedStats.completion_rate}% complétés`,
      subtitle: 'Résolus avec succès'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return Clock;
      case 'in_progress': return Zap;
      case 'done': return CheckCheck;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'bg-emerald-100 text-emerald-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* En-tête avec salutation améliorée */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  Bonjour, {user?.username || 'Utilisateur'} ! 👋
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Voici votre aperçu du {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Sélecteur de période */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              {[
                { value: '7d', label: '7j' },
                { value: '30d', label: '30j' },
                { value: '90d', label: '3m' }
              ].map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period.value
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques avec design amélioré */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.name} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Décoration d'arrière-plan */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-5 rounded-full transform translate-x-8 -translate-y-8" 
                     style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.subtitle}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient} group-hover:scale-110 transition-transform shadow-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  {stat.trend && (
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600 font-medium">{stat.trend}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section principale avec actions rapides et activité récente */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Actions rapides améliorées */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/tickets')}
                  className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all duration-200 group border border-blue-100"
                >
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Nouveau ticket</p>
                    <p className="text-sm text-gray-600">Créer une nouvelle demande</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
                
                <button 
                  onClick={() => navigate('/tickets')}
                  className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 rounded-xl transition-all duration-200 group border border-emerald-100"
                >
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <TicketIcon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Voir tous les tickets</p>
                    <p className="text-sm text-gray-600">Gérer vos demandes</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 rounded-xl transition-all duration-200 group border border-orange-100">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Voir les rapports</p>
                    <p className="text-sm text-gray-600">Analyser les performances</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Tickets récents améliorés */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Activité récente</h3>
                  <p className="text-sm text-gray-600">Vos derniers tickets mis à jour</p>
                </div>
                <Link
                  to="/tickets"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Voir tout
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {recentTickets.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <TicketIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun ticket</h3>
                  <p className="text-gray-600 mb-6">Commencez par créer votre premier ticket</p>
                  <Link
                    to="/tickets"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Créer un ticket
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentTickets.map((ticket, index) => {
                    const StatusIcon = getStatusIcon(ticket.status);
                    return (
                      <div 
                        key={ticket.id} 
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div className={`p-2 rounded-lg ${getPriorityColor(ticket.priority)} shadow-sm`}>
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900 truncate">{ticket.title}</p>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              <StatusIcon className="h-3 w-3" />
                              {ticket.status === 'done' ? 'Terminé' : 
                               ticket.status === 'in_progress' ? 'En cours' : 'À faire'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(ticket.created_at).toLocaleDateString('fr-FR')}
                            </span>
                            {ticket.updated_at !== ticket.created_at && (
                              <span className="flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                Mis à jour {new Date(ticket.updated_at).toLocaleDateString('fr-FR')}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section de performance (optionnelle) */}
        {enhancedStats.total > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
                <p className="text-gray-600">Votre taux de résolution est de {enhancedStats.completion_rate}%</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{enhancedStats.completion_rate}%</div>
                <div className="text-sm text-gray-600">Taux de résolution</div>
              </div>
            </div>
            
            {/* Barre de progression */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${enhancedStats.completion_rate}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedTicket && (
        <TicketDetail ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  );
};

export default Dashboard;