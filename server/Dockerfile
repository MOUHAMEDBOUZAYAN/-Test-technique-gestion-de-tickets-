# Utilise une image Node officielle comme image parente
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Expose le port utilisé par l'app
EXPOSE 5000

# Démarre l'application
CMD ["node", "server.js"]
