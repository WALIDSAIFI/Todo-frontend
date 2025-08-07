<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo/Brand Section -->
      <div class="text-center fade-in">
        <div class="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
          <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          TaskFlow Pro
        </h2>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          Create your account
        </h3>
        <p class="text-gray-600 text-lg">
          Join us and start organizing your tasks
        </p>
      </div>

      <!-- Register Card -->
      <div class="card p-8 fade-in" style="animation-delay: 0.2s;">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Full Name Field -->
          <div>
            <label for="full_name" class="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                id="full_name"
                v-model="form.full_name"
                type="text"
                required
                class="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <!-- Phone Field -->
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="password_confirmation" class="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                required
                class="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="form.terms"
                type="checkbox"
                required
                class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-gray-700">
                I agree to the
                <a href="#" class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Terms of Service
                </a>
                and
                <a href="#" class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary py-4 text-base font-semibold"
            >
              <span v-if="loading" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
              <span v-else>Create Account</span>
            </button>
          </div>

          <!-- Sign In Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link to="/login" class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Sign in
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterForm',
  setup() {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()
    
    const loading = ref(false)
    const error = ref('')
    
    const form = reactive({
      full_name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      terms: false
    })

    const passwordError = computed(() => {
      if (form.password && form.password_confirmation && form.password !== form.password_confirmation) {
        return 'Passwords do not match'
      }
      return ''
    })

    const validateForm = () => {
      if (!form.full_name.trim()) {
        error.value = 'Full name is required'
        return false
      }
      
      if (!form.email.trim()) {
        error.value = 'Email is required'
        return false
      }
      
      if (!form.phone.trim()) {
        error.value = 'Phone number is required'
        return false
      }
      
      if (!form.password) {
        error.value = 'Password is required'
        return false
      }
      
      if (form.password.length < 6) {
        error.value = 'Password must be at least 6 characters'
        return false
      }
      
      if (form.password !== form.password_confirmation) {
        error.value = 'Passwords do not match'
        return false
      }
      
      if (!form.terms) {
        error.value = 'You must agree to the terms and conditions'
        return false
      }
      
      return true
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        return
      }

      loading.value = true
      error.value = ''
      
      try {
        const registerData = {
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          password_confirmation: form.password_confirmation
        }

        console.log('Sending registration data:', registerData)
        console.log('API URL:', process.env.VUE_APP_API_URL || 'http://localhost:8000')

        const result = await authStore.register(registerData)
        
        if (result.success) {
          toast.success('Account created successfully! Welcome!')
          router.push('/dashboard')
        } else {
          error.value = result.message || 'Registration failed. Please try again.'
          toast.error(result.message || 'Registration failed. Please try again.')
        }
      } catch (err) {
        console.error('Registration error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config
        })
        
        let errorMessage = 'Registration failed. Please try again.'
        
        if (err.code === 'NETWORK_ERROR' || err.message.includes('Network Error')) {
          errorMessage = 'Cannot connect to server. Please check if the backend is running on http://localhost:8000'
        } else if (err.response?.status === 422) {
          // Laravel validation errors
          const errors = err.response.data.errors
          if (errors) {
            errorMessage = Object.values(errors).flat().join(', ')
          }
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message
        }
        
        error.value = errorMessage
        toast.error(errorMessage)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      error,
      passwordError,
      handleSubmit
    }
  }
}
</script>
