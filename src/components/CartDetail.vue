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
            <div class="quantity-control">
              <button @click="decreaseQuantity(item)">−</button>
              <span>{{ item.cantidad }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <p>Precio: ${{ (item.precio * item.cantidad).toLocaleString() }}</p>
            <button class="remove-btn" @click="removeItem(item.id)">Eliminar</button>
          </div>
        </div>

        <div class="cart-total">
          <p>Total: ${{ totalPrice.toLocaleString() }}</p>
        </div>

        <div class="cart-actions">
          <button class="clear-btn" @click="clearCartHandler">Vaciar Carrito</button>
          <button class="checkout-btn" @click="checkout">Pagar</button>
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
import { getCart, removeFromCart, clearCart, useCartOpen, closeCart, addToCart } from '../services/cart.js'

const cartItems = getCart()
const isOpen = useCartOpen()

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
)

const removeItem = (id) => removeFromCart(id)
const clearCartHandler = () => clearCart()

const increaseQuantity = (item) => addToCart(item, 1)
const decreaseQuantity = (item) => {
  if (item.cantidad > 1) {
    item.cantidad -= 1
  } else {
    removeFromCart(item.id)
  }
}

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
  background: #2d2d2d; /* un poco más suave que el anterior */
  padding: 1rem;
  max-width: 500px;
  width: 90%;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 80%;
  color: var(--white);
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
  color: var(--white);
}

.cart-item {
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
  align-items: center;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.quantity-control button {
  background: #444;
  color: var(--white);
  border: none;
  padding: 0.2rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.remove-btn {
  background: var(--red);
  color: var(--white);
  border: none;
  padding: 0.4rem 0.8rem; 
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 0.5rem;
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
  border: none;
  border-radius: 4px;
  font-weight: bold;
}

.clear-btn {
  background: var(--red);
  color: var(--white);
}

.checkout-btn {
  background: var(--green);
  color: var(--black);
}
</style>