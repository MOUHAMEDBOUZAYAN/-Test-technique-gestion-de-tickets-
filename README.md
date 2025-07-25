# 🎫 Application de Gestion de Tickets

Une solution complète et moderne de gestion de tickets d'assistance, construite avec React, Node.js, et PostgreSQL.

## 🚀 Aperçu

Cette application permet aux utilisateurs de créer, suivre, filtrer et gérer efficacement des tickets d'assistance ou de tâches. Elle offre une interface utilisateur intuitive avec un dashboard analytique et des fonctionnalités avancées de gestion des tickets.

## ✨ Fonctionnalités Principales

### 🔐 Authentification
- Inscription et connexion sécurisées
- Gestion de session via JWT
- Protection des routes et des données

### 📊 Dashboard Analytique
- Vue d'ensemble des statistiques en temps réel
- Affichage des tickets récents
- Taux de résolution et métriques de performance
- Actions rapides pour une productivité optimale

### 🎟️ Gestion Complète des Tickets
- **CRUD complet** : Création, lecture, modification et suppression
- **Visualisation détaillée** : Modal d'affichage des informations complètes
- **Système de filtrage avancé** :
  - Filtrage par statut (Ouvert, En cours, Résolu, Fermé)
  - Filtrage par priorité (Basse, Moyenne, Haute, Critique)
  - Recherche textuelle
  - Options de tri multiples
- **Modes d'affichage** : Vue en grille ou en liste
- **Interface responsive** : Optimisée pour tous les appareils

### 🔔 Notifications
- Interface utilisateur prête pour les notifications
- Architecture backend extensible pour les notifications temps réel

### 🛡️ Sécurité
- Middleware d'authentification robuste
- Validation des données côté serveur
- Gestion centralisée des erreurs
- Protection contre les vulnérabilités communes

## 🏗️ Architecture Technique

### Frontend (React)
```
src/
├── pages/
│   ├── Login/Register     # Authentification
│   ├── Dashboard          # Tableau de bord principal
│   └── TicketList         # Liste des tickets
├── components/
│   ├── TicketCard         # Carte de ticket
│   ├── TicketDetail       # Détails en modal
│   ├── TicketForm         # Formulaire de création/édition
│   ├── Header             # En-tête de l'application
│   └── Navbar             # Navigation principale
├── contexts/
│   └── AuthContext        # Gestion de l'état utilisateur
├── hooks/
│   ├── useAuth            # Hook d'authentification
│   └── useTickets         # Hook de gestion des tickets
└── services/
    ├── authService        # Appels API d'authentification
    └── ticketService      # Appels API des tickets
```

### Backend (Node.js/Express)
```
src/
├── routes/
│   ├── /api/auth          # Routes d'authentification
│   │   ├── POST /register
│   │   └── POST /login
│   └── /api/tickets       # Routes de gestion des tickets
│       ├── GET /          # Liste des tickets
│       ├── POST /         # Création
│       ├── PUT /:id       # Modification
│       ├── DELETE /:id    # Suppression
│       └── GET /stats     # Statistiques
├── controllers/
│   ├── AuthController     # Logique d'authentification
│   └── TicketController   # Logique de gestion des tickets
├── middleware/
│   ├── auth               # Validation JWT
│   ├── validation         # Validation des données
│   └── errorHandler       # Gestion des erreurs
├── models/
│   ├── User               # Modèle utilisateur
│   └── Ticket             # Modèle ticket
└── migrations/
    └── *.sql              # Scripts de création des tables
```

### Base de Données (PostgreSQL)
```sql
-- Table des utilisateurs
users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Table des tickets
tickets (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  status status_enum DEFAULT 'open',
  priority priority_enum DEFAULT 'medium',
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Énumérations
status_enum: 'open', 'in_progress', 'resolved', 'closed'
priority_enum: 'low', 'medium', 'high', 'critical'
```

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Framework JavaScript moderne
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Navigation côté client
- **Axios** - Client HTTP pour les appels API
- **React Hook Form** - Gestion des formulaires

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimaliste
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification par tokens
- **bcrypt** - Hachage des mots de passe
- **Joi/Yup** - Validation des données

### DevOps & Outils
- **Git** - Contrôle de version
- **npm/yarn** - Gestionnaire de paquets
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

## 📋 Prérequis

- Node.js (v16 ou supérieur)
- PostgreSQL (v12 ou supérieur)
- npm ou yarn

## 🚀 Installation et Configuration

### 1. Cloner le repository
```bash
git clone https://github.com/votre-username/ticket-management-app.git
cd ticket-management-app
```

### 2. Configuration du Backend
```bash
cd backend
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres de base de données
```

### 3. Configuration de la Base de Données
```bash
# Créer la base de données
createdb ticket_management

# Exécuter les migrations
npm run migrate
```

### 4. Configuration du Frontend
```bash
cd ../frontend
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
# Configurer l'URL de l'API backend
```

### 5. Lancement de l'Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📝 Variables d'Environnement

### Backend (.env)
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/ticket_management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

## 🧪 Tests

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## 📦 Scripts Disponibles

### Backend
- `npm run dev` - Démarrage en mode développement
- `npm run start` - Démarrage en production
- `npm run test` - Exécution des tests
- `npm run migrate` - Exécution des migrations

### Frontend
- `npm start` - Démarrage en mode développement
- `npm run build` - Build de production
- `npm run test` - Exécution des tests
- `npm run lint` - Vérification du code

## 🔮 Fonctionnalités Futures

- [ ] Notifications en temps réel (WebSocket)
- [ ] Système de commentaires sur les tickets
- [ ] Attribution automatique des tickets
- [ ] Rapports et analytics avancés
- [ ] API REST documentée avec Swagger
- [ ] Tests unitaires et d'intégration complets
- [ ] Déploiement containerisé (Docker)
- [ ] Système de rôles et permissions

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeur Principal** - [Bouzayan Mouhamed](https://github.com/MOUHAMEDBOUZAYAN/)

## 📞 Support

Pour toute question ou support, n'hésitez pas à :
- Ouvrir une issue sur GitHub
- Contacter l'équipe à mohammedbouzi177@gmail.com

---

⭐ N'oubliez pas de donner une étoile au projet si vous l'appréciez !

## 🐳 Dockerisation & Déploiement

### 1. Prérequis
- Docker & Docker Compose installés

### 2. Fichiers Docker
- Chaque dossier (`frontend/`, `server/`) contient un `Dockerfile` optimisé pour la production.
- Les fichiers `.env` doivent être créés dans `server/` et `frontend/` (voir exemples plus haut).

### 3. Exemple de docker-compose.yml
```yaml
db:
  image: postgres:15
  restart: always
  environment:
    POSTGRES_DB: ticket_management
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
  ports:
    - "5432:5432"
  volumes:
    - db_data:/var/lib/postgresql/data

backend:
  build: ./server
  environment:
    - DATABASE_URL=postgresql://postgres:postgres@db:5432/ticket_management
    - JWT_SECRET=your_jwt_secret_key
    - JWT_EXPIRES_IN=7d
    - NODE_ENV=production
    - PORT=5000
  ports:
    - "5000:5000"
  depends_on:
    - db

frontend:
  build: ./frontend
  environment:
    - VITE_API_URL=http://localhost:5000/api
  ports:
    - "3000:3000"
  depends_on:
    - backend

volumes:
  db_data:
```

### 4. Lancer l'application
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- PostgreSQL: localhost:5432

### 5. Conseils
- Adapter les variables d'environnement selon vos besoins.
- Pour la production, utiliser des secrets sécurisés et des réseaux privés Docker.
- Les migrations SQL doivent être lancées manuellement ou via un script d'init.
