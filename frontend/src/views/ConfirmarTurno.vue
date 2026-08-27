<template>
  <div
    class="min-h-screen w-full bg-white dark:bg-slate-900 relative overflow-hidden font-sans pb-20 pt-24 transition-colors duration-300">
    <div
      class="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-celeste-50/50 dark:from-celeste-950/20 to-transparent -z-10">
    </div>
    <div class="container mx-auto px-6 relative z-10 w-full max-w-full">

      <!-- Header Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] mb-8 relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-celeste-50 dark:bg-celeste-950/30 rounded-full blur-3xl">
        </div>
        <div class="relative z-10 ml-2">
          <router-link to="/dashboard"
            class="inline-flex items-center text-celeste-500 dark:text-celeste-400 hover:text-celeste-700 dark:hover:text-celeste-300 mb-4 transition-colors group !no-underline font-bold text-xs uppercase tracking-widest">
            <i class="fa-solid fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
            Volver al Panel
          </router-link>

          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-2">
            <div>
              <h1 class="!text-2xl md:text-1xl font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight mb-2">
                Confirmar Asistencia
              </h1>
              <p class="text-celeste-700 dark:text-slate-300 text-lg font-medium">Gestiona la llegada de pacientes para
                el día
                seleccionado.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-4 mb-8 border border-celeste-100 dark:border-slate-700/80 shadow-[0_5px_20px_rgba(0,0,0,0.02)] flex justify-center">
        <div
          class="flex items-center gap-4 bg-celeste-50/50 dark:bg-slate-900/80 p-2 rounded-2xl border border-celeste-100 dark:border-slate-700 inline-flex">
          <button @click="changeDay(-1)"
            class="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 hover:bg-celeste-100 dark:hover:bg-slate-700 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer">
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          <div class="relative cursor-pointer px-6 flex flex-col items-center min-w-[220px]" @click="openDatePicker">
            <span
              class="text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-1">Fecha
              seleccionada</span>
            <span
              class="text-celeste-950 dark:text-slate-100 font-extrabold text-lg capitalize hover:text-celeste-600 dark:hover:text-celeste-400 transition-colors">{{
                selectedDateFormatted }}</span>
            <input type="date" v-model="selectedDate" ref="dateInputRef"
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </div>

          <button @click="changeDay(1)"
            class="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 hover:bg-celeste-100 dark:hover:bg-slate-700 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Turnos Table Section -->
      <div class="space-y-4">
        <div v-if="loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-celeste-500 border-t-transparent"></div>
        </div>

        <div v-else-if="filteredTurnos.length === 0"
          class="bg-white dark:bg-slate-800 rounded-[2rem] p-20 text-center border border-celeste-100 dark:border-slate-700/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] mt-8">
          <div
            class="w-20 h-20 bg-celeste-50 dark:bg-slate-900/80 rounded-full flex items-center justify-center mx-auto mb-6 border border-celeste-100 dark:border-slate-700">
            <i class="fa-solid fa-calendar-check text-celeste-300 dark:text-slate-500 text-3xl"></i>
          </div>
          <h3 class="!text-lg font-extrabold text-celeste-950 dark:text-slate-100">No hay turnos para esta fecha</h3>
          <p class="text-celeste-600 dark:text-slate-400 font-medium text-sm mt-2">No se encontraron turnos programados.
          </p>
        </div>

        <div v-else
          class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr
                  class="bg-celeste-50 dark:bg-slate-900/90 text-celeste-700 dark:text-slate-300 border-b border-celeste-100 dark:border-slate-700">
                  <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Hora</th>
                  <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Paciente</th>
                  <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Práctica</th>
                  <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Propietario</th>
                  <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider text-center">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-celeste-50 dark:divide-slate-700/50">
                <tr v-for="turno in filteredTurnos" :key="turno.id_turno"
                  class="hover:bg-celeste-50/50 dark:hover:bg-slate-700/40 transition-colors duration-200 group">

                  <!-- Hora -->
                  <td class="px-6 py-2">
                    <span
                      class="text-xs font-bold bg-celeste-100 dark:bg-slate-700 text-celeste-700 dark:text-celeste-300 px-2 py-1 rounded-lg border border-celeste-200 dark:border-slate-600 whitespace-nowrap">
                      {{ formatTime(turno.fecha_hora_inicio) }} HS
                    </span>
                  </td>

                  <!-- Paciente -->
                  <td class="px-6 py-2">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-xl bg-celeste-50 dark:bg-slate-700/60 border border-celeste-100 dark:border-slate-600 flex items-center justify-center text-celeste-600 dark:text-celeste-400">
                        <i class="fa-solid fa-paw text-sm"></i>
                      </div>
                      <span
                        class="text-celeste-950 dark:text-slate-100 text-xs font-extrabold group-hover:text-celeste-600 dark:group-hover:text-celeste-400 transition-colors whitespace-nowrap">
                        {{ turno.mascotas?.[0]?.nombre }}
                      </span>
                    </div>
                  </td>

                  <!-- Práctica -->
                  <td class="px-6 py-2">
                    <span
                      class="px-3 py-1 bg-celeste-50 rounded-lg border border-celeste-100 text-[10px] font-bold text-celeste-600 uppercase tracking-widest whitespace-nowrap">
                      {{ turno.tipoAtencion?.nombre }}
                    </span>
                  </td>

                  <!-- Propietario -->
                  <td class="px-6 py-2">
                    <div class="flex items-center gap-2">
                      <i class="fa-solid fa-user text-celeste-400 text-xs"></i>
                      <span class="text-xs text-celeste-800 font-medium whitespace-nowrap">
                        {{ turno.persona?.nombre }} {{ turno.persona?.apellido }}
                      </span>
                    </div>
                  </td>

                  <td class="px-6 py-2">
                  <div class="flex items-center gap-4">
                    <!-- Caso: No ha llegado (PENDIENTE) -->
                    <div v-if="turno.estado === 'PENDIENTE'" class="flex items-center gap-3">
                      <span v-if="needsDatosCompletos(turno)"
                        class="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        Datos incompletos
                      </span>
                      <button @click="confirmarPresencia(turno)"
                        class="px-5 py-2.5 bg-celeste-600 text-white font-bold rounded-xl shadow-md hover:bg-celeste-700 transition-all transform active:scale-95 flex items-center gap-2 text-sm">
                        <i class="fa-solid fa-hand-pointer"></i>
                        Dar Presente
                      </button>
                    </div>

                    <!-- Caso: Presente pero falta historia clínica -->
                    <template v-else-if="needsHistory(turno)">
                      <span
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl font-bold text-[10px] uppercase tracking-wider whitespace-nowrap">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        Pendiente
                      </span>
                      <button @click="irARegistro(turno)"
                        class="px-4 py-2 bg-white text-celeste-600 hover:bg-celeste-50 border border-celeste-200 hover:border-celeste-300 font-bold rounded-2xl transition-all shadow-sm flex items-center gap-2 !text-xs whitespace-nowrap">
                        <i class="fa-solid fa-pen-nib"></i>
                        Completar Historia
                      </button>
                    </template>

                    <!-- Caso: Ya atendido completamente -->
                    <template v-else>
                      <span
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-bold text-[10px] uppercase tracking-wider whitespace-nowrap">
                        <i class="fa-solid fa-check-circle"></i>
                        Atendido
                      </span>
                      <button @click="verAtencion(turno)"
                        class="px-4 py-2 bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 font-bold rounded-2xl transition-all shadow-sm flex items-center gap-2 !text-xs whitespace-nowrap">
                        <i class="fa-solid fa-eye"></i>
                        Ver Atención
                      </button>
                    </template>
                  </div>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> <!-- Modal Ver Atención -->
    <div v-if="atencionModal.isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-celeste-950/40 backdrop-blur-sm" @click="closeAtencionModal"></div>
      <div
        class="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom duration-300 border border-celeste-100 flex flex-col max-h-[90vh]">

        <!-- Header -->
        <div class="p-3 bg-gradient-to-r from-celeste-700 to-celeste-600 text-white rounded-t-[2rem]">
          <div class="relative z-10 flex justify-between items-center w-full">
            <div class="flex items-center gap-4">
              <!-- Icon on the left -->
              <div
                class="w-10 h-9 bg-white/10 rounded-2xl flex items-center justify-center text-white text-md border border-white/10 shadow-inner">
                <i class="fa-solid fa-stethoscope"></i>
              </div>
              <div>
                <h2 class="!text-2xl font-bold tracking-tight leading-tight text-white">Detalle de Atención</h2>
                <p class="text-[10px] font-bold uppercase tracking-widest mt-1 text-celeste-100">
                  {{ atencionModal.mascotaNombre }} — {{ atencionModal.fecha }}
                </p>
              </div>
            </div>
            <button @click="closeAtencionModal"
              class="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        </div>

        <div class="p-6 bg-celeste-50/10 space-y-6 flex-1 overflow-y-auto custom-scrollbar">

          <!-- Metadatos de la Atención -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-2xl border border-celeste-100 flex flex-col shadow-sm">
              <span class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Práctica</span>
              <span class="text-xs font-extrabold text-celeste-950">{{ atencionModal.practicaNombre }}</span>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-celeste-100 flex flex-col shadow-sm">
              <span class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Duración</span>
              <span class="text-xs font-extrabold text-celeste-950">{{ atencionModal.practicaDuracion }} min</span>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-celeste-100 flex flex-col shadow-sm">
              <span class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Precio x{{
                atencionModal.practicaCantidad }}</span>
              <span class="text-xs font-extrabold text-celeste-950">${{ atencionModal.practicaPrecio }}</span>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-celeste-100 flex flex-col shadow-sm">
              <span class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-1">Registrado por</span>
              <span class="text-xs font-extrabold text-celeste-950 truncate">{{ atencionModal.usuarioNombre }}</span>
            </div>
          </div>

          <!-- Textos Médicos -->
          <div class="bg-white p-6 rounded-2xl border border-celeste-100 shadow-sm">
            <h3 class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <i class="fa-solid fa-stethoscope text-celeste-500 text-sm"></i> Diagnóstico
            </h3>
            <p class="text-celeste-950 font-medium whitespace-pre-line leading-relaxed text-xs">{{
              atencionModal.diagnostico || 'Sin diagnóstico registrado.' }}</p>
          </div>

          <div class="bg-white p-6 rounded-2xl border border-celeste-100 shadow-sm">
            <h3 class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <i class="fa-solid fa-prescription-bottle-medical text-celeste-500 text-sm"></i> Tratamiento
            </h3>
            <p class="text-celeste-950 font-medium whitespace-pre-line leading-relaxed text-xs">{{
              atencionModal.tratamiento || 'Sin tratamiento registrado.' }}</p>
          </div>

          <div v-if="atencionModal.observaciones" class="bg-white p-6 rounded-2xl border border-celeste-100 shadow-sm">
            <h3 class="text-[10px] font-bold text-celeste-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <i class="fa-solid fa-comment-medical text-celeste-500 text-sm"></i> Observaciones
            </h3>
            <p class="text-celeste-950 font-medium whitespace-pre-line leading-relaxed text-xs">{{
              atencionModal.observaciones }}</p>
          </div>
        </div>

        <div class="p-4 border-t border-celeste-100 bg-white shrink-0 flex justify-end">
          <button @click="closeAtencionModal"
            class="px-8 bg-celeste-600 text-white font-bold py-2 rounded-2xl shadow-lg shadow-celeste-500/25 hover:bg-celeste-700 transition-all transform active:scale-95 !text-xs">
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Success Overlay Presente -->
    <Transition name="fade">
      <div v-if="showPresenteSuccess" class="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-celeste-950/40 backdrop-blur-sm"></div>
        <div
          class="relative bg-white rounded-[2rem] p-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.15)] max-w-sm w-full animate-in zoom-in duration-500 border border-celeste-100">
          <div
            class="w-24 h-24 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <i class="fa-solid fa-check text-4xl"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-celeste-950 mb-3">¡Atención Registrada!</h2>
          <p class="text-celeste-700 font-medium mb-10 leading-relaxed text-sm">El paciente ha sido marcado como
            presente.
            ¿Deseas completar la historia clínica ahora?</p>
          <div class="space-y-4">
            <button @click="goToRegistro"
              class="w-full bg-celeste-600 hover:bg-celeste-700 text-white font-bold py-3 rounded-2xl transition-all transform active:scale-95 shadow-md !text-xs">
              Completar Historia
            </button>
            <button @click="showPresenteSuccess = false; fetchTurnos()"
              class="w-full bg-white hover:bg-celeste-50 text-celeste-600 font-bold py-3 rounded-2xl border border-celeste-100 hover:border-celeste-200 transition-all !text-xs">
              Hacerlo después
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Paso 1/2: Completar datos del dueño -->
    <PersonaModal :isOpen="personaModal.isOpen" mode="edit" :persona="personaModal.persona"
      subtitleOverride="PASO 1/2 · DATOS DEL DUEÑO" @close="cancelarCompletarDatos"
      @submit="handlePersonaDatosSubmit" />

    <!-- Paso 2/2: Completar datos de la mascota -->
    <MascotaModal :isOpen="mascotaModal.isOpen" mode="edit" :mascota="mascotaModal.mascota" :personas="personas"
      :especies="especies" :razas="razas" :lockPersona="true" subtitleOverride="PASO 2/2 · DATOS DE LA MASCOTA"
      @close="cancelarCompletarDatos" @submit="handleMascotaDatosSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { personaService } from '../services/personaService';
import { mascotaService } from '../services/mascotaService';
import { especieService } from '../services/especieService';
import { razaService } from '../services/razaService';
import PersonaModal from '../components/PersonaModal.vue';
import MascotaModal from '../components/MascotaModal.vue';
import { useRouter } from 'vue-router';
import { turnoService } from '../services/turnoService';

const router = useRouter();
const turnos = ref([]);
const loading = ref(true);
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const dateInputRef = ref(null);
const showPresenteSuccess = ref(false);
const pendingIdAtencion = ref(null);

const personas = ref([]);
const especies = ref([]);
const razas = ref([]);
const pendingTurno = ref(null);
const personaModal = ref({ isOpen: false, persona: {} });
const mascotaModal = ref({ isOpen: false, mascota: {} });

const fetchDatosAuxiliares = async () => {
  try {
    const [personasRes, especiesRes, razasRes] = await Promise.all([
      personaService.getAll(),
      especieService.getAll(),
      razaService.getAll()
    ]);
    personas.value = personasRes.data;
    especies.value = especiesRes.data;
    razas.value = razasRes.data;
  } catch (error) {
    console.error('Error fetching datos auxiliares:', error);
  }
};

const changeDay = (dir) => {
  const d = new Date(selectedDate.value + 'T00:00:00');
  d.setDate(d.getDate() + dir);
  selectedDate.value = d.toISOString().split('T')[0];
};

const openDatePicker = () => {
  if (dateInputRef.value) {
    try {
      dateInputRef.value.showPicker();
    } catch (e) {
      dateInputRef.value.focus();
    }
  }
};

const selectedDateFormatted = computed(() => {
  if (!selectedDate.value) return '';
  const date = new Date(selectedDate.value + 'T00:00:00');
  return date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
});

const filteredTurnos = computed(() => {
  if (!selectedDate.value) return [];
  return turnos.value.filter(t => t.fecha_hora_inicio.startsWith(selectedDate.value));
});

const fetchTurnos = async () => {
  if (!selectedDate.value) return;
  loading.value = true;
  try {
    const date = selectedDate.value;
    const response = await turnoService.getAll(`${date}T00:00:00`, `${date}T23:59:59`);
    turnos.value = response.data;
  } catch (error) {
    console.error('Error fetching turnos:', error);
  } finally {
    loading.value = false;
  }
};

watch(selectedDate, () => {
  fetchTurnos();
});

const formatTime = (isoStr) => {
  return isoStr.split('T')[1].substring(0, 5);
};

const needsHistory = (turno) => {
  if (turno.estado !== 'PRESENTE') return false;
  if (!turno.atenciones || turno.atenciones.length === 0) return true;
  // Pendiente si ninguna atención tiene diagnóstico o tratamiento
  return !turno.atenciones.some(a => a.diagnostico || a.tratamiento);
};

const irARegistro = (turno) => {
  const idAtencion = turno.atenciones?.[0]?.id_atencion;
  if (idAtencion) {
    router.push({ name: 'AtencionRegistro', params: { id: idAtencion } });
  }
};

const needsDatosCompletos = (turno) => {
  return !turno.persona?.dni || !turno.mascotas?.[0]?.peso;
};

const ejecutarConfirmacion = async (idTurno) => {
  try {
    const response = await turnoService.confirmar(idTurno);
    pendingIdAtencion.value = response.data;
    showPresenteSuccess.value = true;
  } catch (error) {
    console.error('Error al confirmar presencia:', error);
    alert('No se pudo confirmar la presencia.');
  }
};

const confirmarPresencia = async (turno) => {
  if (needsDatosCompletos(turno)) {
    pendingTurno.value = turno;
    personaModal.value = { isOpen: true, persona: turno.persona };
    return;
  }
  await ejecutarConfirmacion(turno.id_turno);
};

const cancelarCompletarDatos = () => {
  personaModal.value.isOpen = false;
  mascotaModal.value.isOpen = false;
  pendingTurno.value = null;
};

const handlePersonaDatosSubmit = async (data) => {
  const turno = pendingTurno.value;
  if (!turno) return;
  try {
    await personaService.update(turno.persona.id_persona, data);
    personaModal.value.isOpen = false;
    mascotaModal.value = { isOpen: true, mascota: turno.mascotas[0] };
  } catch (error) {
    console.error('Error al actualizar datos del dueño:', error);
    alert('No se pudieron guardar los datos del dueño.');
  }
};

const handleMascotaDatosSubmit = async (data) => {
  const turno = pendingTurno.value;
  if (!turno) return;
  try {
    let idEspecie = data.id_especie;
    let idRaza = data.id_raza;

    if (data.isNewEspecie) {
      const espRes = await especieService.save({ nombre: data.nuevaEspecieNombre });
      idEspecie = espRes.data.id_especie;
    }
    if (data.isNewRaza) {
      const razRes = await razaService.save({
        nombre: data.nuevaRazaNombre,
        especie: { id_especie: idEspecie }
      });
      idRaza = razRes.data.id_raza;
    }

    const mascotaId = turno.mascotas[0].id_mascota;
    await mascotaService.update(mascotaId, {
      nombre: data.nombre,
      fecha_nacimiento: data.fecha_nacimiento,
      color: data.color,
      sexo: data.sexo,
      peso: data.peso,
      persona: { id_persona: turno.persona.id_persona },
      raza: { id_raza: idRaza }
    });

    mascotaModal.value.isOpen = false;
    pendingTurno.value = null;
    await ejecutarConfirmacion(turno.id_turno);
  } catch (error) {
    console.error('Error al actualizar datos de la mascota:', error);
    alert('No se pudieron guardar los datos de la mascota.');
  }
};

const goToRegistro = () => {
  if (pendingIdAtencion.value) {
    router.push({ name: 'AtencionRegistro', params: { id: pendingIdAtencion.value } });
  }
};

const atencionModal = ref({
  isOpen: false,
  mascotaNombre: '',
  fecha: '',
  diagnostico: '',
  tratamiento: '',
  observaciones: '',
  practicaNombre: '',
  practicaPrecio: 0,
  practicaCantidad: 0,
  practicaDuracion: 0,
  usuarioNombre: ''
});

const verAtencion = (turno) => {
  const atencion = turno.atenciones?.[0];
  const mascota = turno.mascotas?.[0];
  const tipoAtencion = turno.tipoAtencion;

  atencionModal.value = {
    isOpen: true,
    mascotaNombre: mascota ? mascota.nombre : 'Paciente',
    fecha: selectedDateFormatted.value,
    diagnostico: atencion?.diagnostico || '',
    tratamiento: atencion?.tratamiento || '',
    observaciones: atencion?.observaciones || '',
    practicaNombre: tipoAtencion?.nombre || '',
    practicaPrecio: tipoAtencion?.precio || 0,
    practicaCantidad: tipoAtencion?.cantidad || 1,
    practicaDuracion: tipoAtencion?.duracion_minutos || 0,
    usuarioNombre: atencion?.usuario?.nombre || 'Sistema'
  };
};

const closeAtencionModal = () => {
  atencionModal.value.isOpen = false;
};

onMounted(() => {
  fetchTurnos();
  fetchDatosAuxiliares();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
