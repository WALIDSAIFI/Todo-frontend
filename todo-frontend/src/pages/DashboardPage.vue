<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
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
            <!-- User Menu -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-all duration-200"
              >
                <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {{ userInitials }}
                </div>
                <div class="text-left">
                  <div class="text-sm font-semibold">{{ user?.full_name || 'User' }}</div>
                  <div class="text-xs text-gray-500">{{ user?.email || 'user@example.com' }}</div>
                </div>
                <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- User Dropdown -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100"
              >
                <div class="px-4 py-3 border-b border-gray-100">
                  <div class="font-semibold text-gray-900">{{ user?.full_name || 'User' }}</div>
                  <div class="text-sm text-gray-500">{{ user?.email || 'user@example.com' }}</div>
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
      <div class="mb-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {{ user?.full_name?.split(' ')[0] || 'User' }}! 👋
          </h2>
          <p class="text-gray-600 text-lg">
            Let's make today productive
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Tasks Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="p-6">
              <div class="flex justify-between items-center mb-8">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    My Tasks
                  </h3>
                  <p class="text-gray-600">
                    {{ tasksCount }} tasks • {{ completedTasksCount }} completed
                  </p>
                </div>
                <button
                  @click="showCreateModal = true"
                  class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>Add Task</span>
                </button>
              </div>

              <!-- Loading State -->
              <div v-if="loading" class="flex justify-center items-center py-12">
                <div class="flex flex-col items-center space-y-4">
                  <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                  <p class="text-gray-600 font-medium">Loading tasks...</p>
                </div>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="text-center py-12">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
                <p class="text-gray-600 mb-6">{{ error }}</p>
                <button
                  @click="fetchTasks"
                  class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Try Again
                </button>
              </div>

              <!-- Empty State -->
              <div v-else-if="tasks.length === 0" class="text-center py-12">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
                <p class="text-gray-600 mb-6">Create your first task to get started!</p>
                <button
                  @click="showCreateModal = true"
                  class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Create First Task
                </button>
              </div>

              <!-- Tasks List -->
              <div v-else class="space-y-4">
                <div
                  v-for="task in tasks"
                  :key="task.id"
                  class="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-4 flex-1">
                      <button
                        @click="handleToggleStatus(task.id)"
                        :class="[
                          'flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110',
                          task.is_completed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg'
                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                        ]"
                      >
                        <svg v-if="task.is_completed" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </button>
                      
                      <div class="flex-1 min-w-0">
                        <h4
                          :class="[
                            'text-lg font-semibold mb-2',
                            task.is_completed ? 'text-gray-500 line-through' : 'text-gray-900'
                          ]"
                        >
                          {{ task.title }}
                        </h4>
                        <p
                          :class="[
                            'text-gray-600 mb-3',
                            task.is_completed ? 'text-gray-400' : 'text-gray-600'
                          ]"
                        >
                          {{ task.description }}
                        </p>
                        
                        <div class="flex items-center space-x-3">
                          <span
                            :class="[
                              'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            ]"
                          >
                            <span class="w-2 h-2 rounded-full mr-2"
                              :class="[
                                task.priority === 'high' ? 'bg-red-500' : 
                                task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                              ]"
                            ></span>
                            {{ task.priority || 'medium' }}
                          </span>
                          
                          <div v-if="task.due_date" class="flex items-center space-x-1 text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-sm">{{ formatDate(task.due_date) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        @click="editTask(task)"
                        class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit task"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      
                      <button
                        @click="handleDeleteTask(task.id)"
                        class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete task"
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
        </div>
        
        <!-- Stats Section -->
        <div class="space-y-6">
          <!-- Task Stats -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button 
                @click="showCreateModal = true"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-left flex items-center space-x-3"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add New Task</span>
              </button>
              <button class="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-left flex items-center space-x-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>View Calendar</span>
              </button>
              <button class="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-left flex items-center space-x-3">
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

    <!-- Create Task Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" @click="showCreateModal = false"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Create New Task</h3>
              <button @click="showCreateModal = false" class="text-white hover:text-gray-200 transition-colors duration-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="bg-white px-6 py-6">
            <p class="text-gray-600">Task creation modal will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'

export default {
  name: 'DashboardPage',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const tasksStore = useTasksStore()
    
    const showUserMenu = ref(false)
    const showCreateModal = ref(false)

    const { user, logout, isAuthenticated, userInitials } = authStore
    const { 
      tasks, 
      loading, 
      error, 
      tasksCount, 
      completedTasksCount, 
      pendingTasksCount, 
      completionRate,
      fetchTasks, 
      deleteTask, 
      toggleTaskStatus 
    } = tasksStore

    // Check if user is authenticated
    onMounted(async () => {
      if (!isAuthenticated.value) {
        console.log('User not authenticated, redirecting to login')
        router.push('/login')
        return
      }
      
      // Fetch tasks if user is authenticated
      try {
        await fetchTasks()
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    })

    const handleLogout = async () => {
      await logout()
      router.push('/login')
    }

    const editTask = (task) => {
      console.log('Edit task:', task)
      // TODO: Implement edit functionality
    }

    const handleDeleteTask = async (id) => {
      if (confirm('Are you sure you want to delete this task?')) {
        const result = await deleteTask(id)
        if (result.success) {
          console.log('Task deleted successfully!')
        } else {
          console.error('Failed to delete task:', result.message)
        }
      }
    }

    const handleToggleStatus = async (id) => {
      const result = await toggleTaskStatus(id)
      if (result.success) {
        console.log('Task status updated!')
      } else {
        console.error('Failed to update task status:', result.message)
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString()
    }

    return {
      user,
      showUserMenu,
      showCreateModal,
      tasks,
      loading,
      error,
      tasksCount,
      completedTasksCount,
      pendingTasksCount,
      completionRate,
      userInitials,
      handleLogout,
      editTask,
      deleteTask: handleDeleteTask,
      toggleTaskStatus: handleToggleStatus,
      formatDate,
      fetchTasks
    }
  }
}
</script>
