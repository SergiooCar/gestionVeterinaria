<template>
  <div class="min-h-screen w-full bg-white dark:bg-slate-900 relative overflow-hidden font-sans pb-20 transition-colors duration-300">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-1/2 h-96 bg-gradient-to-bl from-celeste-100/50 dark:from-celeste-950/20 to-transparent -z-10 rounded-bl-[10rem]"></div>

    <div class="container mx-auto px-6 pt-24 relative z-10 w-full max-w-full">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="!text-3xl md:text-xl font-extrabold tracking-tight mb-4 text-celeste-950 dark:text-slate-100 animate-in fade-in slide-in-from-top duration-700">
          Panel de Administración
        </h1>
        <p class="text-celeste-700 dark:text-slate-300 text-md font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top duration-1000 delay-100">
          Bienvenido al centro de control de tu clínica veterinaria. Gestiona pacientes, consultas y equipo médico en un solo lugar.
        </p>
        <div class="w-16 h-1 bg-celeste-100 dark:bg-slate-800 mx-auto mt-10 rounded-full overflow-hidden">
          <div class="w-1/3 h-full bg-celeste-500 rounded-full animate-[progress_3s_infinite_ease-in-out]"></div>
        </div>
      </div>

      <!-- Modules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <HomeCard
          v-for="(item, index) in modules"
          :key="index"
          :title="item.title"
          :description="item.description"
          :link="item.link"
          :icon="item.icon"
          class="animate-in fade-in slide-in-from-bottom duration-700"
          :style="{ animationDelay: `${index * 100}ms` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeCard from '../components/HomeCard.vue';

const modules = [
  {
    title: 'Dueños',
    description: 'Gestión completa de dueños y mascotas registrados en la clínica.',
    link: '/personas',
    icon: 'fa-solid fa-users-gear',
  },
  {
    title: 'Mascotas',
    description: 'Listado detallado de pacientes animales, razas y estados de salud.',
    link: '/mascotas',
    icon: 'fa-solid fa-paw',
  },
  {
    title: 'Consultas Médicas',
    description: 'Registro de atenciones, diagnósticos y tratamientos realizados.',
    link: '/agenda',
    icon: 'fa-solid fa-stethoscope',
  },
  {
    title: 'Fichas Médicas',
    description: 'Historial clínico detallado y seguimiento de vacunas por paciente.',
    link: '/fichas',
    icon: 'fa-solid fa-file-medical',
  },
  {
    title: 'Configuración',
    description: 'Ajustes generales del sistema y perfiles de usuario.',
    link: '/configuracion/practicas',
    icon: 'fa-solid fa-gears',
  },
  {
    title: 'Seguridad',
    description: 'Control de accesos, roles y auditoría del sistema.',
    link: '/seguridad',
    icon: 'fa-solid fa-shield-halved',
  }
];
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes progress {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-in {
  animation-fill-mode: forwards;
}
</style>
