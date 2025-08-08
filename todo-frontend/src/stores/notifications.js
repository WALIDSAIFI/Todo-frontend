import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useNotificationsStore = defineStore('notifications', () => {
  // State
  const notifications = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const unreadCount = computed(() => {
    return notifications.value?.filter(n => !n.read)?.length || 0
  })

  // Actions
  const fetchNotifications = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get('/api/notifications')
      notifications.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch notifications'
      console.error('Failed to fetch notifications:', err)
    } finally {
      loading.value = false
    }
  }

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    }
    
    notifications.value.unshift(newNotification)
    
    // Persist to localStorage for demo purposes
    // In a real app, this would be handled by the backend
    localStorage.setItem('notifications', JSON.stringify(notifications.value))
  }

  const markAsRead = async (id) => {
    try {
      await api.put(`/api/notifications/${id}/read`)
      const notification = notifications.value.find(n => n.id === id)
      if (notification) {
        notification.read = true
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
      // Fallback to local update
      const notification = notifications.value.find(n => n.id === id)
      if (notification) {
        notification.read = true
      }
    }
  }

  const markAllAsRead = async () => {
    try {
      await api.put('/api/notifications/mark-all-read')
      notifications.value.forEach(notification => {
        notification.read = true
      })
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
      // Fallback to local update
      notifications.value.forEach(notification => {
        notification.read = true
      })
    }
  }

  const removeNotification = async (id) => {
    try {
      await api.delete(`/api/notifications/${id}`)
      notifications.value = notifications.value.filter(n => n.id !== id)
    } catch (err) {
      console.error('Failed to remove notification:', err)
      // Fallback to local update
      notifications.value = notifications.value.filter(n => n.id !== id)
    }
  }

  const clearAll = async () => {
    try {
      await api.delete('/api/notifications')
      notifications.value = []
    } catch (err) {
      console.error('Failed to clear notifications:', err)
      // Fallback to local update
      notifications.value = []
    }
  }

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('notifications')
      if (stored) {
        notifications.value = JSON.parse(stored)
      }
    } catch (err) {
      console.error('Failed to load notifications from storage:', err)
    }
  }

  const saveToStorage = () => {
    try {
      localStorage.setItem('notifications', JSON.stringify(notifications.value))
    } catch (err) {
      console.error('Failed to save notifications to storage:', err)
    }
  }

  // Load notifications from storage on store initialization
  loadFromStorage()

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    loadFromStorage,
    saveToStorage
  }
})
