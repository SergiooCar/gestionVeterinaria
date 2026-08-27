<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/80 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div :class="[
      'relative bg-white dark:bg-slate-800 w-full rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom duration-300 transition-all border border-celeste-100 dark:border-slate-700/80 flex flex-col max-h-[85vh]',
      mode === 'view' ? 'max-w-6xl' : 'max-w-2xl'
    ]">

      <!-- Content Container -->
      <div :class="mode === 'view' ? 'flex flex-col lg:flex-row flex-1 min-h-0' : 'flex flex-col flex-1 min-h-0 p-0'">

        <!-- LEFT COLUMN: Profile Panel / Form Panel -->
        <div :class="[
          'flex-1 flex flex-col min-h-0',
          mode === 'view' ? 'lg:w-[50%] bg-white dark:bg-slate-800' : ''
        ]">
          <!-- Header -->
          <div :class="[
            'p-3 relative transition-all duration-300 shrink-0',
            mode === 'view' 
              ? 'bg-white dark:bg-slate-800 border-b border-celeste-100 dark:border-slate-700' 
              : 'bg-gradient-to-r from-celeste-700 to-celeste-600 text-white rounded-t-[2rem]'
          ]">
            <div class="relative z-10 flex justify-between items-center">
              <div class="flex items-center gap-4">
                <!-- Icon on the left -->
                <div v-if="mode !== 'view'" class="w-10 h-9 bg-white/10 rounded-2xl flex items-center justify-center text-white text-md border border-white/10 shadow-inner">
                  <i class="fa-solid fa-calendar-plus"></i>
                </div>
                <div v-else class="w-9 h-9 bg-celeste-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-celeste-600 dark:text-celeste-400 border border-celeste-100 dark:border-slate-600">
                  <i class="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <h2 :class="[
                    'font-bold tracking-tight leading-tight',
                    mode === 'view' ? '!text-2xl text-celeste-950 dark:text-slate-100' : '!text-2xl text-white'
                  ]">{{ title }}</h2>
                  <p :class="[
                    'text-[10px] font-bold uppercase tracking-widest mt-1',
                    mode === 'view' ? 'text-celeste-600 dark:text-celeste-400' : 'text-celeste-100'
                  ]">{{ subtitle }}</p>
                </div>
              </div>
              <button @click="close"
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded-xl transition-all hover:rotate-90 cursor-pointer',
                  mode === 'view' 
                    ? 'bg-celeste-50 dark:bg-slate-700 hover:bg-celeste-100 dark:hover:bg-slate-600 text-celeste-600 dark:text-slate-200' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                ]">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Form Area / Left Info -->
          <div :class="[
            'flex-1 overflow-y-auto custom-scrollbar',
            mode === 'view' ? 'p-6 space-y-5 bg-white dark:bg-slate-800' : 'p-3 lg:p-3 bg-celeste-50/10 dark:bg-slate-900/40'
          ]">
            <!-- Create Mode Form -->
            <form v-if="mode === 'create'" @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Section Header -->
              <div class="flex items-center gap-2 text-celeste-600 dark:text-celeste-400 font-bold text-[11px] uppercase tracking-wider mb-3">
                <i class="fa-solid fa-calendar-check text-sm text-celeste-500 dark:text-celeste-400"></i>
                <span>Detalles del Turno</span>
              </div>

              <!-- Paciente (Mascota) -->
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Paciente (Mascota)</label>
                <div class="relative flex items-center">
                  <i class="fa-solid fa-paw absolute left-4 text-celeste-500 dark:text-slate-400 text-base"></i>
                  <select v-model="formData.id_mascota" required
                    class="w-full pl-11 pr-10 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs appearance-none outline-none">
                    <option value="" disabled class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Seleccionar mascota...</option>
                    <option v-for="m in mascotas" :key="m.id_mascota" :value="m.id_mascota" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {{ m.nombre }} ({{ m.persona?.nombre }} {{ m.persona?.apellido }})
                    </option>
                    <option value="NUEVA">+ Registrar mascota nueva...</option>
                  </select>
                  <i class="fa-solid fa-chevron-down absolute right-4 text-celeste-500 dark:text-slate-400 pointer-events-none text-xs"></i>
                </div>
              </div>

              <!-- Datos rápidos de mascota/dueño nuevos -->
              <div v-if="formData.id_mascota === 'NUEVA'"
                class="p-4 bg-celeste-100/30 border border-celeste-100 rounded-2xl space-y-3">
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-celeste-700 uppercase tracking-wider ml-1">Nombre de la mascota</label>
                  <input v-model="formData.nuevaMascotaNombre" type="text" required
                    class="w-full px-4 py-2 bg-white border border-celeste-100 focus:border-celeste-500 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 font-bold transition-all !text-xs placeholder:text-celeste-400"
                    placeholder="Ej. Rocky" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="space-y-1.5">
                    <label class="text-[11px] font-bold text-celeste-700 uppercase tracking-wider ml-1">Nombre del dueño</label>
                    <input v-model="formData.nuevoDuenioNombre" type="text" required
                      class="w-full px-4 py-2 bg-white border border-celeste-100 focus:border-celeste-500 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 font-bold transition-all !text-xs placeholder:text-celeste-400"
                      placeholder="Ej. Juan" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[11px] font-bold text-celeste-700 uppercase tracking-wider ml-1">Apellido del dueño</label>
                    <input v-model="formData.nuevoDuenioApellido" type="text" required
                      class="w-full px-4 py-2 bg-white border border-celeste-100 focus:border-celeste-500 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 font-bold transition-all !text-xs placeholder:text-celeste-400"
                      placeholder="Ej. Pérez" />
                  </div>
                </div>
                <p class="text-[10px] font-semibold text-celeste-500 leading-relaxed">
                  <i class="fa-solid fa-circle-info mr-1"></i>
                  Se pedirán los datos completos de la mascota y del dueño al confirmar su asistencia.
                </p>
              </div>

              <!-- Tipo de Práctica -->
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Tipo de Práctica</label>
                <div class="relative flex items-center">
                  <i class="fa-solid fa-stethoscope absolute left-4 text-celeste-500 dark:text-slate-400 text-base"></i>
                  <select v-model="formData.id_tipo_atencion" required
                    class="w-full pl-11 pr-10 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs appearance-none outline-none">
                    <option value="" disabled class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Seleccionar práctica...</option>
                    <option v-for="t in tiposAtencion" :key="t.id_tipo_atencion" :value="t.id_tipo_atencion" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {{ t.nombre }} ({{ t.duracion_minutos }} min)
                    </option>
                  </select>
                  <i class="fa-solid fa-chevron-down absolute right-4 text-celeste-500 dark:text-slate-400 pointer-events-none text-xs"></i>
                </div>
              </div>

              <!-- Observaciones -->
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-celeste-700 uppercase tracking-wider ml-1">Observaciones</label>
                <div class="relative flex items-start">
                  <i class="fa-solid fa-notes-medical absolute left-4 top-3 text-celeste-500 text-base"></i>
                  <textarea v-model="formData.observaciones" rows="3"
                    class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 border border-celeste-100 focus:border-celeste-500 focus:bg-white focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 font-bold transition-all resize-none !text-xs placeholder:text-celeste-400"
                    placeholder="Ej. Control de vacunas, cirugía programada..."></textarea>
                </div>
              </div>

              <!-- Action Buttons (Create Mode) -->
              <div class="pt-6 flex justify-end gap-3 border-t border-celeste-100">
                <button type="button" @click="close"
                  class="px-6 bg-white text-celeste-700 font-bold py-2 rounded-2xl border border-celeste-200 hover:bg-celeste-50 transition-all transform active:scale-95 !text-xs">
                  Cancelar
                </button>
                <button type="submit" :disabled="loading"
                  class="px-8 bg-celeste-600 text-white font-bold py-2 rounded-2xl shadow-lg shadow-celeste-500/25 hover:bg-celeste-700 transition-all transform active:scale-95 !text-xs flex items-center gap-2 disabled:opacity-50">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>{{ loading ? 'Guardando...' : 'Confirmar Turno' }}</span>
                </button>
              </div>
            </form>

            <!-- View Mode details list (Left side of view panel) -->
            <div v-else class="space-y-5">
              <!-- Grid for quick stats -->
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="p-3 bg-celeste-50 rounded-xl border border-celeste-100 flex flex-col justify-center text-center">
                  <p class="text-[9px] font-bold text-celeste-500 uppercase tracking-widest mb-0.5">Fecha</p>
                  <p class="text-xs font-extrabold text-celeste-900">{{ displayFecha }}</p>
                </div>
                <div class="p-3 bg-celeste-50 rounded-xl border border-celeste-100 flex flex-col justify-center text-center">
                  <p class="text-[9px] font-bold text-celeste-500 uppercase tracking-widest mb-0.5">Horario</p>
                  <p class="text-xs font-extrabold text-celeste-900">{{ displayHora }} HS</p>
                </div>
              </div>

              <!-- Práctica -->
              <div class="flex items-start gap-4 group">
                <div class="w-9 h-9 rounded-lg bg-celeste-50 flex items-center justify-center text-celeste-600 shrink-0 border border-celeste-100">
                  <i class="fa-solid fa-stethoscope text-sm"></i>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Práctica Médica</p>
                  <p class="text-sm font-bold text-celeste-950">{{ turno.tipoAtencion?.nombre || 'Consulta General' }}</p>
                  <p class="text-[10px] font-semibold text-celeste-600 mt-0.5">
                    Duración estimada: {{ turno.tipoAtencion?.duracion_minutos || 15 }} minutos
                  </p>
                </div>
              </div>

              <!-- Observaciones -->
              <div class="flex items-start gap-4 group">
                <div class="w-9 h-9 rounded-lg bg-celeste-50 flex items-center justify-center text-celeste-600 shrink-0 border border-celeste-100">
                  <i class="fa-solid fa-notes-medical text-sm"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Observaciones</p>
                  <p class="text-xs font-medium text-celeste-950 whitespace-pre-line leading-relaxed">
                    {{ turno.observaciones || 'Sin observaciones registradas.' }}
                  </p>
                </div>
              </div>

              <!-- Action Buttons (View Mode) -->
              <div class="pt-6 flex justify-between gap-3 border-t border-celeste-100">
                <button type="button" @click="handleDelete"
                  class="px-6 bg-white hover:bg-red-50 text-red-600 font-bold py-2 rounded-2xl border border-red-200 hover:border-red-300 transition-all transform active:scale-95 !text-xs flex items-center gap-2">
                  <i class="fa-solid fa-trash-can"></i>
                  <span>Cancelar Turno</span>
                </button>
                <button type="button" @click="close"
                  class="px-8 bg-celeste-600 text-white font-bold py-2 rounded-2xl shadow-lg shadow-celeste-500/25 hover:bg-celeste-700 transition-all transform active:scale-95 !text-xs">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Patient & Owner Profile Card (Only for View Mode) -->
        <div v-if="mode === 'view'"
          class="lg:w-[50%] p-6 bg-celeste-50/30 border-l border-celeste-50 overflow-y-auto flex flex-col relative min-h-0">
          
          <div class="relative z-10 flex items-center justify-between mb-6">
            <div>
              <h3 class="!text-sm font-extrabold text-celeste-900 uppercase tracking-widest mb-1">Paciente y Responsable</h3>
              <div class="h-1 w-6 bg-celeste-400 rounded-full"></div>
            </div>
          </div>

          <div class="relative z-10 space-y-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <!-- Patient Profile Sub-Card -->
            <div class="p-4 rounded-xl bg-white border border-celeste-100 shadow-sm space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-celeste-50 border border-celeste-100 flex items-center justify-center text-celeste-600">
                  <i :class="[getPetIcon(turno.mascotas?.[0]?.raza?.especie?.nombre), 'text-xl']"></i>
                </div>
                <div>
                  <h4 class="font-extrabold text-celeste-950 text-base leading-tight">{{ turno.mascotas?.[0]?.nombre || 'Sin nombre' }}</h4>
                  <p class="text-[10px] font-bold text-celeste-600 uppercase tracking-widest mt-0.5">Paciente</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2 border-t border-celeste-50">
                <div>
                  <p class="text-[9px] font-bold text-celeste-500 uppercase tracking-wider">Especie</p>
                  <p class="text-xs font-bold text-celeste-950">{{ turno.mascotas?.[0]?.raza?.especie?.nombre || 'S/E' }}</p>
                </div>
                <div>
                  <p class="text-[9px] font-bold text-celeste-500 uppercase tracking-wider">Raza</p>
                  <p class="text-xs font-bold text-celeste-950 truncate">{{ turno.mascotas?.[0]?.raza?.nombre || 'S/R' }}</p>
                </div>
              </div>
            </div>

            <!-- Owner Profile Sub-Card -->
            <div class="p-4 rounded-xl bg-white border border-celeste-100 shadow-sm space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-celeste-50 border border-celeste-100 flex items-center justify-center text-celeste-600">
                  <i class="fa-solid fa-user-tie text-xl"></i>
                </div>
                <div>
                  <h4 class="font-extrabold text-celeste-950 text-base leading-tight">
                    {{ turno.persona?.nombre }} {{ turno.persona?.apellido }}
                  </h4>
                  <p class="text-[10px] font-bold text-celeste-600 uppercase tracking-widest mt-0.5">Dueño Responsable</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2 border-t border-celeste-50">
                <div>
                  <p class="text-[9px] font-bold text-celeste-500 uppercase tracking-wider">Documento</p>
                  <p class="text-xs font-bold text-celeste-950">{{ turno.persona?.dni || 'S/D' }}</p>
                </div>
                <div>
                  <p class="text-[9px] font-bold text-celeste-500 uppercase tracking-wider">Contacto</p>
                  <p class="text-xs font-bold text-celeste-950 truncate">{{ turno.persona?.telefono || 'Sin teléfono' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { turnoService } from '../services/turnoService';
import { personaService } from '../services/personaService';
import { mascotaService } from '../services/mascotaService';
import { especieService } from '../services/especieService';
import { razaService } from '../services/razaService';

const props = defineProps({
  isOpen: Boolean,
  mode: { type: String, default: 'create' },
  turno: { type: Object, default: () => ({}) },
  fecha: String,
  hora: String,
  mascotas: Array
});

const emit = defineEmits(['close', 'submit', 'delete']);

const formData = ref({
  id_mascota: '',
  id_tipo_atencion: '',
  observaciones: '',
  nuevaMascotaNombre: '',
  nuevoDuenioNombre: '',
  nuevoDuenioApellido: ''
});

const tiposAtencion = ref([]);
const loading = ref(false);
const PLACEHOLDER_NOMBRE = 'Sin especificar';

const resolvePlaceholderRazaId = async () => {
  const especiesRes = await especieService.getAll();
  let especie = especiesRes.data.find(
    e => e.nombre?.trim().toLowerCase() === PLACEHOLDER_NOMBRE.toLowerCase()
  );
  if (!especie) {
    const espRes = await especieService.save({ nombre: PLACEHOLDER_NOMBRE });
    especie = espRes.data;
  }

  const razasRes = await razaService.getAll();
  let raza = razasRes.data.find(
    r => r.nombre?.trim().toLowerCase() === PLACEHOLDER_NOMBRE.toLowerCase() &&
      r.especie?.id_especie === especie.id_especie
  );
  if (!raza) {
    const razRes = await razaService.save({
      nombre: PLACEHOLDER_NOMBRE,
      especie: { id_especie: especie.id_especie }
    });
    raza = razRes.data;
  }
  return raza.id_raza;
};

const fetchTiposAtencion = async () => {
  try {
    const response = await turnoService.getTiposAtencion();
    tiposAtencion.value = response.data;
  } catch (error) {
    console.error('Error fetching tipos atencion:', error);
  }
};

onMounted(() => {
  fetchTiposAtencion();
});

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
};

const getPetIcon = (especie) => {
  if (!especie) return 'fa-solid fa-paw';
  const esp = especie.toLowerCase();
  if (esp.includes('perro')) return 'fa-solid fa-dog';
  if (esp.includes('gato')) return 'fa-solid fa-cat';
  return 'fa-solid fa-paw';
};

const title = computed(() => {
  return props.mode === 'create' ? 'Agendar Turno' : 'Detalles del Turno';
});

const subtitle = computed(() => {
  return props.mode === 'create' ? 'NUEVO TURNO PARA PACIENTE' : 'INFORMACIÓN DEL TURNO REGISTRADO';
});

const displayFecha = computed(() => {
  if (props.mode === 'create') {
    return formatDate(props.fecha);
  }
  if (props.turno?.fecha_hora_inicio) {
    const parts = props.turno.fecha_hora_inicio.replace(' ', 'T').split('T');
    return formatDate(parts[0]);
  }
  return '';
});

const displayHora = computed(() => {
  if (props.mode === 'create') {
    return props.hora;
  }
  if (props.turno?.fecha_hora_inicio) {
    const parts = props.turno.fecha_hora_inicio.replace(' ', 'T').split('T');
    return parts[1].substring(0, 5);
  }
  return '';
});

const close = () => {
  emit('close');
  resetForm();
};

const nuevaPersonaId = ref(null);

const resetForm = () => {
  formData.value = {
    id_mascota: '', id_tipo_atencion: '', observaciones: '',
    nuevaMascotaNombre: '', nuevoDuenioNombre: '', nuevoDuenioApellido: ''
  };
  nuevaPersonaId.value = null;
};

const crearMascotaRapida = async () => {
  if (!nuevaPersonaId.value) {
    const personaRes = await personaService.create({
      nombre: formData.value.nuevoDuenioNombre,
      apellido: formData.value.nuevoDuenioApellido
    });
    nuevaPersonaId.value = personaRes.data.id_persona;
  }

  const razaId = await resolvePlaceholderRazaId();
  const mascotaRes = await mascotaService.save({
    nombre: formData.value.nuevaMascotaNombre,
    persona: { id_persona: nuevaPersonaId.value },
    raza: { id_raza: razaId }
  });
  return mascotaRes.data;
};

const handleSubmit = async () => {
  const isNueva = formData.value.id_mascota === 'NUEVA';

  if (!formData.value.id_mascota || !formData.value.id_tipo_atencion) {
    alert('Por favor selecciona mascota y tipo de práctica.');
    return;
  }
  if (isNueva && (!formData.value.nuevaMascotaNombre || !formData.value.nuevoDuenioNombre || !formData.value.nuevoDuenioApellido)) {
    alert('Por favor completa el nombre de la mascota y del dueño.');
    return;
  }

  loading.value = true;
  try {
    const mascota = isNueva
      ? await crearMascotaRapida()
      : props.mascotas.find(m => m.id_mascota === formData.value.id_mascota);
    const tipo = tiposAtencion.value.find(t => t.id_tipo_atencion === formData.value.id_tipo_atencion);

    // Calculate dates in local time
    const formatDateLocal = (date) => {
      const pad = (n) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const start = new Date(`${props.fecha}T${props.hora}:00`);
    const end = new Date(start.getTime() + (tipo.duracion_minutos * 60000));

    const turnoData = {
      fecha_hora_inicio: formatDateLocal(start),
      fecha_hora_fin: formatDateLocal(end),
      observaciones: formData.value.observaciones,
      persona: mascota.persona,
      usuario: { id_usuario: 1 }, // TODO: Get logged user
      tipoAtencion: tipo,
      mascotas: [mascota]
    };

    const response = await turnoService.save(turnoData);
    emit('submit', response.data);
    close();
  } catch (error) {
    console.error('Error saving turno:', error);
    alert('Error al guardar el turno');
  } finally {
    loading.value = false;
  }
};

const handleDelete = () => {
  emit('delete', props.turno.id_turno || props.turno.id);
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm();
  }
});
</script>

<style scoped>
.animate-in.slide-in-from-bottom {
  animation: slide-in-from-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-in-from-bottom {
  from {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
