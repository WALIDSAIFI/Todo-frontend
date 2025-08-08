# TaskFlow Pro - Vue.js Frontend

Une application de gestion de tâches moderne construite avec Vue.js 3, Pinia, et Tailwind CSS, avec des notifications en temps réel via Pusher.

## 🚀 Fonctionnalités

### 🔐 Authentification
- **Inscription** : Création de compte avec nom complet, email, téléphone et mot de passe
- **Connexion** : Authentification sécurisée avec JWT
- **Protection des routes** : Middleware d'authentification pour les pages protégées

### 📋 Gestion des Tâches (CRUD)
- **Création** : Ajouter de nouvelles tâches avec titre, description, priorité et date d'échéance
- **Lecture** : Afficher la liste des tâches avec filtres et statistiques
- **Modification** : Éditer les tâches existantes
- **Suppression** : Supprimer des tâches avec confirmation
- **Statut** : Marquer les tâches comme complétées/incomplètes

### 🔔 Notifications en Temps Réel
- **Notifications push** : Recevoir des notifications instantanées lors de la création/modification/suppression de tâches
- **Page dédiée** : Interface dédiée pour consulter l'historique des notifications
- **Badge de notification** : Indicateur visuel du nombre de notifications non lues
- **Marquage comme lu** : Possibilité de marquer les notifications comme lues

### 🎨 Interface Utilisateur
- **Design moderne** : Interface utilisateur élégante avec Tailwind CSS
- **Responsive** : Compatible mobile, tablette et desktop
- **Animations** : Transitions fluides et animations CSS
- **Thème** : Design cohérent avec dégradés et couleurs modernes

## 🛠️ Technologies Utilisées

- **Vue.js 3** : Framework JavaScript progressif
- **Pinia** : Gestion d'état moderne pour Vue
- **Vue Router** : Routage côté client
- **Tailwind CSS** : Framework CSS utilitaire
- **Axios** : Client HTTP pour les appels API
- **Laravel Echo** : Client WebSocket pour les notifications en temps réel
- **Pusher** : Service de WebSockets pour les notifications
- **Vue Toastification** : Notifications toast élégantes

## 📋 Prérequis

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**
- **Backend Laravel** en cours d'exécution sur `http://localhost:8000`

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone <repository-url>
cd todo-frontend
```

### 2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

### 3. Configuration de l'environnement
Copiez le fichier d'environnement d'exemple :
```bash
cp env.example .env
```

Modifiez le fichier `.env` avec vos configurations :
```env
# Vue App Configuration
VUE_APP_API_URL=http://localhost:8000
VUE_APP_PUSHER_APP_KEY=your-pusher-key
VUE_APP_PUSHER_APP_CLUSTER=mt1
VUE_APP_PUSHER_APP_SECRET=your-pusher-secret

# Development Configuration
NODE_ENV=development
VUE_APP_ENV=development
```

### 4. Configuration Pusher (optionnel)
Pour les notifications en temps réel, configurez Pusher :
1. Créez un compte sur [Pusher](https://pusher.com/)
2. Créez une nouvelle application
3. Copiez les clés dans votre fichier `.env`

### 5. Démarrer l'application
```bash
npm run serve
# ou
yarn serve
```

L'application sera accessible sur `http://localhost:8080`

## 📁 Structure du Projet

```
src/
├── assets/              # Ressources statiques
├── components/          # Composants Vue
│   ├── auth/           # Composants d'authentification
│   ├── notifications/  # Composants de notifications
│   └── tasks/          # Composants de gestion des tâches
├── pages/              # Pages de l'application
├── router/             # Configuration du routage
├── services/           # Services (API, Echo)
├── stores/             # Stores Pinia
└── main.js             # Point d'entrée de l'application
```

## 🔧 Configuration Backend

Assurez-vous que votre backend Laravel est configuré avec :

### 1. Routes API
```php
// routes/api.php
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);
    Route::apiResource('notifications', NotificationController::class);
});
```

### 2. Configuration CORS
```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:8080'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 3. Configuration Broadcasting (pour les notifications)
```php
// config/broadcasting.php
'pusher' => [
    'driver' => 'pusher',
    'key' => env('PUSHER_APP_KEY'),
    'secret' => env('PUSHER_APP_SECRET'),
    'app_id' => env('PUSHER_APP_ID'),
    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'useTLS' => true
    ],
],
```

## 🎯 Utilisation

### 1. Création de compte
- Accédez à `/register`
- Remplissez le formulaire avec vos informations
- Cliquez sur "Create Account"

### 2. Connexion
- Accédez à `/login`
- Entrez vos identifiants
- Cliquez sur "Sign In"

### 3. Gestion des tâches
- **Créer une tâche** : Cliquez sur "Add Task" dans le dashboard
- **Modifier une tâche** : Cliquez sur l'icône d'édition
- **Supprimer une tâche** : Cliquez sur l'icône de suppression
- **Marquer comme complétée** : Cliquez sur le cercle à côté du titre

### 4. Notifications
- **Voir les notifications** : Cliquez sur l'icône de cloche dans la navigation
- **Marquer comme lu** : Cliquez sur l'icône de validation
- **Supprimer** : Cliquez sur l'icône de suppression

## 🔍 Développement

### Scripts disponibles
```bash
# Démarrer le serveur de développement
npm run serve

# Build pour la production
npm run build

# Linter et correction automatique
npm run lint

# Tests unitaires
npm run test:unit
```

### Ajout de nouvelles fonctionnalités
1. **Nouveau composant** : Créez dans `src/components/`
2. **Nouvelle page** : Créez dans `src/pages/` et ajoutez la route
3. **Nouveau store** : Créez dans `src/stores/` avec Pinia
4. **Nouvelle API** : Ajoutez dans `src/services/api.js`

## 🐛 Dépannage

### Problèmes courants

#### 1. Erreur de connexion API
```
Error: Network Error
```
**Solution** : Vérifiez que le backend Laravel est en cours d'exécution sur `http://localhost:8000`

#### 2. Erreur CORS
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution** : Vérifiez la configuration CORS dans le backend Laravel

#### 3. Notifications en temps réel ne fonctionnent pas
**Solution** : 
- Vérifiez la configuration Pusher dans `.env`
- Assurez-vous que le broadcasting est configuré dans Laravel
- Vérifiez les logs de la console pour les erreurs Echo

#### 4. Erreur d'authentification
```
401 Unauthorized
```
**Solution** : 
- Vérifiez que le token JWT est valide
- Assurez-vous que l'utilisateur est connecté
- Vérifiez la configuration Sanctum dans Laravel

## 📝 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Informations utilisateur

### Tâches
- `GET /api/tasks` - Liste des tâches
- `POST /api/tasks` - Créer une tâche
- `GET /api/tasks/{id}` - Détails d'une tâche
- `PUT /api/tasks/{id}` - Modifier une tâche
- `DELETE /api/tasks/{id}` - Supprimer une tâche

### Notifications
- `GET /api/notifications` - Liste des notifications
- `PUT /api/notifications/{id}/read` - Marquer comme lu
- `PUT /api/notifications/mark-all-read` - Tout marquer comme lu
- `DELETE /api/notifications/{id}` - Supprimer une notification
- `DELETE /api/notifications` - Supprimer toutes les notifications

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développement initial* - [VotreGitHub](https://github.com/votre-username)

## 🙏 Remerciements

- [Vue.js](https://vuejs.org/) - Framework JavaScript progressif
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [Pusher](https://pusher.com/) - Service de WebSockets
- [Laravel](https://laravel.com/) - Framework PHP pour le backend
