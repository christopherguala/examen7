<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Iniciar Sesión</h1>
        <p class="login-subtitle">Accede a tu cuenta</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-input"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-input"
            placeholder="Tu contraseña"
            required
          />
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading" class="loading-spinner">⏳</span>
          <span v-else class="btn-icon">🔐</span>
          <span>{{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}</span>
        </button>
      </form>

      <div class="login-footer">
        <p class="demo-info">
          <strong>Demo:</strong> Usa cualquier email y contraseña para probar
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user.js'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Crear datos de usuario simulados
    const userData = {
      id: 1,
      name: form.email.split('@')[0],
      email: form.email,
      avatar: null
    }
    
    // Loguear al usuario
    userStore.login(userData)
    
    // Redirigir al home
    router.push('/')
    
  } catch (error) {
    console.error('Error en login:', error)
    alert('Error al iniciar sesión')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.login-subtitle {
  color: #6b7280;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  background: #b91c1c;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-icon {
  font-size: 1rem;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.demo-info {
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 1.5rem;
  }
  
  .login-title {
    font-size: 1.5rem;
  }
}
</style>
