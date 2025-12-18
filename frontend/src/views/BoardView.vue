<script setup>
import { ref, onMounted } from 'vue'
import KanbanList from '@/components/KanbanList.vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout, user } = useAuth()

const lists = ref([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { 
        id: 1, 
        title: 'Desain Halaman Login', 
        description: 'Rancang mockup dan prototipe untuk halaman login pengguna.',
        tag: 'UI Design',
        tagColor: 'blue',
        date: '25 Dec',
        avatars: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD-FtHAgeB64BvD-D7DZOR8xc4f-Oplm92IuGhJVWO_MbJ3Zq_Qp4tmeZZYdSG0CjfkLzNI5D3aJs7JeDqJGo_PJV6tJY8ZdmvMUhe_dMnLMTCZr5337SnzG1EDy6Y-HlMciB-i7a2giD2iKYKAvdx_4GQWEQfjAuN9X-2N8IYYkBUR-n5K2POoRhms3JuPMahjXinUNhB_NgdFea_8AJ-TQT2YGdQtdYv7t1FaipnR_4885_L152A7JCdPKpqlvq_cgrY1Cw-HnXNz'
        ]
      },
      { 
        id: 2, 
        title: 'Kembangkan API Otentikasi', 
        description: 'Bangun endpoint untuk registrasi dan login pengguna.',
        tag: 'Backend',
        tagColor: 'purple',
        date: '28 Dec',
        avatars: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCdggqGKThjC9Op7sEUZ6EJzpagJWQloJhPpJ5r0B6k8fCy8DkskoQd3IEZ6H_DEs3Uobkh7nouhRF8Iyki1wyqJBWPPSFOak3Z4r2FIBt73dxBux9toz0tFRHgocVtThrYTYnMzlBWWOopTTr_cFlOK8sbhjRb0xCAYiK9yReAkhoTJNGylIKgIDj4Lk4Y_KXPTsTGvSCMcm6c9a5CgHzB3s1njr-EQCTqE4tgrM6OdWCJCZ4mBAfKvQBmeLs3Kg1oFwxCCZbrwXfe',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBIODJdYncAAmiGKYWisWh5zPih42w8aRnKlMl_K2d5HcPiZvlZuruQg7L-rN4UwdfoabJhK_1rz2x5NuwU3V4-GRqzK0jeqaMKbxBtK20tMrihSpjWczGF7UId0CD1Gf2ULCLj0C2VDyC6l9E8C_D99Z7I8EBgwCBwgftqiYEADfgWgpyGKGv8ZZSAJ-77v7IblnTKWcX2X8PnxbRLCI4XPGVnhFMBT9Gt5M19gccpZzqbcaYnUMcYYDleBZLadvAE3NcVz8Hz1A5g'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      { 
        id: 3, 
        title: 'Desain Skema Database', 
        description: 'Finalisasi struktur tabel untuk pengguna, proyek, dan tugas.',
        tag: 'Backend',
        tagColor: 'purple',
        date: 'Due Tomorrow',
        isUrgent: true,
        coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN4BUsQ8M_zYU9hiYy1I4WQgbSKiEx1QiNu7FAIWONhXuiSpqb_8rPZAGVk3QG-tYokkLPzYAF2NKoxUM_I-xymoYQD7Zswef9s7CsjmhpXOzLlqz_XdZC9bDfBAMRZUI7O_mdwBG-F4kfmafkekLNzNADyoo7OGddvyIl85p4Yxmh6Rel2fI8E6Em0FyOwyIad7sB7PU7dZyrvM4FkJX15HQ92Lbig08D33jPHOjzsyAUx9oQXHCzg9S6B0rGgLOskNfQD-Bkk-TD',
        avatars: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCsirrnztoVxDlvv5uHsYXqK-yhaOJXLMfP9cJNYMKsrn4rUVcpqKGGV842DvbwcPKfISRgVjGXqcSOdGtpACbNZdcwck79aBiMmSMLqeQcJtkvXQn7HKSJTk5ViJLTe_ZIo0cIkLqfypk3rx9GLIpERStk2ZpuKAUahg3lK8nTtNNQM_gJsVOZRNaa9bfdjFBYr56L-Xavha1s5xCaJ2YLHaRi4YslZ77EWRTLbljDICOEweyvj9J9_v476LbjzZuNq8swrjEdAQch'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Done',
    cards: [
      { 
        id: 4, 
        title: 'Analisis Kompetitor', 
        description: 'Tinjau fitur dan UI dari aplikasi manajemen proyek terkemuka.',
        tag: 'Riset',
        tagColor: 'green',
        completed: true,
        date: 'Completed',
        avatars: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCG2IC6tVWXrfQgNE0OLzg_ReHXuC2NllQ-h5X9n0AxzOIfQgXAa9vUx48WeJl2rmkOf5J3TOEinoQ0y4qY-DumZb_tTsI_Qag1xjOReC3O8YbX40CVzM_RC0DzE5kwFl4rgeABuHk9Pt41A7WJ0WIAIbPoLLe1VMBCk4iVyx80JGGxVz8UBB2MyT742dOp7FSgBMGv2E5ZC_j037zpa0Kwttxaq2gKiNZl3aUwzAbwMgCLuVtjBLA6r32vF1kQ1TuwUEGlQA3KC4S6'
        ]
      }
    ]
  }
])

const handleLogout = () => {
  logout()
  router.push('/login')
}

// Handler sementara untuk operasi list/card
const addList = () => {
  // Logic tambah list
  console.log('Add list clicked')
}

const addCard = () => {
  // Logic tambah card
  console.log('Add card clicked')
}
</script>

<template>
  <div class="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary font-display">
    <!-- Top Nav Bar -->
    <header class="flex shrink-0 items-center justify-between border-b border-solid border-border-light dark:border-border-dark px-6 py-3 bg-surface-light dark:bg-surface-dark">
      <div class="flex items-center gap-4">
        <span class="material-symbols-outlined text-primary text-2xl">view_kanban</span>
        <h1 class="text-lg font-bold">Proyek Peluncuran Aplikasi</h1>
      </div>
      <div class="flex flex-1 items-center justify-end gap-6">
        <div class="flex items-center gap-4">
           <!-- Tombol navigasi ke Pomodoro -->
           <router-link to="/pomodoro" class="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-xl">timer</span>
            Pomodoro
          </router-link>
          
          <a class="flex items-center gap-1.5 text-sm font-medium cursor-pointer" @click="handleLogout">
            <span class="material-symbols-outlined text-xl">logout</span>
            Logout
          </a>
        </div>
        <div class="flex items-center gap-2">
          <button @click="addCard" class="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors">
            <span class="material-symbols-outlined text-xl">add</span>
            <span class="truncate">Add Card</span>
          </button>
          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar image" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBioUz4Q_8eUxXVY-nd0lzF58HBCIz287j2f9IYCqd3lTi8P4P3g5x32m-FQcAyiWVAaFvaxtdGZmhcmoDlpEB_u8Kv_trZ6NBXltPBOJ7jZO4APxQNQSVPhIOoE1ttGyUTzCaPVl3HRnZdnaYilAwxLzdN8vuERM2VbazaNNmF69U1LLUBABjPdJw9G5in3v60GUw4Y7TnNNPuffmvHZkNHHfMYOC8VyE22LA6O4ajyWlQYcBvxmDmGjb2poI_weIcgC1xNdyRNtMk");'></div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 flex-col overflow-x-hidden">
      <!-- Chips/Filters Bar -->
      <div class="shrink-0 border-b border-solid border-border-light dark:border-border-dark px-6 py-3 bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm">
        <div class="flex gap-3 items-center">
          <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/10 dark:bg-primary/20 pl-4 pr-2 text-primary">
            <p class="text-sm font-medium leading-normal">All tasks</p>
            <span class="material-symbols-outlined text-base">expand_more</span>
          </button>
          <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-border-light dark:bg-border-dark pl-4 pr-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <p class="text-sm font-medium leading-normal">UI Design</p>
            <span class="material-symbols-outlined text-base">expand_more</span>
          </button>
          <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-border-light dark:bg-border-dark pl-4 pr-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <p class="text-sm font-medium leading-normal">Urgent</p>
            <span class="material-symbols-outlined text-base">expand_more</span>
          </button>
        </div>
      </div>

      <!-- Kanban Board -->
      <div class="flex flex-1 gap-6 p-6 overflow-x-auto">
        <KanbanList 
          v-for="list in lists" 
          :key="list.id" 
          :list="list" 
        />
        
        <!-- Add a list button -->
        <div class="w-80 shrink-0">
          <button @click="addList" class="flex w-full items-center justify-center gap-2 rounded-xl bg-black/5 dark:bg-white/5 h-12 text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <span class="material-symbols-outlined text-xl">add</span>
            Add another list
          </button>
        </div>
      </div>
    </main>
  </div>
</template>