<template>
  <router-link :to="link"
    class="dashboard-card group relative flex flex-col items-center text-center px-10 py-3 bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.1)] dark:hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] transition-all duration-500 overflow-hidden no-underline hover:-translate-y-1">

    <!-- Icon Container -->
    <div
      class="mb-3 mt-2 inline-flex items-center justify-center w-12 h-12 bg-celeste-50 dark:bg-slate-700/70 text-celeste-600 dark:text-celeste-400 rounded-[2rem] shadow-inner border border-celeste-100 dark:border-slate-600 transform group-hover:scale-110 group-hover:rotate-6 group-hover:bg-celeste-500 dark:group-hover:bg-celeste-500 group-hover:text-white dark:group-hover:text-white transition-all duration-500">
      <i :class="icon" class="text-2xl"></i>
    </div>

    <!-- Content -->
    <h3 class="!text-2xl font-extrabold text-celeste-950 dark:text-slate-100 tracking-tight mb-2 group-hover:text-celeste-600 dark:group-hover:text-celeste-400 transition-colors">
      {{ title }}
    </h3>
    <p class="text-celeste-700 dark:text-slate-400 text-sm font-medium leading-relaxed">
      {{ description }}
    </p>

  </router-link>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  link: String,
  icon: String
});
</script>

<style scoped>
.dashboard-card {
  text-decoration: none !important;
}

.dashboard-card * {
  text-decoration: none !important;
}
</style>
