import { reactive } from 'vue'

// Estado global del usuario
const state = reactive({
  user: null,
  isAuthenticated: false,
  loading: false
})

// Acciones para manejar el estado del usuario
export const useUserStore = () => {
  const login = (userData) => {
    state.user = userData
    state.isAuthenticated = true
    // Guardar en localStorage para persistencia
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    state.user = null
    state.isAuthenticated = false
    // Limpiar localStorage
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        state.user = JSON.parse(savedUser)
        state.isAuthenticated = true
      } catch (error) {
        console.error('Error al cargar usuario del localStorage:', error)
        localStorage.removeItem('user')
      }
    }
  }

  const setLoading = (loading) => {
    state.loading = loading
  }

  return {
    // Estado
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    
    // Acciones
    login,
    logout,
    checkAuth,
    setLoading
  }
}
