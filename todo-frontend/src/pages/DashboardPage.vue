<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Todo App</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Notifications Badge -->
            <router-link
              to="/notifications"
              class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <BellIcon class="h-6 w-6" />
              <span
                v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ unreadCount > 9 ? '9+' : unreadCount }}
              </span>
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
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Tasks Section -->
          <div class="lg:col-span-2">
            <TaskList />
          </div>
          
          <!-- Stats Section -->
          <div class="space-y-6">
            <!-- Task Stats -->
            <div class="bg-white shadow rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Task Statistics</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">Total Tasks</span>
                  <span class="text-lg font-semibold text-gray-900">{{ tasksCount }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">Completed</span>
                  <span class="text-lg font-semibold text-green-600">{{ completedTasksCount }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">Pending</span>
                  <span class="text-lg font-semibold text-yellow-600">{{ pendingTasksCount }}</span>
                </div>
                <div class="pt-2 border-t">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-600">Completion Rate</span>
                    <span class="text-lg font-semibold text-primary-600">{{ completionRate }}%</span>
                  </div>
                  <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${completionRate}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="bg-white shadow rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <button
                  @click="showCreateModal = true"
                  class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Add New Task
                </button>
                <router-link
                  to="/notifications"
                  class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <BellIcon class="h-4 w-4 mr-2" />
                  View Notifications
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create Task Modal -->
    <TaskModal
      v-if="showCreateModal"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @saved="handleTaskSaved"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'
import { useNotificationsStore } from '@/stores/notifications'
import { initializeEcho, disconnectEcho } from '@/services/echo'
import { BellIcon, ChevronDownIcon, PlusIcon } from '@heroicons/vue/24/outline'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskModal from '@/components/tasks/TaskModal.vue'

export default {
  name: 'DashboardPage',
  components: {
    BellIcon,
    ChevronDownIcon,
    PlusIcon,
    TaskList,
    TaskModal
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const tasksStore = useTasksStore()
    const notificationsStore = useNotificationsStore()
    
    const showUserMenu = ref(false)
    const showCreateModal = ref(false)

    const { user, logout } = authStore
    const { tasksCount, completedTasks, pendingTasks } = tasksStore
    const { unreadCount } = notificationsStore

    const userInitials = computed(() => {
      if (!user.value?.full_name) return 'U'
      return user.value.full_name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const completedTasksCount = computed(() => completedTasks.value.length)
    const pendingTasksCount = computed(() => pendingTasks.value.length)
    const completionRate = computed(() => {
      if (tasksCount.value === 0) return 0
      return Math.round((completedTasksCount.value / tasksCount.value) * 100)
    })

    const handleLogout = () => {
      logout()
      router.push('/login')
    }

    const handleTaskSaved = () => {
      showCreateModal.value = false
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
