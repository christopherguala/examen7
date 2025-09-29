<template>
  <div class="login-simple">
    <div class="container">
      <div class="login-card">
        <!-- Header con toggle -->
        <div class="login-header">
          <h1 class="login-title">
            {{ isLoginMode ? '🔐 Iniciar Sesión' : '📝 Registrarse' }}
          </h1>
          <button @click="toggleMode" class="toggle-mode-btn">
            {{ isLoginMode ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
          </button>
        </div>

        <!-- Mensaje de error -->
        <div v-if="userStore.error" class="error-message">
          <span class="error-icon">⚠️</span>
          <span class="error-text">{{ userStore.error }}</span>
          <button @click="userStore.clearError()" class="error-close">✕</button>
        </div>

        <!-- Formulario de Login -->
        <form v-if="isLoginMode" @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="login-email" class="form-label">Email</label>
            <input
              v-model="loginForm.email"
              type="email"
              id="login-email"
              class="form-input"
              :class="{ 'error': emailError }"
              placeholder="tu@email.com"
              @input="validateLoginEmail"
              required
            />
            <span v-if="emailError" class="field-error">{{ emailError }}</span>
          </div>

          <div class="form-group">
            <label for="login-password" class="form-label">Contraseña</label>
            <div class="password-input-group">
              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                id="login-password"
                class="form-input"
                :class="{ 'error': passwordError }"
                placeholder="Tu contraseña"
                @input="validateLoginPassword"
                required
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="password-toggle"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
          </div>

          <button type="submit" class="login-btn" :disabled="userStore.loading || !isLoginFormValid">
            <span v-if="userStore.loading" class="loading-spinner"></span>
            {{ userStore.loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>

        <!-- Formulario de Registro -->
        <form v-else @submit.prevent="handleRegister" class="login-form">
          <div class="form-group">
            <label for="register-name" class="form-label">Nombre completo</label>
            <input
              v-model="registerForm.name"
              type="text"
              id="register-name"
              class="form-input"
              :class="{ 'error': nameError }"
              placeholder="Tu nombre completo"
              @input="validateRegisterName"
              required
            />
            <span v-if="nameError" class="field-error">{{ nameError }}</span>
          </div>

          <div class="form-group">
            <label for="register-email" class="form-label">Email</label>
            <input
              v-model="registerForm.email"
              type="email"
              id="register-email"
              class="form-input"
              :class="{ 'error': registerEmailError }"
              placeholder="tu@email.com"
              @input="validateRegisterEmail"
              required
            />
            <span v-if="registerEmailError" class="field-error">{{ registerEmailError }}</span>
          </div>

          <div class="form-group">
            <label for="register-password" class="form-label">Contraseña</label>
            <div class="password-input-group">
              <input
                v-model="registerForm.password"
                :type="showRegisterPassword ? 'text' : 'password'"
                id="register-password"
                class="form-input"
                :class="{ 'error': registerPasswordError }"
                placeholder="Mínimo 6 caracteres"
                @input="validateRegisterPassword"
                required
              />
              <button 
                type="button" 
                @click="showRegisterPassword = !showRegisterPassword"
                class="password-toggle"
              >
                {{ showRegisterPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <span v-if="registerPasswordError" class="field-error">{{ registerPasswordError }}</span>
            <div class="password-strength">
              <div class="strength-bar">
                <div 
                  class="strength-fill" 
                  :class="passwordStrengthClass"
                  :style="{ width: passwordStrength + '%' }"
                ></div>
              </div>
              <span class="strength-text">{{ passwordStrengthText }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirm-password" class="form-label">Confirmar contraseña</label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              id="confirm-password"
              class="form-input"
              :class="{ 'error': confirmPasswordError }"
              placeholder="Repite tu contraseña"
              @input="validateConfirmPassword"
              required
            />
            <span v-if="confirmPasswordError" class="field-error">{{ confirmPasswordError }}</span>
          </div>

          <button type="submit" class="login-btn" :disabled="userStore.loading || !isRegisterFormValid">
            <span v-if="userStore.loading" class="loading-spinner"></span>
            {{ userStore.loading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </form>

        <!-- Credenciales de prueba (solo en modo login) -->
        <div v-if="isLoginMode" class="demo-credentials">
          <h3>🧪 Credenciales de Prueba:</h3>
          <div class="credential-item">
            <p><strong>Usuario:</strong> usuario1@mitienda.com</p>
            <p><strong>Contraseña:</strong> password1</p>
          </div>
          <div class="credential-item">
            <p><strong>Admin:</strong> admin@dandolahora.com</p>
            <p><strong>Contraseña:</strong> admin123</p>
          </div>
        </div>

        <!-- Navegación -->
        <div class="navigation-links">
          <RouterLink to="/" class="nav-link">
            <span class="link-icon">🏠</span>
            <span class="link-text">Volver al Home</span>
          </RouterLink>
          <RouterLink to="/productos" class="nav-link">
            <span class="link-icon">🛍️</span>
            <span class="link-text">Ver Productos</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user.js'

const router = useRouter()
const userStore = useUserStore()

const email = ref('usuario1@mitienda.com')
const password = ref('password1')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  
  try {
    // Simular login exitoso
    const userData = {
      id: 1,
      email: email.value,
      name: 'Usuario Demo',
      token: 'fake-jwt-' + Date.now()
    }
    
    userStore.login(userData)
    
    // Mostrar notificación de éxito
    const notification = document.createElement('div')
    notification.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #00f032, #02c02b); color: white; padding: 1rem 1.5rem; border-radius: 1rem; box-shadow: 0 8px 25px rgba(0, 240, 50, 0.3); z-index: 10001; font-weight: 600;">
        ✅ ¡Inicio de sesión exitoso!
      </div>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
    
    // Redirigir al home
    router.push('/')
    
  } catch (error) {
    console.error('Error en login:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-simple {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 2rem 0;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
}

.login-card {
  background: white;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue, #8171f6);
  text-align: center;
  margin-bottom: 2rem;
}

.debug-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--primary-green, #00f032);
}

.debug-info h3 {
  color: var(--primary-green, #00f032);
  margin-bottom: 1rem;
}

.debug-info p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-green, #00f032);
  box-shadow: 0 0 0 3px rgba(0, 240, 50, 0.1);
}

.login-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary-green, #00f032), #02c02b);
  color: white;
  border: none;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.3);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.demo-credentials {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.demo-credentials h3 {
  color: #856404;
  margin-bottom: 1rem;
}

.demo-credentials p {
  color: #856404;
  margin-bottom: 0.5rem;
}

.navigation-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-blue, #8171f6), #6b5ce6);
  color: white;
  text-decoration: none;
  border-radius: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(129, 113, 246, 0.3);
}

.link-icon {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .login-card {
    padding: 2rem;
  }
  
  .login-title {
    font-size: 2rem;
  }
  
  .navigation-links {
    flex-direction: column;
  }
}
</style>
