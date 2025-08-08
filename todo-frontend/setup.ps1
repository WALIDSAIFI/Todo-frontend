# TaskFlow Pro - Setup Script (PowerShell)
# Ce script automatise l'installation et la configuration de l'application sur Windows

Write-Host "🚀 TaskFlow Pro - Configuration automatique" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Vérifier si Node.js est installé
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé. Veuillez installer Node.js (version 16 ou supérieure)" -ForegroundColor Red
    exit 1
}

# Vérifier la version de Node.js
$nodeMajorVersion = (node --version).Split('.')[0].TrimStart('v')
if ([int]$nodeMajorVersion -lt 16) {
    Write-Host "❌ Node.js version 16 ou supérieure est requise. Version actuelle: $(node --version)" -ForegroundColor Red
    exit 1
}

# Vérifier si npm est installé
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ npm n'est pas installé" -ForegroundColor Red
    exit 1
}

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dépendances installées avec succès" -ForegroundColor Green

# Créer le fichier .env s'il n'existe pas
if (-not (Test-Path ".env")) {
    Write-Host "🔧 Création du fichier .env..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "✅ Fichier .env créé" -ForegroundColor Green
    Write-Host "⚠️  N'oubliez pas de configurer vos variables d'environnement dans le fichier .env" -ForegroundColor Yellow
} else {
    Write-Host "✅ Fichier .env existe déjà" -ForegroundColor Green
}

# Vérifier si le backend est accessible
Write-Host "🔍 Vérification de la connexion au backend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend Laravel détecté sur http://localhost:8000" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Backend Laravel non détecté sur http://localhost:8000" -ForegroundColor Yellow
    Write-Host "   Assurez-vous que votre backend Laravel est en cours d'exécution" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Configuration terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Prochaines étapes :" -ForegroundColor Cyan
Write-Host "1. Configurez vos variables d'environnement dans le fichier .env" -ForegroundColor White
Write-Host "2. Assurez-vous que votre backend Laravel est en cours d'exécution" -ForegroundColor White
Write-Host "3. Lancez l'application avec : npm run serve" -ForegroundColor White
Write-Host ""
Write-Host "🌐 L'application sera accessible sur : http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Consultez le README.md pour plus d'informations" -ForegroundColor Cyan
