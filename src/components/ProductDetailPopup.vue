<template>
  <div v-if="isVisible" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <!-- Close Button -->
      <button class="close-btn" @click="closePopup">
        <span class="close-icon">✕</span>
      </button>

      <!-- Product Detail Content -->
      <div class="product-detail">
        <!-- Product Image Section -->
        <div class="product-image-section">
          <div class="image-container">
            <img 
              :src="product.imagen" 
              :alt="product.titulo"
              class="product-image-3d"
            />
            <div class="image-shadow"></div>
          </div>
          
          <!-- Image Badges -->
          <div class="image-badges">
            <div v-if="product.stock <= 5 && product.stock > 0" class="stock-badge warning">
              ¡Últimas {{ product.stock }} unidades!
            </div>
            <div v-if="product.stock === 0" class="stock-badge error">
              Agotado
            </div>
            <div v-if="product.rating >= 4.5" class="rating-badge">
              ⭐ {{ product.rating }} - Top Rated
            </div>
          </div>
        </div>

        <!-- Product Info Section -->
        <div class="product-info-section">
          <!-- Header -->
          <div class="product-header">
            <div class="product-brand">{{ product.marca || 'Casio' }}</div>
            <h1 class="product-title">{{ product.titulo }}</h1>
            
            <!-- Rating -->
            <div class="product-rating">
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star">
                  <span v-if="n <= Math.round(product.rating)" class="star-filled">★</span>
                  <span v-else class="star-empty">☆</span>
                </span>
              </div>
              <span class="rating-text">{{ product.rating }} de 5 estrellas ({{ product.reviews }} reseñas)</span>
            </div>
          </div>

          <!-- Price Section -->
          <div class="price-section">
            <div class="price-main">${{ product.precio.toLocaleString() }}</div>
            <div class="price-installments" v-if="product.precio > 30000">
              o 12 cuotas de ${{ Math.round(product.precio / 12).toLocaleString() }}
            </div>
          </div>

          <!-- Description -->
          <div class="product-description">
            <h3>Descripción del Producto</h3>
            <p>{{ product.descripcion }}</p>
          </div>

          <!-- Features -->
          <div class="product-features">
            <h3>Características Principales</h3>
            <ul class="features-list">
              <li v-for="feature in productFeatures" :key="feature">
                <span class="feature-icon">✓</span>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Stock Info -->
          <div class="stock-info">
            <div class="stock-status" :class="stockStatusClass">
              <span class="stock-icon">{{ stockIcon }}</span>
              <span class="stock-text">{{ stockText }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="product-actions">
            <button 
              class="add-to-cart-btn"
              :disabled="product.stock === 0"
              @click="addToCart"
            >
              <span class="cart-icon">🛒</span>
              <span class="btn-text">
                {{ product.stock > 0 ? 'Añadir al carrito' : 'Producto agotado' }}
              </span>
            </button>
            
            <button class="wishlist-btn" @click="addToWishlist">
              <span class="wishlist-icon">♡</span>
              <span class="btn-text">Agregar a favoritos</span>
            </button>
          </div>

          <!-- Additional Info -->
          <div class="additional-info">
            <div class="info-item">
              <span class="info-icon">🚚</span>
              <span class="info-text">Envío gratis en compras sobre $50.000</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🔄</span>
              <span class="info-text">30 días de garantía</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🛡️</span>
              <span class="info-text">Compra segura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['close', 'add-to-cart', 'add-to-wishlist'])

// Computed properties
const productFeatures = computed(() => {
  const features = []
  const title = props.product.titulo?.toLowerCase() || ''
  const description = props.product.descripcion?.toLowerCase() || ''
  
  if (title.includes('vintage') || description.includes('vintage')) {
    features.push('Diseño vintage clásico')
  }
  if (title.includes('digital') || description.includes('digital')) {
    features.push('Pantalla digital LCD')
  }
  if (title.includes('calculadora') || description.includes('calculadora')) {
    features.push('Funcionalidad calculadora')
  }
  if (title.includes('world time') || description.includes('hora mundial')) {
    features.push('Hora mundial (World Time)')
  }
  if (description.includes('resistencia') || description.includes('agua')) {
    features.push('Resistente al agua')
  }
  if (description.includes('alarma') || description.includes('cronómetro')) {
    features.push('Alarma y cronómetro')
  }
  if (description.includes('calendario')) {
    features.push('Calendario integrado')
  }
  if (description.includes('batería')) {
    features.push('Larga duración de batería')
  }
  
  // Features por defecto
  features.push('Garantía del fabricante')
  features.push('Correa ajustable')
  features.push('Diseño unisex')
  
  return features.slice(0, 6) // Máximo 6 características
})

const stockStatusClass = computed(() => {
  if (props.product.stock === 0) return 'out-of-stock'
  if (props.product.stock <= 5) return 'low-stock'
  return 'in-stock'
})

const stockIcon = computed(() => {
  if (props.product.stock === 0) return '❌'
  if (props.product.stock <= 5) return '⚠️'
  return '✅'
})

const stockText = computed(() => {
  if (props.product.stock === 0) return 'Producto agotado'
  if (props.product.stock <= 5) return `Solo quedan ${props.product.stock} unidades`
  return `${props.product.stock} unidades disponibles`
})

// Methods
const closePopup = () => {
  emit('close')
}

const addToCart = () => {
  if (props.product.stock > 0) {
    emit('add-to-cart', props.product)
  }
}

const addToWishlist = () => {
  emit('add-to-wishlist', props.product)
}
</script>

<style scoped>
/* Popup Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Popup Container */
.popup-container {
  background: white;
  border-radius: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.close-btn:hover {
  background: white;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.close-icon {
  font-size: 1.5rem;
  color: #6c757d;
  font-weight: bold;
}

/* Product Detail Layout */
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 3rem;
}

/* Image Section */
.product-image-section {
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 1.5rem;
  overflow: hidden;
}

.product-image-3d {
  width: 80%;
  height: 80%;
  object-fit: contain;
  border-radius: 1rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 10px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.product-image-3d:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.2),
    0 15px 30px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.image-shadow {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 30px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.2), transparent);
  border-radius: 50%;
  filter: blur(10px);
}

/* Image Badges */
.image-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stock-badge, .rating-badge {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(10px);
}

.stock-badge.warning {
  background: linear-gradient(135deg, #ffc107, #ff8f00);
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
}

.stock-badge.error {
  background: linear-gradient(135deg, #dc3545, #c82333);
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}

.rating-badge {
  background: linear-gradient(135deg, #28a745, #20c997);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

/* Info Section */
.product-info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-header {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1.5rem;
}

.product-brand {
  color: var(--primary-green, #00f032);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.product-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f1f1f;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stars {
  display: flex;
  gap: 0.125rem;
}

.star-filled {
  color: #ffc107;
  font-size: 1.25rem;
}

.star-empty {
  color: #e9ecef;
  font-size: 1.25rem;
}

.rating-text {
  color: #6c757d;
  font-size: 0.875rem;
}

/* Price Section */
.price-section {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
}

.price-main {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue, #8171f6);
  margin-bottom: 0.5rem;
}

.price-installments {
  color: #6c757d;
  font-size: 0.875rem;
}

/* Description */
.product-description h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 0.75rem;
}

.product-description p {
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Features */
.product-features h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 0.75rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #495057;
  font-size: 0.9rem;
}

.feature-icon {
  color: var(--primary-green, #00f032);
  font-weight: bold;
  font-size: 1rem;
}

/* Stock Info */
.stock-info {
  padding: 1rem;
  border-radius: 0.75rem;
  border: 2px solid;
}

.stock-info.in-stock {
  background: rgba(40, 167, 69, 0.1);
  border-color: var(--primary-green, #00f032);
}

.stock-info.low-stock {
  background: rgba(255, 193, 7, 0.1);
  border-color: #ffc107;
}

.stock-info.out-of-stock {
  background: rgba(220, 53, 69, 0.1);
  border-color: #dc3545;
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.stock-icon {
  font-size: 1.25rem;
}

/* Actions */
.product-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-to-cart-btn, .wishlist-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn {
  background: linear-gradient(135deg, var(--primary-green, #00f032), #02c02b);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 240, 50, 0.3);
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 50, 0.4);
}

.add-to-cart-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.wishlist-btn {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  color: #6c757d;
  border: 2px solid #e9ecef;
}

.wishlist-btn:hover {
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  border-color: var(--primary-blue, #8171f6);
  color: var(--primary-blue, #8171f6);
  transform: translateY(-2px);
}

.cart-icon, .wishlist-icon {
  font-size: 1.25rem;
}

/* Additional Info */
.additional-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6c757d;
  font-size: 0.875rem;
}

.info-icon {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .popup-overlay {
    padding: 1rem;
  }
  
  .popup-container {
    max-height: 95vh;
  }
  
  .product-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
  
  .image-container {
    height: 300px;
  }
  
  .product-title {
    font-size: 1.5rem;
  }
  
  .price-main {
    font-size: 2rem;
  }
  
  .close-btn {
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>

