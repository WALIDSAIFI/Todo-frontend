import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const completedTasks = computed(() => {
    return tasks.value?.filter(task => task.completed) || []
  })
  
  const pendingTasks = computed(() => {
    return tasks.value?.filter(task => !task.completed) || []
  })
  
  const tasksCount = computed(() => {
    return tasks.value?.length || 0
  })

  // Actions
  const fetchTasks = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('/api/tasks')
      tasks.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch tasks'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createTask = async (taskData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.post('/api/tasks', taskData)
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
      const response = await axios.put(`/api/tasks/${id}`, taskData)
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
      await axios.delete(`/api/tasks/${id}`)
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
    
    return await updateTask(id, { completed: !task.completed })
  }

  const getTaskById = (id) => {
    return tasks.value.find(task => task.id === id)
  }

  return {
    tasks,
    loading,
    error,
    completedTasks,
    pendingTasks,
    tasksCount,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskById
  }
})
