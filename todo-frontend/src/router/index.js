import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import pages
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import NotificationsPage from '@/pages/NotificationsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: NotificationsPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if user is authenticated
  const isAuthenticated = authStore.isAuthenticated
  
  // If route requires authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Try to check auth status
      const authValid = await authStore.checkAuth()
      if (!authValid) {
        next('/login')
        return
      }
    }
    next()
    return
  }
  
  // If route requires guest (not authenticated)
  if (to.meta.requiresGuest) {
    if (isAuthenticated) {
      next('/dashboard')
      return
    }
    next()
    return
  }
  
  // For all other routes (like home page), just proceed
  next()
})

export default router
