import { ref, watch } from 'vue'

const storedCart = JSON.parse(localStorage.getItem('cart')) || []
const cartItems = ref(storedCart)
const isCartOpen = ref(false)

// Sincronizar con localStorage
watch(cartItems, () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}, { deep: true })

export function getCart() {
  return cartItems
}

export function addToCart(product, quantity = 1) {
  const item = cartItems.value.find(i => i.id === product.id)
  if (item) {
    item.cantidad += quantity
  } else {
    cartItems.value.push({ ...product, cantidad: quantity })
  }
}

export function removeFromCart(id) {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}

export function clearCart() {
  cartItems.value = []
}

// Funciones para abrir/cerrar carrito
export function openCart() {
  isCartOpen.value = true
}

export function closeCart() {
  isCartOpen.value = false
}

export function useCartOpen() {
  return isCartOpen
}
