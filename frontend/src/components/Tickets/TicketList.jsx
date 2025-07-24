import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  Calendar,
  Clock,
  Zap,
  CheckCheck,
  AlertTriangle
} from 'lucide-react';
import { useTickets } from '../../hooks/useTickets';
import TicketCard from './TicketCard';
import TicketForm from './TicketForm';
import Loading from '../Common/Loading';

const TicketList = () => {
  // États pour les filtres et la recherche
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  
  // États pour le formulaire
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  
  // États pour l'interface
  const [showFilters, setShowFilters] = useState(false);

  const { tickets, loading, createTicket, updateTicket, deleteTicket } = useTickets();

  // Filtrage et tri des tickets
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = (tickets || []).filter(ticket => {
      const matchesSearch = 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filters.status || ticket.status === filters.status;
      const matchesPriority = !filters.priority || ticket.priority === filters.priority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tickets, searchTerm, filters, sortBy, sortOrder]);

  // Statistiques rapides
  const quickStats = useMemo(() => {
    const total = filteredAndSortedTickets.length;
    const todo = filteredAndSortedTickets.filter(t => t.status === 'todo').length;
    const in_progress = filteredAndSortedTickets.filter(t => t.status === 'in_progress').length;
    const done = filteredAndSortedTickets.filter(t => t.status === 'done').length;
    const high_priority = filteredAndSortedTickets.filter(t => t.priority === 'high').length;
    
    return { total, todo, in_progress, done, high_priority };
  }, [filteredAndSortedTickets]);

  // Gestion des filtres
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === prev[key] ? '' : value
    }));
  };

  const handleClearFilters = () => {
    setFilters({ status: '', priority: '' });
    setSearchTerm('');
  };

  const hasActiveFilters = Object.values(filters).some(Boolean) || searchTerm;

  // Gestion du formulaire
  const handleCreateTicket = () => {
    setEditingTicket(null);
    setShowForm(true);
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTicket(null);
  };

  const handleSubmitForm = async (data) => {
    setFormLoading(true);
    try {
      if (editingTicket) {
        await updateTicket(editingTicket.id, data);
      } else {
        await createTicket(data);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTicket = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
      try {
        await deleteTicket(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  // Options de tri
  const sortOptions = [
    { value: 'created_at', label: 'Date de création' },
    { value: 'updated_at', label: 'Dernière mise à jour' },
    { value: 'title', label: 'Titre' },
    { value: 'priority', label: 'Priorité' },
    { value: 'status', label: 'Statut' }
  ];

  const statusOptions = [
    { value: 'todo', label: 'À faire', icon: Clock, color: 'slate' },
    { value: 'in_progress', label: 'En cours', icon: Zap, color: 'blue' },
    { value: 'done', label: 'Terminé', icon: CheckCheck, color: 'emerald' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Faible', color: 'green' },
    { value: 'medium', label: 'Moyenne', color: 'yellow' },
    { value: 'high', label: 'Élevée', color: 'red' }
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Mes Tickets
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {quickStats.total} ticket{quickStats.total !== 1 ? 's' : ''} 
              {hasActiveFilters && ' (filtrés)'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Basculer entre les vues */}
            <div className="flex items-center bg-white rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleCreateTicket}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="h-5 w-5" />
              Nouveau ticket
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900">{quickStats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-slate-600">{quickStats.todo}</div>
            <div className="text-sm text-gray-600">À faire</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">{quickStats.in_progress}</div>
            <div className="text-sm text-gray-600">En cours</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-emerald-600">{quickStats.done}</div>
            <div className="text-sm text-gray-600">Terminés</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-red-600">{quickStats.high_priority}</div>
            <div className="text-sm text-gray-600">Priorité haute</div>
          </div>
        </div>

        {/* Barre de recherche et contrôles */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher dans les tickets..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-3">
              
              {/* Tri */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </button>
              </div>

              {/* Bouton filtres */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all ${
                  hasActiveFilters 
                    ? 'border-blue-300 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Filter className="h-4 w-4" />
                Filtres
                {hasActiveFilters && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Panneau de filtres */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtres avancés</h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Tout effacer
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Filtres par statut */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Statut</h4>
                  <div className="space-y-2">
                    {statusOptions.map(option => {
                      const Icon = option.icon;
                      const isActive = filters.status === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleFilterChange('status', option.value)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isActive 
                              ? `border-${option.color}-300 bg-${option.color}-50 text-${option.color}-700` 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{option.label}</span>
                          <span className="ml-auto text-sm text-gray-500">
                            {filteredAndSortedTickets.filter(t => t.status === option.value).length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filtres par priorité */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Priorité</h4>
                  <div className="space-y-2">
                    {priorityOptions.map(option => {
                      const isActive = filters.priority === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleFilterChange('priority', option.value)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isActive 
                              ? `border-${option.color}-300 bg-${option.color}-50 text-${option.color}-700` 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full bg-${option.color}-500`}></div>
                          <span className="font-medium">{option.label}</span>
                          <span className="ml-auto text-sm text-gray-500">
                            {filteredAndSortedTickets.filter(t => t.priority === option.value).length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Liste des tickets */}
        {filteredAndSortedTickets.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {hasActiveFilters ? 'Aucun ticket trouvé' : 'Aucun ticket'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {hasActiveFilters
                ? 'Aucun ticket ne correspond à vos critères de recherche. Essayez de modifier vos filtres.'
                : 'Vous n\'avez pas encore créé de ticket. Commencez par créer votre première demande.'
              }
            </p>
            <div className="flex items-center justify-center gap-4">
              {hasActiveFilters ? (
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Effacer les filtres
                </button>
              ) : null}
              <button
                onClick={handleCreateTicket}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                <Plus className="h-4 w-4" />
                Créer un ticket
              </button>
            </div>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'space-y-4'
          }`}>
            {filteredAndSortedTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleEditTicket}
                onDelete={handleDeleteTicket}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Modal de formulaire */}
        {showForm && (
          <TicketForm
            ticket={editingTicket}
            onSubmit={handleSubmitForm}
            onClose={handleCloseForm}
            loading={formLoading}
          />
        )}
      </div>
    </div>
  );
};

export default TicketList;