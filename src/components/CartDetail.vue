<template>
  <div v-if="isOpen" class="cart-modal-overlay" @click.self="closeCart">
    <div class="cart-modal">
      <header class="cart-header">
        <h2>Carrito de Compras</h2>
        <button class="close-btn" @click="closeCart">✖</button>
      </header>

      <div class="cart-body" v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.imagen" class="cart-item-image" :alt="item.titulo"/>
          <div class="cart-item-info">
            <h3>{{ item.titulo }}</h3>
            <p>Cantidad: {{ item.cantidad }}</p>
            <p>Precio: ${{ (item.precio * item.cantidad).toLocaleString() }}</p>
            <button class="remove-btn" @click="removeItem(item.id)">Eliminar</button>
          </div>
        </div>

        <div class="cart-total">
          <p>Total: ${{ totalPrice.toLocaleString() }}</p>
        </div>

        <div class="cart-actions">
          <button @click="clearCart">Vaciar Carrito</button>
          <button @click="checkout">Pagar</button>
        </div>
      </div>

      <div v-else class="cart-empty">
        <p>Tu carrito está vacío.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getCart, removeFromCart, clearCart, useCartOpen, closeCart } from '../services/cart.js'

const cartItems = getCart()
const isOpen = useCartOpen()

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
)

const removeItem = (id) => removeFromCart(id)
const clearCartHandler = () => clearCart()
const checkout = () => {
  alert('Gracias por tu compra!')
  clearCart()
  closeCart()
}
</script>

<style scoped>
.cart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.cart-modal {
  background: #fff;
  padding: 1rem;
  max-width: 500px;
  width: 90%;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 80%;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.cart-item {
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
}

.remove-btn {
  background: #ff4d4f;
  color: #fff;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
}

.cart-total {
  font-weight: bold;
  text-align: right;
  margin-top: 1rem;
}

.cart-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.cart-actions button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
