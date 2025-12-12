<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'toggle-complete'])

const formatDate = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString('id-ID')
}

const isOverdue = (dueDate) => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}
</script>

<template>
  <div
    class="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    :class="{ 'opacity-75': card.isCompleted }"
  >
    <div class="flex items-start justify-between mb-2">
      <h4 
        class="font-medium text-gray-900 text-sm leading-tight flex-1 mr-2"
        :class="{ 'line-through text-gray-500': card.isCompleted }"
      >
        {{ card.title }}
      </h4>
      <button
        @click="emit('delete', card.id)"
        class="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <p v-if="card.description" class="text-gray-600 text-xs mb-3 leading-relaxed">
      {{ card.description }}
    </p>
    
    <div class="flex items-center justify-between">
      <button
        @click="emit('toggle-complete', card)"
        class="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded transition-colors"
        :class="card.isCompleted ? 'text-green-600' : 'text-gray-500'"
      >
        <div
          class="w-4 h-4 rounded border-2 flex items-center justify-center transition-colors"
          :class="card.isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-gray-400'"
        >
          <svg v-if="card.isCompleted" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <span>{{ card.isCompleted ? 'Selesai' : 'Tandai selesai' }}</span>
      </button>
      
      <div v-if="card.dueDate" class="text-xs">
        <span 
          class="px-2 py-1 rounded font-medium"
          :class="isOverdue(card.dueDate) ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'"
        >
          {{ formatDate(card.dueDate) }}
        </span>
      </div>
    </div>
  </div>
</template>
