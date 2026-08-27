<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/80 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div :class="[
      'relative bg-white dark:bg-slate-800 w-full rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom duration-300 transition-all mt-5 border border-celeste-100 dark:border-slate-700/80 flex flex-col max-h-[85vh]',
      mode === 'view' ? 'max-w-6xl' : 'max-w-2xl'
    ]">

      <!-- Content Container -->
      <div :class="[
        'flex flex-col flex-1 min-h-0 overflow-hidden',
        mode === 'view' ? 'lg:flex-row' : 'flex flex-col flex-1 min-h-0 '
      ]">

        <!-- LEFT COLUMN: Pet Profile / Form Panel -->
        <div :class="[
          'flex-1 flex flex-col min-h-0 overflow-hidden',
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
                <div v-if="mode !== 'view'"
                  class="w-10 h-9 bg-white/10 rounded-2xl flex items-center justify-center text-white text-md border border-white/10 shadow-inner">
                  <i :class="mode === 'create' ? 'fa-solid fa-plus' : 'fa-solid fa-pen-to-square'"></i>
                </div>
                <div v-if="mode === 'view'"
                  class="w-9 h-9 bg-celeste-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-celeste-600 dark:text-celeste-400 border border-celeste-100 dark:border-slate-600">
                  <i :class="[getEspecieIcon(formData.id_especie)]"></i>
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
              <button @click="close" :class="[
                'w-8 h-8 flex items-center justify-center rounded-xl transition-all hover:rotate-90 cursor-pointer',
                mode === 'view'
                  ? 'bg-celeste-50 dark:bg-slate-700 hover:bg-celeste-100 dark:hover:bg-slate-600 text-celeste-600 dark:text-slate-200'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              ]">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Form Area / Profile Info -->
          <div :class="[
            'flex-1 overflow-y-auto custom-scrollbar min-h-0',
            mode === 'view' ? 'p-3 space-y-5 bg-white dark:bg-slate-800' : 'p-4 lg:p-6 bg-celeste-50/10 dark:bg-slate-900/40'
          ]">
            <!-- View Mode: Elegant Info List -->
            <div v-if="mode === 'view'" class="space-y-5">
              <!-- Grid for quick stats -->
              <div class="grid grid-cols-2 gap-3 mb-6">
                <div
                  class="p-3 bg-celeste-50 dark:bg-slate-700/50 rounded-xl border border-celeste-100 dark:border-slate-600 flex flex-col justify-center text-center">
                  <p
                    class="text-[9px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-0.5">
                    Peso</p>
                  <p class="text-base font-extrabold text-celeste-900 dark:text-slate-100">{{ formData.peso || '0.0' }}
                    <span class="text-[10px]">kg</span></p>
                </div>
                <div
                  class="p-3 bg-celeste-50 dark:bg-slate-700/50 rounded-xl border border-celeste-100 dark:border-slate-600 flex flex-col justify-center text-center">
                  <p
                    class="text-[9px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-0.5">
                    Sexo</p>
                  <p class="text-base font-extrabold text-celeste-900 dark:text-slate-100">{{ formData.sexo === 'M' ?
                    'Macho' : 'Hembra' }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div
                  class="w-9 h-9 rounded-lg bg-celeste-50 dark:bg-slate-700 flex items-center justify-center text-celeste-600 dark:text-celeste-400 shrink-0 border border-celeste-100 dark:border-slate-600">
                  <i class="fa-solid fa-dna text-sm"></i>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-1">
                    Especie / Raza</p>
                  <p class="text-sm font-bold text-celeste-950 dark:text-slate-100 leading-tight">
                    {{ getEspecieNombre(formData.id_especie) }}
                    <span class="block text-[11px] font-medium text-celeste-600 dark:text-celeste-400 mt-0.5">{{
                      getRazaNombre(formData.id_raza) }}</span>
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div
                  class="w-9 h-9 rounded-lg bg-celeste-50 flex items-center justify-center text-celeste-600 shrink-0 border border-celeste-100">
                  <i class="fa-solid fa-calendar text-sm"></i>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Fecha Nacimiento</p>
                  <p class="text-sm font-bold text-celeste-950">{{ formatDate(formData.fecha_nacimiento) }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div
                  class="w-9 h-9 rounded-lg bg-celeste-50 flex items-center justify-center text-celeste-600 shrink-0 border border-celeste-100">
                  <i class="fa-solid fa-palette text-sm"></i>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Color / Pelaje</p>
                  <p class="text-sm font-bold text-celeste-950">{{ formData.color || 'No especificado' }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4 group pt-2 border-t border-celeste-50">
                <div
                  class="w-9 h-9 rounded-lg bg-celeste-50 flex items-center justify-center text-celeste-600 shrink-0 border border-celeste-100">
                  <i class="fa-solid fa-user-tie text-sm"></i>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Dueño / Responsable
                  </p>
                  <p class="text-sm font-bold text-celeste-950">{{ getPersonaNombre(formData.id_persona) }}</p>
                  <button v-if="formData.id_persona" @click="verFichaDuenio(formData.id_persona)"
                    class="!text-xs font-bold text-celeste-600 hover:text-celeste-800 flex items-center gap-1 transition-colors uppercase tracking-wider mt-1">
                    Ver ficha del dueño →
                  </button>
                </div>
              </div>
            </div>

            <!-- Create/Edit Mode: Modern Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Section Header -->
              <div
                class="flex items-center gap-2 text-celeste-600 dark:text-celeste-400 font-bold text-[11px] uppercase tracking-wider mb-3">
                <i class="fa-solid fa-paw text-sm text-celeste-500 dark:text-celeste-400"></i>
                <span>Datos de la Mascota</span>
              </div>

              <!-- Row 1: Nombre, Dueño -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Nombre</label>
                  <input v-model="formData.nombre" type="text" required
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
                    placeholder="Ej. Bobby" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-celeste-700 uppercase tracking-wider ml-1">Dueño /
                    Responsable</label>
                  <select v-model="formData.id_persona" required :disabled="lockPersona"
                    class="w-full px-4 py-2 bg-celeste-50/50 border border-celeste-100 focus:border-celeste-500 focus:bg-white focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 font-bold transition-all !text-xs disabled:opacity-60 disabled:cursor-not-allowed">
                    <option value="" disabled>Seleccionar...</option>
                    <option v-for="p in personas" :key="p.id_persona" :value="p.id_persona">{{ p.nombre }} {{ p.apellido
                      }}</option>
                  </select>
                </div>
              </div>

              <!-- Row 2: Especie, Raza -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Especie</label>
                  <select v-model="formData.id_especie" required @change="handleEspecieChange"
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs outline-none">
                    <option value="" disabled class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Seleccionar...</option>
                    <option v-for="e in especies" :key="e.id_especie" :value="e.id_especie"
                      class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">{{ e.nombre }}</option>
                    <option value="OTRO" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">+ Otra...
                    </option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Raza</label>
                  <select v-model="formData.id_raza" required :disabled="!formData.id_especie"
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs outline-none">
                    <option value="" disabled class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Seleccionar...</option>
                    <option v-for="r in filteredRazas" :key="r.id_raza" :value="r.id_raza"
                      class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">{{ r.nombre }}</option>
                    <option v-if="formData.id_especie" value="OTRO"
                      class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">+ Otra...</option>
                  </select>
                </div>
              </div>

              <!-- New data inputs -->
              <div v-if="formData.id_especie === 'OTRO' || formData.id_raza === 'OTRO'"
                class="p-4 bg-celeste-100/30 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 rounded-2xl space-y-3">
                <div v-if="formData.id_especie === 'OTRO'">
                  <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase ml-1">Nueva
                    Especie</label>
                  <input v-model="formData.nuevaEspecieNombre" type="text" required
                    class="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs outline-none"
                    placeholder="Ej. Hurón" />
                </div>
                <div v-if="formData.id_raza === 'OTRO'">
                  <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase ml-1">Nueva
                    Raza</label>
                  <input v-model="formData.nuevaRazaNombre" type="text" required
                    class="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs outline-none"
                    placeholder="Ej. Angora" />
                </div>
              </div>

              <!-- Row 3: Peso, Sexo, Nacimiento -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Peso
                    (kg)</label>
                  <input v-model="formData.peso" type="number" step="0.1" required
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
                    placeholder="Ej. 12.5" />
                </div>
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Sexo</label>
                  <select v-model="formData.sexo" required
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs outline-none">
                    <option value="M" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Macho
                    </option>
                    <option value="H" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Hembra
                    </option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Fecha
                    Nacim.</label>
                  <input v-model="formData.fecha_nacimiento" type="date" required
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs outline-none" />
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="pt-6 flex justify-end gap-3 border-t border-celeste-100 dark:border-slate-700">
                <button type="button" @click="close"
                  class="px-6 bg-white dark:bg-slate-700 text-celeste-700 dark:text-slate-200 font-bold py-2 rounded-2xl border border-celeste-200 dark:border-slate-600 hover:bg-celeste-50 dark:hover:bg-slate-600 transition-all transform active:scale-95 !text-xs cursor-pointer">
                  Cancelar
                </button>
                <button type="submit"
                  class="px-8 bg-celeste-600 dark:bg-celeste-500 text-white font-bold py-2 rounded-2xl shadow-lg shadow-celeste-500/25 hover:bg-celeste-700 dark:hover:bg-celeste-600 transition-all transform active:scale-95 !text-xs flex items-center gap-2 cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>{{ mode === 'create' ? 'Registrar' : 'Actualizar' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- RIGHT COLUMN: Clinical History (Only for View Mode) -->
        <div v-if="mode === 'view'"
          class="lg:w-[50%] p-6 bg-celeste-50/30 border-l border-celeste-50 overflow-y-auto flex flex-col relative min-h-0">
          <div class="relative z-10 flex items-center justify-between mb-6">
            <div>
              <h3 class="!text-sm font-extrabold text-celeste-900 uppercase tracking-widest mb-1">Historial clínico</h3>
              <div class="h-1 w-6 bg-celeste-400 rounded-full"></div>
            </div>
            <div class="bg-white px-3 py-1 rounded-lg border border-celeste-200 shadow-sm">
              <span class="text-celeste-700 font-bold text-sm">{{ mascota?.listaAtenciones?.length || 0 }}</span>
            </div>
          </div>

          <div v-if="mascota?.listaAtenciones?.length > 0"
            class="relative z-10 space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <div v-for="atencion in mascota.listaAtenciones" :key="atencion.id_atencion"
              class="p-3 rounded-xl bg-white border border-celeste-100 hover:border-celeste-300 hover:shadow-md transition-all group">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span class="text-[9px] font-bold text-celeste-500 uppercase tracking-widest">{{
                    formatDate(atencion.fecha) }}</span>
                </div>
                <span class="text-[10px] font-bold text-celeste-700 bg-celeste-50 px-2 py-0.5 rounded-md uppercase">{{
                  atencion.turno?.tipoAtencion?.nombre || 'Consulta' }}</span>
              </div>

              <div class="space-y-1">
                <div v-if="atencion.diagnostico">
                  <p class="text-[9px] font-bold text-celeste-400 uppercase tracking-widest">Diagnóstico</p>
                  <p class="text-xs font-bold text-celeste-950 leading-relaxed line-clamp-2">{{ atencion.diagnostico }}
                  </p>
                </div>
                <div v-if="atencion.tratamiento">
                  <p class="text-[9px] font-bold text-celeste-400 uppercase tracking-widest mt-1">Tratamiento</p>
                  <p class="text-xs font-medium text-celeste-700 leading-relaxed line-clamp-1">{{ atencion.tratamiento
                    }}</p>
                </div>
                <p v-if="!atencion.diagnostico && !atencion.tratamiento"
                  class="text-xs font-medium text-celeste-500 italic mt-2">Atención en proceso...</p>

                <div class="pt-3 flex justify-end">
                  <button @click="verAtencionCompleta(atencion.id_atencion)"
                    class="!text-xs font-bold text-celeste-600 hover:text-celeste-800 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Ver atención completa →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else
            class="flex-1 flex flex-col items-center justify-center py-10 bg-white rounded-2xl border border-dashed border-celeste-200 shadow-sm">
            <div class="w-12 h-12 bg-celeste-50 rounded-full flex items-center justify-center mb-2">
              <i class="fa-solid fa-notes-medical text-xl text-celeste-300"></i>
            </div>
            <p class="text-celeste-500 font-bold text-[10px] uppercase tracking-widest">Sin historial</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  isOpen: Boolean,
  mode: { type: String, default: 'create' },
  mascota: { type: Object, default: () => ({}) },
  personas: Array, especies: Array, razas: Array,
  lockPersona: { type: Boolean, default: false },
  subtitleOverride: { type: String, default: '' }
});

const emit = defineEmits(['close', 'submit']);
const router = useRouter();

const formData = ref({
  nombre: '', id_especie: '', id_raza: '', nuevaEspecieNombre: '', nuevaRazaNombre: '',
  color: '', sexo: 'M', id_persona: '', fecha_nacimiento: '', peso: ''
});

const filteredRazas = computed(() => {
  if (!formData.value.id_especie) return [];
  return props.razas.filter(r => r.especie?.id_especie == formData.value.id_especie);
});

const title = computed(() => {
  if (props.mode === 'create') return 'Registrar Mascota';
  if (props.mode === 'edit') return 'Editar Mascota';
  return props.mascota?.nombre;
});

const subtitle = computed(() => {
  if (props.subtitleOverride) return props.subtitleOverride;
  if (props.mode === 'create') return 'GESTIONAR PACIENTE';
  if (props.mode === 'edit') return 'GESTIONAR PACIENTE';
  return 'EXPEDIENTE PACIENTE';
});

const getEspecieIcon = (id) => {
  const e = props.especies.find(e => e.id_especie == id)?.nombre?.toLowerCase() || '';
  if (e.includes('perro')) return 'fa-solid fa-dog';
  if (e.includes('gato')) return 'fa-solid fa-cat';
  return 'fa-solid fa-paw';
};

const getEspecieNombre = (id) => props.especies.find(e => e.id_especie == id)?.nombre || 'S/E';
const getRazaNombre = (id) => props.razas.find(r => r.id_raza == id)?.nombre || 'S/R';
const getPersonaNombre = (id) => {
  const p = props.personas.find(p => p.id_persona == id);
  return p ? `${p.nombre} ${p.apellido}` : 'S/D';
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('es-AR') : 'S/F';

const handleEspecieChange = () => {
  formData.value.id_raza = '';
  formData.value.nuevaRazaNombre = '';
  if (formData.value.id_especie !== 'OTRO') {
    formData.value.nuevaEspecieNombre = '';
  }
};

watch(() => props.mascota, (n) => {
  if (n && Object.keys(n).length > 0) {
    formData.value = {
      nombre: n.nombre || '',
      id_especie: n.raza?.especie?.id_especie || n.id_especie || '',
      id_raza: n.raza?.id_raza || n.id_raza || '',
      id_persona: n.persona?.id_persona || n.id_persona || '',
      color: n.color || '',
      sexo: n.sexo || 'M',
      fecha_nacimiento: n.fecha_nacimiento || '',
      peso: n.peso || '',
      nuevaEspecieNombre: '',
      nuevaRazaNombre: ''
    };
  } else { formData.value = { nombre: '', id_especie: '', id_raza: '', nuevaEspecieNombre: '', nuevaRazaNombre: '', color: '', sexo: 'M', id_persona: '', fecha_nacimiento: '', peso: '' }; }
}, { immediate: true });

const close = () => { emit('close'); };

const verFichaDuenio = (id) => {
  emit('close');
  router.push({
    path: '/personas',
    query: { viewId: id }
  });
};

const verAtencionCompleta = (id) => {
  router.push({
    name: 'AtencionRegistro',
    params: { id },
    query: { mode: 'view' }
  });
};

const handleSubmit = () => {
  const isNewEspecie = formData.value.id_especie === 'OTRO';
  const isNewRaza = formData.value.id_raza === 'OTRO';
  emit('submit', {
    ...formData.value,
    persona: { id_persona: formData.value.id_persona },
    raza: { id_raza: formData.value.id_raza },
    isNewEspecie,
    isNewRaza
  });
};
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
</style>
