import { ref } from 'vue'

export const cartItems = ref([])
export const isCartOpen = ref(false)

export function getCart() {
  return cartItems
}

export function useCartOpen() {
  return isCartOpen
}

export function openCart() {
  isCartOpen.value = true
}

export function closeCart() {
  isCartOpen.value = false
}

export function addToCart(product, cantidad = 1) {
  // aqui revisa stock antes de agregar
  if (product.stock <= 0) {
    alert(`El producto "${product.titulo}" no tiene stock disponible`)
    return
  }

  const existing = cartItems.value.find(item => item.id === product.id)

  if (existing) {
    if (existing.cantidad + cantidad <= product.stock) {
      existing.cantidad += cantidad
    } else {
      alert(`Solo hay ${product.stock} unidades disponibles`)
      existing.cantidad = product.stock
    }
  } else {
    if (cantidad > product.stock) cantidad = product.stock
    cartItems.value.push({
      ...product,
      cantidad
    })
  }
}

export function removeFromCart(id) {
  const index = cartItems.value.findIndex(item => item.id === id)
  if (index !== -1) cartItems.value.splice(index, 1)
}

export function clearCart() {
  cartItems.value = []
}


