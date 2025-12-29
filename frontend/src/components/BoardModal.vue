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
    
    <!-- backdrop gelap, klik buat nutup modal -->
    <div 
      @click="$emit('close')" 
      class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
    ></div>
    
    <!-- box modal utama -->
    <div class="relative w-full max-w-[480px] bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl flex flex-col overflow-hidden">
      
      <!-- header modal: judul + tombol close -->
      <div class="flex items-center justify-between px-6 pt-6 pb-2">
        <h2 class="text-xl font-bold">
          {{ isEdit ? 'Edit Board' : 'Buat Board Baru' }}
        </h2>
        <button @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- isi modal -->
      <div class="px-6 py-2 flex flex-col gap-5">
        
        <!-- input nama board -->
        <div class="flex flex-col gap-2">
          <label>Nama Board *</label>
          <input 
            v-model="title"
            placeholder="Misal: Project Alpha"
            type="text"
            @keyup.enter="handleSubmit"
          />
        </div>

        <!-- input deskripsi board -->
        <div class="flex flex-col gap-2">
          <label>
            Deskripsi 
            <span class="text-xs">(opsional)</span>
          </label>
          <textarea 
            v-model="description"
            placeholder="Deskripsikan tujuan board ini..."
          ></textarea>
        </div>

        <!-- pengaturan visibilitas board  -->
        <div class="flex flex-col gap-2">
          <span>Visibilitas</span>

          <!-- toggle publik / privat -->
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" v-model="isPrivate" class="sr-only">

            <!-- switch -->
            <div class="w-11 h-6 rounded-full"></div>

            <!-- keterangan status -->
            <div class="flex flex-col">
              <span class="text-sm font-semibold">
                {{ isPrivate ? 'Privat' : 'Publik' }}
              </span>
              <span class="text-xs">
                {{ isPrivate 
                  ? 'Hanya saya yang bisa lihat.' 
                  : 'Semua orang bisa lihat.' 
                }}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- footer modal: tombol aksi -->
      <div class="px-6 py-6 mt-2 flex justify-end gap-3 border-t">
        <button @click="$emit('close')">
          Batal
        </button>

        <button 
          @click="handleSubmit"
          :disabled="loading || !title.trim()"
        >
          {{ isEdit ? 'Simpan Perubahan' : 'Buat Board' }}
        </button>
      </div>
    </div>
  </div>
</template>

