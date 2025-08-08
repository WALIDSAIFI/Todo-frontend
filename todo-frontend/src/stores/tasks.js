import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const tasksCount = computed(() => tasks.value.length)
  const completedTasksCount = computed(() => tasks.value.filter(task => task.is_completed).length)
  const pendingTasksCount = computed(() => tasks.value.filter(task => !task.is_completed).length)
  const completionRate = computed(() => {
    if (tasksCount.value === 0) return 0
    return Math.round((completedTasksCount.value / tasksCount.value) * 100)
  })

  // Actions
  const fetchTasks = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get('/tasks')
      tasks.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch tasks'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const createTask = async (taskData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/tasks', {
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.due_date,
        priority: taskData.priority || 'medium'
      })
      
      tasks.value.push(response.data)
      return { success: true, task: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create task'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (id, taskData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.put(`/tasks/${id}`, {
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.due_date,
        priority: taskData.priority,
        is_completed: taskData.is_completed
      })
      
      const index = tasks.value.findIndex(task => task.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
      
      return { success: true, task: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update task'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      await api.delete(`/tasks/${id}`)
      tasks.value = tasks.value.filter(task => task.id !== id)
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete task'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const toggleTaskStatus = async (id) => {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return { success: false, message: 'Task not found' }
    
    return await updateTask(id, {
      ...task,
      is_completed: !task.is_completed
    })
  }

  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    tasks.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    tasks,
    loading,
    error,
    
    // Getters
    tasksCount,
    completedTasksCount,
    pendingTasksCount,
    completionRate,
    
    // Actions
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    clearError,
    resetState
  }
})
