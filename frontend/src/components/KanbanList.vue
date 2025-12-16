<script setup>
import KanbanCard from './KanbanCard.vue'

defineProps({
  list: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex w-80 shrink-0 flex-col rounded-xl bg-background-light dark:bg-surface-dark h-full max-h-full">
    <div class="flex items-center justify-between px-4 pb-3 pt-5 shrink-0">
      <h2 class="text-base font-bold text-text-light-primary dark:text-text-dark-primary">
        {{ list.title }} 
        <span class="ml-2 rounded-full bg-border-light dark:bg-border-dark px-2 py-0.5 text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary">
          {{ list.cards.length }}
        </span>
      </h2>
      <button class="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors">
        <span class="material-symbols-outlined text-xl">more_horiz</span>
      </button>
    </div>
    
    <div class="flex flex-col gap-4 px-4 pb-4 overflow-y-auto min-h-0">
      <KanbanCard 
        v-for="card in list.cards" 
        :key="card.id" 
        :card="card" 
      />
    </div>
  </div>
</template>