<script setup>
import { ref, watch, computed } from 'vue'
import ConfirmModal from './ConfirmModal.vue'

const props = defineProps({
  isOpen: Boolean,
  card: {
    type: Object,
    default: () => ({})
  },
  lists: {
    type: Array,
    default: () => []
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'update', 'delete', 'move', 'toggle-complete'])

const localCard = ref({})
const isEditingDesc = ref(false)
const descriptionBuffer = ref('')
const showConfirmDelete = ref(false)

watch(() => props.card, (newCard) => {
  if (newCard) {
    localCard.value = JSON.parse(JSON.stringify(newCard))
    descriptionBuffer.value = localCard.value.description || ''
  }
}, { immediate: true })

const currentListName = computed(() => {
  const list = props.lists.find(l => l.id === localCard.value.listId)
  return list ? list.title : 'Unknown List'
})

const formattedDueDate = computed(() => {
  if (!localCard.value.dueDate) return ''
  return new Date(localCard.value.dueDate).toISOString().split('T')[0]
})

const handleTitleUpdate = () => {
  if (props.readOnly) return
  if (localCard.value.title !== props.card.title) {
    emit('update', { ...localCard.value })
  }
}

const handleDescriptionSave = () => {
  localCard.value.description = descriptionBuffer.value
  isEditingDesc.value = false
  if (localCard.value.description !== props.card.description) {
    emit('update', { ...localCard.value })
  }
}

const toggleCompletion = () => {
  localCard.value.isCompleted = !localCard.value.isCompleted
  emit('toggle-complete', { ...localCard.value })
}

const handleDateChange = (e) => {
  const newDate = e.target.value
  localCard.value.dueDate = newDate ? new Date(newDate).toISOString() : null
  emit('update', { ...localCard.value })
}

const handleDeleteClick = () => {
  showConfirmDelete.value = true
}

const executeDelete = () => {
  emit('delete', localCard.value.id)
  showConfirmDelete.value = false
}
</script>

<template>
  <!-- Wrapper modal + backdrop -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
  >
    <!-- Backdrop, klik di luar untuk menutup modal -->
    <div 
      @click="$emit('close')" 
      class="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
    ></div>
    
    <!-- ===== MODAL CONTAINER ===== -->
    <div 
      class="relative w-full max-w-[900px] bg-white dark:bg-[#1E2936] rounded-xl shadow-2xl 
             flex flex-col md:flex-row overflow-hidden border border-gray-100 
             dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200"
    >
      
      <!-- Tombol close (pojok kanan atas) -->
      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 
               dark:hover:text-gray-200 transition-colors rounded-full 
               hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span class="material-symbols-outlined">close</span>
      </button>

      <!-- ===== MAIN CONTENT (LEFT) ===== -->
      <div 
        class="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col gap-6 
               overflow-y-auto max-h-[85vh]"
      >
        <!-- Breadcrumb lokasi card -->
        <div class="flex flex-col gap-1">
          <div class="flex flex-wrap items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-[#4e7397] text-[20px]">
              view_kanban
            </span>
            <span class="text-[#4e7397] font-medium">Board</span>
            <span class="text-[#4e7397] font-medium">/</span>
            <!-- Nama list tempat card berada -->
            <span class="text-primary font-bold">
              {{ currentListName }}
            </span>
          </div>
        </div>

        <!-- ===== TITLE CARD ===== -->
        <div class="flex flex-col gap-2">
          <!-- Judul card, langsung editable -->
          <input 
            v-model="localCard.title" 
            @blur="handleTitleUpdate"
            :readonly="readOnly"
            type="text"
            class="text-[#0e141b] dark:text-white tracking-tight text-2xl 
                   md:text-3xl font-bold bg-transparent border-none 
                   focus:ring-0 focus:outline-none p-0 w-full"
            :class="{ 'cursor-default': readOnly }"
          />
        </div>

        <!-- ===== DESCRIPTION ===== -->
        <div class="flex flex-col gap-3">
          
          <!-- Header deskripsi + tombol edit -->
          <div class="flex items-center justify-between">
            <h3 class="text-[#0e141b] dark:text-white text-lg font-bold 
                       flex items-center gap-3"
            >
              <span class="material-symbols-outlined text-[#4e7397]">
                description
              </span>
              Deskripsi
            </h3>

            <!-- Tombol edit hanya muncul jika tidak read-only -->
            <button 
              v-if="!isEditingDesc && !readOnly" 
              @click="isEditingDesc = true"
              class="text-primary text-sm font-medium 
                     hover:bg-primary/10 px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>

          <!-- Konten deskripsi -->
          <div class="pl-8">
            
            <!-- Mode edit deskripsi -->
            <div v-if="isEditingDesc">
              <textarea 
                v-model="descriptionBuffer"
                placeholder="Tambahkan deskripsi yang lebih detail..."
                class="w-full min-h-[120px] p-3 rounded-lg border 
                       border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-sm 
                       focus:ring-2 focus:ring-primary resize-y"
              ></textarea>

              <!-- Aksi simpan / batal -->
              <div class="flex gap-2 mt-2">
                <button 
                  @click="handleDescriptionSave" 
                  class="bg-primary text-white px-4 py-1.5 
                         rounded-lg text-sm font-medium"
                >
                  Simpan
                </button>
                <button 
                  @click="isEditingDesc = false" 
                  class="text-gray-500 dark:text-gray-400 
                         px-3 py-1.5 text-sm font-medium"
                >
                  Batal
                </button>
              </div>
            </div>

            <!-- Mode tampil deskripsi -->
            <div 
              v-else 
              @click="!readOnly && (isEditingDesc = true)"
              class="text-[#0e141b] dark:text-gray-300 text-base 
                     bg-background-light dark:bg-black/20 
                     p-4 rounded-lg min-h-[60px]"
              :class="{ 
                'hover:border-gray-200 dark:hover:border-gray-600 cursor-pointer': !readOnly 
              }"
            >
              <p v-if="localCard.description" class="whitespace-pre-line">
                {{ localCard.description }}
              </p>
              <p v-else class="text-gray-400 italic">
                Belum ada deskripsi.
              </p>
            </div>

          </div>
        </div>
      </div>

      <!-- ===== SIDEBAR (RIGHT) ===== -->
      <div 
        class="w-full md:w-[300px] bg-gray-50 dark:bg-[#151e29] 
               border-l border-gray-100 dark:border-gray-700 
               p-6 flex flex-col gap-6 shrink-0 
               overflow-y-auto max-h-[85vh]"
      >
        
        <!-- Action buttons (hanya owner) -->
        <div v-if="!readOnly" class="flex flex-col gap-2">
          <span class="text-xs font-bold text-[#4e7397] uppercase">
            Actions
          </span>

          <!-- Toggle status selesai -->
          <button 
            @click="toggleCompletion"
            class="flex items-center gap-3 px-3 py-2 text-sm 
                   font-medium rounded-lg w-full text-left"
            :class="
              localCard.isCompleted
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            "
          >
            <span class="material-symbols-outlined text-[20px]">
              {{ localCard.isCompleted ? 'check_box' : 'check_box_outline_blank' }}
            </span>
            {{ localCard.isCompleted ? 'Selesai' : 'Tandai Selesai' }}
          </button>

          <!-- Hapus card -->
          <button 
            @click="handleDeleteClick"
            class="flex items-center gap-3 px-3 py-2 text-sm 
                   font-medium text-red-600 
                   hover:bg-red-50 dark:hover:bg-red-900/20 
                   rounded-lg w-full text-left"
          >
            <span class="material-symbols-outlined text-[20px]">
              delete
            </span>
            Hapus Kartu
          </button>
        </div>

        <!-- Due date -->
        <div class="flex flex-col gap-2">
          <span class="text-xs font-bold text-[#4e7397] uppercase">
            Tanggal Jatuh Tempo
          </span>

          <input 
            type="date"
            :value="formattedDueDate"
            @change="handleDateChange"
            :disabled="readOnly"
            class="w-full bg-white dark:bg-gray-800 border 
                   border-gray-200 dark:border-gray-600 
                   rounded-lg px-3 py-2 text-sm font-medium 
                   focus:ring-2 focus:ring-primary/50 
                   disabled:opacity-50"
          />
        </div>
      </div>
    </div>

    <!-- Modal konfirmasi hapus card -->
    <ConfirmModal
      :is-open="showConfirmDelete"
      title="Hapus Kartu"
      message="Apakah Anda yakin ingin menghapus kartu ini? Tindakan ini tidak dapat dibatalkan."
      confirm-text="Hapus"
      cancel-text="Batal"
      :is-destructive="true"
      @close="showConfirmDelete = false"
      @confirm="executeDelete"
    />
  </div>
</template>

