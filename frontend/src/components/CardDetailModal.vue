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
  <!-- wrapper modal, nutup layar + bikin konten di tengah -->
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
    
    <!-- backdrop gelap, klik buat nutup modal -->
    <div 
      @click="$emit('close')" 
      class="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
    ></div>
    
    <!-- container utama modal detail kartu -->
    <div class="relative w-full max-w-[900px] bg-white dark:bg-[#1E2936] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden border animate-in">
      
      <!-- tombol close pojok kanan -->
      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 rounded-full"
      >
        <span class="material-symbols-outlined">close</span>
      </button>

      <!-- bagian kiri: konten utama kartu -->
      <div class="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col gap-6 overflow-y-auto max-h-[85vh]">
        
        <!-- breadcrumb: board / nama list -->
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined">view_kanban</span>
            <span>Board</span>
            <span>/</span>
            <span class="font-bold">{{ currentListName }}</span>
          </div>
        </div>

        <!-- judul kartu -->
        <div class="flex flex-col gap-2">
          <input 
            v-model="localCard.title" 
            @blur="handleTitleUpdate"
            :readonly="readOnly"
            class="text-2xl md:text-3xl font-bold bg-transparent border-none"
            type="text"
          />
        </div>

        <!-- bagian deskripsi -->
        <div class="flex flex-col gap-3">
          
          <!-- header deskripsi + tombol edit -->
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined">description</span>
              Deskripsi
            </h3>
            <button 
              v-if="!isEditingDesc && !readOnly"
              @click="isEditingDesc = true"
              class="text-sm text-primary"
            >
              Edit
            </button>
          </div>

          <div class="pl-8">
            <!-- mode edit deskripsi -->
            <div v-if="isEditingDesc">
              <textarea 
                v-model="descriptionBuffer"
                class="w-full min-h-[120px] p-3 rounded-lg border"
                placeholder="Tambahkan deskripsi..."
              ></textarea>
              <div class="flex gap-2 mt-2">
                <button @click="handleDescriptionSave">Simpan</button>
                <button @click="isEditingDesc = false">Batal</button>
              </div>
            </div>

            <!-- tampilan deskripsi -->
            <div 
              v-else
              @click="!readOnly && (isEditingDesc = true)"
              class="p-4 rounded-lg min-h-[60px]"
            >
              <p v-if="localCard.description">
                {{ localCard.description }}
              </p>
              <p v-else class="italic text-gray-400">
                Belum ada deskripsi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- bagian kanan: sidebar aksi -->
      <div class="w-full md:w-[300px] bg-gray-50 dark:bg-[#151e29] border-l p-6 flex flex-col gap-6 overflow-y-auto max-h-[85vh]">
        
        <!-- tombol aksi kartu -->
        <div v-if="!readOnly" class="flex flex-col gap-2">
          <span class="text-xs font-bold uppercase">Actions</span>

          <!-- toggle selesai -->
          <button @click="toggleCompletion" class="flex items-center gap-3">
            <span class="material-symbols-outlined">
              {{ localCard.isCompleted ? 'check_box' : 'check_box_outline_blank' }}
            </span>
            {{ localCard.isCompleted ? 'Selesai' : 'Tandai Selesai' }}
          </button>

          <!-- hapus kartu -->
          <button @click="handleDeleteClick" class="flex items-center gap-3 text-red-600">
            <span class="material-symbols-outlined">delete</span>
            Hapus Kartu
          </button>
        </div>

        <!-- pengaturan tanggal jatuh tempo -->
        <div class="flex flex-col gap-2">
          <span class="text-xs font-bold uppercase">Tanggal Jatuh Tempo</span>
          <input 
            type="date"
            :value="formattedDueDate"
            @change="handleDateChange"
            :disabled="readOnly"
          />
        </div>
      </div>
    </div>

    <!-- modal konfirmasi hapus kartu -->
    <ConfirmModal
      :is-open="showConfirmDelete"
      title="Hapus Kartu"
      message="Apakah Anda yakin ingin menghapus kartu ini?"
      confirm-text="Hapus"
      cancel-text="Batal"
      :is-destructive="true"
      @close="showConfirmDelete = false"
      @confirm="executeDelete"
    />
  </div>
</template>

