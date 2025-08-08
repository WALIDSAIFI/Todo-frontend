import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)
  const errors = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userInitials = computed(() => {
    if (!user.value?.full_name) return 'U'
    return user.value.full_name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  // Actions
  const register = async (userData) => {
    loading.value = true
    error.value = null
    errors.value = null
    
    try {
      const response = await api.post('/auth/register', {
        full_name: userData.full_name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        password_confirmation: userData.password_confirmation
      })

      const { user: userInfo, token: authToken } = response.data
      
      user.value = userInfo
      token.value = authToken
      localStorage.setItem('token', authToken)
      
      return { success: true, user: userInfo }
    } catch (err) {
      if (err.response?.status === 422) {
        errors.value = err.response.data
        return { success: false, errors: err.response.data }
      } else if (err.response?.status === 500) {
        error.value = 'Server error. Please try again later.'
        return { success: false, message: 'Server error. Please try again later.' }
      } else {
        error.value = 'Network error. Please check your connection.'
        return { success: false, message: 'Network error. Please check your connection.' }
      }
    } finally {
      loading.value = false
    }
  }

  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      })

      const { user: userInfo, token: authToken } = response.data
      
      user.value = userInfo
      token.value = authToken
      localStorage.setItem('token', authToken)
      
      return { success: true, user: userInfo }
    } catch (err) {
      if (err.response?.status === 401) {
        error.value = 'Invalid email or password'
        return { success: false, message: 'Invalid email or password' }
      } else if (err.response?.status === 422) {
        error.value = err.response.data
        return { success: false, errors: err.response.data }
      } else {
        error.value = 'Network error. Please check your connection.'
        return { success: false, message: 'Network error. Please check your connection.' }
      }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await api.post('/auth/logout')
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
    }
  }

  const checkAuth = async () => {
    if (!token.value) return false
    
    try {
      const response = await api.get('/auth/me')
      user.value = response.data
      return true
    } catch (err) {
      console.error('Auth check failed:', err)
      logout()
      return false
    }
  }

  const clearError = () => {
    error.value = null
    errors.value = null
  }

      return {
      // State
      user,
      token,
      loading,
      error,
      errors,
      
      // Getters
      isAuthenticated,
      userInitials,
      
      // Actions
      register,
      login,
      logout,
      checkAuth,
      clearError
    }
})
