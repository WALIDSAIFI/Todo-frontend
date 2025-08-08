<template>
  <div class="card">
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
          class="btn-primary flex items-center space-x-2"
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
          class="btn-primary"
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
          class="btn-primary"
        >
          Create First Task
        </button>
      </div>

      <!-- Tasks List -->
      <div v-else class="space-y-4">
        <div
          v-for="(task, index) in tasks"
          :key="task.id"
          class="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 fade-in"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-1">
              <button
                @click="toggleTaskStatus(task.id)"
                :class="[
                  'flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110',
                  task.completed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                ]"
              >
                <svg v-if="task.completed" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
              
              <div class="flex-1 min-w-0">
                <h4
                  :class="[
                    'text-lg font-semibold mb-2',
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  ]"
                >
                  {{ task.title }}
                </h4>
                <p
                  :class="[
                    'text-gray-600 mb-3',
                    task.completed ? 'text-gray-400' : 'text-gray-600'
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
                    {{ task.priority }}
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
                @click="deleteTask(task.id)"
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

    <!-- Create Task Modal -->
    <TaskModal
      v-if="showCreateModal"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @saved="handleTaskSaved"
    />

    <!-- Edit Task Modal -->
    <TaskModal
      v-if="showEditModal"
      :show="showEditModal"
      :task="editingTask"
      @close="showEditModal = false"
      @saved="handleTaskSaved"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useToast } from 'vue-toastification'
import TaskModal from './TaskModal.vue'

export default {
  name: 'TaskList',
  components: {
    TaskModal
  },
  setup() {
    const tasksStore = useTasksStore()
    const toast = useToast()
    
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const editingTask = ref(null)

    const { tasks, loading, error, tasksCount, fetchTasks, deleteTask, toggleTaskStatus } = tasksStore

    const closeModal = () => {
      showCreateModal.value = false
      showEditModal.value = false
      editingTask.value = null
    }

    const editTask = (task) => {
      editingTask.value = { ...task }
      showEditModal.value = true
    }

    const handleTaskSaved = () => {
      closeModal()
      toast.success('Task saved successfully!')
    }

    const handleDeleteTask = async (id) => {
      if (confirm('Are you sure you want to delete this task?')) {
        const result = await deleteTask(id)
        if (result.success) {
          toast.success('Task deleted successfully!')
        } else {
          toast.error(result.message)
        }
      }
    }

    const handleToggleStatus = async (id) => {
      const result = await toggleTaskStatus(id)
      if (result.success) {
        toast.success('Task status updated!')
      } else {
        toast.error(result.message)
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString()
    }

    const completedTasksCount = computed(() => {
      return tasks.value?.filter(task => task.completed)?.length || 0
    })

    onMounted(() => {
      fetchTasks()
    })

    return {
      tasks,
      loading,
      error,
      tasksCount,
      completedTasksCount,
      showCreateModal,
      showEditModal,
      editingTask,
      closeModal,
      editTask,
      handleTaskSaved,
      deleteTask: handleDeleteTask,
      toggleTaskStatus: handleToggleStatus,
      formatDate
    }
  }
}
</script>
