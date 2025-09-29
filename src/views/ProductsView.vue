<template>
  <div class="products-view">
    <!-- Header Section -->
    <div class="products-header">
      <div class="container">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <p class="page-subtitle">{{ pageSubtitle }}</p>
        
        <!-- Filters Section -->
        <div class="filters-section">
          <div class="search-filter">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar relojes..."
              class="search-input"
            />
          </div>
          
          <div class="category-filters">
            <button
              v-for="category in categories"
              :key="category.key"
              @click="setActiveCategory(category.key)"
              :class="['filter-btn', { active: activeCategory === category.key }]"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="products-container">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <div class="error-icon">⚠️</div>
          <h3>Error al cargar productos</h3>
          <p>{{ error }}</p>
          <button @click="loadProducts" class="retry-btn">Intentar de nuevo</button>
        </div>
        
        <!-- Products Grid -->
        <div v-else-if="filteredProducts.length > 0" class="products-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
            @click="viewProduct(product)"
          >
            <div class="product-image">
              <img :src="product.imagen" :alt="product.titulo" />
              <div class="product-badge" v-if="product.stock <= 5 && product.stock > 0">
                ¡Últimas unidades!
              </div>
              <div class="product-badge sold-out" v-if="product.stock === 0">
                Agotado
              </div>
            </div>
            
            <div class="product-info">
              <div class="product-brand">{{ product.marca || 'Casio' }}</div>
              <h3 class="product-title">{{ product.titulo }}</h3>
              <p class="product-description">{{ truncateText(product.descripcion, 100) }}</p>
              
              <div class="product-rating">
                <div class="stars">
                  <span v-for="n in 5" :key="n" class="star">
                    <span v-if="n <= Math.round(product.rating)" class="star-filled">★</span>
                    <span v-else class="star-empty">☆</span>
                  </span>
                </div>
                <span class="rating-text">({{ product.reviews }} reseñas)</span>
              </div>
              
              <div class="product-price">${{ product.precio.toLocaleString() }}</div>
              
              <button
                class="add-to-cart-btn"
                :disabled="product.stock === 0"
                @click.stop="addToCart(product)"
              >
                {{ product.stock > 0 ? 'Añadir al carrito' : 'Agotado' }}
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="no-products">
          <div class="no-products-icon">🕒</div>
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros filtros o términos de búsqueda</p>
          <button @click="clearFilters" class="clear-filters-btn">
            Limpiar filtros
          </button>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProducts } from '../services/api.js'
import ProductDetailPopup from '../components/ProductDetailPopup.vue'

const route = useRoute()
const router = useRouter()

// Estado reactivo
const products = ref([])
const searchQuery = ref('')
const activeCategory = ref('all')
const loading = ref(true)
const error = ref(null)
const showProductPopup = ref(false)
const selectedProduct = ref(null)

// Datos de la página basados en la ruta
const pageTitle = ref('Nuestros Relojes')
const pageSubtitle = ref('Descubre nuestra colección de relojes vintage y modernos')

// Categorías basadas en los productos reales
const categories = ref([
  { key: 'all', name: 'Todos' },
  { key: 'vintage', name: 'Vintage' },
  { key: 'digital', name: 'Digitales' },
  { key: 'calculator', name: 'Calculadora' },
  { key: 'analog-digital', name: 'Analógico-Digital' },
  { key: 'world-time', name: 'Hora Mundial' },
  { key: 'sports', name: 'Deportivos' },
  { key: 'transparent', name: 'Transparentes' }
])

// Función para cargar productos
const loadProducts = async () => {
  loading.value = true
  error.value = null
  
  console.log('🔄 Cargando productos...')
  try {
    products.value = await fetchProducts()
    console.log('✅ Productos cargados:', products.value.length, 'productos')
    console.log('📦 Primer producto:', products.value[0])
  } catch (err) {
    console.error('❌ Error al cargar productos:', err)
    error.value = err.message || 'Error al cargar los productos'
  } finally {
    loading.value = false
  }
}

// Función para manejar la tecla Escape
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showProductPopup.value) {
    closeProductPopup()
  }
}

// Cargar productos al montar el componente
onMounted(async () => {
  await loadProducts()
  
  // Configurar título y filtros basados en query params
  if (route.query.category) {
    activeCategory.value = route.query.category
    updatePageTitle(route.query.category)
  }
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  
  // Agregar listener para la tecla Escape
  document.addEventListener('keydown', handleKeydown)
})

// Limpiar listener al desmontar
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Función para actualizar el título de la página según la categoría
const updatePageTitle = (category) => {
  const categoryMap = {
    'vintage': 'Relojes Vintage',
    'digital': 'Relojes Digitales',
    'calculator': 'Relojes Calculadora',
    'analog-digital': 'Relojes Analógico-Digital',
    'world-time': 'Relojes Hora Mundial',
    'sports': 'Relojes Deportivos',
    'transparent': 'Relojes Transparentes'
  }
  
  if (categoryMap[category]) {
    pageTitle.value = categoryMap[category]
    pageSubtitle.value = `Descubre nuestra colección de ${categoryMap[category].toLowerCase()}`
  }
}

// Función para determinar la categoría de un producto basada en su nombre
const getProductCategory = (product) => {
  const title = product.titulo.toLowerCase()
  const description = product.descripcion.toLowerCase()
  
  if (title.includes('calculadora') || title.includes('ca-53')) return 'calculator'
  if (title.includes('analogo-digital') || title.includes('aeq-')) return 'analog-digital'
  if (title.includes('world time') || title.includes('ae-1200')) return 'world-time'
  if (title.includes('transparente') || title.includes('ws-')) return 'transparent'
  if (title.includes('w-218') || title.includes('deportivo')) return 'sports'
  if (title.includes('vintage') || title.includes('f-91') || title.includes('a158') || title.includes('a168')) return 'vintage'
  if (title.includes('digital')) return 'digital'
  
  return 'vintage' // Por defecto, la mayoría son vintage
}

// Productos filtrados
const filteredProducts = computed(() => {
  let filtered = products.value

  // Filtrar por categoría
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(product => 
      getProductCategory(product) === activeCategory.value
    )
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product =>
      product.titulo.toLowerCase().includes(query) ||
      product.descripcion.toLowerCase().includes(query) ||
      (product.marca && product.marca.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Métodos
const setActiveCategory = (category) => {
  activeCategory.value = category
  updatePageTitle(category)
  
  // Actualizar URL
  router.push({
    query: { ...route.query, category }
  })
}

const clearFilters = () => {
  activeCategory.value = 'all'
  searchQuery.value = ''
  pageTitle.value = 'Nuestros Relojes'
  pageSubtitle.value = 'Descubre nuestra colección de relojes vintage y modernos'
  
  // Limpiar query params
  router.push({ path: route.path })
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const viewProduct = (product) => {
  selectedProduct.value = product
  showProductPopup.value = true
}

const closeProductPopup = () => {
  showProductPopup.value = false
  selectedProduct.value = null
}

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
    
    // Agregar estilos inline para la notificación
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
    
    // Remover la notificación después de 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
    
    console.log('Producto añadido al carrito:', product)
  }
}

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
</script>

<style scoped>
.products-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header Section */
.products-header {
  background: linear-gradient(135deg, var(--primary-blue, #8171f6), var(--primary-green, #00f032));
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

/* Filters Section */
.filters-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.search-filter {
  width: 100%;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: var(--primary-blue, #8171f6);
  border-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Products Container */
.products-container {
  padding: 3rem 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

/* Product Card */
.product-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f8f9fa;
  padding: 1rem;
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-green, #00f032);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.product-badge.sold-out {
  background: var(--primary-red, #fe3301);
}

.product-info {
  padding: 1.5rem;
}

.product-brand {
  color: var(--primary-green, #00f032);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.product-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1f1f1f;
  line-height: 1.4;
}

.product-description {
  color: #6c757d;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 0.125rem;
}

.star-filled {
  color: #ffc107;
  font-size: 1rem;
}

.star-empty {
  color: #e9ecef;
  font-size: 1rem;
}

.rating-text {
  color: #6c757d;
  font-size: 0.875rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue, #8171f6);
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-green, #00f032), #02c02b);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.3);
}

.add-to-cart-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e9ecef;
  border-top: 4px solid var(--primary-green, #00f032);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #6c757d;
  font-size: 1.1rem;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 4rem 2rem;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-state h3 {
  font-size: 1.5rem;
  color: var(--primary-red, #fe3301);
  margin-bottom: 0.5rem;
}

.error-state p {
  color: #6c757d;
  margin-bottom: 2rem;
}

.retry-btn {
  padding: 0.75rem 2rem;
  background: var(--primary-red, #fe3301);
  color: white;
  border: none;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #e02e01;
  transform: translateY(-2px);
}

/* No Products State */
.no-products {
  text-align: center;
  padding: 4rem 2rem;
}

.no-products-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-products h3 {
  font-size: 1.5rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.no-products p {
  color: #6c757d;
  margin-bottom: 2rem;
}

.clear-filters-btn {
  padding: 0.75rem 2rem;
  background: var(--primary-blue, #8171f6);
  color: white;
  border: none;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: #6b5ce6;
  transform: translateY(-2px);
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

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .filters-section {
    gap: 1rem;
  }
  
  .category-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .products-container {
    padding: 2rem 0;
  }
}
</style>
