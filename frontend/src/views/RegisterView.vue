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

  // Validasi Password Match
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Kata sandi dan konfirmasi kata sandi tidak cocok.'
    return
  }

  loading.value = true

  try {
    const { confirmPassword, ...registerData } = formData.value
    const result = await register(registerData)

    if (result.success) {
      router.push('/boards')
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
  <div class="relative flex min-h-screen w-full flex-col items-center justify-center font-display bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-gray-200">
    <!-- Top Navigation Bar -->
    <header class="absolute top-0 flex w-full max-w-7xl items-center justify-between whitespace-nowrap px-4 py-5 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 text-[#0e141b] dark:text-white">
        <span class="material-symbols-outlined text-primary text-2xl">view_kanban</span>
        <h2 class="text-lg font-bold leading-tight tracking-[-0.015em] text-[#0e141b] dark:text-white">
          Kanban App
        </h2>
      </div>
      <router-link
        to="/login"
        class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200/80 dark:bg-gray-700/80 text-[#0e141b] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <span class="truncate">Masuk</span>
      </router-link>
    </header>

    <main class="flex w-full flex-1 flex-col items-center justify-center px-4 py-20">
      <div class="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <!-- Headline Text -->
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-[#0e141b] dark:text-white">
            Buat Akun Baru
          </h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Mulai kelola proyek Anda dengan mudah.
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600 whitespace-pre-line">{{ error }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <!-- Name Field -->
          <div class="flex flex-col">
            <label class="pb-2 text-sm font-medium text-[#0e141b] dark:text-gray-300" for="name">Nama</label>
            <input
              v-model="formData.name"
              id="name"
              name="name"
              placeholder="Masukkan nama Anda"
              type="text"
              required
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-background-light p-3 text-base text-[#0e141b] placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
          <!-- Email Field -->
          <div class="flex flex-col">
            <label class="pb-2 text-sm font-medium text-[#0e141b] dark:text-gray-300" for="email">Email</label>
            <input
              v-model="formData.email"
              id="email"
              name="email"
              placeholder="Masukkan alamat email Anda"
              type="email"
              required
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-background-light p-3 text-base text-[#0e141b] placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
          <!-- Password Field -->
          <div class="flex flex-col">
            <label class="pb-2 text-sm font-medium text-[#0e141b] dark:text-gray-300" for="password">Kata Sandi</label>
            <div class="relative flex w-full flex-1 items-stretch">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                placeholder="Masukkan kata sandi Anda"
                required
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg border border-r-0 border-gray-300 bg-background-light p-3 pr-2 text-base text-[#0e141b] placeholder:text-gray-400 focus:z-10 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="flex items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-background-light px-3 text-gray-500 hover:bg-gray-100 focus:z-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              >
                <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="flex flex-col">
            <label class="pb-2 text-sm font-medium text-[#0e141b] dark:text-gray-300" for="confirm-password">Konfirmasi Kata Sandi</label>
            <div class="relative flex w-full flex-1 items-stretch">
              <input
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                name="confirm-password"
                placeholder="Konfirmasi kata sandi Anda"
                required
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg border border-r-0 border-gray-300 bg-background-light p-3 pr-2 text-base text-[#0e141b] placeholder:text-gray-400 focus:z-10 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="flex items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-background-light px-3 text-gray-500 hover:bg-gray-100 focus:z-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              >
                <span class="material-symbols-outlined text-xl">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="!loading" class="truncate">Daftar</span>
            <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center text-sm">
          <p class="text-gray-600 dark:text-gray-400">
            Sudah punya akun?
            <router-link to="/login" class="font-medium text-primary hover:underline">
              Masuk di sini
            </router-link>
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md text-center text-xs text-gray-500 dark:text-gray-400">
        <p>
          Dengan mendaftar, Anda menyetujui
          <a class="text-primary hover:underline" href="#">Syarat &amp; Ketentuan</a>
          dan
          <a class="text-primary hover:underline" href="#">Kebijakan Privasi</a>
          kami.
        </p>
      </div>
    </footer>
  </div>
</template>
