<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()

const formData = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await login(formData.value)
    
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- bisa ditaro logo (klw ada) -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative z-10 flex flex-col justify-center items-start p-16 text-white">
        <div class="flex items-center gap-3 mb-8">
          <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 48 48">
            <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"/>
          </svg>
          <span class="text-3xl font-bold">KanbanApp</span>
        </div>
        <h2 class="text-5xl font-bold leading-tight mb-6">
          Atur proyek Anda,<br/>capai tujuan Anda.
        </h2>
        <p class="text-xl opacity-90">
          Platform manajemen proyek yang membantu Anda dan tim tetap terorganisir dan fokus pada hal yang paling penting.
        </p>
      </div>
    </div>

    <!-- login form -->
    <div class="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 p-8">
      <div class="w-full max-w-md">
     
        <div class="lg:hidden flex items-center gap-3 mb-8 justify-center">
          <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 48 48">
            <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"/>
          </svg>
          <span class="text-2xl font-bold text-gray-900">KanbanApp</span>
        </div>

        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Selamat Datang Kembali</h1>
          <p class="text-gray-600">Silakan masukkan detail Anda untuk melanjutkan.</p>
        </div>

        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <!-- field untuk tambah email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan email Anda"
            />
          </div>

          <!-- field untuk tambah password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Kata Sandi
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Masukkan kata sandi Anda"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- (masi rencana, klo ribet bisa dihapuss) -->
          <div class="text-right">
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Lupa Kata Sandi?
            </a>
          </div>

          <!-- button buat login (blm kehubung API) -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-blue-300"
          >
            <span v-if="!loading">Masuk</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          </button>
        </form>

        <!-- button text buat balik ke register  -->
        <p class="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-700">
            Daftar di sini
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>