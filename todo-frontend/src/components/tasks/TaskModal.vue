<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {{ isEditing ? 'Edit Task' : 'Create New Task' }}
                </h3>
                
                <div class="space-y-4">
                  <!-- Title -->
                  <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      id="title"
                      v-model="form.title"
                      type="text"
                      required
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Enter task title"
                    />
                  </div>

                  <!-- Description -->
                  <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      v-model="form.description"
                      rows="3"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Enter task description"
                    ></textarea>
                  </div>

                  <!-- Priority -->
                  <div>
                    <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      id="priority"
                      v-model="form.priority"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <!-- Due Date -->
                  <div>
                    <label for="due_date" class="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                      id="due_date"
                      v-model="form.due_date"
                      type="date"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <!-- Completed Status (only for editing) -->
                  <div v-if="isEditing" class="flex items-center">
                    <input
                      id="completed"
                      v-model="form.completed"
                      type="checkbox"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label for="completed" class="ml-2 block text-sm text-gray-900">
                      Mark as completed
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
              </span>
              <span v-else>{{ isEditing ? 'Update' : 'Create' }}</span>
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
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

    const closeModal = () => {
      emit('close')
    }

    const handleSubmit = async () => {
      if (!form.title.trim()) {
        toast.error('Title is required')
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
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        toast.error('An error occurred while saving the task')
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      isEditing,
      closeModal,
      handleSubmit
    }
  }
}
</script>
