<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  board: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'create', 'update'])

const title = ref('')
const description = ref('')
const isPrivate = ref(true)
const backgroundColor = ref('#197fe6')
const loading = ref(false)

const isEdit = computed(() => !!props.board)

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.board) {
      title.value = props.board.title
      description.value = props.board.description || ''
      isPrivate.value = props.board.isPrivate
      backgroundColor.value = props.board.backgroundColor || '#197fe6'
    } else {
      title.value = ''
      description.value = ''
      isPrivate.value = true
      backgroundColor.value = '#197fe6'
    }
  }
})

const handleSubmit = () => {
  if (!title.value.trim()) return
  
  loading.value = true
  
  const payload = {
    title: title.value,
    description: description.value,
    isPrivate: isPrivate.value,
    backgroundColor: backgroundColor.value
  }

  if (isEdit.value) {
    emit('update', { id: props.board.id, ...payload })
  } else {
    emit('create', payload)
  }
  
  loading.value = false
}
</script>

<template>
  <!-- wrapper modal, nutup seluruh layar -->
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    
    <!-- backdrop gelap, klik di luar buat nutup modal -->
    <div 
      @click="$emit('close')" 
      class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
    ></div>
    
    <!-- box modal utama -->
    <div
      class="relative w-full max-w-[480px] bg-surface-light dark:bg-surface-dark
             rounded-xl shadow-2xl flex flex-col overflow-hidden
             animate-in fade-in zoom-in-95 duration-200"
    >
      
      <!-- header modal: judul + tombol close -->
      <div class="flex items-center justify-between px-6 pt-6 pb-2">
        <h2 class="text-[#0e141b] dark:text-white text-xl font-bold leading-tight tracking-tight">
          {{ isEdit ? 'Edit Board' : 'Buat Board Baru' }}
        </h2>

        <!-- tombol close -->
        <button
          @click="$emit('close')"
          class="group p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700
                 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <span class="material-symbols-outlined text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 text-xl">
            close
          </span>
        </button>
      </div>

      <!-- isi utama modal -->
      <div class="px-6 py-2 flex flex-col gap-5">
        
        <!-- input nama board -->
        <div class="flex flex-col gap-2">
          <label
            for="board-title"
            class="text-slate-900 dark:text-slate-100 text-sm font-medium"
          >
            Nama Board <span class="text-red-500">*</span>
          </label>

          <input
            id="board-title"
            v-model="title"
            autofocus
            type="text"
            placeholder="Misal: Project Alpha"
            @keyup.enter="handleSubmit"
            class="w-full rounded-lg border border-[#d0dbe7] dark:border-slate-600
                   bg-slate-50 dark:bg-slate-800
                   text-[#0e141b] dark:text-white
                   placeholder:text-[#4e7397] dark:placeholder:text-slate-500
                   px-4 py-3 text-base
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                   transition-all shadow-sm"
          />
        </div>

        <!-- input deskripsi board -->
        <div class="flex flex-col gap-2">
          <label
            for="board-desc"
            class="text-slate-900 dark:text-slate-100 text-sm font-medium"
          >
            Deskripsi
            <span class="text-slate-400 font-normal text-xs">(Opsional)</span>
          </label>

          <textarea
            id="board-desc"
            v-model="description"
            placeholder="Deskripsikan tujuan board ini..."
            class="w-full min-h-[100px] resize-none rounded-lg
                   border border-[#d0dbe7] dark:border-slate-600
                   bg-slate-50 dark:bg-slate-800
                   text-[#0e141b] dark:text-white
                   placeholder:text-[#4e7397] dark:placeholder:text-slate-500
                   px-4 py-3 text-base
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                   transition-all shadow-sm"
          ></textarea>
        </div>

        <!-- pengaturan visibilitas board -->
        <div class="flex flex-col gap-2">
          <span class="text-slate-900 dark:text-slate-100 text-sm font-medium">
            Visibilitas
          </span>

          <!-- toggle publik / privat -->
          <label
            class="flex items-center gap-3 p-3 rounded-lg border border-[#d0dbe7]
                   dark:border-slate-600 bg-slate-50 dark:bg-slate-800
                   cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700
                   transition-colors"
          >
            <!-- switch -->
            <div class="relative flex items-center">
              <input type="checkbox" v-model="isPrivate" class="peer sr-only" />

              <div
                class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full
                       peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30
                       dark:peer-focus:ring-primary/50
                       peer-checked:bg-primary
                       after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                       after:h-5 after:w-5 after:bg-white after:border after:border-gray-300
                       after:rounded-full after:transition-all
                       peer-checked:after:translate-x-full peer-checked:after:border-white"
              ></div>
            </div>

            <!-- keterangan status -->
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ isPrivate ? 'Privat' : 'Publik' }}
              </span>
              <span class="text-xs text-slate-500 dark:text-slate-400">
                {{ isPrivate
                  ? 'Hanya Anda yang dapat melihat board ini.'
                  : 'Semua orang dapat melihat board ini.'
                }}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- footer modal: tombol aksi -->
      <div
        class="px-6 py-6 mt-2 flex justify-end items-center gap-3
               bg-slate-50/50 dark:bg-slate-800/30
               border-t border-slate-100 dark:border-slate-700/50"
      >
        <button
          @click="$emit('close')"
          class="px-5 py-2.5 rounded-lg text-slate-600 dark:text-slate-300
                 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700
                 transition-colors focus:outline-none focus:ring-2
                 focus:ring-slate-200 dark:focus:ring-slate-700"
        >
          Batal
        </button>

        <button
          @click="handleSubmit"
          :disabled="loading || !title.trim()"
          class="px-6 py-2.5 rounded-lg bg-primary hover:bg-blue-600
                 text-white text-sm font-semibold
                 shadow-md shadow-blue-500/20
                 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40
                 focus:ring-offset-1 dark:focus:ring-offset-slate-800
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Memproses...' : (isEdit ? 'Simpan Perubahan' : 'Buat Board') }}
        </button>
      </div>
    </div>
  </div>
</template>


