<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register } = useAuth()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleSubmit = async () => {
  error.value = ''

  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'password dan konfirmasi tidak cocok'
    return
  }

  if (formData.value.password.length < 6) {
    error.value = 'password minimal 6 karakter'
    return
  }

  loading.value = true
  try {
    const { confirmPassword, ...payload } = formData.value
    const result = await register(payload)

    if (result?.success) {
      router.push('/login')
    } else {
      error.value = result?.error || 'registrasi gagal'
    }
  } catch (e) {
    error.value = 'terjadi kesalahan, coba lagi'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 text-gray-900"
  >
    <!-- HEADER -->
    <header class="absolute top-0 w-full max-w-7xl px-6 py-5 flex justify-between items-center">
      <div class="flex items-center gap-2 font-bold text-lg">
        <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 48 48">
          <path
            d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264L24 40.6L13.8261 17.4264Z"
          />
        </svg>
        KanbanApp
      </div>

      <router-link
        to="/login"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium"
      >
        Masuk
      </router-link>
    </header>

    <!-- MAIN -->
    <main class="flex w-full flex-1 items-center justify-center px-4">
      <div class="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 class="text-3xl font-bold text-center">Buat Akun Baru</h1>
        <p class="mt-2 text-center text-sm text-gray-500">
          Mulai kelola proyek Anda dengan mudah
        </p>

        <!-- ERROR -->
        <div
          v-if="error"
          class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
        >
          {{ error }}
        </div>

        <!-- FORM -->
        <form @submit.prevent="handleSubmit" class="mt-6 space-y-5">
          <!-- NAMA -->
          <div>
            <label class="mb-1 block text-sm font-medium">Nama</label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Masukkan nama"
              class="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- EMAIL -->
          <div>
            <label class="mb-1 block text-sm font-medium">Email</label>
            <input
              v-model="formData.email"
              type="email"
              required
              placeholder="Masukkan email"
              class="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="mb-1 block text-sm font-medium">Password</label>
            <div class="relative">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Password"
                class="w-full rounded-lg border px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                👁
              </button>
            </div>
          </div>

          <!-- KONFIRMASI -->
          <div>
            <label class="mb-1 block text-sm font-medium">Konfirmasi Password</label>
            <div class="relative">
              <input
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="Ulangi password"
                class="w-full rounded-lg border px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                👁
              </button>
            </div>
          </div>

          <!-- SUBMIT -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {{ loading ? 'Memproses...' : 'Daftar' }}
          </button>
        </form>

        <!-- LINK LOGIN -->
        <p class="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?
          <router-link to="/login" class="font-medium text-blue-600 hover:underline">
            Masuk di sini
          </router-link>
        </p>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="py-6 text-center text-xs text-gray-400">
      Dengan mendaftar, Anda menyetujui
      <a href="#" class="text-blue-600 hover:underline">Syarat & Ketentuan</a>
      dan
      <a href="#" class="text-blue-600 hover:underline">Kebijakan Privasi</a>
    </footer>
  </div>
</template>
