<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Navigation -->
    <nav class="glass border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-all duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span class="font-medium">Back to Dashboard</span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BellIcon class="w-5 h-5 text-white" />
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notifications
              </h1>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
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
    <main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 fade-in">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              Notifications
            </h2>
            <p class="text-gray-600">
              {{ notifications.length }} notifications • {{ unreadCount }} unread
            </p>
          </div>
          
          <div class="flex space-x-3">
            <button
              v-if="unreadCount > 0"
              @click="markAllAsRead"
              class="btn-secondary flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Mark all as read</span>
            </button>
            
            <button
              v-if="notifications.length > 0"
              @click="clearAllNotifications"
              class="btn-secondary flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Clear all</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="space-y-4">
        <!-- Empty State -->
        <div v-if="notifications.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BellIcon class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
          <p class="text-gray-600 mb-6">You'll see notifications here when tasks are created or updated.</p>
          <router-link to="/dashboard" class="btn-primary">
            Go to Dashboard
          </router-link>
        </div>

        <!-- Notifications -->
        <div
          v-for="(notification, index) in notifications"
          :key="notification.id"
          class="card p-6 card-hover fade-in"
          :class="{ 'bg-blue-50 border-blue-200': !notification.read }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-start space-x-4">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  getNotificationIcon(notification.type).bg
                ]"
              >
                <component :is="getNotificationIcon(notification.type).icon" class="w-5 h-5 text-white" />
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">
                    {{ notification.title }}
                  </h4>
                  <p class="text-gray-600 mb-3">
                    {{ notification.message }}
                  </p>
                  
                  <!-- Task Details (if available) -->
                  <div v-if="notification.task" class="bg-gray-50 rounded-lg p-3 mb-3">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      <span class="text-sm font-medium text-gray-700">{{ notification.task.title }}</span>
                    </div>
                    <p v-if="notification.task.description" class="text-sm text-gray-600 mt-1">
                      {{ notification.task.description }}
                    </p>
                  </div>

                  <!-- Timestamp -->
                  <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ formatTimestamp(notification.timestamp) }}</span>
                    <span v-if="!notification.read" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      New
                    </span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center space-x-2">
                  <button
                    v-if="!notification.read"
                    @click="markAsRead(notification.id)"
                    class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="Mark as read"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                  
                  <button
                    @click="removeNotification(notification.id)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Remove notification"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { BellIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'NotificationsPage',
  components: {
    BellIcon,
    ChevronDownIcon
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const notificationsStore = useNotificationsStore()
    
    const showUserMenu = ref(false)

    const { user, logout, isAuthenticated } = authStore
    const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = notificationsStore

    // Check if user is authenticated
    onMounted(() => {
      if (!isAuthenticated.value) {
        console.log('User not authenticated, redirecting to login')
        router.push('/login')
        return
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

    const handleLogout = () => {
      logout()
      router.push('/login')
    }

    const clearAllNotifications = () => {
      if (confirm('Are you sure you want to clear all notifications?')) {
        clearAll()
      }
    }

    const getNotificationIcon = (type) => {
      const icons = {
        task_created: {
          icon: 'svg',
          bg: 'bg-green-500',
          path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        task_updated: {
          icon: 'svg',
          bg: 'bg-blue-500',
          path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
        },
        task_deleted: {
          icon: 'svg',
          bg: 'bg-red-500',
          path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
        },
        default: {
          icon: 'svg',
          bg: 'bg-gray-500',
          path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      }
      
      return icons[type] || icons.default
    }

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp)
      const now = new Date()
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      
      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
      
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
      
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
      
      return date.toLocaleDateString()
    }

    return {
      user,
      showUserMenu,
      notifications,
      unreadCount,
      userInitials,
      handleLogout,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications,
      getNotificationIcon,
      formatTimestamp
    }
  }
}
</script>
