import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { useNotificationsStore } from '@/stores/notifications'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

// Configure Pusher
window.Pusher = Pusher

let echo = null

const createEcho = () => {
  const authStore = useAuthStore()
  
  if (!authStore.token) {
    console.warn('No authentication token available for Echo')
    return null
  }

  try {
    echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.VUE_APP_PUSHER_APP_KEY || 'your-pusher-key',
      cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER || 'mt1',
      forceTLS: true,
      authEndpoint: `${process.env.VUE_APP_API_URL || 'http://localhost:8000'}/broadcasting/auth`,
      auth: {
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Authorization': `Bearer ${authStore.token}`,
          'Accept': 'application/json'
        }
      },
      enabledTransports: ['ws', 'wss']
    })

    return echo
  } catch (error) {
    console.error('Failed to create Echo instance:', error)
    return null
  }
}

// Listen for task creation notifications
export const initializeEcho = () => {
  const authStore = useAuthStore()
  const notificationsStore = useNotificationsStore()
  const toast = useToast()

  if (!authStore.isAuthenticated || !authStore.user) {
    console.warn('User not authenticated, skipping Echo initialization')
    return
  }

  try {
    if (!echo) {
      echo = createEcho()
    }

    if (!echo) {
      console.error('Failed to create Echo instance')
      return
    }

    // Listen to private channel for user notifications
    echo.private(`user.${authStore.user.id}`)
      .notification((notification) => {
        console.log('Received notification:', notification)
        
        // Add notification to store
        notificationsStore.addNotification({
          type: 'task_created',
          title: 'New Task Created',
          message: `Task "${notification.task?.title || 'Unknown'}" has been created successfully!`,
          task: notification.task
        })

        // Show toast notification
        toast.success(`Task "${notification.task?.title || 'Unknown'}" created successfully!`)
      })

    // Listen to task events
    echo.private(`tasks.${authStore.user.id}`)
      .listen('TaskCreated', (e) => {
        console.log('Task created event:', e)
        notificationsStore.addNotification({
          type: 'task_created',
          title: 'Task Created',
          message: `Task "${e.task?.title || 'Unknown'}" has been created successfully!`,
          task: e.task
        })
        toast.success(`Task "${e.task?.title || 'Unknown'}" created successfully!`)
      })
      .listen('TaskUpdated', (e) => {
        console.log('Task updated event:', e)
        notificationsStore.addNotification({
          type: 'task_updated',
          title: 'Task Updated',
          message: `Task "${e.task?.title || 'Unknown'}" has been updated!`,
          task: e.task
        })
        toast.info(`Task "${e.task?.title || 'Unknown'}" updated successfully!`)
      })
      .listen('TaskDeleted', (e) => {
        console.log('Task deleted event:', e)
        notificationsStore.addNotification({
          type: 'task_deleted',
          title: 'Task Deleted',
          message: `Task "${e.task?.title || 'Unknown'}" has been deleted!`,
          task: e.task
        })
        toast.warning(`Task "${e.task?.title || 'Unknown'}" deleted!`)
      })

    // Listen to general notifications
    echo.private(`notifications.${authStore.user.id}`)
      .listen('NotificationSent', (e) => {
        console.log('General notification event:', e)
        notificationsStore.addNotification({
          type: e.type || 'general',
          title: e.title || 'Notification',
          message: e.message || 'You have a new notification',
          data: e.data
        })
        toast.info(e.message || 'You have a new notification')
      })

    console.log('Echo initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Echo:', error)
  }
}

export const disconnectEcho = () => {
  if (echo) {
    try {
      echo.disconnect()
      echo = null
      console.log('Echo disconnected successfully')
    } catch (error) {
      console.error('Failed to disconnect Echo:', error)
    }
  }
}

export const reconnectEcho = () => {
  disconnectEcho()
  initializeEcho()
}

export const getEcho = () => {
  return echo
}

export default echo
