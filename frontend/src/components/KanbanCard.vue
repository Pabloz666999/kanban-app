<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const formattedDate = computed(() => {
  if (!props.card.dueDate) return null
  const date = new Date(props.card.dueDate)
  return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })
})

const isExpired = computed(() => {
  if (!props.card.dueDate || props.card.isCompleted) return false
  return new Date(props.card.dueDate) < new Date()
})
</script>

<template>
  <div 
    @click="$emit('click', card)"
    class="group relative flex flex-col rounded-lg border shadow-sm transition-all cursor-pointer hover:shadow-md"
    :class="[
      card.isCompleted 
        ? 'bg-green-50/60 dark:bg-green-900/10 border-green-200 dark:border-green-800/50 border-l-[4px] border-l-green-500' 
        : 'bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-slate-700 hover:border-primary/50 border-l-[4px] border-l-transparent'
    ]"
  >
    
    <div v-if="card.coverImage" class="aspect-video w-full rounded-t-[4px] bg-cover bg-center" :style="{ backgroundImage: `url('${card.coverImage}')` }"></div>
    
    <div class="flex w-full flex-col gap-2 p-3">
      
      <div v-if="card.tag" class="flex items-center mb-0.5">
        <span class="text-[10px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5" :class="tagColorClass">
          {{ card.tag }}
        </span>
      </div>

      <div class="flex items-start justify-between gap-3">
        <p 
          class="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug transition-colors flex-1 break-words"
          :class="{ 'text-slate-500 dark:text-slate-500 line-through': card.isCompleted }"
        >
          {{ card.title }}
        </p>

        <span v-if="card.isCompleted" class="material-symbols-outlined text-green-600 dark:text-green-400 text-[20px] shrink-0 mt-[2px]">
          check_circle
        </span>
      </div>

      <p v-if="card.description" class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
        {{ card.description }}
      </p>

      <div class="mt-2 flex items-center justify-between min-h-[20px]">
        <div class="flex items-center gap-2">
          <template v-if="formattedDate">
             <div 
                class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium" 
                :class="[
                  card.isCompleted 
                    ? 'text-green-700 bg-green-100/50 dark:text-green-300 dark:bg-green-900/30' 
                    : (isExpired ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30' : 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800')
                ]"
             >
               <span class="material-symbols-outlined text-[14px]">
                 {{ card.isCompleted ? 'event_available' : (isExpired ? 'warning' : 'schedule') }}
               </span>
               <span>{{ formattedDate }}</span>
             </div>
          </template>
        </div>

        <div class="flex -space-x-2" v-if="card.avatars && card.avatars.length">
          <div 
            v-for="(avatar, index) in card.avatars" 
            :key="index"
            class="size-5 rounded-full bg-cover ring-2 ring-white dark:ring-slate-800" 
            :style="{ backgroundImage: `url('${avatar}')` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>