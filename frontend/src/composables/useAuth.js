import { ref, computed } from 'vue'
import { authService } from '@/services/auth'

const user = ref(authService.getCurrentUser())
const isAuthenticated = computed(() => !!user.value)

export function useAuth() {
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials)
      user.value = data.user
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login gagal' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const data = await authService.register(userData)
      user.value = data.user
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registrasi gagal' 
      }
    }
  }

  const logout = () => {
    authService.logout()
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout
  }
}