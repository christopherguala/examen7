<template>
  <div class="simple-auth-modal" :class="{ open: isVisible }" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>🔐 Login</h3>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="email" 
              placeholder="demo@test.com"
              required
            >
          </div>
          
          <div class="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              v-model="password" 
              placeholder="123456"
              required
            >
          </div>

          <button type="submit" class="login-btn">
            Acceder
          </button>
        </form>

        <div v-if="message" class="message" :class="messageType">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

const email = ref('demo@test.com')
const password = ref('123456')
const message = ref('')
const messageType = ref('success')

const handleLogin = () => {
  console.log('🔐 Login intentado con:', { email: email.value, password: password.value })
  
  // Simular login exitoso
  if (email.value === 'demo@test.com' && password.value === '123456') {
    message.value = '¡Login exitoso!'
    messageType.value = 'success'
    
    setTimeout(() => {
      emit('success', {
        id: 'demo-001',
        name: 'Usuario Demo',
        email: 'demo@test.com'
      })
      closeModal()
    }, 1000)
  } else {
    message.value = 'Credenciales incorrectas'
    messageType.value = 'error'
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.simple-auth-modal {
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
}

.simple-auth-modal.open {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  border: 2px solid #00f032;
  border-radius: 1rem;
  padding: 0;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 240, 50, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #00f032;
}

.modal-header h3 {
  color: #00f032;
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #00f032;
}

.modal-body {
  padding: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  padding: 0.75rem;
  background: #0a0a0a;
  border: 2px solid #00f032;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(0, 240, 50, 0.3);
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #00f032, #02c02b);
  border: none;
  border-radius: 0.75rem;
  color: #0a0a0a;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.4);
}

.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: center;
}

.message.success {
  background: linear-gradient(135deg, #00f032, #02c02b);
  color: #0a0a0a;
}

.message.error {
  background: linear-gradient(135deg, #fe3301, #e02e01);
  color: white;
}
</style>
