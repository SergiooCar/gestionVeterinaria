<template>
  <div class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden transition-colors duration-300">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-celeste-50 dark:bg-slate-900/90 text-celeste-700 dark:text-slate-300 border-b border-celeste-100 dark:border-slate-700">
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Mascota</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Especie / Raza</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider">Dueño</th>
            <th class="px-6 py-3 font-extrabold text-xs uppercase tracking-wider text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-celeste-50 dark:divide-slate-700/50">
          <tr v-for="mascota in mascotas" :key="mascota.id_mascota || mascota.id"
            class="hover:bg-celeste-50/50 dark:hover:bg-slate-700/40 transition-colors duration-200 group">
            <td class="px-6 py-2">
              <span class="text-xs font-bold bg-celeste-100 dark:bg-slate-700 text-celeste-700 dark:text-celeste-300 px-2 py-1 rounded-lg border border-celeste-200 dark:border-slate-600">
                #{{ mascota.id_mascota || mascota.id }}
              </span>
            </td>
            <td class="px-6 py-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-celeste-50 dark:bg-slate-700/60 border border-celeste-100 dark:border-slate-600 flex items-center justify-center text-celeste-600 dark:text-celeste-400">
                  <i :class="[getEspecieIcon(mascota.raza?.especie?.nombre), 'text-sm']"></i>
                </div>
                <span class="text-celeste-950 dark:text-slate-100 text-xs font-extrabold group-hover:text-celeste-600 dark:group-hover:text-celeste-400 transition-colors">
                  {{ mascota.nombre }}
                </span>
              </div>
            </td>
            <td class="px-6 py-2">
              <div class="flex flex-col">
                <span class="text-celeste-800 dark:text-slate-200 text-xs font-bold">{{ mascota.raza?.especie?.nombre || 'N/A' }}</span>
                <span class="text-xs text-celeste-600 dark:text-slate-400 font-medium mt-0.5">{{ mascota.raza?.nombre || 'Sin raza' }}</span>
              </div>
            </td>
            <td class="px-6 py-2">
              <div class="flex items-center text-celeste-800 dark:text-slate-300 font-medium" v-if="mascota.persona">
                <i class="fa-solid fa-user text-celeste-400 dark:text-slate-400 mr-2 text-xs"></i>
                <span class="text-xs">{{ mascota.persona.nombre }} {{ mascota.persona.apellido }}</span>
              </div>
              <span v-else class="text-[11px] text-celeste-400 dark:text-slate-500 italic font-medium">Sin dueño asignado</span>
            </td>
            <td class="px-6 py-2">
              <div class="flex justify-center gap-2">
                <!-- View Button -->
                <div class="relative group/btn">
                  <button @click="$emit('view', mascota)"
                    class="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 text-celeste-600 dark:text-celeste-300 border border-celeste-200 dark:border-slate-600 rounded-xl hover:bg-celeste-100 dark:hover:bg-slate-600 hover:text-celeste-700 dark:hover:text-white transition-all shadow-sm cursor-pointer">
                    <i class="fa-solid fa-eye text-xs"></i>
                  </button>
                  <!-- Tooltip -->
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/btn:flex flex-col items-center z-50 pointer-events-none transition-all duration-200">
                    <div class="bg-[#1e2b8c] dark:bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap border dark:border-slate-700">
                      Ver detalle completo
                    </div>
                    <div class="w-1.5 h-1.5 bg-[#1e2b8c] dark:bg-slate-900 rotate-45 -mt-[3px]"></div>
                  </div>
                </div>

                <!-- Edit Button -->
                <div class="relative group/btn">
                  <button @click="$emit('edit', mascota)"
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
                  <button @click="$emit('remove', mascota.id_mascota || mascota.id)"
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
          <tr v-if="mascotas.length === 0">
            <td colspan="5" class="px-6 py-20 text-center text-celeste-400 dark:text-slate-400 font-medium">
              No se encontraron mascotas que coincidan con la búsqueda.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  mascotas: {
    type: Array,
    required: true
  }
});

defineEmits(['view', 'edit', 'remove']);

const getEspecieIcon = (especie) => {
  if (!especie) return 'fa-solid fa-paw';
  const esp = especie.toLowerCase();
  if (esp.includes('perro')) return 'fa-solid fa-dog';
  if (esp.includes('gato')) return 'fa-solid fa-cat';
  if (esp.includes('ave') || esp.includes('pajaro')) return 'fa-solid fa-dove';
  if (esp.includes('reptil') || esp.includes('serpiente')) return 'fa-solid fa-dragon';
  return 'fa-solid fa-paw';
};
</script>
