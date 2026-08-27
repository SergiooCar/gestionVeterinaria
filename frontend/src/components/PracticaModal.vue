<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/80 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div :class="[
      'relative bg-white dark:bg-slate-800 w-full rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom duration-300 border border-celeste-100 dark:border-slate-700/80 flex flex-col max-w-2xl'
    ]">

      <!-- Header -->
      <div class="p-3 bg-gradient-to-r from-celeste-700 to-celeste-600 text-white rounded-t-[2rem]">
        <div class="relative z-10 flex justify-between items-center w-full">
          <div class="flex items-center gap-4">
            <!-- Icon on the left -->
            <div class="w-10 h-9 bg-white/10 rounded-2xl flex items-center justify-center text-white text-md border border-white/10 shadow-inner">
              <i :class="isEdit ? 'fa-solid fa-pen-to-square' : 'fa-solid fa-plus'"></i>
            </div>
            <div>
              <h2 class="!text-2xl font-bold tracking-tight leading-tight text-white">{{ isEdit ? 'Editar Práctica' : 'Nueva Práctica' }}</h2>
              <p class="text-[10px] font-bold uppercase tracking-widest mt-1 text-celeste-100">GESTIONAR DATOS DE PRÁCTICA</p>
            </div>
          </div>
          <button @click="close"
            class="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90 cursor-pointer">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit" class="p-3 bg-celeste-50/10 dark:bg-slate-900/40 space-y-6 flex-1 overflow-y-auto">
        <!-- Section Header -->
        <div class="flex items-center gap-2 text-celeste-600 dark:text-celeste-400 font-bold text-[11px] uppercase tracking-wider mb-3">
          <i class="fa-solid fa-stethoscope text-sm text-celeste-500 dark:text-celeste-400"></i>
          <span>Información de la Práctica</span>
        </div>

        <!-- Row 1: Nombre de la Práctica -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Nombre de la Práctica</label>
          <input v-model="formData.nombre" type="text" required
            class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
            placeholder="Ej. Vacunación Antirrábica">
        </div>

        <!-- Row 2: Duración, Precio -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Duración (min)</label>
            <div class="relative flex items-center">
              <select v-model="formData.duracion_minutos" required
                class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs appearance-none outline-none">
                <option v-for="opt in duracionOptions" :key="opt" :value="opt" class="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                  {{ opt }} min
                </option>
              </select>
              <i class="fa-solid fa-chevron-down absolute right-4 text-celeste-500 dark:text-slate-400 pointer-events-none text-xs"></i>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Precio</label>
            <input v-model="displayPrecio" type="text" required
              @focus="isFocused = true" @blur="isFocused = false"
              class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs outline-none"
              placeholder="0">
          </div>
        </div>

        <!-- Row 3: Descripción -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Descripción</label>
          <textarea v-model="formData.descripcion" rows="3"
            class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all resize-none !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
            placeholder="Detalles del servicio..."></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="pt-6 flex justify-end gap-3 border-t border-celeste-100 dark:border-slate-700">
          <button type="button" @click="close"
            class="px-6 bg-white dark:bg-slate-700 text-celeste-700 dark:text-slate-200 font-bold py-2 rounded-2xl border border-celeste-200 dark:border-slate-600 hover:bg-celeste-50 dark:hover:bg-slate-600 transition-all transform active:scale-95 !text-xs cursor-pointer">
            Cancelar
          </button>
          <button type="submit" :disabled="loading"
            class="px-8 bg-celeste-600 dark:bg-celeste-500 text-white font-bold py-2 rounded-2xl shadow-lg shadow-celeste-500/25 hover:bg-celeste-700 dark:hover:bg-celeste-600 transition-all transform active:scale-95 !text-xs flex items-center gap-2 disabled:opacity-50 cursor-pointer">
            <i class="fa-solid fa-circle-check"></i>
            <span>{{ loading ? 'Guardando...' : 'Guardar Práctica' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  isEdit: Boolean,
  practica: { type: Object, default: () => ({}) },
  loading: Boolean
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
  nombre: '',
  descripcion: '',
  duracion_minutos: 30,
  precio: '',
  cantidad: 1
});

const isFocused = ref(false);

const duracionOptions = computed(() => {
  const baseOptions = [15, 30, 45, 60, 90, 120];
  const currentVal = Number(formData.value.duracion_minutos);
  if (currentVal && !baseOptions.includes(currentVal)) {
    return [...baseOptions, currentVal].sort((a, b) => a - b);
  }
  return baseOptions;
});

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '') return '';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(value);
};

const displayPrecio = computed({
  get() {
    if (isFocused.value) {
      return (formData.value.precio === 0 || formData.value.precio === '' || formData.value.precio === null) ? '' : formData.value.precio;
    }
    return (formData.value.precio === 0 || formData.value.precio === '' || formData.value.precio === null) ? '' : formatCurrency(formData.value.precio);
  },
  set(val) {
    if (val === '') {
      formData.value.precio = '';
      return;
    }
    const cleanVal = val.replace(/[^0-9.,-]/g, '').replace(',', '.');
    const parsed = parseFloat(cleanVal);
    formData.value.precio = isNaN(parsed) ? '' : parsed;
  }
});

const resetForm = () => {
  formData.value = {
    nombre: '',
    descripcion: '',
    duracion_minutos: 30,
    precio: '',
    cantidad: 1
  };
};

watch([() => props.isOpen, () => props.practica], ([isOpenVal, practicaVal]) => {
  if (isOpenVal) {
    if (practicaVal && Object.keys(practicaVal).length > 0) {
      formData.value = {
        nombre: practicaVal.nombre || '',
        descripcion: practicaVal.descripcion || '',
        duracion_minutos: practicaVal.duracion_minutos || 30,
        precio: practicaVal.precio !== undefined && practicaVal.precio !== null ? practicaVal.precio : '',
        cantidad: practicaVal.cantidad || 1
      };
    } else {
      resetForm();
    }
  }
}, { immediate: true });

const close = () => {
  emit('close');
  if (!props.isEdit) resetForm();
};

const handleSubmit = () => {
  emit('submit', {
    ...formData.value,
    precio: formData.value.precio === '' ? 0 : formData.value.precio
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
