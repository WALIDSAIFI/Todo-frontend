# Guide de Déploiement - TaskFlow Pro

Ce guide vous explique comment déployer l'application TaskFlow Pro en production.

## 🚀 Déploiement Frontend (Vue.js)

### 1. Build de Production

```bash
# Installer les dépendances
npm install

# Build pour la production
npm run build
```

Le build sera généré dans le dossier `dist/`.

### 2. Configuration de Production

Créez un fichier `.env.production` :

```env
# Production Configuration
VUE_APP_API_URL=https://votre-api-domain.com
VUE_APP_PUSHER_APP_KEY=votre-pusher-key
VUE_APP_PUSHER_APP_CLUSTER=votre-cluster
VUE_APP_PUSHER_APP_SECRET=votre-pusher-secret

# Production Environment
NODE_ENV=production
VUE_APP_ENV=production
```

### 3. Options de Déploiement

#### A. Déploiement sur Vercel

1. **Installer Vercel CLI** :
```bash
npm i -g vercel
```

2. **Déployer** :
```bash
vercel
```

3. **Configuration Vercel** (vercel.json) :
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### B. Déploiement sur Netlify

1. **Installer Netlify CLI** :
```bash
npm install -g netlify-cli
```

2. **Déployer** :
```bash
netlify deploy --prod --dir=dist
```

3. **Configuration Netlify** (netlify.toml) :
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### C. Déploiement sur AWS S3 + CloudFront

1. **Configurer AWS CLI** :
```bash
aws configure
```

2. **Créer un bucket S3** :
```bash
aws s3 mb s3://votre-app-bucket
```

3. **Uploader les fichiers** :
```bash
aws s3 sync dist/ s3://votre-app-bucket --delete
```

4. **Configurer CloudFront** pour servir l'application SPA.

#### D. Déploiement sur Nginx

1. **Installer Nginx** :
```bash
sudo apt update
sudo apt install nginx
```

2. **Configuration Nginx** (/etc/nginx/sites-available/taskflow) :
```nginx
server {
    listen 80;
    server_name votre-domain.com;
    root /var/www/taskflow/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

3. **Activer le site** :
```bash
sudo ln -s /etc/nginx/sites-available/taskflow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Configuration Backend (Laravel)

### 1. Variables d'Environnement

Créez un fichier `.env` sur votre serveur :

```env
APP_NAME="TaskFlow Pro"
APP_ENV=production
APP_KEY=base64:votre-clé-générée
APP_DEBUG=false
APP_URL=https://votre-api-domain.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskflow_production
DB_USERNAME=votre-username
DB_PASSWORD=votre-password

BROADCAST_DRIVER=pusher
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

PUSHER_APP_ID=votre-app-id
PUSHER_APP_KEY=votre-app-key
PUSHER_APP_SECRET=votre-app-secret
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=votre-cluster

SANCTUM_STATEFUL_DOMAINS=votre-frontend-domain.com
SESSION_DOMAIN=.votre-domain.com
```

### 2. Déploiement Laravel

#### A. Déploiement sur Forge/Laravel Vapor

1. **Laravel Forge** :
   - Connectez votre repository GitHub
   - Configurez le serveur
   - Déployez automatiquement

2. **Laravel Vapor** :
```bash
composer require laravel/vapor-cli --update-with-dependencies
vapor deploy production
```

#### B. Déploiement Manuel

1. **Préparer le serveur** :
```bash
# Installer les dépendances système
sudo apt update
sudo apt install nginx mysql-server php8.1-fpm php8.1-mysql php8.1-redis composer

# Installer Redis
sudo apt install redis-server
sudo systemctl enable redis-server
```

2. **Cloner et configurer** :
```bash
cd /var/www
sudo git clone votre-repo taskflow-backend
cd taskflow-backend
sudo chown -R www-data:www-data .
composer install --no-dev --optimize-autoloader
```

3. **Configuration Laravel** :
```bash
cp .env.example .env
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

4. **Migration de la base de données** :
```bash
php artisan migrate --force
```

5. **Configuration Nginx** :
```nginx
server {
    listen 80;
    server_name api.votre-domain.com;
    root /var/www/taskflow-backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## 🔒 Sécurité

### 1. SSL/HTTPS

Installer Certbot pour Let's Encrypt :

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domain.com -d api.votre-domain.com
```

### 2. Firewall

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. Base de Données

```bash
# Créer un utilisateur dédié
CREATE USER 'taskflow'@'localhost' IDENTIFIED BY 'mot-de-passe-securise';
GRANT ALL PRIVILEGES ON taskflow_production.* TO 'taskflow'@'localhost';
FLUSH PRIVILEGES;
```

## 📊 Monitoring

### 1. Logs

```bash
# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs Laravel
tail -f storage/logs/laravel.log

# Logs Redis
sudo tail -f /var/log/redis/redis-server.log
```

### 2. Performance

```bash
# Installer New Relic ou DataDog pour le monitoring
# Configurer les alertes pour :
# - Temps de réponse API
# - Utilisation CPU/Mémoire
# - Erreurs 5xx
# - Disponibilité du service
```

## 🔄 CI/CD

### GitHub Actions

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VUE_APP_API_URL: ${{ secrets.VUE_APP_API_URL }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.1'
        
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/taskflow-backend
          git pull origin main
          composer install --no-dev --optimize-autoloader
          php artisan migrate --force
          php artisan config:cache
          php artisan route:cache
          php artisan view:cache
          sudo systemctl reload nginx
```

## 🚨 Troubleshooting

### Problèmes Courants

1. **Erreur CORS** :
   - Vérifier la configuration CORS dans Laravel
   - S'assurer que les domaines sont correctement configurés

2. **Notifications ne fonctionnent pas** :
   - Vérifier la configuration Pusher
   - Tester la connexion WebSocket

3. **Performance lente** :
   - Activer le cache Redis
   - Optimiser les requêtes de base de données
   - Utiliser CDN pour les assets statiques

4. **Erreurs 500** :
   - Vérifier les logs Laravel
   - S'assurer que les permissions sont correctes
   - Vérifier la configuration PHP

## 📞 Support

Pour toute question concernant le déploiement, consultez :
- [Documentation Laravel](https://laravel.com/docs/deployment)
- [Documentation Vue.js](https://vuejs.org/guide/best-practices/production-deployment.html)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Netlify](https://docs.netlify.com/)
