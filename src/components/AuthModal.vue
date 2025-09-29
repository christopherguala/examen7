<template>
  <div class="auth-modal" :class="{ open: isVisible }" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ isLoginMode ? 'Acceso al Sistema' : 'Registro de Usuario' }}</h3>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="modal-body">
        <!-- Tabs para cambiar entre login y registro -->
        <div class="auth-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: isLoginMode }" 
            @click="setLoginMode(true)"
          >
            Login
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: !isLoginMode }" 
            @click="setLoginMode(false)"
          >
            Registro
          </button>
        </div>

        <!-- Formulario de Login -->
        <form v-if="isLoginMode" @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="loginForm.email" 
              placeholder="tu@email.com"
              required
              :class="{ error: loginErrors.email }"
            >
            <span v-if="loginErrors.email" class="error-message">{{ loginErrors.email }}</span>
          </div>
          
          <div class="form-group">
            <label>Contraseña</label>
            <div class="password-input">
              <input 
                :type="showLoginPassword ? 'text' : 'password'" 
                v-model="loginForm.password" 
                placeholder="••••••••"
                required
                :class="{ error: loginErrors.password }"
              >
              <button 
                type="button" 
                class="password-toggle"
                @click="showLoginPassword = !showLoginPassword"
              >
                {{ showLoginPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <span v-if="loginErrors.password" class="error-message">{{ loginErrors.password }}</span>
          </div>

          <button type="submit" class="auth-submit-btn" :disabled="isLoading">
            <span v-if="isLoading" class="loading-spinner"></span>
            <span class="btn-text">{{ isLoading ? 'Accediendo...' : 'Acceder' }}</span>
            <div class="btn-glow"></div>
          </button>
        </form>

        <!-- Formulario de Registro -->
        <form v-else @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label>Nombre Completo</label>
            <input 
              type="text" 
              v-model="registerForm.name" 
              placeholder="Tu nombre completo"
              required
              :class="{ error: registerErrors.name }"
            >
            <span v-if="registerErrors.name" class="error-message">{{ registerErrors.name }}</span>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="registerForm.email" 
              placeholder="tu@email.com"
              required
              :class="{ error: registerErrors.email }"
            >
            <span v-if="registerErrors.email" class="error-message">{{ registerErrors.email }}</span>
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <div class="password-input">
              <input 
                :type="showRegisterPassword ? 'text' : 'password'" 
                v-model="registerForm.password" 
                placeholder="••••••••"
                required
                :class="{ error: registerErrors.password }"
              >
              <button 
                type="button" 
                class="password-toggle"
                @click="showRegisterPassword = !showRegisterPassword"
              >
                {{ showRegisterPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <span v-if="registerErrors.password" class="error-message">{{ registerErrors.password }}</span>
          </div>

          <div class="form-group">
            <label>Confirmar Contraseña</label>
            <div class="password-input">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="registerForm.confirmPassword" 
                placeholder="••••••••"
                required
                :class="{ error: registerErrors.confirmPassword }"
              >
              <button 
                type="button" 
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <span v-if="registerErrors.confirmPassword" class="error-message">{{ registerErrors.confirmPassword }}</span>
          </div>

          <div class="form-group">
            <label>Teléfono (Opcional)</label>
            <input 
              type="tel" 
              v-model="registerForm.phone" 
              placeholder="+56 9 1234 5678"
              :class="{ error: registerErrors.phone }"
            >
            <span v-if="registerErrors.phone" class="error-message">{{ registerErrors.phone }}</span>
          </div>

          <button type="submit" class="auth-submit-btn" :disabled="isLoading">
            <span v-if="isLoading" class="loading-spinner"></span>
            <span class="btn-text">{{ isLoading ? 'Registrando...' : 'Registrarse' }}</span>
            <div class="btn-glow"></div>
          </button>
        </form>

        <!-- Mensaje de éxito/error -->
        <div v-if="message" class="message" :class="messageType">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useAuth } from '../store/index.js'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

// Debug: Log cuando cambia la visibilidad
console.log('🔍 AuthModal - isVisible:', props.isVisible)

// Watcher para debug
watch(() => props.isVisible, (newValue) => {
  console.log('🔍 AuthModal - isVisible cambió a:', newValue)
})

// Usar el store de autenticación
const { login, register, logout, isLoggedIn, currentUser } = useAuth()

// Estado del componente
const isLoginMode = ref(true)
const isLoading = ref(false)
const message = ref('')
const messageType = ref('success')
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// Formularios
const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: ''
})

// Errores
const loginErrors = reactive({
  email: '',
  password: ''
})

const registerErrors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: ''
})

// Métodos
const setLoginMode = (mode) => {
  isLoginMode.value = mode
  clearForms()
  clearErrors()
  clearMessage()
}

const clearForms = () => {
  Object.keys(loginForm).forEach(key => {
    loginForm[key] = ''
  })
  Object.keys(registerForm).forEach(key => {
    registerForm[key] = ''
  })
}

const clearErrors = () => {
  Object.keys(loginErrors).forEach(key => {
    loginErrors[key] = ''
  })
  Object.keys(registerErrors).forEach(key => {
    registerErrors[key] = ''
  })
}

const clearMessage = () => {
  message.value = ''
}

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    clearMessage()
  }, 5000)
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return password.length >= 6
}

const validatePhone = (phone) => {
  if (!phone) return true // Opcional
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/
  return phoneRegex.test(phone)
}

const handleLogin = async () => {
  clearErrors()
  isLoading.value = true

  // Validaciones
  if (!loginForm.email) {
    loginErrors.email = 'El email es requerido'
  } else if (!validateEmail(loginForm.email)) {
    loginErrors.email = 'El email no es válido'
  }

  if (!loginForm.password) {
    loginErrors.password = 'La contraseña es requerida'
  } else if (!validatePassword(loginForm.password)) {
    loginErrors.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  // Si hay errores, no continuar
  if (loginErrors.email || loginErrors.password) {
    isLoading.value = false
    return
  }

  try {
    console.log('🔐 Iniciando proceso de login...')
    const result = login(loginForm.email, loginForm.password)
    console.log('📋 Resultado del login:', result)
    
    if (result.success) {
      showMessage('¡Bienvenido!', 'success')
      console.log('🎉 Emitiendo evento success con usuario:', result.user)
      emit('success', result.user)
      setTimeout(() => {
        closeModal()
      }, 1500)
    } else {
      console.log('❌ Login fallido:', result.message)
      showMessage(result.message, 'error')
    }
  } catch (error) {
    console.error('💥 Error en el proceso de login:', error)
    showMessage('Error al iniciar sesión', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  clearErrors()
  isLoading.value = true

  // Validaciones
  if (!registerForm.name) {
    registerErrors.name = 'El nombre es requerido'
  } else if (registerForm.name.length < 2) {
    registerErrors.name = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!registerForm.email) {
    registerErrors.email = 'El email es requerido'
  } else if (!validateEmail(registerForm.email)) {
    registerErrors.email = 'El email no es válido'
  }

  if (!registerForm.password) {
    registerErrors.password = 'La contraseña es requerida'
  } else if (!validatePassword(registerForm.password)) {
    registerErrors.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  if (!registerForm.confirmPassword) {
    registerErrors.confirmPassword = 'Confirma tu contraseña'
  } else if (registerForm.password !== registerForm.confirmPassword) {
    registerErrors.confirmPassword = 'Las contraseñas no coinciden'
  }

  if (registerForm.phone && !validatePhone(registerForm.phone)) {
    registerErrors.phone = 'El teléfono no es válido'
  }

  // Si hay errores, no continuar
  if (Object.values(registerErrors).some(error => error)) {
    isLoading.value = false
    return
  }

  try {
    const result = register({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      phone: registerForm.phone || null
    })
    
    if (result.success) {
      showMessage('¡Usuario registrado exitosamente!', 'success')
      // Auto-login después del registro
      setTimeout(() => {
        const loginResult = login(registerForm.email, registerForm.password)
        if (loginResult.success) {
          emit('success', loginResult.user)
          closeModal()
        }
      }, 1500)
    } else {
      showMessage(result.message, 'error')
    }
  } catch (error) {
    showMessage('Error al registrar usuario', 'error')
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  clearForms()
  clearErrors()
  clearMessage()
  emit('close')
}

// Limpiar formularios cuando se cierra el modal
watch(() => props.isVisible, (newValue) => {
  if (!newValue) {
    clearForms()
    clearErrors()
    clearMessage()
  }
})
</script>

<style scoped>
/* Variables CSS */
:root {
  --cyber-primary: #00f032;
  --cyber-secondary: #8171f6;
  --cyber-accent: #00d4ff;
  --cyber-dark: #0a0a0a;
  --cyber-gray: #1a1a1a;
  --cyber-light: #2a2a2a;
  --cyber-text: #ffffff;
  --cyber-text-muted: #888888;
  --cyber-error: #fe3301;
}

/* Modal */
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.auth-modal.open {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: linear-gradient(135deg, var(--cyber-gray), var(--cyber-light));
  border: 2px solid var(--cyber-primary);
  border-radius: 1rem;
  padding: 0;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 240, 50, 0.3);
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 2px solid var(--cyber-primary);
}

.modal-header h3 {
  color: var(--cyber-primary);
  font-size: 1.8rem;
  margin: 0;
  font-weight: 700;
  text-shadow: 0 0 10px var(--cyber-primary);
}

.close-btn {
  background: none;
  border: none;
  color: var(--cyber-text);
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  color: var(--cyber-primary);
  background: rgba(0, 240, 50, 0.1);
  transform: scale(1.1);
}

.modal-body {
  padding: 2rem;
}

/* Tabs */
.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  background: var(--cyber-dark);
  border-radius: 0.75rem;
  padding: 0.5rem;
  border: 1px solid var(--cyber-primary);
}

.tab-btn {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  color: var(--cyber-text-muted);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--cyber-primary), #02c02b);
  color: var(--cyber-dark);
  box-shadow: 0 4px 15px rgba(0, 240, 50, 0.3);
}

.tab-btn:hover:not(.active) {
  color: var(--cyber-text);
  background: rgba(0, 240, 50, 0.1);
}

/* Formulario */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: var(--cyber-text);
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  background: var(--cyber-dark);
  border: 2px solid var(--cyber-primary);
  border-radius: 0.75rem;
  color: var(--cyber-text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  box-shadow: 0 0 20px rgba(0, 240, 50, 0.4);
  border-color: var(--cyber-accent);
}

.form-group input.error {
  border-color: var(--cyber-error);
  box-shadow: 0 0 15px rgba(254, 51, 1, 0.3);
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--cyber-text-muted);
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: var(--cyber-primary);
}

.error-message {
  color: var(--cyber-error);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  font-weight: 500;
}

.auth-submit-btn {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, var(--cyber-primary), #02c02b);
  border: none;
  border-radius: 0.75rem;
  color: var(--cyber-dark);
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.auth-submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.4);
}

.auth-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid var(--cyber-dark);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.auth-submit-btn:hover .btn-glow {
  left: 100%;
}

/* Mensajes */
.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: center;
  animation: slideInDown 0.3s ease-out;
}

.message.success {
  background: linear-gradient(135deg, var(--cyber-primary), #02c02b);
  color: var(--cyber-dark);
  border: 1px solid var(--cyber-primary);
}

.message.error {
  background: linear-gradient(135deg, var(--cyber-error), #e02e01);
  color: white;
  border: 1px solid var(--cyber-error);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .modal-header h3 {
    font-size: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .auth-tabs {
    margin-bottom: 1.5rem;
  }
  
  .tab-btn {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .form-group input {
    padding: 0.875rem;
  }
  
  .auth-submit-btn {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>
