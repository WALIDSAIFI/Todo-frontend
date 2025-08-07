# Todo App - Frontend (Vue.js)

Une application To-Do List moderne construite avec Vue.js 3, Pinia, et Tailwind CSS.

## 🚀 Fonctionnalités

- ✅ **Authentification JWT** - Inscription et connexion sécurisées
- ✅ **Gestion des tâches CRUD** - Créer, lire, mettre à jour, supprimer des tâches
- ✅ **Notifications en temps réel** - Notifications instantanées via Pusher
- ✅ **Interface moderne** - Design responsive avec Tailwind CSS
- ✅ **Gestion d'état** - Pinia pour la gestion d'état
- ✅ **Navigation** - Vue Router pour la navigation
- ✅ **Validation** - Validation des formulaires
- ✅ **Toast notifications** - Notifications utilisateur

## 🛠️ Technologies utilisées

- **Vue.js 3** - Framework JavaScript progressif
- **Pinia** - Gestion d'état
- **Vue Router** - Navigation
- **Tailwind CSS** - Framework CSS utilitaire
- **Axios** - Client HTTP
- **Pusher** - WebSockets pour les notifications en temps réel
- **Laravel Echo** - Client WebSocket pour Laravel
- **Vue Toastification** - Notifications toast
- **Heroicons** - Icônes SVG

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Backend Laravel configuré et en cours d'exécution

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd todo-frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp env.example .env
   ```
   
   Éditer le fichier `.env` :
   ```env
   VUE_APP_API_URL=http://localhost:8000
   VUE_APP_PUSHER_APP_KEY=your-pusher-key
   VUE_APP_PUSHER_APP_CLUSTER=mt1
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm run serve
   ```

5. **Ouvrir l'application**
   - L'application sera disponible à l'adresse : `http://localhost:8080`

## 📁 Structure du projet

```
src/
├── assets/              # Assets statiques
├── components/          # Composants Vue
│   ├── auth/           # Composants d'authentification
│   ├── tasks/          # Composants de gestion des tâches
│   └── notifications/  # Composants de notifications
├── pages/              # Pages de l'application
├── router/             # Configuration du routeur
├── services/           # Services (API, Echo)
├── stores/             # Stores Pinia
└── main.js             # Point d'entrée de l'application
```

## 🔧 Configuration

### Variables d'environnement

- `VUE_APP_API_URL` : URL de l'API Laravel
- `VUE_APP_PUSHER_APP_KEY` : Clé Pusher pour les WebSockets
- `VUE_APP_PUSHER_APP_CLUSTER` : Cluster Pusher

### Configuration Pusher

Pour les notifications en temps réel, vous devez configurer Pusher :

1. Créer un compte sur [Pusher](https://pusher.com)
2. Créer une nouvelle application
3. Copier les clés dans le fichier `.env`

## 🎯 Utilisation

### Authentification

1. **Inscription** : Accédez à `/register` pour créer un compte
2. **Connexion** : Accédez à `/login` pour vous connecter

### Gestion des tâches

1. **Créer une tâche** : Cliquez sur "Add Task" dans le tableau de bord
2. **Modifier une tâche** : Cliquez sur l'icône d'édition
3. **Supprimer une tâche** : Cliquez sur l'icône de suppression
4. **Marquer comme terminée** : Cliquez sur la case à cocher

### Notifications

- Les notifications apparaissent automatiquement lors de la création de tâches
- Accédez à `/notifications` pour voir toutes les notifications
- Marquez les notifications comme lues ou supprimez-les

## 🧪 Tests

```bash
# Lancer les tests unitaires
npm run test:unit

# Lancer les tests e2e
npm run test:e2e
```

## 📦 Build pour la production

```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run serve -- --mode production
```

## 🔍 Débogage

### Problèmes courants

1. **Erreur de connexion API**
   - Vérifiez que le backend Laravel est en cours d'exécution
   - Vérifiez l'URL dans `VUE_APP_API_URL`

2. **Notifications ne fonctionnent pas**
   - Vérifiez la configuration Pusher
   - Vérifiez que Laravel Echo est configuré côté backend

3. **Erreurs de CORS**
   - Configurez CORS dans le backend Laravel
   - Vérifiez les en-têtes de requête

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Note** : Ce projet fait partie d'une application Full Stack avec Laravel (backend) et Vue.js (frontend). Assurez-vous que le backend est correctement configuré et en cours d'exécution.
