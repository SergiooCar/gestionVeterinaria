<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/80 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div class="relative bg-white dark:bg-slate-800 w-full rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom duration-300 border border-celeste-100 dark:border-slate-700/80 flex flex-col max-w-2xl max-h-[85vh]">

      <!-- Header -->
      <div class="p-4 bg-gradient-to-r from-celeste-700 to-celeste-600 text-white rounded-t-[2rem] shrink-0">
        <div class="relative z-10 flex justify-between items-center w-full">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-white text-md border border-white/10 shadow-inner">
              <i class="fa-solid fa-user-shield"></i>
            </div>
            <div>
              <h2 class="!text-2xl font-bold tracking-tight leading-tight text-white">Registrar Nuevo Usuario</h2>
              <p class="text-[10px] font-bold uppercase tracking-widest mt-1 text-celeste-100">CONTROL DE ACCESO Y ROLES</p>
            </div>
          </div>
          <button @click="close"
            class="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90 cursor-pointer">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit" class="p-6 bg-celeste-50/10 dark:bg-slate-900/40 space-y-6 flex-1 overflow-y-auto custom-scrollbar min-h-0">
        <!-- Section Header -->
        <div class="flex items-center gap-2 text-celeste-600 dark:text-celeste-400 font-bold text-[11px] uppercase tracking-wider mb-3">
          <i class="fa-solid fa-id-badge text-sm text-celeste-500 dark:text-celeste-400"></i>
          <span>Datos de la Cuenta</span>
        </div>

        <!-- Row 1: Nombre Completo & Usuario -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Nombre Completo</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-user absolute left-4 text-celeste-500 dark:text-slate-400 text-sm"></i>
              <input v-model="formData.nombre" type="text" required
                class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
                placeholder="Ej. Dr. Roberto Gómez">
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Nombre de Usuario</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-at absolute left-4 text-celeste-500 dark:text-slate-400 text-sm"></i>
              <input v-model="formData.username" type="text" required
                class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
                placeholder="Ej. rgomez">
            </div>
          </div>
        </div>

        <!-- Row 2: Email & Contraseña -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Email</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-envelope absolute left-4 text-celeste-500 dark:text-slate-400 text-sm"></i>
              <input v-model="formData.email" type="email" required
                class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
                placeholder="rgomez@clinicavet.com">
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Contraseña</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-lock absolute left-4 text-celeste-500 dark:text-slate-400 text-sm"></i>
              <input v-model="formData.password_hash" type="password" required
                class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
                placeholder="••••••••">
            </div>
          </div>
        </div>

        <!-- Row 3: Rol & Estado -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Rol Asignado</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-user-tag absolute left-4 text-celeste-500 dark:text-slate-400 text-sm"></i>
              <select v-model="formData.rol" required
                class="w-full pl-11 pr-10 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs appearance-none outline-none">
                <option value="ADMIN" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Administrador (Acceso Total)</option>
                <option value="VETERINARIO" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Veterinario (Atención Médica)</option>
                <option value="RECEPCIONISTA" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Recepcionista (Gestión de Turnos)</option>
                <option value="USUARIO" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Usuario General</option>
              </select>
              <i class="fa-solid fa-chevron-down absolute right-4 text-celeste-500 dark:text-slate-400 pointer-events-none text-xs"></i>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Estado</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-power-off absolute left-4 text-celeste-500 dark:text-slate-400 text-sm"></i>
              <select v-model="formData.activo" required
                class="w-full pl-11 pr-10 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs appearance-none outline-none">
                <option :value="true" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Activo (Permite Login)</option>
                <option :value="false" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Inactivo (Acceso Suspendido)</option>
              </select>
              <i class="fa-solid fa-chevron-down absolute right-4 text-celeste-500 dark:text-slate-400 pointer-events-none text-xs"></i>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-6 flex justify-end gap-3 border-t border-celeste-100 dark:border-slate-700">
          <button type="button" @click="close"
            class="px-6 bg-white dark:bg-slate-700 text-celeste-700 dark:text-slate-200 font-bold py-2 rounded-2xl border border-celeste-200 dark:border-slate-600 hover:bg-celeste-50 dark:hover:bg-slate-600 transition-all transform active:scale-95 !text-xs cursor-pointer">
            Cancelar
          </button>
          <button type="submit" :disabled="loading"
            class="px-8 bg-celeste-600 dark:bg-celeste-500 text-white font-bold py-2 rounded-2xl shadow-lg shadow-celeste-500/25 hover:bg-celeste-700 dark:hover:bg-celeste-600 transition-all transform active:scale-95 !text-xs flex items-center gap-2 disabled:opacity-50 cursor-pointer">
            <i class="fa-solid fa-user-plus"></i>
            <span>{{ loading ? 'Creando...' : 'Crear Usuario' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
  nombre: '',
  username: '',
  email: '',
  password_hash: '',
  rol: 'VETERINARIO',
  activo: true
});

const resetForm = () => {
  formData.value = {
    nombre: '',
    username: '',
    email: '',
    password_hash: '',
    rol: 'VETERINARIO',
    activo: true
  };
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) resetForm();
});

const close = () => {
  emit('close');
  resetForm();
};

const handleSubmit = () => {
  emit('submit', { ...formData.value });
};
</script>
