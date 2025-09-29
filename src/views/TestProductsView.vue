<template>
  <div class="test-products">
    <div class="container">
      <h1>🧪 Vista de Prueba - Productos</h1>
      
      <div class="debug-info">
        <h2>📊 Información de Debug</h2>
        <p><strong>Estado de carga:</strong> {{ loading ? '🔄 Cargando...' : '✅ Cargado' }}</p>
        <p><strong>Error:</strong> {{ error || '❌ Sin errores' }}</p>
        <p><strong>Total productos:</strong> {{ products.length }}</p>
        <p><strong>Productos filtrados:</strong> {{ filteredProducts.length }}</p>
        
        <div v-if="products.length > 0" class="products-preview">
          <h3>📦 Primeros 3 productos:</h3>
          <div v-for="product in products.slice(0, 3)" :key="product.id" class="product-preview">
            <img :src="product.imagen" :alt="product.titulo" style="width: 100px; height: 100px; object-fit: contain; background: #f0f0f0; border-radius: 8px; padding: 8px;" />
            <div class="product-info">
              <h4>{{ product.titulo }}</h4>
              <p><strong>Precio:</strong> ${{ product.precio.toLocaleString() }}</p>
              <p><strong>Stock:</strong> {{ product.stock }}</p>
              <p><strong>Rating:</strong> {{ product.rating }}⭐ ({{ product.reviews }} reseñas)</p>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <button @click="loadProducts" class="btn-primary">🔄 Recargar Productos</button>
          <RouterLink to="/productos" class="btn-secondary">📱 Ir a Vista de Productos</RouterLink>
          <RouterLink to="/relojes" class="btn-secondary">🕒 Ir a Relojes</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchProducts } from '../services/api.js'

// Estado reactivo
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Función para cargar productos
const loadProducts = async () => {
  loading.value = true
  error.value = null
  
  console.log('🔄 Cargando productos desde TestProductsView...')
  try {
    products.value = await fetchProducts()
    console.log('✅ Productos cargados en TestProductsView:', products.value.length, 'productos')
  } catch (err) {
    console.error('❌ Error al cargar productos en TestProductsView:', err)
    error.value = err.message || 'Error al cargar los productos'
  } finally {
    loading.value = false
  }
}

// Productos filtrados (en este caso, todos)
const filteredProducts = computed(() => products.value)

// Cargar productos al montar
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.test-products {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: var(--primary-blue, #8171f6);
  text-align: center;
  margin-bottom: 2rem;
}

.debug-info {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.debug-info h2 {
  color: var(--primary-green, #00f032);
  margin-bottom: 1rem;
}

.debug-info p {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.products-preview {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.product-preview {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-info h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-blue, #8171f6);
}

.product-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: var(--primary-green, #00f032);
  color: white;
}

.btn-primary:hover {
  background: #02c02b;
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--primary-blue, #8171f6);
  color: white;
}

.btn-secondary:hover {
  background: #6b5ce6;
  transform: translateY(-2px);
}
</style>
