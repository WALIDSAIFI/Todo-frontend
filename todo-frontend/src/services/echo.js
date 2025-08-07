import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { useNotificationsStore } from '@/stores/notifications'
import { useAuthStore } from '@/stores/auth'

// Configure Pusher
window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_APP_KEY || 'your-pusher-key',
  cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER || 'mt1',
  forceTLS: true,
  authEndpoint: `${process.env.VUE_APP_API_URL || 'http://localhost:8000'}/broadcasting/auth`,
  auth: {
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
})

// Listen for task creation notifications
export const initializeEcho = () => {
  const authStore = useAuthStore()
  const notificationsStore = useNotificationsStore()

  if (authStore.isAuthenticated && authStore.user) {
    // Listen to private channel for user notifications
    echo.private(`user.${authStore.user.id}`)
      .notification((notification) => {
        console.log('Received notification:', notification)
        
        // Add notification to store
        notificationsStore.addNotification({
          type: 'task_created',
          title: 'New Task Created',
          message: `Task "${notification.task.title}" has been created successfully!`,
          task: notification.task
        })
      })

    // Listen to task events
    echo.private(`tasks.${authStore.user.id}`)
      .listen('TaskCreated', (e) => {
        console.log('Task created event:', e)
        notificationsStore.addNotification({
          type: 'task_created',
          title: 'Task Created',
          message: `Task "${e.task.title}" has been created successfully!`,
          task: e.task
        })
      })
  }
}

export const disconnectEcho = () => {
  if (echo) {
    echo.disconnect()
  }
}

export default echo
