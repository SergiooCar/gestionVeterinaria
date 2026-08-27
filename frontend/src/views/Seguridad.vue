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
              <div class="flex items-center gap-3 mb-2">
                <h1 class="!text-2xl md:text-1xl font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight">
                  Seguridad y Control de Accesos
                </h1>
                <span :class="[
                  'px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-xs',
                  isAdmin ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                ]">
                  {{ isAdmin ? 'Modo Administrador' : 'Modo Lectura' }}
                </span>
              </div>
              <p class="text-celeste-700 dark:text-slate-300 text-lg font-medium max-w-xl">
                Administra los usuarios registrados en la clínica, asigna roles de acceso y audita cuentas del sistema.
              </p>
            </div>

            <!-- Button Create (Only active for ADMIN role) -->
            <div>
              <button v-if="isAdmin" @click="openModal"
                class="bg-celeste-600 dark:bg-celeste-500 text-white hover:bg-celeste-700 dark:hover:bg-celeste-600 px-4 py-3 rounded-full font-bold shadow-lg shadow-celeste-500/25 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap !text-xs cursor-pointer">
                <i class="fa-solid fa-user-plus mr-3 text-base"></i>
                Registrar Nuevo Usuario
              </button>

              <button v-else @click="showAccessDeniedNotice"
                class="bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-full font-bold flex items-center justify-center cursor-not-allowed whitespace-nowrap !text-xs"
                title="Solo los usuarios con rol Administrador pueden crear cuentas.">
                <i class="fa-solid fa-lock mr-2 text-amber-500"></i>
                <span>Creación Restringida (Solo Admin)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Access Denied Banner for Non-Admins -->
      <div v-if="!isAdmin"
        class="mb-8 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl flex items-center gap-4 text-amber-800 dark:text-amber-200">
        <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/60 rounded-xl flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-300 text-lg">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <div>
          <p class="font-extrabold text-sm">Vista de Seguridad Restringida</p>
          <p class="text-xs font-medium opacity-90">Tu usuario actual no posee rol de <strong>Administrador</strong>. Puedes consultar la lista de cuentas pero la creación de nuevos usuarios requiere privilegios administrativos.</p>
        </div>
      </div>

      <!-- Filters Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-2 mb-8 border border-celeste-100 dark:border-slate-700/80 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-4">
        <div class="relative flex-1 w-full">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-celeste-400 dark:text-slate-400"></i>
          <input v-model="searchQuery" type="text" placeholder="Buscar por nombre, usuario, email o rol..."
            class="w-full pl-14 pr-6 py-2 bg-celeste-50/50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700 focus:ring-2 focus:ring-celeste-500/20 focus:bg-white dark:focus:bg-slate-900 text-celeste-900 dark:text-slate-100 placeholder:text-celeste-400 dark:placeholder:text-slate-500 !text-sm transition-all outline-none" />
        </div>
        <div class="flex items-center px-6 py-2 bg-celeste-50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700">
          <span class="text-celeste-700 dark:text-celeste-400 font-bold mr-2">{{ filteredUsuarios.length }}</span>
          <span class="text-celeste-600/70 dark:text-slate-400 text-xs font-medium">Usuarios registrados</span>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="py-20 text-center">
        <div class="inline-block animate-spin w-10 h-10 border-4 border-celeste-500 border-t-transparent rounded-3xl"></div>
        <p class="mt-4 text-slate-400 font-medium">Cargando lista de usuarios...</p>
      </div>

      <!-- Users Table -->
      <UsuariosTable v-else :usuarios="filteredUsuarios" @toggle-status="handleToggleStatus"
        class="animate-in fade-in slide-in-from-bottom duration-700" />

      <!-- Usuario Modal -->
      <UsuarioModal :is-open="isModalOpen" :loading="saving" @close="closeModal" @submit="handleCreateUser" />

      <!-- Confirm / Info Modal -->
      <ConfirmModal :is-open="confirmModal.isOpen" :title="confirmModal.title" :message="confirmModal.message"
        :is-success="confirmModal.isSuccess" @confirm="closeConfirmModal" @cancel="closeConfirmModal" />

      <!-- Toast Notification -->
      <Transition name="toast">
        <div v-if="notification.show"
          class="fixed top-24 right-8 z-[100] bg-white dark:bg-slate-800 border-l-4 border-celeste-500 shadow-2xl rounded-2xl py-2 px-3.5 flex items-center gap-3 min-w-[300px] border border-slate-100/50 dark:border-slate-700">
          <div class="w-5 h-5 rounded-full bg-celeste-50 dark:bg-celeste-950/40 flex items-center justify-center text-celeste-600 dark:text-celeste-400 shrink-0">
            <i class="fa-solid fa-circle-check text-[10px]"></i>
          </div>
          <div class="flex flex-col justify-center min-w-0">
            <p class="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest leading-none mb-0.5">Seguridad</p>
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
import UsuariosTable from '../components/UsuariosTable.vue';
import UsuarioModal from '../components/UsuarioModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import { usuarioService } from '../services/usuarioService';

const usuarios = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const saving = ref(false);
const isModalOpen = ref(false);
const isAdmin = ref(false);
const currentUser = ref(null);

const confirmModal = ref({
  isOpen: false,
  title: '',
  message: '',
  isSuccess: false
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

const checkAdminRole = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      currentUser.value = u;
      const role = (u.rol?.nombre || u.rol || u.role || '').toString().toUpperCase();
      if (role.includes('ADMIN') || u.username?.toLowerCase() === 'admin' || !role) {
        isAdmin.value = true;
      } else {
        isAdmin.value = false;
      }
    } catch (e) {
      isAdmin.value = true;
    }
  } else {
    isAdmin.value = true;
  }
};

const fetchUsuarios = async () => {
  loading.value = true;
  try {
    const response = await usuarioService.getAll();
    usuarios.value = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
  } finally {
    loading.value = false;
  }
};

const filteredUsuarios = computed(() => {
  if (!usuarios.value) return [];
  if (!searchQuery.value) return usuarios.value;

  const query = searchQuery.value.toLowerCase();
  return usuarios.value.filter(u => {
    const nombre = (u.nombre || '').toLowerCase();
    const username = (u.username || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const rol = (u.rol?.nombre || u.rol || '').toString().toLowerCase();

    return nombre.includes(query) ||
      username.includes(query) ||
      email.includes(query) ||
      rol.includes(query);
  });
});

const openModal = () => {
  if (!isAdmin.value) {
    showAccessDeniedNotice();
    return;
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const showAccessDeniedNotice = () => {
  confirmModal.value = {
    isOpen: true,
    title: 'Acceso Restringido',
    message: 'Solo los usuarios con rol de Administrador tienen permisos para registrar nuevas cuentas en el sistema.',
    isSuccess: false
  };
};

const closeConfirmModal = () => {
  confirmModal.value.isOpen = false;
};

const handleCreateUser = async (userData) => {
  if (!isAdmin.value) {
    showAccessDeniedNotice();
    return;
  }

  saving.value = true;
  try {
    await usuarioService.create(userData);
    await fetchUsuarios();
    closeModal();
    showNotification(`Usuario ${userData.username} creado exitosamente.`);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    showNotification('No se pudo registrar el usuario. Revisa los datos.');
  } finally {
    saving.value = false;
  }
};

const handleToggleStatus = async (id) => {
  if (!isAdmin.value) {
    showAccessDeniedNotice();
    return;
  }
  try {
    await usuarioService.toggleStatus(id);
    await fetchUsuarios();
    showNotification('Estado del usuario actualizado correctamente.');
  } catch (error) {
    console.error('Error al cambiar estado:', error);
  }
};

onMounted(() => {
  checkAdminRole();
  fetchUsuarios();
});
</script>

<style scoped>
.animate-in {
  animation-fill-mode: forwards;
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
