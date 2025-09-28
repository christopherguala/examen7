import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useUserStore } from './store/user.js'


const app = createApp(App)

app.use(router)

// Asynchronously initialize and mount the app
async function init() {
  const userStore = useUserStore()
  app.config.globalProperties.$userStore = userStore
  
  // Wait for auth check to complete
  await userStore.checkAuth()
  
  app.mount('#app')
}

init()
