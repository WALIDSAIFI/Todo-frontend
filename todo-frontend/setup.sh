#!/bin/bash

# TaskFlow Pro - Setup Script
# Ce script automatise l'installation et la configuration de l'application

echo "🚀 TaskFlow Pro - Configuration automatique"
echo "=========================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js (version 16 ou supérieure)"
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 ou supérieure est requise. Version actuelle: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) détecté"

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ npm $(npm -v) détecté"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "✅ Dépendances installées avec succès"

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "🔧 Création du fichier .env..."
    cp env.example .env
    echo "✅ Fichier .env créé"
    echo "⚠️  N'oubliez pas de configurer vos variables d'environnement dans le fichier .env"
else
    echo "✅ Fichier .env existe déjà"
fi

# Vérifier si le backend est accessible
echo "🔍 Vérification de la connexion au backend..."
if curl -s http://localhost:8000/api > /dev/null 2>&1; then
    echo "✅ Backend Laravel détecté sur http://localhost:8000"
else
    echo "⚠️  Backend Laravel non détecté sur http://localhost:8000"
    echo "   Assurez-vous que votre backend Laravel est en cours d'exécution"
fi

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Configurez vos variables d'environnement dans le fichier .env"
echo "2. Assurez-vous que votre backend Laravel est en cours d'exécution"
echo "3. Lancez l'application avec : npm run serve"
echo ""
echo "🌐 L'application sera accessible sur : http://localhost:8080"
echo ""
echo "📚 Consultez le README.md pour plus d'informations"
