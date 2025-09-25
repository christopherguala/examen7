import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useUserStore } from './store/user.js'

const app = createApp(App)

app.use(router)

// Inicializar el store de usuario
const userStore = useUserStore()
app.config.globalProperties.$userStore = userStore

// Verificar autenticación al cargar la app
userStore.checkAuth()

app.mount('#app')
