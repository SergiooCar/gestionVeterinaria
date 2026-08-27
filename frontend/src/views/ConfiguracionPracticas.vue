<template>
  <div class="min-h-screen w-full bg-white dark:bg-slate-900 relative overflow-hidden font-sans pb-20 pt-24 transition-colors duration-300">
    <div class="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-celeste-50/50 dark:from-celeste-950/20 to-transparent -z-10"></div>
    <div class="container mx-auto px-6 relative z-10 w-full max-w-full">

      <!-- Header Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] mb-8 relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-celeste-50 dark:bg-celeste-950/30 rounded-full blur-3xl"></div>
        <div class="relative z-10 ml-2">
          <router-link to="/dashboard"
            class="inline-flex items-center text-celeste-500 dark:text-celeste-400 hover:text-celeste-700 dark:hover:text-celeste-300 mb-4 transition-colors group !no-underline font-bold text-xs uppercase tracking-widest">
            <i class="fa-solid fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
            Volver al Panel
          </router-link>

          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-2">
            <div>
              <h1 class="!text-2xl md:text-1xl font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight mb-2">Códigos de Práctica
              </h1>
              <p class="text-celeste-700 dark:text-slate-300 text-lg font-medium">Configuración de tipos de atención y servicios.</p>
            </div>
            <button @click="openModal()"
              class="bg-celeste-600 dark:bg-celeste-500 hover:bg-celeste-700 dark:hover:bg-celeste-600 text-white font-bold px-4 py-3 rounded-full shadow-lg shadow-celeste-500/25 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap !text-xs cursor-pointer">
              <i class="fa-solid fa-plus mr-3 text-base"></i>
              Nueva Práctica
            </button>
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-2 mb-8 border border-celeste-100 dark:border-slate-700/80 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-4">
        <div class="relative flex-1 w-full">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-celeste-400 dark:text-slate-400"></i>
          <input v-model="searchQuery" type="text" placeholder="Buscar práctica por nombre..."
            class="w-full pl-14 pr-6 py-2 bg-celeste-50/50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700 focus:ring-2 focus:ring-celeste-500/20 focus:bg-white dark:focus:bg-slate-900 text-celeste-900 dark:text-slate-100 placeholder:text-celeste-400 dark:placeholder:text-slate-500 !text-sm transition-all outline-none" />
        </div>
        <div class="flex items-center px-6 py-2 bg-celeste-50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700">
          <span class="text-celeste-700 dark:text-celeste-400 font-bold mr-2">{{ filteredPracticas.length }}</span>
          <span class="text-celeste-600/70 dark:text-slate-400 text-xs font-medium">Prácticas encontradas</span>
        </div>
      </div>

      <!-- Table Section -->
      <PracticasTable :practicas="filteredPracticas" @edit="openModal" @remove="openDeleteModal" />
    </div>

    <!-- Modal Component -->
    <PracticaModal :is-open="modal.isOpen" :is-edit="modal.isEdit" :practica="selectedPractica" :loading="loading" @close="closeModal" @submit="handleSave" />

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteModal.isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/70 backdrop-blur-sm" @click="closeDeleteModal"></div>
      <div
        class="relative bg-white dark:bg-slate-800 w-full max-w-md rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300 border border-red-100 dark:border-red-900/50 text-center p-8">
        <div
          class="w-20 h-20 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-800 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-triangle-exclamation text-3xl"></i>
        </div>
        <h2 class="text-2xl font-extrabold text-celeste-950 dark:text-slate-100 mb-2">¿Eliminar práctica?</h2>
        <p class="text-celeste-600 dark:text-slate-300 font-medium mb-8 text-sm">Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta práctica médica?</p>

        <div class="flex gap-3">
          <button @click="confirmDelete" :disabled="loading"
            class="flex-1 bg-red-500 text-white font-bold py-2 rounded-2xl shadow-lg shadow-red-500/25 hover:bg-red-600 transition-all transform active:scale-95 !text-xs disabled:opacity-50 cursor-pointer">
            {{ loading ? 'Eliminando...' : 'Sí, eliminar' }}
          </button>
          <button @click="closeDeleteModal" :disabled="loading"
            class="flex-1 bg-white dark:bg-slate-700 text-celeste-700 dark:text-slate-200 font-bold py-2 rounded-2xl border border-celeste-200 dark:border-slate-600 hover:bg-celeste-50 dark:hover:bg-slate-600 transition-all transform active:scale-95 !text-xs disabled:opacity-50 cursor-pointer">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Success Overlay -->
    <Transition name="fade">
      <div v-if="showSuccess" class="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/70 backdrop-blur-sm"></div>
        <div
          class="relative bg-white dark:bg-slate-800 rounded-[2rem] p-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.15)] max-w-sm w-full animate-in zoom-in duration-500 border border-celeste-100 dark:border-slate-700">
          <div
            class="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <i class="fa-solid fa-check text-4xl"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-celeste-950 dark:text-slate-100 mb-3">¡Excelente!</h2>
          <p class="text-celeste-700 dark:text-slate-300 font-medium mb-10 leading-relaxed text-sm">
            La práctica médica ha sido {{ modal.isEdit ? 'editada' : 'guardada' }} exitosamente.
          </p>
          <button @click="showSuccess = false"
            class="w-full bg-celeste-600 dark:bg-celeste-500 text-white font-bold py-3 rounded-2xl hover:bg-celeste-700 dark:hover:bg-celeste-600 transition-all transform active:scale-95 shadow-md !text-xs cursor-pointer">
            Continuar
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { turnoService } from '../services/turnoService';
import PracticasTable from '../components/PracticasTable.vue';
import PracticaModal from '../components/PracticaModal.vue';

const practicas = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const showSuccess = ref(false);
const selectedPractica = ref({});

const filteredPracticas = computed(() => {
  if (!searchQuery.value) return practicas.value;
  const q = searchQuery.value.toLowerCase();
  return practicas.value.filter(p => p.nombre.toLowerCase().includes(q));
});

const modal = ref({
  isOpen: false,
  isEdit: false,
  id: null
});

const deleteModal = ref({
  isOpen: false,
  id: null
});

const fetchPracticas = async () => {
  try {
    const response = await turnoService.getTiposAtencion();
    practicas.value = response.data;
  } catch (error) {
    console.error('Error fetching practicas:', error);
  }
};

const openModal = (practica = null) => {
  if (practica) {
    modal.value = { isOpen: true, isEdit: true, id: practica.id_tipo_atencion };
    selectedPractica.value = { ...practica };
  } else {
    modal.value = { isOpen: true, isEdit: false, id: null };
    selectedPractica.value = {};
  }
};

const closeModal = () => {
  modal.value.isOpen = false;
};

const handleSave = async (practicaData) => {
  loading.value = true;
  try {
    if (modal.value.isEdit) {
      await turnoService.updateTipoAtencion(modal.value.id, practicaData);
    } else {
      await turnoService.saveTipoAtencion(practicaData);
    }
    fetchPracticas();
    closeModal();
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error('Error saving practica:', error);
    alert('Error al guardar la práctica');
  } finally {
    loading.value = false;
  }
};

const openDeleteModal = (id) => {
  deleteModal.value = { isOpen: true, id };
};

const closeDeleteModal = () => {
  deleteModal.value.isOpen = false;
};

const confirmDelete = async () => {
  loading.value = true;
  try {
    await turnoService.deleteTipoAtencion(deleteModal.value.id);
    fetchPracticas();
    closeDeleteModal();
  } catch (error) {
    console.error('Error deleting practica:', error);
    alert('Error al eliminar la práctica');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPracticas();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
