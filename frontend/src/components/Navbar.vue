<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 shadow-sm transition-all duration-300">
    <div class="w-full px-3 py-2 flex items-center justify-between">

      <!-- Logo Section -->
      <router-link to="/dashboard" class="flex items-center gap-3 no-underline group">
        <div
          class="w-8 h-8 bg-celeste-500 rounded-xl flex items-center justify-center shadow-lg shadow-celeste-500/20 transform group-hover:rotate-6 transition-transform">
          <img src="https://cdn-icons-png.flaticon.com/512/404/404022.png" alt="Logo"
            class="w-6 h-6 filter brightness-0 invert" />
        </div>
        <span class="text-lg font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight">Clinica <span
            class="text-celeste-600 dark:text-celeste-400">Vet</span></span>
      </router-link>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center gap-8">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path"
          class="nav-link relative py-1 text-sm font-semibold transition-all duration-300 no-underline" :class="[
            route.path === item.path ? 'text-celeste-600 dark:text-celeste-400' : 'text-gray-500 dark:text-slate-400 hover:text-celeste-600 dark:hover:text-celeste-300'
          ]">
          {{ item.name }}
          <span class="underline-bar" :class="{ 'active': route.path === item.path }"></span>
        </router-link>
      </div>

      <!-- User Actions -->
      <div class="flex items-center gap-4">
        <!-- Dark Mode Toggle Button -->
        <button @click="toggleDarkMode" :title="isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer">
          <i :class="isDark ? 'fa-solid fa-sun text-base text-amber-400' : 'fa-solid fa-moon text-base text-slate-600'"></i>
        </button>

        <div class="hidden lg:flex flex-col items-end">
          <span
            class="text-[0.55rem] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-[0.2em] leading-none mb-1 text-celeste-600/70 dark:text-celeste-400/80">Sesión
            Iniciada</span>
          <span class="text-xs font-extrabold text-celeste-950 dark:text-slate-200 capitalize">Bienvenido, {{ userName }}</span>
        </div>

        <button @click="handleLogout"
          class="flex items-center gap-2 px-6 py-2 bg-celeste-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-celeste-700 dark:text-celeste-400 hover:text-red-600 dark:hover:text-red-400 font-bold text-sm rounded-full transition-all duration-300 border border-celeste-100 dark:border-slate-700 hover:border-red-100 dark:hover:border-red-900 group cursor-pointer">
          <span class="text-xs">Salir</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authService } from '../services/authService';
import { useDarkMode } from '../composables/useDarkMode';

const route = useRoute();
const router = useRouter();
const userName = ref('Usuario');
const { isDark, toggleDarkMode } = useDarkMode();

onMounted(async () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      userName.value = user.nombre || user.username || 'Usuario';
    } catch (e) {
      console.error('Error al parsear el usuario:', e);
      fetchUserFromApi();
    }
  } else {
    fetchUserFromApi();
  }
});

const fetchUserFromApi = async () => {
  try {
    const user = await authService.getCurrentUser();
    if (user) {
      userName.value = user.nombre || user.username || 'Usuario';
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch (err) {
    console.warn('No hay sesión activa o no se pudo obtener el usuario');
  }
};

const navItems = [
  { name: 'Inicio', path: '/dashboard' },
  { name: 'Dueños', path: '/personas' },
  { name: 'Mascotas', path: '/mascotas' },
  { name: 'Agenda', path: '/agenda' },
  { name: 'Presentes', path: '/confirmar-turnos' },
  { name: 'Configuración', path: '/configuracion/practicas' },
  { name: 'Seguridad', path: '/seguridad' }
];

const handleLogout = async () => {
  try {
    await authService.logout();
    localStorage.removeItem('user');
    router.push('/');
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
    localStorage.removeItem('user');
    router.push('/');
  }
};
</script>

<style scoped>
.nav-link {
  text-decoration: none !important;
}

.underline-bar {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-celeste-500, #0ea5e9);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover .underline-bar,
.underline-bar.active {
  width: 100%;
}
</style>
