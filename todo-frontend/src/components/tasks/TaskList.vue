<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          My Tasks ({{ tasksCount }})
        </h3>
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon class="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <div class="text-red-600 mb-4">{{ error }}</div>
        <button
          @click="fetchTasks"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          Retry
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="tasks.length === 0" class="text-center py-8">
        <div class="text-gray-500 mb-4">No tasks yet. Create your first task!</div>
      </div>

      <!-- Tasks List -->
      <div v-else class="space-y-3">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center space-x-3">
            <button
              @click="toggleTaskStatus(task.id)"
              :class="[
                'flex-shrink-0 w-5 h-5 rounded border-2 transition-colors',
                task.completed
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 hover:border-primary-500'
              ]"
            >
              <CheckIcon v-if="task.completed" class="w-3 h-3 text-white" />
            </button>
            
            <div class="flex-1">
              <h4
                :class="[
                  'text-sm font-medium',
                  task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                ]"
              >
                {{ task.title }}
              </h4>
              <p
                :class="[
                  'text-sm',
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                ]"
              >
                {{ task.description }}
              </p>
              <div class="flex items-center space-x-2 mt-1">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ task.priority }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ formatDate(task.due_date) }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <button
              @click="editTask(task)"
              class="text-gray-400 hover:text-primary-600 transition-colors"
            >
              <PencilIcon class="h-4 w-4" />
            </button>
            <button
              @click="deleteTask(task.id)"
              class="text-gray-400 hover:text-red-600 transition-colors"
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Task Modal -->
    <TaskModal
      v-if="showCreateModal || editingTask"
      :show="showCreateModal || !!editingTask"
      :task="editingTask"
      @close="closeModal"
      @saved="handleTaskSaved"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useToast } from 'vue-toastification'
import { PlusIcon, CheckIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import TaskModal from './TaskModal.vue'

export default {
  name: 'TaskList',
  components: {
    PlusIcon,
    CheckIcon,
    PencilIcon,
    TrashIcon,
    TaskModal
  },
  setup() {
    const tasksStore = useTasksStore()
    const toast = useToast()
    
    const showCreateModal = ref(false)
    const editingTask = ref(null)

    const { tasks, loading, error, tasksCount, fetchTasks, deleteTask, toggleTaskStatus } = tasksStore

    const closeModal = () => {
      showCreateModal.value = false
      editingTask.value = null
    }

    const editTask = (task) => {
      editingTask.value = { ...task }
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

    onMounted(() => {
      fetchTasks()
    })

    return {
      tasks,
      loading,
      error,
      tasksCount,
      showCreateModal,
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
