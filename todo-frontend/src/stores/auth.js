import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  const login = async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials)
      const { token: authToken, user: userData } = response.data
      
      token.value = authToken
      user.value = userData
      localStorage.setItem('token', authToken)
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData)
      const { token: authToken, user: newUser } = response.data
      
      token.value = authToken
      user.value = newUser
      localStorage.setItem('token', authToken)
      
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      let errorMessage = 'Registration failed. Please try again.'
      
      if (error.response?.data?.errors) {
        // Handle Laravel validation errors
        const errors = error.response.data.errors
        errorMessage = Object.values(errors).flat().join(', ')
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your connection and try again.'
      }
      
      return { 
        success: false, 
        message: errorMessage
      }
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  const checkAuth = async () => {
    if (!token.value) return false
    
    try {
      const response = await api.get('/api/auth/me')
      user.value = response.data
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  }
})
