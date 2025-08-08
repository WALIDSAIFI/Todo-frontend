<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Navigation -->
    <nav class="glass border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow Pro
              </h1>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <template v-if="isAuthenticated">
              <router-link
                to="/dashboard"
                class="btn-primary px-4 py-2 text-sm"
              >
                Dashboard
              </router-link>
              <button
                @click="handleLogout"
                class="btn-secondary px-4 py-2 text-sm"
              >
                Déconnexion
              </button>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="btn-secondary px-4 py-2 text-sm"
              >
                Connexion
              </router-link>
              <router-link
                to="/register"
                class="btn-primary px-4 py-2 text-sm"
              >
                Inscription
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-4xl mx-auto">
        <div class="mb-8 fade-in">
          <div class="mx-auto h-24 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            TaskFlow Pro
          </h1>
          <p class="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organisez vos tâches avec style et efficacité. Une application moderne pour une productivité maximale.
          </p>
        </div>
        
        <div class="space-y-6 fade-in" style="animation-delay: 0.2s;">
          <div class="space-y-4">
            <template v-if="isAuthenticated">
              <router-link 
                to="/dashboard" 
                class="btn-primary inline-block px-8 py-4 text-lg font-semibold"
              >
                Accéder au Dashboard
              </router-link>
            </template>
            <template v-else>
              <div class="space-x-4">
                <router-link 
                  to="/login" 
                  class="btn-secondary inline-block px-8 py-4 text-lg font-semibold"
                >
                  Se connecter
                </router-link>
                
                <router-link 
                  to="/register" 
                  class="btn-primary inline-block px-8 py-4 text-lg font-semibold"
                >
                  S'inscrire
                </router-link>
              </div>
            </template>
          </div>
        </div>

        <!-- Features Section -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 fade-in" style="animation-delay: 0.4s;">
          <div class="card p-6 text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Gestion des Tâches</h3>
            <p class="text-gray-600">Créez, organisez et suivez vos tâches avec une interface intuitive et moderne.</p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Notifications Temps Réel</h3>
            <p class="text-gray-600">Recevez des notifications instantanées pour rester informé de vos activités.</p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Sécurité Avancée</h3>
            <p class="text-gray-600">Authentification JWT sécurisée pour protéger vos données personnelles.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const isAuthenticated = computed(() => authStore.isAuthenticated)

    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }

    return {
      isAuthenticated,
      handleLogout
    }
  }
}
</script>
