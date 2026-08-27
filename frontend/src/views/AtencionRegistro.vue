<template>
  <div class="min-h-screen w-full bg-white dark:bg-slate-900 relative overflow-hidden font-sans pb-20 pt-24 transition-colors duration-300">
    <div class="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-celeste-50/50 dark:from-celeste-950/20 to-transparent -z-10"></div>
    <div class="container mx-auto px-6 relative z-10 w-full max-w-full">
      <!-- Header -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] mb-8 relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-celeste-50 dark:bg-celeste-950/30 rounded-full blur-3xl"></div>
        <div class="relative z-10">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <router-link to="/confirmar-turnos"
              class="inline-flex items-center text-celeste-500 dark:text-celeste-400 hover:text-celeste-700 dark:hover:text-celeste-300 transition-colors group no-underline font-bold text-sm uppercase tracking-widest">
              <i class="fa-solid fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
              Volver a Lista
            </router-link>

            <button v-if="isReadOnly" @click="unlockForm" :disabled="isUnlocking"
              class="bg-white dark:bg-slate-700 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-600 hover:bg-celeste-50 dark:hover:bg-slate-600 px-6 py-2.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-sm text-xs uppercase tracking-widest gap-2 disabled:opacity-70 cursor-pointer">
              <i v-if="isUnlocking" class="fa-solid fa-spinner animate-spin"></i>
              <i v-else class="fa-solid fa-pen-to-square"></i>
              {{ isUnlocking ? 'Desbloqueando...' : 'Editar Evolución o Atención' }}
            </button>
          </div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight mb-2">Registro de Atención</h1>
          <div v-if="atencion" class="flex items-center gap-3 mt-4">
            <span
              class="px-4 py-1.5 bg-celeste-50 dark:bg-slate-900/80 text-celeste-700 dark:text-celeste-300 rounded-lg text-xs font-bold uppercase tracking-widest border border-celeste-100 dark:border-slate-700 shadow-sm">
              {{ atencion.mascota?.nombre }}
            </span>
            <span
              class="px-4 py-1.5 bg-celeste-50 dark:bg-slate-900/80 text-celeste-700 dark:text-celeste-300 rounded-lg text-xs font-bold uppercase tracking-widest border border-celeste-100 dark:border-slate-700 shadow-sm">
              {{ atencion.turno?.tipoAtencion?.nombre }}
            </span>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-celeste-500 border-t-transparent"></div>
      </div>

      <div v-else-if="atencion" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-2 space-y-6">
          <div
            class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-celeste-100 dark:border-slate-700/80 shadow-[0_5px_20px_rgba(0,0,0,0.02)] space-y-8 relative">
            <div class="absolute top-0 right-0 w-32 h-32 bg-celeste-50/50 dark:bg-celeste-950/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>

            <div class="space-y-4 relative z-10">
              <label
                class="flex items-center gap-3 text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest ml-1">
                <i class="fa-solid fa-stethoscope text-celeste-400 dark:text-celeste-400"></i>
                Diagnóstico Médico
              </label>
              <textarea v-model="formData.diagnostico" rows="4" :disabled="isReadOnly"
                class="w-full px-4 py-3 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-300 focus:bg-white dark:focus:bg-slate-900 rounded-2xl focus:ring-4 focus:ring-celeste-500/10 text-celeste-950 dark:text-slate-100 font-medium text-left transition-all resize-none text-base shadow-inner-sm custom-scrollbar disabled:bg-slate-100 dark:disabled:bg-slate-950 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-800 disabled:cursor-not-allowed disabled:shadow-none outline-none"
                placeholder="Escribe el diagnóstico aquí..."></textarea>
            </div>

            <div class="space-y-4 relative z-10">
              <label
                class="flex items-center gap-3 text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest ml-1">
                <i class="fa-solid fa-prescription-bottle-medical text-celeste-400 dark:text-celeste-400"></i>
                Tratamiento Sugerido
              </label>
              <textarea v-model="formData.tratamiento" rows="4" :disabled="isReadOnly"
                class="w-full px-6 py-3 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-300 focus:bg-white dark:focus:bg-slate-900 rounded-2xl focus:ring-4 focus:ring-celeste-500/10 text-celeste-950 dark:text-slate-100 font-medium text-left transition-all resize-none text-base shadow-inner-sm custom-scrollbar disabled:bg-slate-100 dark:disabled:bg-slate-950 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-800 disabled:cursor-not-allowed disabled:shadow-none outline-none"
                placeholder="Indica el tratamiento, medicamentos, dosis..."></textarea>
            </div>

            <div class="space-y-4 relative z-10">
              <label
                class="flex items-center gap-3 text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest ml-1">
                <i class="fa-solid fa-comment-medical text-celeste-400 dark:text-celeste-400"></i>
                Observaciones Adicionales
              </label>
              <textarea v-model="formData.observaciones" rows="3" :disabled="isReadOnly"
                class="w-full px-6 py-3 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-300 focus:bg-white dark:focus:bg-slate-900 rounded-2xl focus:ring-4 focus:ring-celeste-500/10 text-celeste-950 dark:text-slate-100 font-medium text-left transition-all resize-none text-sm shadow-inner-sm custom-scrollbar disabled:bg-slate-100 dark:disabled:bg-slate-950 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-800 disabled:cursor-not-allowed disabled:shadow-none outline-none"
                placeholder="Notas internas o recordatorios..."></textarea>
            </div>

            <div v-if="!isReadOnly" class="pt-4 relative z-10 flex justify-center">
              <button @click="guardarAtencion" :disabled="saving"
                class="px-8 py-3 bg-celeste-600 dark:bg-celeste-500 text-white font-bold rounded-xl shadow-md hover:bg-celeste-700 dark:hover:bg-celeste-600 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer">
                <i class="fa-solid fa-floppy-disk"></i>
                {{ saving ? 'Guardando...' : 'Finalizar y Guardar Atención' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar Info -->
        <div class="space-y-6">
          <div
            class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-celeste-100 dark:border-slate-700/80 shadow-[0_5px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
            <h3
              class="text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-6 border-b border-celeste-50 dark:border-slate-700 pb-4">
              Detalles del Paciente</h3>
            <div class="flex items-center gap-4 mb-6 relative z-10">
              <div
                class="w-16 h-16 bg-celeste-50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-celeste-500 dark:text-celeste-400 text-2xl shrink-0">
                <i class="fa-solid fa-paw"></i>
              </div>
              <div>
                <p class="text-lg font-extrabold text-celeste-950 dark:text-slate-100 leading-tight">{{ atencion.mascota?.nombre }}</p>
                <p class="text-sm font-bold text-celeste-600 dark:text-celeste-400">{{ atencion.mascota?.raza?.nombre ||
                  'Raza no especificada' }}</p>
              </div>
            </div>

            <div class="space-y-4 border-t border-celeste-50 dark:border-slate-700 pt-6 relative z-10">
              <div class="flex flex-col gap-1 text-sm">
                <span class="font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest text-[10px]">Dueño</span>
                <span class="font-extrabold text-celeste-900 dark:text-slate-200">{{ atencion.mascota?.persona?.nombre }} {{
                  atencion.mascota?.persona?.apellido }}</span>
              </div>
              <div class="flex flex-col gap-1 text-sm">
                <span class="font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest text-[10px]">Motivo Inicial</span>
                <span class="font-extrabold text-celeste-900 dark:text-slate-200">{{ atencion.turno?.tipoAtencion?.nombre }}</span>
              </div>
              <div class="flex flex-col gap-1 text-sm">
                <span class="font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest text-[10px]">Fecha</span>
                <span class="font-extrabold text-celeste-900 dark:text-slate-200">{{ formatDate(atencion.fecha) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Success Overlay -->
    <Transition name="fade">
      <div v-if="showSuccess" class="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/70 backdrop-blur-sm"></div>
        <div
          class="relative bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-sm w-full animate-in zoom-in duration-500 border border-celeste-100 dark:border-slate-700">
          <div
            class="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <i class="fa-solid fa-check text-4xl"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-celeste-950 dark:text-slate-100 mb-3">¡Excelente!</h2>
          <p class="text-celeste-700 dark:text-slate-300 font-medium mb-10 leading-relaxed text-sm">La historia clínica ha sido guardada
            exitosamente.</p>
          <button @click="router.push('/confirmar-turnos')"
            class="w-full bg-celeste-600 dark:bg-celeste-500 text-white font-bold py-4 rounded-xl hover:bg-celeste-700 dark:hover:bg-celeste-600 transition-all transform active:scale-95 shadow-md text-sm cursor-pointer">
            Continuar
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const router = useRouter();
const atencion = ref(null);
const loading = ref(true);
const saving = ref(false);
const showSuccess = ref(false);
const isReadOnly = ref(route.query.mode === 'view');
const isUnlocking = ref(false);

const unlockForm = () => {
  isUnlocking.value = true;
  setTimeout(() => {
    isReadOnly.value = false;
    isUnlocking.value = false;
  }, 1000);
};

const formData = ref({
  diagnostico: '',
  tratamiento: '',
  observaciones: ''
});

const fetchAtencion = async () => {
  try {
    const response = await api.get(`/atenciones/${route.params.id}`);
    atencion.value = response.data;
    formData.value.diagnostico = atencion.value.diagnostico || '';
    formData.value.tratamiento = atencion.value.tratamiento || '';
    formData.value.observaciones = atencion.value.observaciones || '';
  } catch (error) {
    console.error('Error fetching atencion:', error);
  } finally {
    loading.value = false;
  }
};

const guardarAtencion = async () => {
  saving.value = true;
  try {
    const payload = {
      id_atencion: atencion.value.id_atencion,
      fecha: atencion.value.fecha,
      diagnostico: formData.value.diagnostico,
      tratamiento: formData.value.tratamiento,
      observaciones: formData.value.observaciones
    };
    
    await api.put(`/atenciones/editar/${atencion.value.id_atencion}`, payload);
    showSuccess.value = true;
    // Auto redirect after 3 seconds if user doesn't click
    setTimeout(() => {
      if (showSuccess.value) router.push('/confirmar-turnos');
    }, 3000);
  } catch (error) {
    console.error('Error al guardar atención:', error);
    alert('Error al guardar la atención.');
  } finally {
    saving.value = false;
  }
};

const formatDate = (isoStr) => {
  if (!isoStr) return '';
  return new Date(isoStr).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
};

onMounted(() => {
  fetchAtencion();
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

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 20px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
  background-clip: padding-box;
}
</style>
