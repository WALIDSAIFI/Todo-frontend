<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Notifications ({{ unreadCount }} unread)
        </h3>
        <div class="flex space-x-2">
          <button
            @click="markAllAsRead"
            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Mark all as read
          </button>
          <button
            @click="clearAll"
            class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Clear all
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="notifications.length === 0" class="text-center py-8">
        <div class="text-gray-500 mb-4">No notifications yet.</div>
        <div class="text-sm text-gray-400">You'll see notifications here when tasks are created.</div>
      </div>

      <!-- Notifications List -->
      <div v-else class="space-y-3">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'p-4 rounded-lg border transition-colors',
            notification.read
              ? 'bg-gray-50 border-gray-200'
              : 'bg-blue-50 border-blue-200'
          ]"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <div
                  :class="[
                    'flex-shrink-0 w-2 h-2 rounded-full',
                    notification.read ? 'bg-gray-400' : 'bg-blue-500'
                  ]"
                ></div>
                <h4 class="text-sm font-medium text-gray-900">
                  {{ notification.title }}
                </h4>
                <span class="text-xs text-gray-500">
                  {{ formatTime(notification.timestamp) }}
                </span>
              </div>
              
              <p class="mt-1 text-sm text-gray-600">
                {{ notification.message }}
              </p>
              
              <!-- Task details if available -->
              <div v-if="notification.task" class="mt-2 p-2 bg-gray-100 rounded text-xs">
                <div class="font-medium">Task: {{ notification.task.title }}</div>
                <div class="text-gray-600">{{ notification.task.description }}</div>
                <div class="flex items-center space-x-2 mt-1">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                      notification.task.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : notification.task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    ]"
                  >
                    {{ notification.task.priority }}
                  </span>
                  <span class="text-gray-500">
                    Due: {{ formatDate(notification.task.due_date) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 ml-4">
              <button
                v-if="!notification.read"
                @click="markAsRead(notification.id)"
                class="text-gray-400 hover:text-primary-600 transition-colors"
                title="Mark as read"
              >
                <CheckIcon class="h-4 w-4" />
              </button>
              <button
                @click="removeNotification(notification.id)"
                class="text-gray-400 hover:text-red-600 transition-colors"
                title="Remove notification"
              >
                <XMarkIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from 'vue-toastification'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'NotificationList',
  components: {
    CheckIcon,
    XMarkIcon
  },
  setup() {
    const notificationsStore = useNotificationsStore()
    const toast = useToast()

    const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = notificationsStore

    const handleMarkAsRead = (id) => {
      markAsRead(id)
      toast.success('Notification marked as read')
    }

    const handleMarkAllAsRead = () => {
      markAllAsRead()
      toast.success('All notifications marked as read')
    }

    const handleRemoveNotification = (id) => {
      removeNotification(id)
      toast.success('Notification removed')
    }

    const handleClearAll = () => {
      if (confirm('Are you sure you want to clear all notifications?')) {
        clearAll()
        toast.success('All notifications cleared')
      }
    }

    const formatTime = (timestamp) => {
      const date = new Date(timestamp)
      const now = new Date()
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      
      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
      return date.toLocaleDateString()
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'No due date'
      return new Date(dateString).toLocaleDateString()
    }

    return {
      notifications,
      unreadCount,
      markAsRead: handleMarkAsRead,
      markAllAsRead: handleMarkAllAsRead,
      removeNotification: handleRemoveNotification,
      clearAll: handleClearAll,
      formatTime,
      formatDate
    }
  }
}
</script>
