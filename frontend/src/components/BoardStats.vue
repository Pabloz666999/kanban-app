<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  cards: {
    type: Array,
    required: true
  },
  lists: {
    type: Array,
    required: true
  }
})

const totalCards = computed(() => props.cards.length)
const completedCards = computed(() => props.cards.filter(card => card.isCompleted).length)
const pendingCards = computed(() => totalCards.value - completedCards.value)
const completionPercentage = computed(() => {
  if (totalCards.value === 0) return 0
  return Math.round((completedCards.value / totalCards.value) * 100)
})

const overdueTasks = computed(() => {
  const today = new Date()
  return props.cards.filter(card => {
    if (!card.dueDate || card.isCompleted) return false
    return new Date(card.dueDate) < today
  }).length
})
</script>

<template>
  <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistik Board</h3>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Total Cards -->
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-600">{{ totalCards }}</div>
        <div class="text-sm text-gray-600">Total Cards</div>
      </div>
      
      <!-- Completed Cards -->
      <div class="text-center">
        <div class="text-2xl font-bold text-green-600">{{ completedCards }}</div>
        <div class="text-sm text-gray-600">Selesai</div>
      </div>
      
      <!-- Pending Cards -->
      <div class="text-center">
        <div class="text-2xl font-bold text-orange-600">{{ pendingCards }}</div>
        <div class="text-sm text-gray-600">Pending</div>
      </div>
      
      <!-- Overdue Tasks -->
      <div class="text-center">
        <div class="text-2xl font-bold text-red-600">{{ overdueTasks }}</div>
        <div class="text-sm text-gray-600">Terlambat</div>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="mt-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-600">Progress Keseluruhan</span>
        <span class="text-sm font-medium text-gray-900">{{ completionPercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-green-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${completionPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>
