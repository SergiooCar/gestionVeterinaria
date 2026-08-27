<template>
  <div class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden transition-colors duration-300">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-celeste-50 dark:bg-slate-900/90 text-celeste-700 dark:text-slate-300 border-b border-celeste-100 dark:border-slate-700">
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Práctica</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Descripción</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider text-center">Duración</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider text-center">Precio</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-celeste-50 dark:divide-slate-700/50">
          <tr v-for="practica in practicas" :key="practica.id_tipo_atencion"
            class="hover:bg-celeste-50/50 dark:hover:bg-slate-700/40 transition-colors duration-200 group">
            <td class="px-6 py-2">
              <span
                class="text-xs font-bold bg-celeste-100 dark:bg-slate-700 text-celeste-700 dark:text-celeste-300 px-2 py-1 rounded-lg border border-celeste-200 dark:border-slate-600">
                #{{ practica.id_tipo_atencion }}
              </span>
            </td>
            <td class="px-6 py-2">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-celeste-50 dark:bg-slate-700/60 border border-celeste-100 dark:border-slate-600 flex items-center justify-center text-celeste-600 dark:text-celeste-400">
                  <i class="fa-solid fa-stethoscope text-sm"></i>
                </div>
                <span
                  class="text-celeste-950 dark:text-slate-100 text-xs font-extrabold group-hover:text-celeste-600 dark:group-hover:text-celeste-400 transition-colors whitespace-nowrap">
                  {{ practica.nombre }}
                </span>
              </div>
            </td>
            <td class="px-6 py-2">
              <span class="text-xs text-celeste-800 dark:text-slate-300 font-medium line-clamp-2 min-w-[250px] max-w-sm">{{
                practica.descripcion || 'Sin descripción' }}</span>
            </td>
            <td class="px-6 py-2 text-center">
              <span class="text-xs font-bold text-celeste-900 dark:text-slate-200">{{ practica.duracion_minutos }} min</span>
            </td>
            <td class="px-6 py-2 text-center">
              <span class="text-xs font-extrabold text-celeste-700 dark:text-celeste-400">{{ formatCurrency(practica.precio) }}</span>
            </td>
            <td class="px-6 py-2">
              <div class="flex justify-center gap-2">
                <!-- Edit Button -->
                <div class="relative group/btn">
                  <button @click="$emit('edit', practica)"
                    class="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-600 rounded-xl hover:bg-celeste-100 dark:hover:bg-slate-600 hover:text-celeste-700 dark:hover:text-white transition-all shadow-sm cursor-pointer">
                    <i class="fa-solid fa-pen-to-square text-xs"></i>
                  </button>
                  <!-- Tooltip -->
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/btn:flex flex-col items-center z-50 pointer-events-none transition-all duration-200">
                    <div class="bg-[#1e2b8c] dark:bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap border dark:border-slate-700">
                      Editar
                    </div>
                    <div class="w-1.5 h-1.5 bg-[#1e2b8c] dark:bg-slate-900 rotate-45 -mt-[3px]"></div>
                  </div>
                </div>
                <!-- Delete Button -->
                <div class="relative group/btn">
                  <button @click="$emit('remove', practica.id_tipo_atencion)"
                    class="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 hover:border-red-200 dark:hover:border-red-800 transition-all shadow-sm cursor-pointer">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                  </button>
                  <!-- Tooltip -->
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/btn:flex flex-col items-center z-50 pointer-events-none transition-all duration-200">
                    <div class="bg-[#1e2b8c] dark:bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap border dark:border-slate-700">
                      Eliminar
                    </div>
                    <div class="w-1.5 h-1.5 bg-[#1e2b8c] dark:bg-slate-900 rotate-45 -mt-[3px]"></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="practicas.length === 0">
            <td colspan="6" class="px-6 py-10 text-center">
              <div
                class="w-10 h-10 bg-celeste-50 dark:bg-slate-900/80 rounded-full flex items-center justify-center mx-auto mb-2 border border-celeste-100 dark:border-slate-700">
                <i class="fa-solid fa-folder-open text-celeste-300 dark:text-slate-500 text-xl"></i>
              </div>
              <h3 class="!text-lg font-extrabold text-celeste-950 dark:text-slate-100">No hay prácticas configuradas</h3>
              <p class="text-celeste-600 dark:text-slate-400 font-medium text-sm">Comienza creando una nueva práctica médica.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  practicas: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'remove']);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(value);
};
</script>
