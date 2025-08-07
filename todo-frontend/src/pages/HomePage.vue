<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <div class="mx-auto h-24 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
          <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          TaskFlow Pro
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Organisez vos tâches avec style et efficacité
        </p>
      </div>
      
      <div class="space-y-4">
        <router-link 
          to="/dashboard" 
          class="btn-primary inline-block px-8 py-4 text-lg font-semibold"
        >
          Accéder au Dashboard
        </router-link>
        
        <div class="text-gray-500">
          ou
        </div>
        
        <div class="space-x-4">
          <router-link 
            to="/login" 
            class="btn-secondary inline-block px-6 py-3"
          >
            Se connecter
          </router-link>
          
          <router-link 
            to="/register" 
            class="btn-primary inline-block px-6 py-3"
          >
            S'inscrire
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    onMounted(async () => {
      // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
      if (authStore.isAuthenticated) {
        router.push('/dashboard')
      }
    })
  }
}
</script>
