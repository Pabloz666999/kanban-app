<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import KanbanCard from './KanbanCard.vue'

const props = defineProps({
  list: {
    type: Object,
    required: true
  },
  cards: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-card', 'delete-card', 'toggle-card-complete'])

const newCardTitle = ref("")
const showAddCard = ref(false)

const addCard = () => {
  if (!newCardTitle.value.trim()) return
  
  emit('add-card', {
    listId: props.list.id,
    title: newCardTitle.value
  })
  
  newCardTitle.value = ""
  showAddCard.value = false
}

const cancelAdd = () => {
  newCardTitle.value = ""
  showAddCard.value = false
}
</script>

<template>
  <div class="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4">
    <!-- List Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-semibold text-gray-800">{{ list.title }}</h3>
        <p class="text-xs text-gray-500">{{ list.cardCount }} cards</p>
      </div>
      <button 
        @click="showAddCard = !showAddCard"
        class="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-200 transition-colors"
        :class="{ 'bg-gray-200 text-gray-700': showAddCard }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      </button>
    </div>

    <!-- Add Card Form -->
    <div v-if="showAddCard" class="mb-4 bg-white rounded-lg p-3 border border-gray-200">
      <form @submit.prevent="addCard" class="space-y-3">
        <input
          v-model="newCardTitle"
          type="text"
          placeholder="Masukkan judul card..."
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          autofocus
        />
        <div class="flex gap-2">
          <button
            type="submit"
            class="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors font-medium"
          >
            Tambah Card
          </button>
          <button
            type="button"
            @click="cancelAdd"
            class="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm hover:bg-gray-100 rounded-md transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>

    <!-- Cards Container -->
    <div class="space-y-3 max-h-96 overflow-y-auto">
      <KanbanCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @delete="emit('delete-card', $event)"
        @toggle-complete="emit('toggle-card-complete', $event)"
      />
      
      <!-- Empty state -->
      <div v-if="cards.length === 0" class="text-center py-8">
        <div class="text-gray-400 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <p class="text-gray-400 text-sm">Belum ada card</p>
        <button 
          @click="showAddCard = true"
          class="text-blue-600 hover:text-blue-700 text-sm mt-2 font-medium"
        >
          Tambah card pertama
        </button>
      </div>
    </div>
  </div>
</template>
