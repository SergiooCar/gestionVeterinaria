<template>
  <div class="min-h-screen w-full bg-white dark:bg-slate-900 relative overflow-hidden font-sans pb-20 pt-24 transition-colors duration-300">
    <div class="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-celeste-50/50 dark:from-celeste-950/20 to-transparent -z-10"></div>
    <div class="container mx-auto px-6 relative z-10 w-full max-w-full">
      <!-- Header Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] mb-8 relative overflow-hidden">

        <!-- Subtle decorative circle -->
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-celeste-50 dark:bg-celeste-950/30 rounded-full blur-3xl"></div>

        <div class="relative z-10 ml-2">
          <router-link to="/dashboard"
            class="inline-flex items-center text-celeste-500 dark:text-celeste-400 hover:text-celeste-700 dark:hover:text-celeste-300 mb-4 transition-colors group !no-underline font-bold text-xs uppercase tracking-widest">
            <i class="fa-solid fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
            Volver al Panel
          </router-link>

          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-2">
            <div>
              <h1 class="!text-2xl md:text-1xl font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight mb-2">
                Gestión de Dueños
              </h1>
              <p class="text-celeste-700 dark:text-slate-300 text-lg font-medium max-w-xl">
                Administra los dueños y sus datos de contacto.
              </p>
            </div>

            <button @click="openCreateModal"
              class="bg-celeste-600 dark:bg-celeste-500 text-white hover:bg-celeste-700 dark:hover:bg-celeste-600 px-4 py-3 rounded-full font-bold shadow-lg shadow-celeste-500/25 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap !text-xs cursor-pointer">
              <i class="fa-solid fa-user-plus mr-3 text-base"></i>
              Agregar Nuevo Dueño
            </button>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage"
        class="mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-2 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
        <i class="fa-solid fa-circle-exclamation text-md"></i>
        <p class="font-bold">{{ errorMessage }}</p>
        <button @click="fetchPersonas"
          class="ml-auto bg-red-100 dark:bg-red-900/60 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded-full transition-colors font-bold text-sm">
          Reintentar
        </button>
      </div>

      <!-- Filters Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-2 mb-8 border border-celeste-100 dark:border-slate-700/80 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-4">
        <div class="relative flex-1 w-full">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-celeste-400 dark:text-slate-400"></i>
          <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o apellido..."
            class="w-full pl-14 pr-6 py-2 bg-celeste-50/50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700 focus:ring-2 focus:ring-celeste-500/20 focus:bg-white dark:focus:bg-slate-900 text-celeste-900 dark:text-slate-100 placeholder:text-celeste-400 dark:placeholder:text-slate-500 !text-sm transition-all outline-none" />
        </div>
        <div class="flex items-center px-6 py-2 bg-celeste-50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700">
          <span class="text-celeste-700 dark:text-celeste-400 font-bold mr-2">{{ filteredPersonas.length }}</span>
          <span class="text-celeste-600/70 dark:text-slate-400 text-xs font-medium">Resultados encontrados</span>
        </div>
      </div>

      <!-- Table Section -->
      <PersonasTable :personas="filteredPersonas" @view="handleView" @edit="handleEdit" @remove="handleDelete"
        class="animate-in fade-in slide-in-from-bottom duration-700" />

      <!-- Persona Modal -->
      <PersonaModal :is-open="isModalOpen" :mode="modalMode" :persona="selectedPersona" @close="closeModal"
        @submit="handleSubmit" />

      <!-- Confirm / Success Modal -->
      <ConfirmModal :is-open="confirmModal.isOpen" :title="confirmModal.title" :message="confirmModal.message"
        :is-success="confirmModal.isSuccess" @confirm="executeDelete" @cancel="closeConfirmModal" />

      <!-- Floating Notification (Toast) -->
      <Transition name="toast">
        <div v-if="notification.show" :class="[
          'fixed top-24 right-8 z-[100] bg-white dark:bg-slate-800 border-l-4 shadow-2xl rounded-2xl py-2 px-3.5 flex items-center gap-3 min-w-[300px] border border-slate-100/50 dark:border-slate-700',
          notification.type === 'error' ? 'border-red-500' : 'border-celeste-500'
        ]">
          <div :class="[
            'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
            notification.type === 'error' ? 'bg-red-50 dark:bg-red-950/40 text-red-500' : 'bg-celeste-50 dark:bg-celeste-950/40 text-celeste-600 dark:text-celeste-400'
          ]">
            <i :class="['text-[10px] fa-solid', notification.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check']"></i>
          </div>
          <div class="flex flex-col justify-center min-w-0">
            <p class="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest leading-none mb-0.5">
              {{ notification.type === 'error' ? 'Atención' : 'Notificación' }}
            </p>
            <p class="text-xs font-extrabold text-slate-700 dark:text-slate-200 leading-tight">{{ notification.message }}</p>
          </div>
          <button @click="notification.show = false"
            class="ml-auto text-slate-300 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0 cursor-pointer">
            <i class="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PersonasTable from '../components/PersonasTable.vue';
import PersonaModal from '../components/PersonaModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import { personaService } from '../services/personaService';

const route = useRoute();
const personas = ref([]);
const searchQuery = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// Modal state
const isModalOpen = ref(false);
const modalMode = ref('create'); // 'create', 'edit', 'view'
const selectedPersona = ref({});

// Confirm Modal state
const confirmModal = ref({
  isOpen: false,
  title: '',
  message: '',
  isSuccess: false,
  idToDelete: null
});

const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 4000);
};

const fetchPersonas = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await personaService.getAll();
    console.log('Datos de personas recibidos:', response.data);
    // Parsear si viene como string (debido a recursión infinita en el backend o payload gigante)
    personas.value = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  } catch (error) {
    console.error('Error fetching personas:', error);
    if (error.response && error.response.status === 403) {
      errorMessage.value = 'Acceso Denegado: No tienes permisos para ver este listado.';
    } else {
      errorMessage.value = 'Error al cargar la lista de personas.';
    }
  } finally {
    isLoading.value = false;
  }
};

const filteredPersonas = computed(() => {
  if (!personas.value) return [];
  if (!searchQuery.value) return personas.value;

  const query = searchQuery.value.toLowerCase();
  return personas.value.filter(p => {
    const nombre = p.nombre ? p.nombre.toLowerCase() : '';
    const apellido = p.apellido ? p.apellido.toLowerCase() : '';
    const dni = p.dni ? p.dni.toLowerCase() : '';

    return nombre.includes(query) ||
      apellido.includes(query) ||
      dni.includes(query);
  });
});

const openCreateModal = () => {
  modalMode.value = 'create';
  selectedPersona.value = {};
  isModalOpen.value = true;
};

const handleView = (persona) => {
  modalMode.value = 'view';
  selectedPersona.value = { ...persona };
  isModalOpen.value = true;
};

const handleEdit = (persona) => {
  modalMode.value = 'edit';
  selectedPersona.value = { ...persona };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = async (personaData) => {
  try {
    if (modalMode.value === 'create') {
      await personaService.create(personaData);
    } else if (modalMode.value === 'edit') {
      await personaService.update(selectedPersona.value.id_persona, personaData);
    }
    await fetchPersonas();
    closeModal();
    showNotification(modalMode.value === 'create' ? 'Dueño registrado correctamente' : 'Datos del dueño actualizados');
  } catch (error) {
    console.error(`Error ${modalMode.value === 'create' ? 'creating' : 'updating'} persona:`, error);
    if (error.response && error.response.status === 403) {
      alert('Error 403: Acceso Denegado. No tienes permisos para realizar esta acción.');
    } else {
      alert('Hubo un error al procesar la solicitud.');
    }
  }
};

const handleDelete = (id) => {
  console.log('Solicitud de confirmación de eliminación para ID:', id);
  if (!id) {
    alert('Error: ID de persona no encontrado.');
    return;
  }
  confirmModal.value = {
    isOpen: true,
    title: '¿Estás seguro?',
    message: 'Esta acción eliminará permanentemente al dueño y no podrá deshacerse.',
    isSuccess: false,
    idToDelete: id
  };
};

const closeConfirmModal = () => {
  confirmModal.value.isOpen = false;
};

const executeDelete = async () => {
  if (confirmModal.value.isSuccess) {
    closeConfirmModal();
    return;
  }

  const id = confirmModal.value.idToDelete;
  if (!id) return;

  try {
    await personaService.delete(id);
    confirmModal.value = {
      ...confirmModal.value,
      title: '¡Eliminado!',
      message: 'La persona ha sido eliminada correctamente del sistema.',
      isSuccess: true,
      idToDelete: null
    };
    await fetchPersonas();
    showNotification('Dueño eliminado del sistema');
  } catch (error) {
    console.error('Error deleting persona:', error);
    if (error.response && error.response.status === 500) {
      showNotification('No se puede eliminar: El dueño tiene mascotas asignadas', 'error');
    } else {
      showNotification('Error al intentar eliminar el registro', 'error');
    }
    closeConfirmModal();
  }
};

onMounted(async () => {
  await fetchPersonas();
  if (route.query.viewId) {
    const id = route.query.viewId;
    const owner = personas.value.find(p => (p.id_persona || p.id) == id);
    if (owner) handleView(owner);
  }
});
</script>

<style scoped>
.animate-in {
  animation-fill-mode: forwards;
}

@keyframes slide-in-from-bottom {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-in.slide-in-from-bottom {
  animation: slide-in-from-bottom 0.7s ease-out;
}

/* Toast Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
  transform: translateX(100%) scale(0.5);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%) scale(0.5);
  opacity: 0;
}
</style>
