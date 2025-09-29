<template>
  <header class="navbar-modern">
    <!-- Top Bar con Marquesina -->
    <div class="top-bar">
      <div class="marquee-section">
            <div class="marquee-content">
          <span class="marquee-text">🕒 Lunes a Viernes (Horario de atención 10:00-17:00) 🕒</span>
            </div>
          </div>
      <div class="contact-info">
        <a href="https://wa.me/56955555" class="contact-link whatsapp">
          <span class="contact-icon">📱</span>
          <span class="contact-text">WhatsApp +56 955555</span>
        </a>
        <a href="mailto:soporte@gmail.com" class="contact-link email">
          <span class="contact-icon">✉️</span>
          <span class="contact-text">soporte@gmail.com</span>
        </a>
      </div>
    </div>

    <!-- Main Navigation -->
    <div class="main-nav">
      <div class="nav-container">
        <!-- Brand Section -->
        <div class="brand-section">
          <RouterLink to="/" class="brand-link">
            <div class="brand-logo">
              <div class="brand-text">
              <span class="brand-name">Dando La Hora</span>
                <span class="brand-tagline">Relojes Vintage & Modernos</span>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Search Section -->
        <div class="search-section">
          <div class="search-wrapper">
            <div class="search-input-group">
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
        </div>

        <!-- Actions Section -->
        <div class="actions-section">
          <button class="action-btn cart-btn" @click="toggleCart">
            <div class="btn-icon">🛒</div>
            <div class="btn-content">
              <span class="btn-text">Carrito</span>
              <span class="btn-count" v-if="cartCount > 0">{{ cartCount }}</span>
            </div>
          </button>

          <div class="user-section">
            <div class="action-btn login-btn">
              <div class="btn-icon">👤</div>
              <div class="btn-content">
                <span class="btn-text">Login</span>
              </div>
            </div>
          </div>


          <button class="mobile-toggle" @click="toggleMobileMenu">
            <span class="hamburger" :class="{ active: showMobileMenu }">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <div class="nav-wrapper">
        <div class="nav-links">
          <div class="nav-item" v-for="(item, index) in navItems" :key="index">
            <RouterLink :to="item.path" class="nav-link" @click="closeMobileMenu">
              <span class="nav-text">{{ item.name }}</span>
              <span class="nav-arrow" v-if="item.name === 'Relojes'">▼</span>
            </RouterLink>
            
                <!-- Dropdown Menu para Relojes -->
                <div class="dropdown-menu-relojes" v-if="item.name === 'Relojes'">
              <div class="dropdown-content">
                <div class="dropdown-section">
                      <h4 class="section-title">⭐ Productos Destacados</h4>
                      <button @click="viewFeaturedProduct('f-91w')" class="dropdown-link featured">
                        <span class="product-image">🕒</span>
                        <div class="product-info">
                          <span class="link-text">Casio F-91W Clásico</span>
                          <span class="product-price">$16.000</span>
                </div>
                      </button>
                      <button @click="viewFeaturedProduct('calculadora')" class="dropdown-link featured">
                        <span class="product-image">🧮</span>
                        <div class="product-info">
                          <span class="link-text">Reloj Calculadora</span>
                          <span class="product-price">$28.500</span>
              </div>
                      </button>
                      <button @click="viewFeaturedProduct('world time')" class="dropdown-link featured">
                        <span class="product-image">🌍</span>
                        <div class="product-info">
                          <span class="link-text">World Time Royale</span>
                          <span class="product-price">$39.500</span>
            </div>
                      </button>
                      <button @click="viewFeaturedProduct('transparente')" class="dropdown-link featured">
                        <span class="product-image">🔍</span>
                        <div class="product-info">
                          <span class="link-text">Transparentes 2024</span>
                          <span class="product-price">$32.000</span>
          </div>
                      </button>
                      <button @click="viewFeaturedProduct('pantalla negativa')" class="dropdown-link featured">
                        <span class="product-image">📱</span>
                        <div class="product-info">
                          <span class="link-text">Pantalla Negativa</span>
                          <span class="product-price">$42.000</span>
                </div>
                      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ active: showMobileMenu }">
      <div class="mobile-search">
        <div class="search-wrapper">
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
      
      <div class="mobile-nav">
      <div class="mobile-nav-links">
          <RouterLink 
            v-for="(item, index) in navItems" 
            :key="index"
            :to="item.path" 
            class="mobile-nav-link" 
            @click="closeMobileMenu"
          >
            <span class="mobile-nav-text">{{ item.name }}</span>
          </RouterLink>
        </div>
      </div>
      
      <div class="mobile-actions">
        <div class="mobile-action-btn" @click="closeMobileMenu">
          <span class="btn-icon">👤</span>
          <span class="btn-text">Iniciar Sesión</span>
        </div>
      </div>
    </div>

    <!-- Product Detail Popup -->
    <ProductDetailPopup
      :isVisible="showProductPopup"
      :product="selectedProduct"
      @close="closeProductPopup"
      @add-to-cart="addToCart"
      @add-to-wishlist="addToWishlist"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchProducts } from '../services/api.js'
import ProductDetailPopup from './ProductDetailPopup.vue'
import { openCart, getCart } from '../services/cart.js'

// Estado local
const showMobileMenu = ref(false)
const cartCount = ref(0)
const searchQuery = ref('')
const showProductPopup = ref(false)
const selectedProduct = ref(null)

// Navigation items
const navItems = ref([
  { name: 'Relojes', path: '/relojes' },
  { name: 'Productos', path: '/productos' },
  { name: 'Marcas', path: '/marcas' },
  { name: 'Regalos', path: '/regalos' },
  { name: 'Proyectos', path: '/proyectos' },
  { name: 'Accesorios', path: '/accesorios' }
])


// Métodos
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
  }
}


// Función para buscar productos por término de búsqueda
const searchProductByTerm = async (searchTerm) => {
  try {
    const products = await fetchProducts()
    const foundProduct = products.find(product => 
      product.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return foundProduct
  } catch (error) {
    console.error('Error al buscar producto:', error)
    return null
  }
}

// Función para mostrar producto destacado
const viewFeaturedProduct = async (searchTerm) => {
  const product = await searchProductByTerm(searchTerm)
  if (product) {
    selectedProduct.value = product
    showProductPopup.value = true
    closeMobileMenu() // Cerrar el menú móvil si está abierto
  } else {
    console.log('Producto no encontrado:', searchTerm)
  }
}

// Función para cerrar el popup
const closeProductPopup = () => {
  showProductPopup.value = false
  selectedProduct.value = null
}

// Función para añadir al carrito desde el popup
const addToCart = (product) => {
  if (product.stock > 0) {
    // Mostrar notificación de éxito
    const notification = document.createElement('div')
    notification.className = 'cart-notification'
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">✅</span>
        <span class="notification-text">"${product.titulo}" añadido al carrito</span>
      </div>
    `
    
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
    `
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
    
    console.log('Producto añadido al carrito:', product)
  }
  const items = getCart()
    cartCount.value = items.length
}

// Función para añadir a favoritos
const addToWishlist = (product) => {
  const notification = document.createElement('div')
  notification.className = 'wishlist-notification'
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">♡</span>
      <span class="notification-text">"${product.titulo}" agregado a favoritos</span>
    </div>
  `
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #8171f6, #6b5ce6);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 8px 25px rgba(129, 113, 246, 0.3);
    z-index: 10001;
    animation: slideInRight 0.3s ease-out;
    font-weight: 600;
  `
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out'
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
  
  console.log('Producto agregado a favoritos:', product)
}

// Cerrar menús al hacer click fuera
const handleClickOutside = (event) => {
  if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-toggle')) {
    showMobileMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
   const items = getCart()
  cartCount.value = items.length
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Variables CSS */
:root {
  --primary-blue: #8171f6;
  --primary-green: #00f032;
  --primary-yellow: #d2fa03;
  --primary-red: #fe3301;
  --primary-black: #1f1f1f;
  --primary-white: #ffffff;
  
  --gray-50: #f4f4f4;
  --gray-100: #e5e5e5;
  --gray-200: #d2d2d2;
  --gray-300: #a5a5a5;
  --gray-400: #797979;
  --gray-500: #4c4c4c;
  --gray-600: #353535;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reset y base */
* {
  box-sizing: border-box;
}

.navbar-modern {
  width: 100%;
  background: var(--primary-white);
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
}

/* Top Bar con Marquesina */
.top-bar {
  background: linear-gradient(135deg, var(--primary-blue), #6b5ce6);
  color: var(--primary-white);
  padding: 0.75rem 0;
  overflow: hidden;
  position: relative;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  width: 100%;
}

.marquee-section {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

.marquee-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-white);
  opacity: 0.9;
  padding-right: 3rem;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.contact-info {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-white);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.contact-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.contact-icon {
  font-size: 1rem;
}

/* Main Navigation */
.main-nav {
  background: var(--primary-white);
  border-bottom: 1px solid var(--gray-100);
  padding: 1rem 0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Brand Section */
.brand-section {
  flex-shrink: 0;
}

.brand-link {
  text-decoration: none;
  display: block;
}

.brand-logo {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.brand-logo:hover {
  background: var(--gray-50);
  transform: translateY(-2px);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-green);
  line-height: 1.2;
}

.brand-tagline {
  font-size: 0.75rem;
  color: var(--gray-400);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Search Section */
.search-section {
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
}

.search-wrapper {
  position: relative;
  width: 100%;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1.25rem;
  padding-right: 3.5rem;
  border: 2px solid var(--gray-100);
  border-radius: 2rem;
  font-size: 0.875rem;
  background: var(--gray-50);
  transition: var(--transition);
  outline: none;
}

.search-input:focus {
  border-color: var(--primary-green);
  background: var(--primary-white);
  box-shadow: 0 0 0 4px rgba(0, 240, 50, 0.1);
  transform: translateY(-1px);
}

.search-btn {
  position: absolute;
  right: 0.375rem;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  border: none;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 50%;
  transition: var(--transition);
  box-shadow: var(--shadow-md);
}

.search-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--shadow-lg);
}

.search-icon {
  font-size: 1rem;
  color: var(--primary-white);
}

/* Actions Section */
.actions-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: var(--border-radius);
}

.action-btn:hover::before {
  opacity: 0.1;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-icon {
  font-size: 1.25rem;
  position: relative;
  z-index: 1;
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.btn-text {
  font-size: 0.875rem;
  font-weight: 600;
}

.btn-count {
  background: var(--primary-red);
  color: var(--primary-white);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
  margin-top: 0.125rem;
}

.cart-btn {
  background: linear-gradient(135deg, var(--gray-50), var(--primary-white));
  color: var(--gray-700);
  border: 2px solid var(--gray-200);
  border-radius: 2rem;
  box-shadow: var(--shadow-sm);
}

.cart-btn:hover {
  border-color: var(--primary-green);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.15);
}

.login-btn {
  background: linear-gradient(135deg, var(--primary-yellow), #b8e002);
  color: var(--primary-black);
  border: 2px solid var(--primary-yellow);
  border-radius: 2rem;
  box-shadow: var(--shadow-md);
}

.login-btn:hover {
  background: linear-gradient(135deg, #b8e002, var(--primary-yellow));
  border-color: #b8e002;
  box-shadow: 0 8px 25px rgba(210, 250, 3, 0.3);
}

/* User Dropdown */
.user-dropdown {
  position: relative;
}

.user-btn {
  background: linear-gradient(135deg, var(--gray-50), var(--primary-white));
  color: var(--gray-700);
  border: 2px solid var(--gray-200);
  border-radius: 2rem;
  box-shadow: var(--shadow-sm);
}

.user-btn:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 8px 25px rgba(129, 113, 246, 0.15);
}

.dropdown-arrow {
  font-size: 0.75rem;
  transition: var(--transition);
  position: relative;
  z-index: 1;
}

.dropdown-arrow.active {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--primary-white);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-xl);
  min-width: 220px;
  overflow: hidden;
  z-index: 1001;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  color: var(--gray-400);
}

.dropdown-divider {
  height: 1px;
  background: var(--gray-200);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  color: var(--gray-700);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--gray-50);
  color: var(--primary-green);
}

.logout-item {
  color: var(--primary-red);
}

.logout-item:hover {
  background: #fef2f2;
  color: var(--primary-red);
}

.item-icon {
  font-size: 1rem;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.mobile-toggle:hover {
  background: var(--gray-100);
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
  transition: var(--transition);
  border-radius: 1px;
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

/* Navigation Menu */
.nav-menu {
  background: linear-gradient(135deg, var(--gray-50), var(--primary-white));
  border-bottom: 1px solid var(--gray-100);
  padding: 0;
}

.nav-wrapper {
  width: 100%;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 1rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 2rem;
  text-decoration: none;
  color: var(--gray-700);
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition);
  border-radius: var(--border-radius);
  margin: 0.5rem 0.25rem;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  border-radius: var(--border-radius);
}

.nav-link:hover::before {
  opacity: 0.1;
}

.nav-link:hover {
  color: var(--primary-green);
  background: var(--primary-white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.nav-link.router-link-active {
  color: var(--primary-green);
  background: var(--primary-white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.nav-link.router-link-active::before {
  opacity: 0.15;
}

.nav-text {
  position: relative;
  z-index: 1;
}

.nav-arrow {
  font-size: 0.75rem;
  transition: var(--transition);
  position: relative;
  z-index: 1;
}

.nav-item:hover .nav-arrow {
  transform: rotate(180deg);
}

/* Dropdown Menu para Relojes */
.dropdown-menu-relojes {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--primary-white);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-xl);
  min-width: 400px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.nav-item:hover .dropdown-menu-relojes {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.dropdown-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dropdown-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--primary-green);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--primary-green);
  padding-bottom: 0.5rem;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  color: var(--gray-700);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
  border-radius: 0.75rem;
  position: relative;
  overflow: hidden;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  cursor: pointer;
  width: 100%;
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
  transform: translateY(-2px);
  background: var(--primary-white);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.15);
  border-color: var(--primary-green);
}

.dropdown-link.featured {
  color: var(--gray-700);
  font-weight: 600;
  background: var(--primary-white);
  border: 1px solid var(--gray-200);
}

.dropdown-link.featured:hover {
  background: var(--primary-white);
  border-color: var(--primary-green);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.15);
}

.product-image {
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.link-text {
  font-weight: 600;
  font-size: 0.875rem;
  position: relative;
  z-index: 1;
}

.product-price {
  font-weight: 700;
  color: var(--primary-blue, #8171f6);
  font-size: 0.75rem;
  position: relative;
  z-index: 1;
}


/* Mobile Menu */
.mobile-menu {
  display: none;
  background: var(--primary-white);
  border-top: 1px solid var(--gray-200);
  padding: 1rem;
  animation: slideDown 0.3s ease;
}

.mobile-menu.active {
  display: block;
}

.mobile-search {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.mobile-search .search-wrapper {
  width: 100%;
}

.mobile-search .search-input {
  background: var(--primary-white);
}

.mobile-nav {
  padding: 1rem 0;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  color: var(--gray-700);
  font-weight: 500;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.mobile-nav-link:hover {
  background: var(--gray-50);
  color: var(--primary-green);
  transform: translateX(4px);
}

.mobile-actions {
  padding: 1rem;
  border-top: 1px solid var(--gray-200);
}

.mobile-action-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--gray-700);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
  width: 100%;
  margin-bottom: 0.5rem;
}

.mobile-action-btn:hover {
  background: var(--gray-100);
  border-color: var(--gray-300);
  color: var(--primary-green);
}

.mobile-user-info {
  background: var(--gray-50);
  border-radius: var(--border-radius);
  padding: 1rem;
}

.mobile-user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-avatar {
  font-size: 2rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: var(--gray-700);
}

.user-email {
  font-size: 0.875rem;
  color: var(--gray-400);
}

.mobile-user-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.logout-btn {
  color: var(--primary-red);
}

.logout-btn:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: var(--primary-red);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .nav-container {
    gap: 1.5rem;
    padding: 0 1.5rem;
  }
  
  .search-section {
    max-width: 400px;
  }
  
  .nav-wrapper {
    padding: 0 1.5rem;
  }
  
  .dropdown-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .dropdown-menu-relojes {
    min-width: 500px;
  }
}

@media (max-width: 768px) {
  .top-bar {
    padding: 0.75rem 1rem;
  }
  
  .contact-info {
    gap: 1rem;
  }
  
  .contact-link {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
  
  .main-nav {
    padding: 0.75rem 0;
  }
  
  .nav-container {
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .brand-name {
    font-size: 1.25rem;
  }
  
  .brand-tagline {
    font-size: 0.7rem;
  }
  
  .search-section {
    display: none;
  }
  
  .mobile-toggle {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .nav-menu {
    display: none;
  }
  
  .dropdown-menu-relojes {
    display: none;
  }
  
  .actions-section {
    gap: 0.5rem;
  }
  
  .btn-text {
    display: none;
  }
  
  .dropdown-menu {
    right: -1rem;
    min-width: 200px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
  }
  
  .brand-name {
    font-size: 1.125rem;
  }
  
  .action-btn {
    padding: 0.5rem;
  }
  
  .btn-icon {
    font-size: 1.125rem;
  }
}

/* Notification Animations */
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
</style>