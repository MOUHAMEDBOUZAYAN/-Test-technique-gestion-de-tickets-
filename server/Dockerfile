# Utilise une image Node officielle comme image parente
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances en mode production
RUN npm install --production && npm cache clean --force

# Copie le reste de l'application
COPY . .

# Expose le port utilisé par l'app
EXPOSE 5000

# Healthcheck (optionnel)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/api/auth/health || exit 1

# Démarre l'application
CMD ["node", "server.js"]
