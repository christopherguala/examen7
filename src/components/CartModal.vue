<template>
  <div class="cart-modal" v-if="isOpen">
    <div class="cart-overlay" @click="closeCart"></div>
    <div class="cart-content">
      <header class="cart-header">
        <h2>Carrito de Compras</h2>
        <button class="close-btn" @click="closeCart">✕</button>
      </header>

      <div class="cart-items">
        <div v-if="cartItems.length === 0" class="empty-cart">
          El carrito está vacío
        </div>
        <div v-else>
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <img :src="item.imagen" :alt="item.titulo" />
            <div class="item-info">
              <h4>{{ item.titulo }}</h4>
              <p>${{ item.precio.toLocaleString() }}</p>
            </div>
            <button class="remove-btn" @click="removeItem(index)">Eliminar</button>
          </div>
        </div>
      </div>

      <footer class="cart-footer" v-if="cartItems.length > 0">
        <p>Total: ${{ totalPrice.toLocaleString() }}</p>
        <button class="checkout-btn" @click="checkout">Pagar</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)
const cartItems = ref([])

function openCart() {
  isOpen.value = true
}

function closeCart() {
  isOpen.value = false
}

function addToCart(product) {
  cartItems.value.push(product)
  openCart()
}

function removeItem(index) {
  cartItems.value.splice(index, 1)
}

function checkout() {
  alert('¡Compra realizada!')
  cartItems.value = []
  closeCart()
}

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.precio, 0)
})

// Exponemos funciones y datos para que App.vue o ProductCard puedan usar
defineExpose({
  openCart,
  addToCart,
  closeCart,
  cartItems
})
</script>

<style scoped>
.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.cart-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}

.cart-content {
  position: absolute;
  right: 0;
  top: 0;
  width: 350px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: -4px 0 10px rgba(0,0,0,0.2);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  margin-top: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 1rem;
}

.item-info h4 {
  margin: 0;
  font-size: 1rem;
}

.item-info p {
  margin: 0;
  color: #555;
}

.remove-btn {
  margin-left: auto;
  background-color: #ff4d4d;
  border: none;
  color: #fff;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.cart-footer {
  border-top: 1px solid #ddd;
  padding-top: 0.5rem;
}

.checkout-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}
</style>

