<template>
  <div
    class="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden font-sans"
    :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Overlay for better contrast -->
    <div class="absolute inset-0 bg-celeste-900/40 backdrop-blur-[2px]"></div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md p-6 mx-4">
      <div
        class="bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 p-10 shadow-2xl">
        
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-xl mb-4 shadow-inner border border-white/30 transform hover:rotate-6 transition-transform">
            <img src="https://cdn-icons-png.flaticon.com/512/404/404022.png" alt="Logo" class="w-10 h-10 filter brightness-0 invert" />
          </div>
          <h1 class="text-3xl font-bold text-white tracking-wide mb-1">Clínica Veterinaria</h1>
          <p class="text-white/80 text-sm font-medium">Inicia sesión para continuar</p>
        </div>

        <!-- Form Section -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <div class="relative group">
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input type="text" v-model="credentials.username" required
                class="w-full pl-5 pr-12 py-3.5 bg-transparent border border-white/40 rounded-full focus:ring-2 focus:ring-white/60 focus:border-white outline-none transition-all duration-300 text-white placeholder:text-white/80"
                placeholder="Usuario">
            </div>
          </div>

          <div class="space-y-2">
            <div class="relative group">
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input type="password" v-model="credentials.password" required
                class="w-full pl-5 pr-12 py-3.5 bg-transparent border border-white/40 rounded-full focus:ring-2 focus:ring-white/60 focus:border-white outline-none transition-all duration-300 text-white placeholder:text-white/80"
                placeholder="Contraseña">
            </div>
          </div>

          <div class="flex items-center justify-between text-white/90 text-sm px-2 mt-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded bg-transparent border-white/40 text-celeste-500 focus:ring-celeste-500/50">
              <span>Recuérdame</span>
            </label>
            <a href="#" class="hover:text-white transition-colors">¿Olvidaste tu contraseña?</a>
          </div>

          <!-- Error Alert -->
          <div v-if="error"
            class="p-3 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-100 text-sm font-medium animate-in fade-in duration-300 text-center backdrop-blur-md">
            {{ error }}
          </div>

          <button type="submit" :disabled="loading"
            class="w-full py-3.5 px-6 mt-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-full shadow-lg transform transition-all active:scale-[0.97] outline-none disabled:opacity-70 flex items-center justify-center gap-3">
            <svg v-if="loading" class="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ loading ? 'Iniciando Sesión...' : 'Login' }}
          </button>

          <div class="text-center pt-6">
            <p class="text-white/90 text-sm">
              ¿No tienes cuenta?
              <router-link to="/register"
                class="text-white font-bold hover:underline transition-all ml-1">
                Regístrate
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';
import bgImage from '../assets/login-bg-celeste.png';

const router = useRouter();
const loading = ref(false);
const error = ref('');

const credentials = reactive({
  username: '',
  password: ''
});

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    const user = await authService.login(credentials);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data || 'Error al iniciar sesión. Revisa tus credenciales.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.backdrop-blur-2xl {
  backdrop-filter: blur(40px);
}
</style>
