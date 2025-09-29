import { reactive } from "vue";
import { Auth } from "../services/auth.js";

// Estado global del usuario
const state = reactive({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
});

// Acciones para manejar el estado del usuario
export const useUserStore = () => {
  const login = async (credentials) => {
    state.loading = true;
    state.error = null;
    
    try {
      const userData = await Auth.login(credentials);
      state.user = userData;
      state.isAuthenticated = true;
      return userData;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const register = async (userData) => {
    state.loading = true;
    state.error = null;
    
    try {
      const newUser = await Auth.register(userData);
      state.user = newUser;
      state.isAuthenticated = true;
      return newUser;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const logout = async () => {
    state.loading = true;
    
    try {
      await Auth.logout();
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Forzar logout local si hay error
      state.user = null;
      state.isAuthenticated = false;
    } finally {
      state.loading = false;
    }
  };

  const checkAuth = () => {
    const currentUser = Auth.getCurrentUser();
    if (currentUser) {
      state.user = currentUser;
      state.isAuthenticated = true;
    } else {
      state.user = null;
      state.isAuthenticated = false;
    }
  };

  const updateProfile = async (profileData) => {
    state.loading = true;
    state.error = null;
    
    try {
      const updatedUser = await Auth.updateProfile(profileData);
      state.user = updatedUser;
      return updatedUser;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const setLoading = (loading) => {
    state.loading = loading;
  };

  const clearError = () => {
    state.error = null;
  };

  // Inicializar estado al cargar
  checkAuth();

  return {
    // Estado
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,

    // Acciones
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    setLoading,
    clearError,
  };
};