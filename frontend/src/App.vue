<template>
  <div id="app" class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
    <Navbar v-if="!isAuthPage" />
    
    <!-- Global Notification -->
    <Transition name="toast">
      <div v-if="notification.show"
        class="fixed top-24 right-8 z-[1000] bg-white dark:bg-slate-800 border-l-4 shadow-2xl rounded-2xl py-2 px-3.5 flex items-center gap-3 min-w-[300px] border border-slate-100/50 dark:border-slate-700 animate-in slide-in-from-right duration-300"
        :class="notification.type === 'error' ? 'border-red-500' : 'border-celeste-500'">
        <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
          :class="notification.type === 'error' ? 'bg-red-50 dark:bg-red-950/40 text-red-500' : 'bg-celeste-50 dark:bg-celeste-950/40 text-celeste-600 dark:text-celeste-400'">
          <i :class="['text-[10px] fa-solid', notification.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check']"></i>
        </div>
        <div class="flex flex-col justify-center min-w-0">
          <p class="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest leading-none mb-0.5">
            {{ notification.type === 'error' ? 'Error' : 'Notificación' }}
          </p>
          <p class="text-xs font-extrabold text-slate-700 dark:text-slate-200 leading-tight">{{ notification.message }}</p>
        </div>
        <button @click="notification.show = false"
          class="ml-auto text-slate-300 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0">
          <i class="fa-solid fa-xmark text-xs"></i>
        </button>
      </div>
    </Transition>

    <main :class="{ 'container mt-5 pt-4': !isFullWidthPage }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { useNotification } from './services/notificationService';
import { useDarkMode } from './composables/useDarkMode';

const route = useRoute();
const { notification } = useNotification();
const { initDarkMode } = useDarkMode();

onMounted(() => {
  initDarkMode();
});

const isAuthPage = computed(() => ['Login', 'Register'].includes(route.name));
const isFullWidthPage = computed(() => ['Login', 'Register', 'Dashboard', 'Personas', 'Mascotas', 'Agenda', 'ConfiguracionPracticas', 'ConfirmarTurno', 'AtencionRegistro'].includes(route.name));
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
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
