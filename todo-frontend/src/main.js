import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/main.css'
import { useAuthStore } from './stores/auth'

import App from './App.vue'

const app = createApp(App)

// Configure Pinia
const pinia = createPinia()
app.use(pinia)

// Configure Router
app.use(router)

// Configure Toast
app.use(Toast, {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
})

// Check authentication on app start
const authStore = useAuthStore()
authStore.checkAuth().then(isAuthenticated => {
  if (!isAuthenticated && router.currentRoute.value.meta.requiresAuth) {
    router.push('/login')
  }
})

app.mount('#app')
