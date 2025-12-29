<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  lists: {
    type: Array,
    default: () => []
  },
  preselectedListId: {
    type: [Number, String],
    default: ''
  }
})

const emit = defineEmits(['close', 'create'])

const title = ref('')
const description = ref('')
const selectedListId = ref('')
const dueDate = ref('')
const loading = ref(false)

// Reset form dan set preselected list saat modal dibuka
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.preselectedListId) {
      selectedListId.value = props.preselectedListId
    } else {
      selectedListId.value = ''
    }
    title.value = ''
    description.value = ''
    dueDate.value = ''
  }
})

const handleSubmit = async () => {
  if (!title.value.trim() || !selectedListId.value) return

  loading.value = true
  
  const cardData = {
    title: title.value,
    description: description.value,
    listId: selectedListId.value,
    dueDate: dueDate.value ? new Date(dueDate.value).toISOString() : null
  }

  emit('create', cardData)
  
  loading.value = false
}
</script>

<template>
  <!-- wrapper modal + backdrop -->
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    
    <!-- backdrop, klik di luar buat nutup -->
    <div 
      @click="$emit('close')" 
      class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
    ></div>
    
    <!-- modal utama -->
    <div class="relative w-full max-w-2xl bg-white dark:bg-[#1e2732] rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
      
      <!-- header modal -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700/50">
        <h2 class="text-[#0e141b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
          Tambah Kartu Baru
        </h2>

        <!-- tombol close -->
        <button 
          @click="$emit('close')" 
          class="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span class="material-symbols-outlined block" style="font-size: 24px;">close</span>
        </button>
      </div>

      <!-- body modal -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
          
          <!-- input judul kartu -->
          <div class="flex flex-col gap-2">
            <label 
              class="text-[#0e141b] dark:text-slate-200 text-sm font-medium leading-normal" 
              for="card-title"
            >
              Judul Kartu <span class="text-red-500">*</span>
            </label>

            <div class="flex w-full items-stretch rounded-lg group relative">
              <input 
                v-model="title"
                autofocus
                id="card-title"
                type="text"
                required
                placeholder="Apa yang perlu dikerjakan?"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] dark:text-white border border-[#d0dbe7] dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 h-12 placeholder:text-[#4e7397] dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <!-- pilih list / daftar -->
          <div class="flex flex-col gap-2">
            <label 
              class="text-[#0e141b] dark:text-slate-200 text-sm font-medium leading-normal" 
              for="card-list"
            >
              Daftar <span class="text-red-500">*</span>
            </label>

            <div class="relative w-full">
              <select 
                v-model="selectedListId"
                id="card-list"
                required
                class="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] dark:text-white border border-[#d0dbe7] dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 h-12 px-4 pr-10 text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option disabled value="">Pilih daftar</option>
                <option 
                  v-for="list in lists" 
                  :key="list.id" 
                  :value="list.id"
                >
                  {{ list.title }}
                </option>
              </select>

              <!-- icon dropdown -->
              <div class="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none">
                <span class="material-symbols-outlined text-[#4e7397] dark:text-slate-400" style="font-size: 24px;">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>

          <!-- deskripsi kartu -->
          <div class="flex flex-col gap-2">
            <label 
              class="text-[#0e141b] dark:text-slate-200 text-sm font-medium leading-normal" 
              for="description"
            >
              Deskripsi 
              <span class="text-[#4e7397] dark:text-slate-500 font-normal ml-1">(opsional)</span>
            </label>

            <textarea 
              v-model="description"
              id="description"
              placeholder="Tambahkan detail lebih lanjut..."
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] dark:text-white border border-[#d0dbe7] dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 min-h-[140px] placeholder:text-[#4e7397] dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            ></textarea>
          </div>

          <!-- tanggal jatuh tempo -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label 
                class="text-[#0e141b] dark:text-slate-200 text-sm font-medium leading-normal" 
                for="due-date"
              >
                Tanggal Jatuh Tempo
              </label>

              <div class="relative flex w-full items-center rounded-lg">
                <input 
                  v-model="dueDate"
                  id="due-date"
                  type="date"
                  placeholder="Pilih tanggal"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] dark:text-white border border-[#d0dbe7] dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 h-12 px-4 text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

        </form>
      </div>

      <!-- footer modal -->
      <div class="flex items-center justify-end gap-3 px-6 py-5 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/20 rounded-b-xl">
        
        <!-- batal -->
        <button 
          @click="$emit('close')"
          class="px-5 h-11 rounded-lg border border-[#d0dbe7] dark:border-slate-600 bg-white dark:bg-transparent text-[#0e141b] dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
        >
          Batal
        </button>

        <!-- submit -->
        <button 
          @click="handleSubmit"
          :disabled="loading || !title.trim() || !selectedListId"
          class="px-5 h-11 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#1e2732] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          {{ loading ? 'Memproses...' : 'Tambah Kartu' }}
        </button>
      </div>
    </div>
  </div>
</template>

