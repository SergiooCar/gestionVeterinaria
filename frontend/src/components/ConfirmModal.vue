<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-2">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" @click="cancel"></div>

    <!-- Modal Content -->
    <div class="relative bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div class="p-4 text-center">
        <!-- Icon -->
        <div :class="[
          'w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 shadow-lg',
          isSuccess ? 'bg-green-100 dark:bg-emerald-950/50 text-green-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
        ]">
          <i :class="['fa-solid text-3xl', isSuccess ? 'fa-check' : 'fa-triangle-exclamation']"></i>
        </div>

        <h3 class="!text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">{{ title }}</h3>
        <p class="text-slate-500 dark:text-slate-300 text-sm font-medium mb-4 leading-relaxed">{{ message }}</p>

        <!-- Actions -->
        <div class="flex gap-3 mt-4">
          <button 
            v-if="!isSuccess"
            @click="$emit('confirm')" 
            :class="[
              'flex-1 py-2 !text-sm rounded-2xl font-bold transition-all transform active:scale-85 shadow-lg cursor-pointer',
              isConfirm ? 'bg-celeste-500 dark:bg-celeste-500 text-white hover:bg-celeste-600 shadow-celeste-500/20' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/20'
            ]"
          >
            {{ confirmText || (isConfirm ? 'Confirmar' : 'Eliminar') }}
          </button>
          <button 
            @click="isSuccess ? $emit('confirm') : $emit('cancel')"
            class="flex-1 py-2 !text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all transform active:scale-85 cursor-pointer"
          >
            {{ isSuccess ? 'Entendido' : 'Cancelar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
  isSuccess: {
    type: Boolean,
    default: false
  },
  isConfirm: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => emit('confirm');
const cancel = () => emit('cancel');
</script>

<style scoped>
.animate-in {
  animation-fill-mode: forwards;
}

@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-in.zoom-in {
  animation: zoom-in 0.3s ease-out;
}
</style>
