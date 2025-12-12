<script setup>
import { ref } from "vue"
import KanbanList from "./components/KanbanList.vue"
import BoardStats from "./components/BoardStats.vue"

// Data sesuai skema database
const board = ref({
  id: 1,
  title: "Project Management Board",
  description: "Board untuk mengelola project development",
  backgroundColor: "#3B82F6",
  isPrivate: false,
  ownerId: 1,
  created_at: new Date().toISOString()
})

const lists = ref([
  {
    id: 1,
    title: "To Do",
    description: "Tugas yang belum dikerjakan",
    position: 1,
    cardCount: 2,
    isArchived: false,
    boardId: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "In Progress",
    description: "Tugas yang sedang dikerjakan",
    position: 2,
    cardCount: 1,
    isArchived: false,
    boardId: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Done",
    description: "Tugas yang sudah selesai",
    position: 3,
    cardCount: 1,
    isArchived: false,
    boardId: 1,
    created_at: new Date().toISOString()
  }
])

const cards = ref([
  {
    id: 1,
    title: "Setup Project Structure",
    description: "Membuat struktur folder dan konfigurasi awal project Vue.js dengan Vite dan Tailwind CSS",
    position: 1,
    dueDate: "2024-12-15",
    isCompleted: false,
    listId: 1,
    createdBy: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Design Database Schema",
    description: "Merancang skema database untuk aplikasi kanban dengan tabel boards, lists, dan cards",
    position: 2,
    dueDate: "2024-12-12",
    isCompleted: false,
    listId: 1,
    createdBy: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Implement Authentication",
    description: "Membuat sistem login dan register dengan JWT token",
    position: 1,
    dueDate: "2024-12-20",
    isCompleted: false,
    listId: 2,
    createdBy: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Create Landing Page",
    description: "Membuat halaman utama aplikasi dengan design yang menarik",
    position: 1,
    dueDate: "2024-12-10",
    isCompleted: true,
    listId: 3,
    createdBy: 1,
    created_at: new Date().toISOString()
  }
])

// Functions
const getCardsForList = (listId) => {
  return cards.value.filter(card => card.listId === listId).sort((a, b) => a.position - b.position)
}

const handleAddCard = ({ listId, title }) => {
  const newCard = {
    id: Date.now(),
    title: title,
    description: "",
    position: getCardsForList(listId).length + 1,
    dueDate: null,
    isCompleted: false,
    listId: listId,
    createdBy: 1,
    created_at: new Date().toISOString()
  }
  
  cards.value.push(newCard)
  
  // Update card count
  const list = lists.value.find(l => l.id === listId)
  if (list) list.cardCount++
}

const handleDeleteCard = (cardId) => {
  const card = cards.value.find(c => c.id === cardId)
  if (card) {
    const list = lists.value.find(l => l.id === card.listId)
    if (list) list.cardCount--
    cards.value = cards.value.filter(c => c.id !== cardId)
  }
}

const handleToggleCardComplete = (card) => {
  card.isCompleted = !card.isCompleted
}

const getTotalCards = () => {
  return cards.value.length
}

const getCompletedCards = () => {
  return cards.value.filter(card => card.isCompleted).length
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ board.title }}</h1>
            <p class="text-gray-600 text-sm">{{ board.description }}</p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Stats -->
            <div class="hidden sm:flex items-center gap-4 text-sm text-gray-600">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>{{ getTotalCards() }} cards</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ getCompletedCards() }} selesai</span>
              </div>
            </div>
            
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {{ board.isPrivate ? 'Private' : 'Public' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Kanban Board -->
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex gap-6 overflow-x-auto pb-6">
        <KanbanList
          v-for="list in lists"
          :key="list.id"
          :list="list"
          :cards="getCardsForList(list.id)"
          @add-card="handleAddCard"
          @delete-card="handleDeleteCard"
          @toggle-card-complete="handleToggleCardComplete"
        />
        
        <!-- Add New List Button -->
        <div class="flex-shrink-0 w-80">
          <button class="w-full h-12 bg-white bg-opacity-60 hover:bg-opacity-80 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg text-gray-600 hover:text-gray-700 transition-all duration-200 flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span class="font-medium">Tambah List</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Board Statistics -->
    <div class="max-w-7xl mx-auto px-6 mb-6">
      <BoardStats :cards="cards" :lists="lists" />
    </div>

    <!-- Footer Info -->
    <div class="max-w-7xl mx-auto px-6 pb-6">
      <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <div class="flex items-center gap-4">
            <span>Board ID: {{ board.id }}</span>
            <span>Owner ID: {{ board.ownerId }}</span>
          </div>
          <div>
            Dibuat: {{ new Date(board.created_at).toLocaleDateString('id-ID') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
