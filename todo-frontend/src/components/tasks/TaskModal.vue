<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full fade-in">
        <form @submit.prevent="handleSubmit">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">
                {{ isEditing ? 'Edit Task' : 'Create New Task' }}
              </h3>
              <button
                @click="closeModal"
                class="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="bg-white px-6 py-6">
            <div class="space-y-6">
              <!-- Title -->
              <div>
                <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title <span class="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.title }"
                  placeholder="What needs to be done?"
                />
                <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
              </div>

              <!-- Description -->
              <div>
                <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.description }"
                  placeholder="Add more details about this task..."
                ></textarea>
                <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
              </div>

              <!-- Priority and Due Date Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Priority -->
                <div>
                  <label for="priority" class="block text-sm font-semibold text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    v-model="form.priority"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.priority }"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <p v-if="errors.priority" class="mt-1 text-sm text-red-600">{{ errors.priority }}</p>
                </div>

                <!-- Due Date -->
                <div>
                  <label for="due_date" class="block text-sm font-semibold text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    id="due_date"
                    v-model="form.due_date"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.due_date }"
                  />
                  <p v-if="errors.due_date" class="mt-1 text-sm text-red-600">{{ errors.due_date }}</p>
                </div>
              </div>

              <!-- Completed Status (only for editing) -->
              <div v-if="isEditing" class="flex items-center p-4 bg-gray-50 rounded-xl">
                <input
                  id="completed"
                  v-model="form.completed"
                  type="checkbox"
                  class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="completed" class="ml-3 block text-sm font-medium text-gray-900">
                  Mark as completed
                </label>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-6 py-4 rounded-b-2xl">
            <div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                @click="closeModal"
                class="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span v-if="loading" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task') }}
                </span>
                <span v-else>{{ isEditing ? 'Update Task' : 'Create Task' }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useToast } from 'vue-toastification'

export default {
  name: 'TaskModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'saved'],
  setup(props, { emit }) {
    const tasksStore = useTasksStore()
    const toast = useToast()
    
    const loading = ref(false)
    const errors = reactive({})
    
    const form = reactive({
      title: '',
      description: '',
      priority: 'medium',
      due_date: '',
      completed: false
    })

    const isEditing = computed(() => !!props.task)

    // Reset form when modal opens/closes
    watch(() => props.show, (show) => {
      if (show) {
        clearErrors()
        if (props.task) {
          // Editing mode - populate form with task data
          Object.assign(form, {
            title: props.task.title || '',
            description: props.task.description || '',
            priority: props.task.priority || 'medium',
            due_date: props.task.due_date ? new Date(props.task.due_date).toISOString().split('T')[0] : '',
            completed: props.task.completed || false
          })
        } else {
          // Create mode - reset form
          Object.assign(form, {
            title: '',
            description: '',
            priority: 'medium',
            due_date: '',
            completed: false
          })
        }
      }
    })

    const clearErrors = () => {
      Object.keys(errors).forEach(key => {
        errors[key] = ''
      })
    }

    const validateForm = () => {
      clearErrors()
      let isValid = true

      if (!form.title.trim()) {
        errors.title = 'Title is required'
        isValid = false
      }

      if (form.title.length > 255) {
        errors.title = 'Title must be less than 255 characters'
        isValid = false
      }

      if (form.description && form.description.length > 1000) {
        errors.description = 'Description must be less than 1000 characters'
        isValid = false
      }

      if (form.due_date) {
        const selectedDate = new Date(form.due_date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (selectedDate < today) {
          errors.due_date = 'Due date cannot be in the past'
          isValid = false
        }
      }

      return isValid
    }

    const closeModal = () => {
      emit('close')
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        return
      }

      loading.value = true
      
      try {
        let result
        if (isEditing.value) {
          result = await tasksStore.updateTask(props.task.id, form)
        } else {
          result = await tasksStore.createTask(form)
        }

        if (result.success) {
          emit('saved')
          toast.success(isEditing.value ? 'Task updated successfully!' : 'Task created successfully!')
        } else {
          // Handle validation errors from backend
          if (result.message && typeof result.message === 'object') {
            Object.keys(result.message).forEach(key => {
              errors[key] = Array.isArray(result.message[key]) ? result.message[key][0] : result.message[key]
            })
          } else {
            toast.error(result.message || 'An error occurred while saving the task')
          }
        }
      } catch (error) {
        console.error('Task save error:', error)
        toast.error('An error occurred while saving the task')
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      errors,
      isEditing,
      closeModal,
      handleSubmit
    }
  }
}
</script>
