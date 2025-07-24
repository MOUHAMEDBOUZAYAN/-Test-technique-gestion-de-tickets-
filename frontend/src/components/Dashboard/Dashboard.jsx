import React from 'react';
import { Link } from 'react-router-dom';
import { TicketIcon, Plus, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useTickets } from '../../hooks/useTickets';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../Common/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const { tickets, stats, loading } = useTickets();

  if (loading) {
    return <Loading />;
  }

  const recentTickets = tickets.slice(0, 5);

  const statCards = [
    {
      name: 'Total des tickets',
      value: stats?.total || 0,
      icon: TicketIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'À faire',
      value: stats?.todo || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      name: 'En cours',
      value: stats?.in_progress || 0,
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      name: 'Terminés',
      value: stats?.done || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.username} ! 👋
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Voici un aperçu de vos tickets de support.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-md ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions rapides */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Actions rapides
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/tickets"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <TicketIcon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Voir tous les tickets
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Consulter et gérer tous vos tickets de support.
                </p>
              </div>
            </Link>

            <button
              onClick={() => window.location.href = '/tickets'}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                  <Plus className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  Créer un nouveau ticket
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Signaler un nouveau problème ou faire une demande.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tickets récents */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tickets récents
            </h3>
            <Link
              to="/tickets"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Voir tout
            </Link>
          </div>

          {recentTickets.length === 0 ? (
            <div className="text-center py-6">
              <TicketIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucun ticket
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par créer votre premier ticket.
              </p>
              <div className="mt-6">
                <Link
                  to="/tickets"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un ticket
                </Link>
              </div>
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentTickets.map((ticket) => (
                  <li key={ticket.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`h-8 w-8 rounded-full ${
                          ticket.priority === 'high' ? 'bg-red-100' :
                          ticket.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                        } flex items-center justify-center`}>
                          <TicketIcon className={`h-4 w-4 ${
                            ticket.priority === 'high' ? 'text-red-600' :
                            ticket.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {ticket.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ticket.status === 'done' ? 'bg-green-100 text-green-800' :
                          ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.status === 'done' ? 'Terminé' :
                           ticket.status === 'in_progress' ? 'En cours' : 'À faire'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;