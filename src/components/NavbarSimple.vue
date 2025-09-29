<template>
  <header class="simple-navbar">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo-section">
        <RouterLink to="/" class="logo-link">
          <div class="logo-text">
            <span class="logo-main">DANDO LA HORA</span>
            <span class="logo-sub">CYBER WATCH</span>
          </div>
        </RouterLink>
      </div>

      <!-- Navegación -->
      <div class="nav-center">
        <RouterLink to="/" class="nav-link">Inicio</RouterLink>
        <RouterLink to="/productos" class="nav-link">Productos</RouterLink>
        <RouterLink to="/relojes" class="nav-link">Relojes</RouterLink>
      </div>

      <!-- Botón de Login -->
      <div class="nav-actions">
        <button class="login-btn" @click="toggleAuth">
          Login
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const showAuthModal = ref(false)

const toggleAuth = () => {
  showAuthModal.value = !showAuthModal.value
  console.log('🔐 Toggle auth:', showAuthModal.value)
}
</script>

<style scoped>
.simple-navbar {
  background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
  border-bottom: 3px solid #00f032;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 900;
  color: #00f032;
  text-shadow: 0 0 10px #00f032;
  letter-spacing: 1px;
}

.logo-sub {
  font-size: 0.7rem;
  color: #00d4ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;
}

.logo-link {
  text-decoration: none;
  color: white;
}

.nav-center {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(0, 240, 50, 0.1);
  border: 1px solid #00f032;
}

.login-btn {
  background: linear-gradient(135deg, #00f032, #02c02b);
  color: #0a0a0a;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.4);
}
</style>