// Store simple para manejar el estado del carrito y autenticación
import { ref, computed } from 'vue'

// Estado global reactivo
const cartItems = ref([])
const isLoggedIn = ref(false)
const currentUser = ref(null)

// Funciones para localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    console.log(`💾 Guardado en localStorage: ${key}`, data)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    const parsed = data ? JSON.parse(data) : null
    console.log(`📖 Leído de localStorage: ${key}`, parsed)
    return parsed
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

// Inicializar estado desde localStorage
const initAuth = () => {
  const savedUser = getFromStorage('cyberWatch_user')
  const savedLoginState = getFromStorage('cyberWatch_isLoggedIn')
  
  console.log('🔍 Inicializando autenticación:', { savedUser, savedLoginState })
  
  if (savedUser && savedLoginState) {
    currentUser.value = savedUser
    isLoggedIn.value = savedLoginState
    console.log('✅ Usuario autenticado restaurado:', savedUser)
  } else {
    console.log('❌ No hay usuario autenticado guardado')
  }
}

// Inicializar carrito desde localStorage
const initCart = () => {
  const savedCart = getFromStorage('cyberWatch_cart')
  if (savedCart) {
    cartItems.value = savedCart
    console.log('🛒 Carrito restaurado:', savedCart)
  }
}

// Inicializar al cargar el módulo
initAuth()
initCart()

// Crear usuario demo para pruebas
setTimeout(() => {
  // Crear usuario demo directamente
  const demoUser = {
    id: 'demo-001',
    name: 'Usuario Demo',
    email: 'demo@test.com',
    password: '123456',
    phone: '+56 9 1234 5678',
    createdAt: new Date().toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=00f032&color=000000&size=100'
  }
  
  const users = getUsers()
  const existingDemo = users.find(u => u.email === demoUser.email)
  
  if (!existingDemo) {
    users.push(demoUser)
    saveUsers(users)
    console.log('👤 Usuario demo creado:', demoUser)
  } else {
    console.log('👤 Usuario demo ya existe')
  }
}, 1000)

// Funciones para el carrito
export const useCart = () => {
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
    saveToStorage('cyberWatch_cart', cartItems.value)
  }

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
    saveToStorage('cyberWatch_cart', cartItems.value)
  }

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveToStorage('cyberWatch_cart', cartItems.value)
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveToStorage('cyberWatch_cart', cartItems.value)
  }

  const cartCount = computed(() => 
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  const cartTotal = computed(() => 
    cartItems.value.reduce((total, item) => total + (item.precio * item.quantity), 0)
  )

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  }
}

// Funciones para autenticación
export const useAuth = () => {
  // Obtener usuarios registrados
  const getUsers = () => {
    return getFromStorage('cyberWatch_users') || []
  }

  // Guardar usuarios
  const saveUsers = (users) => {
    saveToStorage('cyberWatch_users', users)
  }

  // Registrar nuevo usuario
  const register = (userData) => {
    const users = getUsers()
    
    // Verificar si el email ya existe
    const existingUser = users.find(user => user.email === userData.email)
    if (existingUser) {
      return { success: false, message: 'El email ya está registrado' }
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=00f032&color=000000&size=100`
    }

    users.push(newUser)
    saveUsers(users)
    
    return { success: true, message: 'Usuario registrado exitosamente', user: newUser }
  }

  // Login
  const login = (email, password) => {
    console.log('🔐 Intentando login con:', { email, password: '***' })
    const users = getUsers()
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      console.log('✅ Usuario encontrado:', user)
      currentUser.value = user
      isLoggedIn.value = true
      
      // Guardar en localStorage
      saveToStorage('cyberWatch_user', user)
      saveToStorage('cyberWatch_isLoggedIn', true)
      
      console.log('🎉 Login exitoso, estado actualizado')
      return { success: true, message: 'Login exitoso', user }
    }
    
    console.log('❌ Usuario no encontrado o credenciales incorrectas')
    return { success: false, message: 'Credenciales incorrectas' }
  }

  // Logout
  const logout = () => {
    console.log('🚪 Cerrando sesión...')
    currentUser.value = null
    isLoggedIn.value = false
    
    // Limpiar localStorage
    localStorage.removeItem('cyberWatch_user')
    localStorage.removeItem('cyberWatch_isLoggedIn')
    
    console.log('✅ Sesión cerrada, localStorage limpiado')
  }

  // Verificar si el usuario está autenticado
  const checkAuth = () => {
    return isLoggedIn.value && currentUser.value
  }


  return {
    isLoggedIn,
    currentUser,
    register,
    login,
    logout,
    checkAuth,
    getUsers
  }
}
