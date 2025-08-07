<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="text-xl font-semibold text-gray-900 hover:text-primary-600">
              Todo App
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link
              to="/dashboard"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon class="h-6 w-6" />
            </router-link>
            
            <!-- User Menu -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {{ userInitials }}
                </div>
                <span class="text-sm font-medium">{{ user?.full_name }}</span>
                <ChevronDownIcon class="h-4 w-4" />
              </button>
              
              <!-- User Dropdown -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <div class="px-4 py-2 text-sm text-gray-700 border-b">
                  <div class="font-medium">{{ user?.full_name }}</div>
                  <div class="text-gray-500">{{ user?.email }}</div>
                </div>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
          <p class="text-gray-600 mt-1">Stay updated with your task activities</p>
        </div>
        
        <NotificationList />
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { initializeEcho, disconnectEcho } from '@/services/echo'
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import NotificationList from '@/components/notifications/NotificationList.vue'

export default {
  name: 'NotificationsPage',
  components: {
    ArrowLeftIcon,
    ChevronDownIcon,
    NotificationList
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const showUserMenu = ref(false)

    const { user, logout } = authStore

    const userInitials = computed(() => {
      if (!user.value?.full_name) return 'U'
      return user.value.full_name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const handleLogout = () => {
      logout()
      router.push('/login')
    }

    onMounted(() => {
      // Initialize Echo for real-time notifications
      initializeEcho()
    })

    onUnmounted(() => {
      // Disconnect Echo when component unmounts
      disconnectEcho()
    })

    return {
      user,
      showUserMenu,
      userInitials,
      handleLogout
    }
  }
}
</script>
