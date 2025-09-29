<template>
  <header class="cyber-navbar">
    <!-- Marquesina cibernética -->
    <div class="cyber-marquee">
      <div class="marquee-content">
        <span class="marquee-text">🕒 RELOJES VINTAGE • CASIO • ORIENT • SEIKO • TIEMPO PRECISO • RESISTENCIA EXTREMA • TECNOLOGÍA JAPONESA • CALIDAD SUPERIOR • DISEÑO RETRO • FUNCIONALIDAD MODERNA •</span>
        <span class="marquee-text">🕒 RELOJES VINTAGE • CASIO • ORIENT • SEIKO • TIEMPO PRECISO • RESISTENCIA EXTREMA • TECNOLOGÍA JAPONESA • CALIDAD SUPERIOR • DISEÑO RETRO • FUNCIONALIDAD MODERNA •</span>
      </div>
    </div>

    <!-- Navbar principal -->
    <nav class="navbar-main">
      <div class="nav-container">
        <!-- Logo con efecto cibernético -->
        <div class="logo-section">
          <RouterLink to="/" class="logo-link">
            <div class="logo-text">
              <span class="logo-main">DANDO LA HORA</span>
              <span class="logo-sub">CYBER WATCH</span>
            </div>
          </RouterLink>
        </div>

        <!-- Navegación central -->
        <div class="nav-center">
          <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            <span class="nav-text">Inicio</span>
          </RouterLink>
          <RouterLink to="/productos" class="nav-link" :class="{ active: $route.path === '/productos' }">
            <span class="nav-text">Productos</span>
          </RouterLink>
          <RouterLink to="/relojes" class="nav-link" :class="{ active: $route.path === '/relojes' }">
            <span class="nav-text">Relojes</span>
          </RouterLink>
        </div>


        <!-- Información del usuario -->
        <div v-if="isLoggedIn && currentUser" class="user-info">
          <div class="user-avatar">
            <img :src="currentUser.avatar" :alt="currentUser.name" />
          </div>
          <div class="user-details">
            <span class="user-name">{{ currentUser.name }}</span>
            <span class="user-email">{{ currentUser.email }}</span>
          </div>
        </div>

        <!-- Acciones del usuario -->
        <div class="nav-actions">
          <!-- Botón de carrito -->
          <button class="action-btn cart-btn" @click="toggleCart" :class="{ 'has-items': cartCount > 0 }">
            <div class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"/>
              </svg>
              <div class="cart-count" v-if="cartCount > 0">{{ cartCount }}</div>
            </div>
            <span class="btn-text">Carrito</span>
            <div class="btn-glow"></div>
          </button>

          <!-- Botón de usuario logueado con dropdown -->
          <div v-if="isLoggedIn && currentUser" class="user-dropdown-container">
            <button class="action-btn login-btn" @click="toggleUserDropdown">
              <div class="btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span class="btn-text">Hola, {{ currentUser.name }}</span>
              <div class="dropdown-arrow" :class="{ open: showUserDropdown }">▼</div>
              <div class="btn-glow"></div>
            </button>
            
            <!-- Dropdown menu -->
            <div class="user-dropdown" :class="{ open: showUserDropdown }">
              <div class="dropdown-header">
                <div class="user-info-mini">
                  <img :src="currentUser.avatar" :alt="currentUser.name" class="user-avatar-mini" />
                  <div class="user-details-mini">
                    <div class="user-name-mini">{{ currentUser.name }}</div>
                    <div class="user-email-mini">{{ currentUser.email }}</div>
                  </div>
                </div>
              </div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-items">
                <button class="dropdown-item logout-item" @click="handleLogout">
                  <span class="dropdown-icon">🚪</span>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Botón de login simple cuando no está logueado -->
          <button v-else class="action-btn login-btn" @click="toggleAuth">
            <div class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span class="btn-text">Login</span>
            <div class="btn-glow"></div>
          </button>

          <!-- Menú hamburguesa para móvil -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <span class="hamburger-line" :class="{ active: mobileMenuOpen }"></span>
            <span class="hamburger-line" :class="{ active: mobileMenuOpen }"></span>
            <span class="hamburger-line" :class="{ active: mobileMenuOpen }"></span>
          </button>
        </div>
      </div>

      <!-- Menú móvil -->
      <div class="mobile-menu" :class="{ open: mobileMenuOpen }">
        <div class="mobile-nav-links">
          <RouterLink to="/" class="mobile-nav-link" @click="closeMobileMenu">
            <span>Inicio</span>
          </RouterLink>
          <RouterLink to="/productos" class="mobile-nav-link" @click="closeMobileMenu">
            <span>Productos</span>
          </RouterLink>
          <RouterLink to="/relojes" class="mobile-nav-link" @click="closeMobileMenu">
            <span>Relojes</span>
          </RouterLink>
        </div>
        <div class="mobile-actions">
          <button class="mobile-action-btn" @click="toggleCart">
            <span>Carrito ({{ cartCount }})</span>
          </button>
          <button class="mobile-action-btn" @click="isLoggedIn ? handleLogout() : toggleAuth()">
            <span>{{ isLoggedIn ? (currentUser ? currentUser.name : 'Usuario') : 'Login' }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Modal de Autenticación -->
    <AuthModal 
      :isVisible="showAuthModal"
      @close="closeAuthModal"
      @success="handleAuthSuccess"
    />

    <!-- Panel de carrito -->
    <div class="cart-panel" :class="{ open: showCartPanel }">
      <div class="cart-header">
        <h3>Tu Carrito</h3>
        <button class="close-cart-btn" @click="closeCart">×</button>
      </div>
      <div class="cart-content">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-icon">🛒</div>
          <p>Tu carrito está vacío</p>
        </div>
        <div v-else class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.imagen" :alt="item.titulo" class="cart-item-image">
            <div class="cart-item-info">
              <h4>{{ item.titulo }}</h4>
              <p>${{ item.precio.toLocaleString() }}</p>
            </div>
            <button class="remove-item-btn" @click="removeFromCart(item.id)">×</button>
          </div>
        </div>
      </div>
      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="cart-total">
          Total: ${{ cartTotal.toLocaleString() }}
        </div>
        <button class="checkout-btn">Proceder al Pago</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useCart, useAuth } from '../store/index.js'
import AuthModal from './AuthModal.vue'

// Usar el store
const { cartItems, addToCart, removeFromCart, cartCount, cartTotal } = useCart()
const { isLoggedIn, currentUser, login, logout } = useAuth()

// Estado reactivo
const mobileMenuOpen = ref(false)
const showAuthModal = ref(false)
const showCartPanel = ref(false)
const showUserDropdown = ref(false)

// Debug: Log del estado de autenticación
console.log('🔍 CyberNavbar - Estado inicial:', { 
  isLoggedIn: isLoggedIn.value, 
  currentUser: currentUser.value,
  showAuthModal: showAuthModal.value 
})

// Debug: Log cuando cambian los estados
watch(isLoggedIn, (newValue) => {
  console.log('🔍 CyberNavbar - isLoggedIn cambió a:', newValue)
})

watch(currentUser, (newValue) => {
  console.log('🔍 CyberNavbar - currentUser cambió a:', newValue)
})

watch(showAuthModal, (newValue) => {
  console.log('🔍 CyberNavbar - showAuthModal cambió a:', newValue)
})

// Los computed properties ya vienen del store

// Métodos
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleAuth = () => {
  console.log('🔐 toggleAuth llamado, estado actual:', showAuthModal.value)
  console.log('🔐 Botón de login clickeado!')
  showAuthModal.value = !showAuthModal.value
  console.log('🔐 Nuevo estado showAuthModal:', showAuthModal.value)
  
  // Debug adicional
  console.log('🔍 Estado completo después de toggle:', {
    showAuthModal: showAuthModal.value,
    isLoggedIn: isLoggedIn.value,
    currentUser: currentUser.value
  })
  
  // Forzar actualización visual
  setTimeout(() => {
    console.log('🔍 Estado después de timeout:', showAuthModal.value)
  }, 100)
}

const closeAuthModal = () => {
  showAuthModal.value = false
}

const toggleCart = () => {
  showCartPanel.value = !showCartPanel.value
}

const closeCart = () => {
  showCartPanel.value = false
}

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}

const closeUserDropdown = () => {
  showUserDropdown.value = false
}

const handleAuthSuccess = (user) => {
  console.log('🎉 AuthModal emitió success con usuario:', user)
  showNotification(`¡Bienvenido ${user.name}!`, 'success')
  // El estado ya se actualizó en el store, no necesitamos hacer nada más
}

const handleLogout = () => {
  console.log('🚪 Iniciando logout...')
  logout()
  showUserDropdown.value = false // Cerrar dropdown al hacer logout
  showNotification('Sesión cerrada exitosamente', 'info')
  console.log('✅ Logout completado')
}

const forceLogout = () => {
  console.log('🔄 Forzando logout...')
  logout()
  showUserDropdown.value = false
  showAuthModal.value = false
  console.log('🔄 Logout forzado completado')
}

// Las funciones addToCart y removeFromCart ya vienen del store

const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div')
  notification.className = `cyber-notification ${type}`
  notification.textContent = message
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00f032, #02c02b);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 8px 25px rgba(0, 240, 50, 0.3);
    z-index: 10001;
    animation: slideInRight 0.3s ease-out;
    font-weight: 600;
    border: 2px solid rgba(255, 255, 255, 0.2);
  `
  
  if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #00f032, #02c02b)'
  } else if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, #fe3301, #e02e01)'
  }
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Cerrar modales al hacer clic fuera
const handleClickOutside = (event) => {
  // Solo cerrar el modal si se hace click en el backdrop (no en el contenido del modal)
  if (showAuthModal.value && event.target.classList.contains('auth-modal')) {
    closeAuthModal()
  }
  if (showCartPanel.value && !event.target.closest('.cart-panel')) {
    closeCart()
  }
  if (showUserDropdown.value && !event.target.closest('.user-dropdown-container')) {
    closeUserDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Exponer métodos para uso externo
defineExpose({
  addToCart,
  removeFromCart
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
}

/* Animaciones */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px var(--cyber-primary);
  }
  50% {
    box-shadow: 0 0 20px var(--cyber-primary), 0 0 30px var(--cyber-primary);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Marquesina cibernética */
.cyber-marquee {
  background: linear-gradient(90deg, var(--cyber-dark), var(--cyber-gray), var(--cyber-dark));
  border-bottom: 2px solid var(--cyber-primary);
  overflow: hidden;
  position: relative;
  height: 40px;
}

.marquee-content {
  display: flex;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}

.marquee-text {
  color: var(--cyber-primary);
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 0;
  text-shadow: 0 0 10px var(--cyber-primary);
  flex-shrink: 0;
  margin-right: 100px;
}

/* Navbar principal */
.cyber-navbar {
  background: linear-gradient(135deg, var(--cyber-dark), var(--cyber-gray));
  border-bottom: 3px solid var(--cyber-primary);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 240, 50, 0.3);
}

.navbar-main {
  padding: 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: relative;
}

/* Logo */
.logo-section {
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--cyber-text);
  transition: all 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--cyber-primary);
  text-shadow: 0 0 10px var(--cyber-primary);
  letter-spacing: 1px;
}

.logo-sub {
  font-size: 0.7rem;
  color: var(--cyber-accent);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;
}

/* Navegación central */
.nav-center {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: var(--cyber-text);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 50, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover,
.nav-link.active {
  background: rgba(0, 240, 50, 0.1);
  border: 1px solid var(--cyber-primary);
  box-shadow: 0 0 15px rgba(0, 240, 50, 0.3);
}

.nav-text {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Información del usuario */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 240, 50, 0.1);
  border: 1px solid var(--cyber-primary);
  border-radius: 0.75rem;
  margin-right: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--cyber-primary);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.user-name {
  color: var(--cyber-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.user-email {
  color: var(--cyber-text-muted);
  font-size: 0.8rem;
}

/* Acciones del usuario */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--cyber-light), var(--cyber-gray));
  border: 2px solid var(--cyber-primary);
  border-radius: 0.75rem;
  color: var(--cyber-text);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: fit-content;
  white-space: nowrap;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.4);
  animation: glow 1s infinite;
}

.action-btn.has-items {
  background: linear-gradient(135deg, var(--cyber-primary), #02c02b);
  color: var(--cyber-dark);
}

.action-btn.login-btn {
  background: linear-gradient(135deg, var(--cyber-light), var(--cyber-gray));
}

.action-btn.login-btn:hover {
  background: linear-gradient(135deg, var(--cyber-primary), #02c02b);
  color: var(--cyber-dark);
}

/* Dropdown de usuario */
.user-dropdown-container {
  position: relative;
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  margin-left: 0.5rem;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: linear-gradient(135deg, var(--cyber-gray), var(--cyber-light));
  border: 2px solid var(--cyber-primary);
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 240, 50, 0.3);
  z-index: 1000;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  overflow: hidden;
}

.user-dropdown.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-header {
  padding: 1rem;
  background: rgba(0, 240, 50, 0.1);
}

.user-info-mini {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar-mini {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--cyber-primary);
}

.user-details-mini {
  flex: 1;
}

.user-name-mini {
  color: var(--cyber-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.user-email-mini {
  color: var(--cyber-text-muted);
  font-size: 0.8rem;
}

.dropdown-divider {
  height: 1px;
  background: var(--cyber-primary);
  margin: 0.5rem 0;
}

.dropdown-items {
  padding: 0.25rem 0;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: var(--cyber-text);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(0, 240, 50, 0.1);
  color: var(--cyber-primary);
}

.dropdown-item.logout-item {
  color: var(--cyber-error);
}

.dropdown-item.logout-item:hover {
  background: rgba(254, 51, 1, 0.1);
  color: var(--cyber-error);
}

.dropdown-icon {
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.btn-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--cyber-accent);
  color: var(--cyber-dark);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  border: 2px solid var(--cyber-dark);
}

.btn-text {
  font-weight: 600;
  font-size: 0.9rem;
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

.action-btn:hover .btn-glow {
  left: 100%;
}

/* Botón móvil */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: var(--cyber-primary);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Menú móvil */
.mobile-menu {
  display: none;
  background: var(--cyber-gray);
  border-top: 2px solid var(--cyber-primary);
  padding: 1rem;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.mobile-menu.open {
  transform: translateY(0);
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  color: var(--cyber-text);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background: rgba(0, 240, 50, 0.1);
  border: 1px solid var(--cyber-primary);
}

.mobile-actions {
  display: flex;
  gap: 1rem;
}

.mobile-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, var(--cyber-light), var(--cyber-gray));
  border: 2px solid var(--cyber-primary);
  border-radius: 0.5rem;
  color: var(--cyber-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-action-btn:hover {
  background: linear-gradient(135deg, var(--cyber-primary), #02c02b);
  color: var(--cyber-dark);
}

/* Modal de login */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.login-modal.open {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: linear-gradient(135deg, var(--cyber-gray), var(--cyber-light));
  border: 2px solid var(--cyber-primary);
  border-radius: 1rem;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 240, 50, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  color: var(--cyber-primary);
  font-size: 1.5rem;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--cyber-text);
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: var(--cyber-primary);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: var(--cyber-text);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  background: var(--cyber-dark);
  border: 2px solid var(--cyber-primary);
  border-radius: 0.5rem;
  color: var(--cyber-text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(0, 240, 50, 0.3);
}

.login-submit-btn {
  width: 100%;
  padding: 1rem;
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
}

.login-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.4);
}

/* Panel de carrito */
.cart-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: linear-gradient(135deg, var(--cyber-gray), var(--cyber-light));
  border-left: 3px solid var(--cyber-primary);
  z-index: 10000;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
}

.cart-panel.open {
  right: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid var(--cyber-primary);
}

.cart-header h3 {
  color: var(--cyber-primary);
  margin: 0;
  font-size: 1.5rem;
}

.close-cart-btn {
  background: none;
  border: none;
  color: var(--cyber-text);
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-cart-btn:hover {
  color: var(--cyber-primary);
}

.cart-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: var(--cyber-text-muted);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--cyber-dark);
  border-radius: 0.5rem;
  border: 1px solid var(--cyber-primary);
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.cart-item-info {
  flex: 1;
}

.cart-item-info h4 {
  color: var(--cyber-text);
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.cart-item-info p {
  color: var(--cyber-primary);
  margin: 0;
  font-weight: bold;
}

.remove-item-btn {
  background: var(--cyber-accent);
  border: none;
  color: var(--cyber-dark);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.remove-item-btn:hover {
  background: var(--cyber-primary);
  transform: scale(1.1);
}

.cart-footer {
  padding: 1.5rem;
  border-top: 2px solid var(--cyber-primary);
}

.cart-total {
  color: var(--cyber-primary);
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--cyber-primary), #02c02b);
  border: none;
  border-radius: 0.75rem;
  color: var(--cyber-dark);
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .nav-center {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .action-btn .btn-text {
    display: none;
  }
  
  .action-btn {
    padding: 0.75rem;
  }
  
  .cart-panel {
    width: 100%;
    right: -100%;
  }
  
  .logo-main {
    font-size: 1.2rem;
  }
  
  .logo-sub {
    font-size: 0.6rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .logo-main {
    font-size: 1rem;
  }
  
  .action-btn {
    padding: 0.5rem;
  }
  
  .user-info {
    display: none;
  }
  
  .user-dropdown {
    min-width: 200px;
    right: -50px;
  }
}
</style>
