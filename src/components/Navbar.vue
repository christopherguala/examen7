<template>
  <header class="navbar">
    <div class="top-bar">
      <div class="top-bar-container">
        <div class="top-bar-left">
          <div class="marquee-container">
            <div class="marquee-content">
              <span class="marquee-text">Lunes a Viernes (Horario de atención 10:00-17:00)</span>
            </div>
          </div>
        </div>
        <div class="top-bar-right">
          <a href="https://wa.me/56955555" class="top-bar-link">
            <span class="whatsapp-icon">📱</span>
            <span>Whatsapp +56 955555</span>
          </a>
          <a href="mailto:sos@dandolahora.cl" class="top-bar-link">
            <span class="email-icon">✉️</span>
            <span>soporte@gmail.com</span>
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-main">
      <div class="navbar-container">
        <div class="navbar-brand">
          <RouterLink to="/" class="brand-link">
            <div class="logo">
              <span class="brand-name">Dando La Hora</span>
            </div>
          </RouterLink>
        </div>

        <div class="search-container">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Buscar relojes, marcas, accesorios..." 
              class="search-input"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch">
              <span class="search-icon">🔍</span>
            </button>
          </div>
        </div>

        <div class="navbar-actions">
          <button class="cart-btn" @click="toggleCart">
  <span class="cart-icon">🛒</span>
  <span class="cart-text">Carrito</span>
  <span class="cart-count" v-if="cartCount > 0">({{ cartCount }})</span>
</button>

          <div class="user-menu">
            <template v-if="!userStore.isAuthenticated">
              <RouterLink to="/login" class="auth-btn login-btn">
                <span class="btn-icon">👤</span>
                <span class="btn-text">Login</span>
              </RouterLink>
            </template>

            <template v-else>
              <div class="user-dropdown">
                <button class="user-btn" @click="toggleUserMenu" :class="{ active: showUserMenu }">
                  <span class="user-avatar">👤</span>
                  <span class="user-name">{{ userStore.user?.name || 'Usuario' }}</span>
                  <span class="dropdown-arrow">▼</span>
                </button>
                
                <div class="dropdown-menu" v-show="showUserMenu">
                  <div class="dropdown-header">
                    <div class="user-info">
                      <span class="user-email">{{ userStore.user?.email }}</span>
                    </div>
                  </div>
                  <div class="dropdown-divider"></div>
                  <RouterLink to="/profile" class="dropdown-item">
                    <span class="item-icon">⚙️</span>
                    <span class="item-text">Mi Perfil</span>
                  </RouterLink>
                  <RouterLink to="/orders" class="dropdown-item">
                    <span class="item-icon">📦</span>
                    <span class="item-text">Mis Pedidos</span>
                  </RouterLink>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item logout-item" @click="handleLogout">
                    <span class="item-icon">🚪</span>
                    <span class="item-text">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </template>
          </div>

          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <span class="hamburger" :class="{ active: showMobileMenu }">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-links">
          <div class="nav-item dropdown-item">
            <RouterLink to="/relojes" class="nav-link">
              Relojes
              <span class="dropdown-arrow">▼</span>
            </RouterLink>
            <div class="dropdown-menu-large">
              <div class="dropdown-content">
                <div class="dropdown-section">
                  <h4>Colecciones</h4>
                  <RouterLink to="/relojes/nuevos" class="dropdown-link">Nuevos</RouterLink>
                  <RouterLink to="/relojes/mas-vendidos" class="dropdown-link">Más vendidos</RouterLink>
                  <RouterLink to="/relojes/colaboraciones" class="dropdown-link">Colaboraciones</RouterLink>
                  <RouterLink to="/relojes/despertadores" class="dropdown-link">Despertadores</RouterLink>
                  <RouterLink to="/relojes/ofertas" class="dropdown-link">Ofertas hasta 25% OFF</RouterLink>
                  <RouterLink to="/relojes/segunda-mano" class="dropdown-link">Segunda Mano</RouterLink>
                </div>
                <div class="dropdown-section">
                  <h4>Estilo</h4>
                  <RouterLink to="/relojes/digitales-vintage" class="dropdown-link">Digitales vintage</RouterLink>
                  <RouterLink to="/relojes/analogos-formales" class="dropdown-link">Análogos formales</RouterLink>
                  <RouterLink to="/relojes/minimalista" class="dropdown-link">Minimalista</RouterLink>
                  <RouterLink to="/relojes/a-cuerda" class="dropdown-link">A cuerda</RouterLink>
                  <RouterLink to="/relojes/fabricado-japon" class="dropdown-link">Fabricado en Japón</RouterLink>
                  <RouterLink to="/relojes/automatico" class="dropdown-link">Automático</RouterLink>
                </div>
                <div class="dropdown-section">
                  <h4>⭐ Recomendados</h4>
                  <RouterLink to="/relojes/orient-bambino" class="dropdown-link featured">Orient Bambino</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="nav-item dropdown-item">
            <RouterLink to="/marcas" class="nav-link">
              Marcas
              <span class="dropdown-arrow">▼</span>
            </RouterLink>
            <div class="dropdown-menu-large">
              <div class="dropdown-content">
                <div class="dropdown-section">
                  <RouterLink to="/marcas/casio-vintage" class="dropdown-link">Relojes Casio Vintage</RouterLink>
                  <RouterLink to="/marcas/casio-g-shock" class="dropdown-link">Relojes Casio G-Shock Vintage</RouterLink>
                  <RouterLink to="/marcas/seiko" class="dropdown-link">Relojes Seiko</RouterLink>
                  <RouterLink to="/marcas/citizen" class="dropdown-link">Relojes Citizen</RouterLink>
                  <RouterLink to="/marcas/luch" class="dropdown-link">Relojes Luch Made in Belarus</RouterLink>
                  <RouterLink to="/marcas/laco" class="dropdown-link">Relojes Laco</RouterLink>
                  <RouterLink to="/marcas/frank-miura" class="dropdown-link">Frank Miura</RouterLink>
                  <RouterLink to="/marcas/tissot" class="dropdown-link">Relojes Tissot - Swiss Made</RouterLink>
                  <RouterLink to="/marcas/vostok" class="dropdown-link">Relojes Vostok Made in Russia</RouterLink>
                  <RouterLink to="/marcas/hamilton" class="dropdown-link">Relojes Hamilton</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="nav-item dropdown-item">
            <RouterLink to="/regalos" class="nav-link">
              Regalos
              <span class="dropdown-arrow">▼</span>
            </RouterLink>
            <div class="dropdown-menu-large">
              <div class="dropdown-content">
                <div class="dropdown-section">
                  <h4>Colecciones</h4>
                  <RouterLink to="/regalos/relojes" class="dropdown-link">Relojes</RouterLink>
                  <RouterLink to="/regalos/accesorios" class="dropdown-link">Accesorios</RouterLink>
                  <RouterLink to="/regalos/cuidado-reloj" class="dropdown-link">Cuidado del reloj</RouterLink>
                  <RouterLink to="/regalos/ofertas" class="dropdown-link">Ofertas hasta 25% OFF</RouterLink>
                  <RouterLink to="/regalos/gift-card" class="dropdown-link">Gift Card</RouterLink>
                </div>
                <div class="dropdown-section">
                  <h4>Por Edad</h4>
                  <RouterLink to="/regalos/ninos" class="dropdown-link">Niños</RouterLink>
                  <RouterLink to="/regalos/mujeres" class="dropdown-link">Mujeres</RouterLink>
                  <RouterLink to="/regalos/hombres" class="dropdown-link">Hombres</RouterLink>
                  <RouterLink to="/regalos/adultos" class="dropdown-link">Adultos</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="nav-item dropdown-item">
            <RouterLink to="/proyectos" class="nav-link">
              Proyectos
              <span class="dropdown-arrow">▼</span>
            </RouterLink>
            <div class="dropdown-menu-large">
              <div class="dropdown-content">
                <div class="dropdown-section">
                  <RouterLink to="/proyectos/vostok-justicia-divina" class="dropdown-link">Reloj Vostok x Dando la Hora Justicia Divina</RouterLink>
                  <RouterLink to="/proyectos/numero-uno" class="dropdown-link">El Número Uno, el primer reloj digital en la historia de Chile</RouterLink>
                  <RouterLink to="/proyectos/elektronika" class="dropdown-link">P.R.P. 03 Elektronika x Dando La Hora</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="nav-item dropdown-item">
            <RouterLink to="/accesorios" class="nav-link">
              Accesorios
              <span class="dropdown-arrow">▼</span>
            </RouterLink>
            <div class="dropdown-menu-large">
              <div class="dropdown-content">
                <div class="dropdown-section">
                  <RouterLink to="/accesorios/correas" class="dropdown-link">Correas</RouterLink>
                  <RouterLink to="/accesorios/herramientas" class="dropdown-link">Herramientas</RouterLink>
                  <RouterLink to="/accesorios/merch-dlh" class="dropdown-link">Merch DLH</RouterLink>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </nav>

    <div class="mobile-menu" :class="{ active: showMobileMenu }">
      <div class="mobile-search">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Buscar relojes, marcas, accesorios..." 
            class="search-input"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">
            <span class="search-icon">🔍</span>
          </button>
        </div>
      </div>
      
      <div class="mobile-nav-links">
        <RouterLink to="/relojes" class="mobile-nav-link" @click="closeMobileMenu">Relojes</RouterLink>
        <RouterLink to="/marcas" class="mobile-nav-link" @click="closeMobileMenu">Marcas</RouterLink>
        <RouterLink to="/regalos" class="mobile-nav-link" @click="closeMobileMenu">Regalos</RouterLink>
        <RouterLink to="/proyectos" class="mobile-nav-link" @click="closeMobileMenu">Proyectos</RouterLink>
        <RouterLink to="/accesorios" class="mobile-nav-link" @click="closeMobileMenu">Accesorios</RouterLink>
      </div>
      
      <div class="mobile-auth">
        <template v-if="!userStore.isAuthenticated">
          <RouterLink to="/login" class="mobile-auth-btn" @click="closeMobileMenu">
            <span class="btn-icon">👤</span>
            <span class="btn-text">Iniciar Sesión</span>
          </RouterLink>
        </template>
        <template v-else>
          <div class="mobile-user-info">
            <div class="mobile-user-header">
              <span class="user-avatar">👤</span>
              <div class="user-details">
                <span class="user-name">{{ userStore.user?.name || 'Usuario' }}</span>
                <span class="user-email">{{ userStore.user?.email }}</span>
              </div>
            </div>
            <div class="mobile-user-actions">
              <RouterLink to="/profile" class="mobile-action-btn" @click="closeMobileMenu">
                <span class="item-icon">⚙️</span>
                <span class="item-text">Mi Perfil</span>
              </RouterLink>
              <RouterLink to="/orders" class="mobile-action-btn" @click="closeMobileMenu">
                <span class="item-icon">📦</span>
                <span class="item-text">Mis Pedidos</span>
              </RouterLink>
              <button class="mobile-action-btn logout-btn" @click="handleLogout">
                <span class="item-icon">🚪</span>
                <span class="item-text">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../store/user.js'
import { openCart, getCart } from '../services/cart.js'

// Store
const userStore = useUserStore()

// Estado local
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const cartCount = ref(0)
const searchQuery = ref('')

// Conectar carrito
const cartItems = getCart()

// Actualizar contador cada vez que cambia el carrito
watch(cartItems, () => {
  cartCount.value = cartItems.value.length
}, { deep: true })

// Métodos
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// Abrir carrito al hacer click en el botón
const toggleCart = () => {
  openCart()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Buscando:', searchQuery.value)
    // Implementar lógica de búsqueda
  }
}

const handleLogout = () => {
  userStore.logout()
  showUserMenu.value = false
  closeMobileMenu()
  // Redirigir al home después del logout
  window.location.href = '/'
}

// Cerrar menús al hacer click fuera
const handleClickOutside = (event) => {
  if (!event.target.closest('.user-dropdown')) {
    showUserMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<style scoped>

.top-bar {
  background: var(--primary-blue);
  color: white;
  font-size: 0.875rem;
  padding: 0.5rem 0;
}

.top-bar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar-left {
  font-weight: 500;
  overflow: hidden;
  flex: 1;
}

.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
}

.marquee-container::before,
.marquee-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2rem;
  z-index: 2;
  pointer-events: none;
}

.marquee-container::before {
  left: 0;
  background: linear-gradient(to right, var(--primary-blue), transparent);
}

.marquee-container::after {
  right: 0;
  background: linear-gradient(to left, var(--primary-blue), transparent);
}

.marquee-content {
  display: inline-block;
  animation: marquee 15s linear infinite;
  white-space: nowrap;
}

.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}

.marquee-text {
  display: inline-block;
  font-weight: 500;
  color: white;
  opacity: 0.9;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.top-bar-right {
  display: flex;
  gap: 1.5rem;
}

.top-bar-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease;
}

.top-bar-link:hover {
  opacity: 0.8;
}

.whatsapp-icon,
.email-icon {
  font-size: 1rem;
}

.navbar {
  background: var(--primary-white);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-main {
  border-bottom: none;
}

.navbar-container {
  width: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  text-decoration: none;
  color: var(--primary-black);
  display: flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

.brand-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 1rem;
}

.brand-link:hover::before {
  opacity: 0.1;
}

.brand-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.2);
}

.logo {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-green);
  letter-spacing: -0.025em;
  text-shadow: 0 2px 4px rgba(0, 240, 50, 0.1);
}

.search-container {
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1.25rem;
  padding-right: 3.5rem;
  border: 2px solid transparent;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  background: linear-gradient(135deg, var(--gray-50), white);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-green);
  background: white;
  box-shadow: 
    0 0 0 4px rgba(0, 240, 50, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.search-btn {
  position: absolute;
  right: 0.5rem;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  border: none;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 240, 50, 0.2);
}

.search-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 240, 50, 0.3);
}

.search-icon {
  font-size: 1rem;
  color: var(--gray-500);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--gray-50), white);
  border: 2px solid transparent;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  border-radius: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--gray-700);
  font-weight: 500;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 1.5rem;
}

.cart-btn:hover::before {
  opacity: 0.1;
}

.cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.2);
  border-color: var(--primary-green);
}

.cart-icon {
  font-size: 1.25rem;
}

.cart-text {
  font-size: 0.875rem;
}

.cart-count {
  background: var(--red);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

.main-nav {
  background: linear-gradient(135deg, var(--gray-50), white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
}

.nav-container {
  width: 100%;
  padding: 0 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 1.25rem 1.75rem;
  text-decoration: none;
  color: var(--gray-700);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1rem;
  margin: 0.5rem 0.25rem;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 1rem;
}

.nav-link:hover::before {
  opacity: 0.1;
}

.nav-link:hover {
  color: var(--primary-green);
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.15);
}

.nav-link.router-link-active {
  color: var(--primary-green);
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.2);
}

.nav-link.router-link-active::before {
  opacity: 0.15;
}

.dropdown-arrow {
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}

.dropdown-item:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu-large {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 1.5rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  min-width: 600px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  backdrop-filter: blur(20px);
}

.dropdown-item:hover .dropdown-menu-large {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.dropdown-content {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.dropdown-section h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dropdown-link {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--gray-600);
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.75rem;
  position: relative;
  overflow: hidden;
}

.dropdown-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.75rem;
}

.dropdown-link:hover::before {
  opacity: 0.1;
}

.dropdown-link:hover {
  color: var(--primary-green);
  transform: translateX(4px);
  background: rgba(0, 240, 50, 0.05);
}

.dropdown-link.featured {
  color: var(--primary-green);
  font-weight: 600;
  background: rgba(0, 240, 50, 0.1);
}

.auth-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-btn {
  background: linear-gradient(135deg, var(--primary-yellow), #b8e002);
  color: var(--black);
  border-radius: 1.5rem;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 15px rgba(210, 250, 3, 0.3);
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #b8e002, var(--primary-yellow));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 1.5rem;
}

.login-btn:hover::before {
  opacity: 1;
}

.login-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(210, 250, 3, 0.4);
}

.btn-icon {
  font-size: 1rem;
}

.btn-text {
  font-size: 0.875rem;
}

.user-dropdown {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-btn:hover {
  background: var(--gray-100);
  border-color: var(--gray-300);
}

.user-btn.active {
  background: var(--gray-100);
  border-color: var(--primary-red);
}

.user-avatar {
  font-size: 1rem;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
}

.dropdown-arrow {
  font-size: 0.75rem;
  color: var(--gray-500);
  transition: transform 0.2s ease;
}

.user-btn.active .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  overflow: hidden;
  z-index: 1001;
}

.dropdown-header {
  padding: 1rem;
  background: var(--gray-50);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-email {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.dropdown-divider {
  height: 1px;
  background: var(--gray-200);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--gray-700);
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--gray-50);
}

.logout-item {
  color: var(--red);
}

.logout-item:hover {
  background: #fef2f2;
}

.item-icon {
  font-size: 1rem;
}

.item-text {
  font-weight: 500;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 20px;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: var(--gray-700);
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-menu {
  display: none;
  background: white;
  border-top: 1px solid var(--gray-200);
  padding: 1rem;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.mobile-nav-link {
  padding: 0.75rem 0;
  text-decoration: none;
  color: var(--gray-700);
  font-weight: 500;
  border-bottom: 1px solid var(--gray-200);
}

.mobile-nav-link:hover {
  color: var(--primary-green);
}

.mobile-auth-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--primary-yellow);
  color: var(--black);
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  justify-content: center;
}

.mobile-user-info {
  background: var(--gray-50);
  border-radius: 0.75rem;
  padding: 1rem;
}

.mobile-user-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.mobile-user-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--gray-700);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mobile-action-btn:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
}

.logout-btn {
  color: var(--red);
}

.logout-btn:hover {
  background: #fef2f2;
  border-color: #fecaca;
}

.mobile-search {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.mobile-search .search-box {
  width: 100%;
}

.mobile-search .search-input {
  background: white;
}

@media (max-width: 768px) {
  .top-bar {
    display: none;
  }
  
  .marquee-container::before,
  .marquee-container::after {
    width: 1rem;
  }
  
  .marquee-text {
    font-size: 0.8rem;
  }
  
  .marquee-content {
    animation: marquee 12s linear infinite;
  }
  
  .main-nav {
    display: none;
  }
  
  .search-container {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .mobile-menu.active {
    display: block;
  }
  
  .navbar-container {
    padding: 0 1rem;
    height: 70px;
  }
  
  .navbar-actions {
    gap: 0.5rem;
  }
  
  .cart-text {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .dropdown-menu {
    right: -1rem;
    min-width: 180px;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.75rem;
  }
  
  .brand-name {
    font-size: 1.125rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
  
  .cart-btn {
    padding: 0.375rem;
  }
  
  .cart-icon {
    font-size: 1.125rem;
  }
}
</style>