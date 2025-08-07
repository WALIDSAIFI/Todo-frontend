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
            <!-- Notifications Badge -->
            <router-link
              to="/notifications"
              class="relative p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110"
            >
              <BellIcon class="h-6 w-6" />
              <span
                v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
              >
                {{ unreadCount > 9 ? '9+' : unreadCount }}
              </span>
            </router-link>
            
            <!-- User Menu -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105"
              >
                <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {{ userInitials }}
                </div>
                <div class="text-left">
                  <div class="text-sm font-semibold">{{ user?.full_name }}</div>
                  <div class="text-xs text-gray-500">{{ user?.email }}</div>
                </div>
                <ChevronDownIcon class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': showUserMenu }" />
              </button>
              
              <!-- User Dropdown -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 fade-in"
              >
                <div class="px-4 py-3 border-b border-gray-100">
                  <div class="font-semibold text-gray-900">{{ user?.full_name }}</div>
                  <div class="text-sm text-gray-500">{{ user?.email }}</div>
                </div>
                <div class="py-1">
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      <span>Sign out</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="mb-8 fade-in">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {{ user?.full_name?.split(' ')[0] }}! 👋
          </h2>
          <p class="text-gray-600 text-lg">
            Let's make today productive
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Tasks Section -->
        <div class="lg:col-span-2 slide-in">
          <TaskList />
        </div>
        
        <!-- Stats Section -->
        <div class="space-y-6 slide-in">
          <!-- Task Stats -->
          <div class="card p-6 card-hover">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-gray-900">Task Statistics</h3>
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-6">
              <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-sm font-medium text-gray-700">Total Tasks</span>
                </div>
                <span class="text-xl font-bold text-gray-900">{{ tasksCount }}</span>
              </div>
              <div class="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm font-medium text-gray-700">Completed</span>
                </div>
                <span class="text-xl font-bold text-green-600">{{ completedTasksCount }}</span>
              </div>
              <div class="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span class="text-sm font-medium text-gray-700">Pending</span>
                </div>
                <span class="text-xl font-bold text-yellow-600">{{ pendingTasksCount }}</span>
              </div>
              <div class="pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span class="text-lg font-bold text-blue-600">{{ completionRate }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                    :style="{ width: `${completionRate}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card p-6 card-hover">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button class="w-full btn-primary text-left flex items-center space-x-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add New Task</span>
              </button>
              <button class="w-full btn-secondary text-left flex items-center space-x-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>View Calendar</span>
              </button>
              <button class="w-full btn-secondary text-left flex items-center space-x-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'
import { useNotificationsStore } from '@/stores/notifications'
import { initializeEcho, disconnectEcho } from '@/services/echo'
import { BellIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import TaskList from '@/components/tasks/TaskList.vue'

export default {
  name: 'DashboardPage',
  components: {
    BellIcon,
    ChevronDownIcon,
    TaskList
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const tasksStore = useTasksStore()
    const notificationsStore = useNotificationsStore()
    
    const showUserMenu = ref(false)
    const showCreateModal = ref(false)

    const { user, logout, isAuthenticated } = authStore
    const { tasksCount, completedTasks, pendingTasks, fetchTasks } = tasksStore
    const { unreadCount } = notificationsStore

    // Check if user is authenticated
    onMounted(async () => {
      if (!isAuthenticated.value) {
        console.log('User not authenticated, redirecting to login')
        router.push('/login')
        return
      }

      // Initialize Echo for real-time notifications
      initializeEcho()
      
      // Fetch tasks if user is authenticated
      try {
        await fetchTasks()
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    })

    const userInitials = computed(() => {
      if (!user.value?.full_name) return 'U'
      return user.value.full_name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const completedTasksCount = computed(() => {
      return completedTasks.value?.length || 0
    })
    
    const pendingTasksCount = computed(() => {
      return pendingTasks.value?.length || 0
    })
    
    const completionRate = computed(() => {
      if (!tasksCount.value || tasksCount.value === 0) return 0
      return Math.round((completedTasksCount.value / tasksCount.value) * 100)
    })

    const handleLogout = () => {
      logout()
      router.push('/login')
    }

    const handleTaskSaved = () => {
      showCreateModal.value = false
    }

    onUnmounted(() => {
      // Disconnect Echo when component unmounts
      disconnectEcho()
    })

    return {
      user,
      showUserMenu,
      showCreateModal,
      unreadCount,
      tasksCount,
      completedTasksCount,
      pendingTasksCount,
      completionRate,
      userInitials,
      handleLogout,
      handleTaskSaved
    }
  }
}
</script>
