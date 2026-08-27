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
                Gestión de Mascotas
              </h1>
              <p class="text-celeste-700 dark:text-slate-300 text-lg font-medium max-w-xl">
                Administra los pacientes animales y vincula cada uno con su dueño.
              </p>
            </div>

            <button @click="openCreateModal"
              class="bg-celeste-600 dark:bg-celeste-500 text-white hover:bg-celeste-700 dark:hover:bg-celeste-600 px-4 py-3 rounded-full font-bold shadow-lg shadow-celeste-500/25 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap !text-xs cursor-pointer">
              <i class="fa-solid fa-plus mr-3 text-base"></i>
              Registrar Nueva Mascota
            </button>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage"
        class="mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-2 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
        <i class="fa-solid fa-circle-exclamation text-md"></i>
        <p class="font-bold">{{ errorMessage }}</p>
        <button @click="fetchMascotas"
          class="ml-auto bg-red-100 dark:bg-red-900/60 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded-full transition-colors font-bold text-sm">
          Reintentar
        </button>
      </div>

      <!-- Filters Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-2 mb-8 border border-celeste-100 dark:border-slate-700/80 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-4">
        <div class="relative flex-1 w-full">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-celeste-400 dark:text-slate-400"></i>
          <input v-model="searchQuery" type="text" placeholder="Buscar por nombre, especie o dueño..."
            class="w-full pl-14 pr-6 py-2 bg-celeste-50/50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700 focus:ring-2 focus:ring-celeste-500/20 focus:bg-white dark:focus:bg-slate-900 text-celeste-900 dark:text-slate-100 placeholder:text-celeste-400 dark:placeholder:text-slate-500 !text-sm transition-all outline-none" />
        </div>
        <div class="flex items-center px-6 py-2 bg-celeste-50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700">
          <span class="text-celeste-700 dark:text-celeste-400 font-bold mr-2">{{ filteredMascotas.length }}</span>
          <span class="text-celeste-600/70 dark:text-slate-400 text-xs font-medium">Mascotas registradas</span>
        </div>
      </div>

      <!-- Table Section -->
      <div v-if="isLoading" class="py-20 text-center">
        <div class="inline-block animate-spin w-10 h-10 border-4 border-celeste-500 border-t-transparent rounded-3xl">
        </div>
        <p class="mt-4 text-slate-400 font-medium">Cargando pacientes...</p>
      </div>
      <MascotasTable v-else :mascotas="filteredMascotas" @view="handleView" @edit="handleEdit" @remove="confirmDelete"
        class="animate-in fade-in slide-in-from-bottom duration-700" />

      <!-- Mascota Modal -->
      <MascotaModal :is-open="isModalOpen" :mode="modalMode" :mascota="selectedMascota" :personas="personas"
        :especies="especies" :razas="razas" @close="closeModal" @submit="handleSubmit" />

      <!-- Confirm / Success Modal -->
      <ConfirmModal :is-open="confirmModal.isOpen" :title="confirmModal.title" :message="confirmModal.message"
        :is-success="confirmModal.isSuccess" :is-confirm="confirmModal.type === 'confirm_new_data'"
        :confirm-text="confirmModal.type === 'confirm_new_data' ? 'Sí, Guardar' : ''" @confirm="handleConfirmModal"
        @cancel="handleCancelModal" />

      <!-- Floating Notification (Toast) -->
      <Transition name="toast">
        <div v-if="notification.show"
          class="fixed top-24 right-8 z-[100] bg-white dark:bg-slate-800 border-l-4 border-celeste-500 shadow-2xl rounded-2xl py-2 px-3.5 flex items-center gap-3 min-w-[300px] border border-slate-100/50 dark:border-slate-700">
          <div class="w-5 h-5 rounded-full bg-celeste-50 dark:bg-celeste-950/40 flex items-center justify-center text-celeste-600 dark:text-celeste-400 shrink-0">
            <i class="fa-solid fa-circle-check text-[10px]"></i>
          </div>
          <div class="flex flex-col justify-center min-w-0">
            <p class="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest leading-none mb-0.5">Notificación</p>
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
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MascotasTable from '../components/MascotasTable.vue';
import MascotaModal from '../components/MascotaModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import { mascotaService } from '../services/mascotaService';
import { personaService } from '../services/personaService';
import { especieService } from '../services/especieService';
import { razaService } from '../services/razaService';

const route = useRoute();
const mascotas = ref([]);
const personas = ref([]);
const especies = ref([]);
const razas = ref([]);
const searchQuery = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// Modal state
const isModalOpen = ref(false);
const modalMode = ref('create'); // 'create', 'edit', 'view'
const selectedMascota = ref({});

// Confirm Modal state
const confirmModal = ref({
  isOpen: false,
  title: '',
  message: '',
  isSuccess: false,
  idToDelete: null,
  type: ''
});

const notification = ref({
  show: false,
  message: ''
});

const showNotification = (message) => {
  notification.value = { show: true, message };
  setTimeout(() => {
    notification.value.show = false;
  }, 4000);
};

const fetchMascotas = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await mascotaService.getAll();
    mascotas.value = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  } catch (error) {
    console.error('Error fetching mascotas:', error);
    if (error.response && error.response.status === 403) {
      errorMessage.value = 'Acceso Denegado: No tienes permisos para ver este listado.';
    } else {
      errorMessage.value = 'Error al cargar la lista de mascotas.';
    }
  } finally {
    isLoading.value = false;
  }
};

const fetchInitialData = async () => {
  try {
    const [persRes, espRes, razRes] = await Promise.all([
      personaService.getAll(),
      especieService.getAll(),
      razaService.getAll()
    ]);
    personas.value = typeof persRes.data === 'string' ? JSON.parse(persRes.data) : persRes.data;
    especies.value = typeof espRes.data === 'string' ? JSON.parse(espRes.data) : espRes.data;
    razas.value = typeof razRes.data === 'string' ? JSON.parse(razRes.data) : razRes.data;
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

const filteredMascotas = computed(() => {
  if (!mascotas.value) return [];
  if (!searchQuery.value) return mascotas.value;

  const query = searchQuery.value.toLowerCase();
  return mascotas.value.filter(m => {
    const nombre = m.nombre ? m.nombre.toLowerCase() : '';
    const especie = m.raza?.especie?.nombre ? m.raza.especie.nombre.toLowerCase() : '';
    const raza = m.raza?.nombre ? m.raza.nombre.toLowerCase() : '';
    const duenio = m.persona ? (m.persona.nombre + ' ' + m.persona.apellido).toLowerCase() : '';

    return nombre.includes(query) ||
      especie.includes(query) ||
      raza.includes(query) ||
      duenio.includes(query);
  });
});

const openCreateModal = (initialData = {}) => {
  modalMode.value = 'create';
  selectedMascota.value = { ...initialData };
  isModalOpen.value = true;
};

const handleView = (mascota) => {
  modalMode.value = 'view';
  selectedMascota.value = { ...mascota };
  isModalOpen.value = true;
};

const handleEdit = (mascota) => {
  modalMode.value = 'edit';
  selectedMascota.value = { ...mascota };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const pendingMascotaData = ref(null);

const handleSubmit = async (mascotaData) => {
  try {
    // Check if there are new entities to create
    if (mascotaData.isNewEspecie || mascotaData.isNewRaza) {
      pendingMascotaData.value = mascotaData;
      confirmModal.value = {
        isOpen: true,
        title: 'Nueva Categoría Detectada',
        message: `Has ingresado una ${mascotaData.isNewEspecie ? 'especie' : ''} ${mascotaData.isNewEspecie && mascotaData.isNewRaza ? 'y una ' : ''} ${mascotaData.isNewRaza ? 'raza' : ''} no registrada. ¿Deseas guardarlas permanentemente para futuros pacientes?`,
        isSuccess: false,
        type: 'confirm_new_data'
      };
      return;
    }

    if (modalMode.value === 'create') {
      await mascotaService.save(mascotaData);
    } else if (modalMode.value === 'edit') {
      await mascotaService.update(selectedMascota.value.id_mascota || selectedMascota.value.id, mascotaData);
    }

    await fetchMascotas();
    closeModal();

    confirmModal.value = {
      isOpen: true,
      title: '¡Todo listo!',
      message: 'La información de la mascota ha sido guardada correctamente.',
      isSuccess: true,
      type: 'success'
    };
  } catch (error) {
    console.error('Error saving mascota:', error);
    errorMessage.value = 'Error al guardar el paciente.';
  }
};

const executeNewDataCreation = async () => {
  if (!pendingMascotaData.value) return;

  const data = pendingMascotaData.value;
  isLoading.value = true;
  confirmModal.value.isOpen = false;

  try {
    let especieId = data.id_especie;
    let razaId = data.id_raza;

    // 1. Create Especie if new
    if (data.isNewEspecie) {
      const espRes = await especieService.save({ nombre: data.nuevaEspecieNombre });
      especieId = espRes.data.id_especie;
      showNotification(`Especie "${data.nuevaEspecieNombre}" guardada.`);
    }

    // 2. Create Raza if new
    if (data.isNewRaza) {
      const razRes = await razaService.save({
        nombre: data.nuevaRazaNombre,
        especie: { id_especie: especieId }
      });
      razaId = razRes.data.id_raza;
      showNotification(`Raza "${data.nuevaRazaNombre}" guardada.`);
    }

    // 3. Create Final Mascota Object
    const finalMascotaData = {
      ...data,
      id_especie: especieId,
      id_raza: razaId,
      raza: { id_raza: razaId }
    };
    delete finalMascotaData.isNewEspecie;
    delete finalMascotaData.isNewRaza;
    delete finalMascotaData.nuevaEspecieNombre;
    delete finalMascotaData.nuevaRazaNombre;

    await mascotaService.save(finalMascotaData);

    // Close the form modal immediately after pet creation
    closeModal();

    // Refresh all data in background
    await Promise.all([fetchMascotas(), fetchInitialData()]);

    // Show final success message
    setTimeout(() => {
      confirmModal.value = {
        isOpen: true,
        title: '¡Todo listo!',
        message: 'La nueva categoría y la mascota han sido guardadas con éxito.',
        isSuccess: true,
        type: 'success'
      };
    }, 400);
  } catch (error) {
    console.error('Error in multi-step creation:', error);
    errorMessage.value = 'Error al crear las nuevas categorías. Revisa la consola.';
  } finally {
    isLoading.value = false;
    pendingMascotaData.value = null;
  }
};

const confirmDelete = (id) => {
  if (!id) {
    alert('Error: ID de mascota no encontrado.');
    return;
  }
  confirmModal.value = {
    isOpen: true,
    title: '¿Eliminar mascota?',
    message: 'Esta acción eliminará permanentemente al paciente y su historial.',
    isSuccess: false,
    idToDelete: id,
    type: 'delete'
  };
};

const closeConfirmModal = () => {
  confirmModal.value.isOpen = false;
};

// Main handler for the Confirm button in ConfirmModal
const handleConfirmModal = async () => {
  const type = confirmModal.value.type;

  // 1. If it's just a success message, close it
  if (confirmModal.value.isSuccess || type === 'success') {
    closeConfirmModal();
    return;
  }

  // 2. If it's a confirmation for new species/breed
  if (type === 'confirm_new_data') {
    await executeNewDataCreation();
    return;
  }

  // 3. If it's a deletion
  if (type === 'delete') {
    await performDeletion();
  }
};

const performDeletion = async () => {
  const id = confirmModal.value.idToDelete;
  if (!id) return;

  try {
    await mascotaService.delete(id);
    await fetchMascotas();
    confirmModal.value = {
      isOpen: true,
      title: '¡Eliminado!',
      message: 'La mascota ha sido eliminada correctamente del sistema.',
      isSuccess: true,
      idToDelete: null,
      type: 'success'
    };
  } catch (error) {
    console.error('Error deleting mascota:', error);
    errorMessage.value = 'No se pudo eliminar el registro.';
    closeConfirmModal();
  }
};

const handleCancelModal = () => {
  pendingMascotaData.value = null;
  closeConfirmModal();
};

const checkQueryActions = () => {
  if (route.query.viewId) {
    const id = route.query.viewId;
    const pet = mascotas.value.find(m => (m.id_mascota || m.id) == id);
    if (pet) handleView(pet);
  } else if (route.query.openCreate === 'true') {
    const ownerId = route.query.ownerId;
    openCreateModal(ownerId ? { id_persona: Number(ownerId) } : {});
  }
};

watch(() => route.query, () => {
  checkQueryActions();
}, { deep: true });

onMounted(async () => {
  await Promise.all([fetchMascotas(), fetchInitialData()]);
  checkQueryActions();
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

/* Toast Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
  transform: translateX(100%) scale(0.9);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%) scale(0.9);
  opacity: 0;
}
</style>
