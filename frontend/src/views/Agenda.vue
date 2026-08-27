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
              <h1 class="!text-2xl md:text-1xl font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight mb-2">Agenda Médica</h1>
              <p class="text-celeste-700 dark:text-slate-300 text-lg font-medium max-w-xl">Gestión semanal de turnos y consultas.</p>
            </div>
            
            <!-- Week Selector styled to match page filters -->
            <div class="flex items-center gap-2 bg-celeste-50 dark:bg-slate-900/80 rounded-2xl border border-celeste-100 dark:border-slate-700 p-1">
              <button @click="changeWeek(-1)"
                class="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-700 hover:bg-celeste-100 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer">
                <i class="fa-solid fa-chevron-left text-xs"></i>
              </button>
              <div class="px-4 text-center min-w-[160px]">
                <span class="text-celeste-950 dark:text-slate-100 font-extrabold text-xs block leading-tight">{{ weekRangeText }}</span>
                <span class="text-celeste-500 dark:text-celeste-400 text-[8px] font-bold uppercase tracking-widest block mt-0.5">Semana Seleccionada</span>
              </div>
              <button @click="changeWeek(1)"
                class="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-700 hover:bg-celeste-100 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer">
                <i class="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar Legend -->
      <div class="flex flex-wrap items-center gap-6 mb-8 px-2">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-celeste-500 shadow-sm"></div>
          <span class="text-[10px] font-bold text-celeste-600 dark:text-celeste-400 uppercase tracking-wider">Mañana (08-13)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm"></div>
          <span class="text-[10px] font-bold text-celeste-600 dark:text-celeste-400 uppercase tracking-wider">Tarde (17-20)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm"></div>
          <span class="text-[10px] font-bold text-celeste-600 dark:text-celeste-400 uppercase tracking-wider">Ocupado</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></div>
          <span class="text-[10px] font-bold text-celeste-600 dark:text-celeste-400 uppercase tracking-wider">Presente / Atendido</span>
        </div>
      </div>

      <!-- Weekly Calendar Grid -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden relative">
        <div class="overflow-x-auto">
          <div class="min-w-[1200px]">
            <!-- Header: Days -->
            <div class="grid grid-cols-[100px_repeat(7,1fr)] bg-slate-50/50 dark:bg-slate-900/90 border-b border-celeste-100 dark:border-slate-700">
              <div class="p-3 border-r border-celeste-100 dark:border-slate-700 bg-celeste-50/30 dark:bg-slate-900/40 flex items-center justify-center">
                <i class="fa-solid fa-clock text-celeste-400 dark:text-slate-400 text-sm"></i>
              </div>
              <div v-for="(day, idx) in weekDays" :key="idx"
                :class="['p-3 text-center border-r border-celeste-100 dark:border-slate-700 last:border-r-0', isToday(day.date) ? 'bg-celeste-50/30 dark:bg-slate-800/80' : '']">
                <span class="block text-[9px] font-extrabold text-celeste-600/70 dark:text-celeste-400/80 uppercase tracking-widest mb-0.5">{{ day.name }}</span>
                <span :class="['text-lg font-black', isToday(day.date) ? 'text-celeste-600 dark:text-celeste-400' : 'text-celeste-950 dark:text-slate-100']">{{ day.dayNum }}</span>
              </div>
            </div>

            <!-- Body: Time Slots -->
            <div class="relative custom-scrollbar max-h-[600px] overflow-y-auto">
              <!-- Morning Block -->
              <div v-for="slot in morningSlots" :key="'m-' + slot"
                class="grid grid-cols-[100px_repeat(7,1fr)] border-b border-celeste-50/50 dark:border-slate-700/40 hover:bg-celeste-50/10 dark:hover:bg-slate-700/20 transition-colors">
                <div class="p-2 border-r border-celeste-50 dark:border-slate-700/50 bg-celeste-50/10 dark:bg-slate-900/30 text-center flex flex-col justify-center">
                  <span class="text-xs font-bold text-celeste-800 dark:text-slate-300">{{ slot }}</span>
                </div>
                <div v-for="day in weekDays" :key="day.name + slot"
                  :class="[
                    'px-1.5 border-r border-celeste-50 dark:border-slate-700/50 last:border-r-0 min-h-[50px] relative group cursor-pointer flex flex-col min-w-0',
                    getTurno(day.date, slot) ? 'py-0' : 'py-1.5'
                  ]"
                  @click="openTurnoModal(day.date, slot)">
                  <!-- Slot Content -->
                  <template v-if="getTurno(day.date, slot)">
                    <!-- Start slot styling -->
                    <div v-if="isStartSlot(getTurno(day.date, slot), slot)"
                      :class="[
                        'flex-1 w-full p-1.5 animate-in fade-in zoom-in duration-300 flex flex-col justify-center min-w-0 overflow-hidden',
                        getSlotBgClass(getTurno(day.date, slot), true),
                        getSlotRoundingClass(getTurno(day.date, slot), slot),
                        getSlotBorderClass(getTurno(day.date, slot), slot, true)
                      ]">
                      <p :class="['text-[10px] font-extrabold uppercase truncate leading-tight w-full', getSlotTextClasses(getTurno(day.date, slot), true).main]">
                        {{ getTurno(day.date, slot).mascotas?.[0]?.nombre }}
                      </p>
                      <p :class="['text-[9px] font-semibold truncate mt-0.5 w-full', getSlotTextClasses(getTurno(day.date, slot), true).sub]">
                        {{ getTurno(day.date, slot).tipoAtencion?.nombre }}
                      </p>
                    </div>
                    <!-- Continuation slot styling -->
                    <div v-else
                      :class="[
                        'flex-1 w-full p-1.5 flex flex-col justify-center items-center animate-in fade-in zoom-in duration-300 min-w-0 overflow-hidden',
                        getSlotBgClass(getTurno(day.date, slot), true),
                        getSlotRoundingClass(getTurno(day.date, slot), slot),
                        getSlotBorderClass(getTurno(day.date, slot), slot, true)
                      ]">
                    </div>
                  </template>
                  <div v-else
                    class="h-full w-full rounded-xl group-hover:bg-celeste-500/5 dark:group-hover:bg-celeste-400/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <i class="fa-solid fa-plus text-celeste-300 dark:text-celeste-400 text-xs"></i>
                  </div>
                </div>
              </div>

              <!-- Mid-day Divider -->
              <div class="grid grid-cols-1 bg-celeste-50/50 dark:bg-slate-900/90 py-2.5 text-center border-y border-celeste-100 dark:border-slate-700">
                <span class="text-[9px] font-extrabold text-celeste-600 dark:text-celeste-400 uppercase tracking-[0.3em]">Receso Almuerzo</span>
              </div>

              <!-- Afternoon Block -->
              <div v-for="slot in afternoonSlots" :key="'a-' + slot"
                class="grid grid-cols-[100px_repeat(7,1fr)] border-b border-celeste-50/50 hover:bg-celeste-50/10 transition-colors">
                <div class="p-2 border-r border-celeste-50 bg-celeste-50/10 text-center flex flex-col justify-center">
                  <span class="text-xs font-bold text-celeste-800">{{ slot }}</span>
                </div>
                <div v-for="day in weekDays" :key="day.name + slot"
                  :class="[
                    'px-1.5 border-r border-celeste-50 last:border-r-0 min-h-[50px] relative group cursor-pointer flex flex-col min-w-0',
                    getTurno(day.date, slot) ? 'py-0' : 'py-1.5'
                  ]"
                  @click="openTurnoModal(day.date, slot)">
                  <!-- Slot Content -->
                  <template v-if="getTurno(day.date, slot)">
                    <!-- Start slot styling -->
                    <div v-if="isStartSlot(getTurno(day.date, slot), slot)"
                      :class="[
                        'flex-1 w-full p-1.5 animate-in fade-in zoom-in duration-300 flex flex-col justify-center min-w-0 overflow-hidden',
                        getSlotBgClass(getTurno(day.date, slot), false),
                        getSlotRoundingClass(getTurno(day.date, slot), slot),
                        getSlotBorderClass(getTurno(day.date, slot), slot, false)
                      ]">
                      <p :class="['text-[10px] font-extrabold uppercase truncate leading-tight w-full', getSlotTextClasses(getTurno(day.date, slot), false).main]">
                        {{ getTurno(day.date, slot).mascotas?.[0]?.nombre }}
                      </p>
                      <p :class="['text-[9px] font-semibold truncate mt-0.5 w-full', getSlotTextClasses(getTurno(day.date, slot), false).sub]">
                        {{ getTurno(day.date, slot).tipoAtencion?.nombre }}
                      </p>
                    </div>
                    <!-- Continuation slot styling -->
                    <div v-else
                      :class="[
                        'flex-1 w-full p-1.5 flex flex-col justify-center items-center animate-in fade-in zoom-in duration-300 min-w-0 overflow-hidden',
                        getSlotBgClass(getTurno(day.date, slot), false),
                        getSlotRoundingClass(getTurno(day.date, slot), slot),
                        getSlotBorderClass(getTurno(day.date, slot), slot, false)
                      ]">
                    </div>
                  </template>
                  <div v-else
                    class="h-full w-full rounded-xl group-hover:bg-indigo-500/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <i class="fa-solid fa-plus text-indigo-300 text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Turno Modal -->
      <TurnoModal 
        :is-open="turnoModal.isOpen" 
        :mode="turnoModal.mode" 
        :turno="turnoModal.turno" 
        :fecha="turnoModal.fecha" 
        :hora="turnoModal.hora" 
        :mascotas="allMascotas"
        @close="closeTurnoModal" 
        @submit="handleTurnoSubmit"
        @delete="handleTurnoDelete" 
      />

      <!-- Confirm Cancel Turno Modal -->
      <ConfirmModal
        :is-open="confirmCancelModal.isOpen"
        title="¿Cancelar Turno?"
        message="¿Estás seguro de que deseas cancelar este turno? Esta acción no se puede deshacer."
        :is-confirm="false"
        confirm-text="Sí, cancelar"
        @confirm="confirmCancelTurno"
        @cancel="closeConfirmCancelModal"
      />

      <!-- Floating Notification (Toast) -->
      <Transition name="toast">
        <div v-if="notification.show"
          class="fixed top-24 right-8 z-[100] bg-white border-l-4 border-indigo-500 shadow-2xl rounded-2xl py-2 px-3.5 flex items-center gap-3 min-w-[300px] border border-slate-100/50">
          <div class="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <i class="fa-solid fa-circle-check text-[10px]"></i>
          </div>
          <div class="flex flex-col justify-center min-w-0">
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Agenda</p>
            <p class="text-xs font-extrabold text-slate-700 leading-tight">{{ notification.message }}</p>
          </div>
          <button @click="notification.show = false"
            class="ml-auto text-slate-300 hover:text-slate-500 transition-colors shrink-0">
            <i class="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { mascotaService } from '../services/mascotaService';
import { turnoService } from '../services/turnoService';
import TurnoModal from '../components/TurnoModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

// State
const currentDate = ref(new Date());
const turnos = ref([]);
const allMascotas = ref([]);

// Modal State
const turnoModal = ref({
  isOpen: false,
  mode: 'create',
  turno: {},
  fecha: '',
  hora: ''
});

const confirmCancelModal = ref({
  isOpen: false,
  idTurno: null
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

// Generate 15-min slots
const generateSlots = (start, end) => {
  const slots = [];
  let curr = start * 60;
  const finish = end * 60;
  while (curr < finish) {
    const h = Math.floor(curr / 60);
    const m = curr % 60;
    slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    curr += 15;
  }
  return slots;
};

const morningSlots = generateSlots(8, 13);
const afternoonSlots = generateSlots(17, 20);

// Week Logic
const weekDays = computed(() => {
  const days = [];
  const startOfWeek = new Date(currentDate.value);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  startOfWeek.setDate(diff);

  const names = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    
    // Format as YYYY-MM-DD in local time
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const dayNum = d.getDate().toString().padStart(2, '0');
    
    days.push({
      name: names[i],
      dayNum: d.getDate(),
      date: `${year}-${month}-${dayNum}`
    });
  }
  return days;
});

const weekRangeText = computed(() => {
  const start = weekDays.value[0].dayNum;
  const end = weekDays.value[6].dayNum;
  const month = currentDate.value.toLocaleString('es-AR', { month: 'long' });
  return `${start} - ${end} de ${month}`;
});

const changeWeek = (dir) => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + (dir * 7));
  currentDate.value = newDate;
};

const isToday = (dateStr) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const dayNum = today.getDate().toString().padStart(2, '0');
  return dateStr === `${year}-${month}-${dayNum}`;
};

// Turnos Logic
const fetchTurnos = async () => {
  try {
    // Fetch all turnos to avoid range issues for now
    const response = await turnoService.getAll();
    turnos.value = response.data;
  } catch (error) {
    console.error('Error fetching turnos:', error);
  }
};

const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

const getTurno = (date, slot) => {
  const slotMinutes = timeToMinutes(slot);
  return turnos.value.find(t => {
    if (!t.fecha_hora_inicio) return false;
    // Handle both 'T' and ' ' separators
    const parts = t.fecha_hora_inicio.replace(' ', 'T').split('T');
    const tDate = parts[0];
    if (tDate !== date) return false;

    const tTime = parts[1].substring(0, 5);
    const tStartMinutes = timeToMinutes(tTime);
    const tDuration = t.tipoAtencion?.duracion_minutos || 15;
    const tEndMinutes = tStartMinutes + tDuration;

    return slotMinutes >= tStartMinutes && slotMinutes < tEndMinutes;
  });
};

const isStartSlot = (turno, slot) => {
  if (!turno || !turno.fecha_hora_inicio) return false;
  const parts = turno.fecha_hora_inicio.replace(' ', 'T').split('T');
  const tTime = parts[1].substring(0, 5);
  return tTime === slot;
};

const isEndSlot = (turno, slot) => {
  if (!turno || !turno.fecha_hora_inicio) return false;
  const parts = turno.fecha_hora_inicio.replace(' ', 'T').split('T');
  const tTime = parts[1].substring(0, 5);
  const tStartMinutes = timeToMinutes(tTime);
  const tDuration = turno.tipoAtencion?.duracion_minutos || 15;
  const tEndMinutes = tStartMinutes + tDuration;
  const slotMinutes = timeToMinutes(slot);
  return (slotMinutes + 15) >= tEndMinutes;
};

const getSlotRoundingClass = (turno, slot) => {
  if (!turno) return '';
  const start = isStartSlot(turno, slot);
  const end = isEndSlot(turno, slot);
  if (start && end) return 'rounded-xl';
  if (start) return 'rounded-t-xl rounded-b-none';
  if (end) return 'rounded-b-xl rounded-t-none';
  return 'rounded-none';
};

const getSlotBorderClass = (turno, slot, isMorning) => {
  if (!turno) return '';
  const start = isStartSlot(turno, slot);
  const end = isEndSlot(turno, slot);
  let colorClass = '';
  if (turno.estado && turno.estado !== 'PENDIENTE') {
    colorClass = 'border-emerald-200';
  } else {
    colorClass = isMorning ? 'border-amber-200' : 'border-indigo-100';
  }
  if (start && end) return `border ${colorClass}`;
  if (start) return `border-t border-x ${colorClass}`;
  if (end) return `border-b border-x ${colorClass}`;
  return `border-x ${colorClass}`;
};

const getSlotBgClass = (turno, isMorning) => {
  if (!turno) return '';
  if (turno.estado && turno.estado !== 'PENDIENTE') {
    return 'bg-emerald-50';
  }
  return isMorning ? 'bg-amber-50' : 'bg-indigo-50';
};

const getSlotTextClasses = (turno, isMorning) => {
  if (!turno) return { main: '', sub: '' };
  if (turno.estado && turno.estado !== 'PENDIENTE') {
    return {
      main: 'text-emerald-700',
      sub: 'text-emerald-500/80'
    };
  }
  return isMorning 
    ? { main: 'text-amber-700', sub: 'text-amber-500/80' }
    : { main: 'text-indigo-700', sub: 'text-indigo-500/80' };
};

const openTurnoModal = (date, slot) => {
  const existingTurno = getTurno(date, slot);
  if (existingTurno) {
    turnoModal.value = {
      isOpen: true,
      mode: 'view',
      turno: existingTurno,
      fecha: date,
      hora: slot
    };
  } else {
    turnoModal.value = {
      isOpen: true,
      mode: 'create',
      turno: {},
      fecha: date,
      hora: slot
    };
  }
};

const handleTurnoDelete = (idTurno) => {
  confirmCancelModal.value = {
    isOpen: true,
    idTurno: idTurno
  };
};

const closeConfirmCancelModal = () => {
  confirmCancelModal.value.isOpen = false;
  confirmCancelModal.value.idTurno = null;
};

const confirmCancelTurno = async () => {
  const idTurno = confirmCancelModal.value.idTurno;
  if (!idTurno) return;
  try {
    await turnoService.delete(idTurno);
    fetchTurnos();
    closeConfirmCancelModal();
    closeTurnoModal();
    showNotification('Turno cancelado exitosamente');
  } catch (error) {
    console.error('Error deleting turno:', error);
    alert('Error al cancelar el turno');
  }
};

const closeTurnoModal = () => {
  turnoModal.value.isOpen = false;
};

const handleTurnoSubmit = (savedTurno) => {
  fetchTurnos();
  const mascotaName = savedTurno.mascotas?.[0]?.nombre || 'Paciente';
  showNotification(`Turno agendado para ${mascotaName}`);
};

const fetchMascotas = async () => {
  try {
    const response = await mascotaService.getAll();
    allMascotas.value = response.data;
  } catch (error) {
    console.error('Error fetching mascotas for agenda:', error);
  }
};

onMounted(() => {
  fetchMascotas();
  fetchTurnos();
});

watch(currentDate, () => {
  fetchTurnos();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.animate-in {
  animation-fill-mode: forwards;
}

@keyframes zoom-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-in.zoom-in {
  animation: zoom-in 0.3s ease-out;
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
