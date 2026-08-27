<template>
  <div
    class="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden font-sans"
    :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Overlay for better contrast -->
    <div class="absolute inset-0 bg-celeste-900/40 dark:bg-slate-950/70 backdrop-blur-[2px]"></div>

    <!-- Success Toast (Floating Notification) -->
    <Transition enter-active-class="transform transition duration-500 ease-out"
      enter-from-class="translate-y-[-100%] opacity-0" enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in" leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95">
      <div v-if="showToast"
        class="absolute top-10 z-[100] flex items-center gap-4 px-6 py-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-green-100/50 min-w-[320px]">
        <div
          class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 class="text-green-900 font-bold text-lg">¡Registro Exitoso!</h3>
          <p class="text-green-700/80 text-sm font-medium">Bienvenido a la Clínica Veterinaria</p>
        </div>
        <div class="ml-auto pl-4">
          <div class="w-1.5 h-10 bg-green-500/20 rounded-full overflow-hidden">
            <div class="w-full bg-green-500 animate-[progress_2s_linear_forwards]"></div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Register Card -->
    <div class="relative z-10 w-full max-w-lg p-6 mx-4">
      <div
        class="bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 p-10 shadow-2xl">
        
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-xl mb-4 shadow-inner border border-white/30 transform hover:rotate-6 transition-transform">
            <img src="https://cdn-icons-png.flaticon.com/512/404/404022.png" alt="Logo" class="w-10 h-10 filter brightness-0 invert" />
          </div>
          <h1 class="text-3xl font-bold text-white tracking-wide mb-1">Clínica Veterinaria</h1>
          <p class="text-white/80 text-sm font-medium">Crea tu cuenta en la plataforma</p>
        </div>

        <!-- Form Section -->
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Alert Message -->
          <div v-if="error"
            class="p-3 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-100 text-sm font-medium animate-in fade-in duration-300 text-center backdrop-blur-md">
            {{ error }}
          </div>

          <div class="space-y-2">
            <div class="relative group">
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input type="text" v-model="user.nombre" required
                class="w-full pl-5 pr-12 py-3.5 bg-transparent border border-white/40 rounded-full focus:ring-2 focus:ring-white/60 focus:border-white outline-none transition-all duration-300 text-white placeholder:text-white/80"
                placeholder="Nombre Completo" :disabled="loading">
            </div>
          </div>

          <div class="space-y-2">
            <div class="relative group">
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <input type="text" v-model="user.username" required
                class="w-full pl-5 pr-12 py-3.5 bg-transparent border border-white/40 rounded-full focus:ring-2 focus:ring-white/60 focus:border-white outline-none transition-all duration-300 text-white placeholder:text-white/80"
                placeholder="Usuario" :disabled="loading">
            </div>
          </div>

          <div class="space-y-2">
            <div class="relative group">
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input type="email" v-model="user.email" required
                class="w-full pl-5 pr-12 py-3.5 bg-transparent border border-white/40 rounded-full focus:ring-2 focus:ring-white/60 focus:border-white outline-none transition-all duration-300 text-white placeholder:text-white/80"
                placeholder="Email" :disabled="loading">
            </div>
          </div>

          <div class="space-y-2">
            <div class="relative group">
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input type="password" v-model="user.password_hash" required
                class="w-full pl-5 pr-12 py-3.5 bg-transparent border border-white/40 rounded-full focus:ring-2 focus:ring-white/60 focus:border-white outline-none transition-all duration-300 text-white placeholder:text-white/80"
                placeholder="Contraseña" :disabled="loading">
            </div>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full py-3.5 px-6 mt-6 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-full shadow-lg transform transition-all active:scale-[0.97] outline-none disabled:opacity-70 flex items-center justify-center gap-3">
            <svg v-if="loading" class="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ loading ? 'Creando Cuenta...' : 'Registrarse' }}
          </button>

          <div class="text-center pt-6">
            <p class="text-white/90 text-sm">
              ¿Ya tienes una cuenta?
              <router-link to="/" class="text-white font-bold hover:underline transition-all ml-1">
                Inicia sesión
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
const showToast = ref(false);

const user = reactive({
  nombre: '',
  username: '',
  email: '',
  password_hash: '',
  activo: true
});

const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await authService.register(user);
    localStorage.setItem('user', JSON.stringify(response));

    // Modern success notification
    showToast.value = true;

    setTimeout(() => {
      router.push('/dashboard');
    }, 2500);
  } catch (err) {
    console.error('Error en registro:', err);
    error.value = err.response?.data?.message || 'Error al crear la cuenta. Intente con otro usuario.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.backdrop-blur-2xl {
  backdrop-filter: blur(40px);
}

@keyframes progress {
  from {
    height: 0;
  }

  to {
    height: 100%;
  }
}
</style>
