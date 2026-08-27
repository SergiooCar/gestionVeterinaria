<template>
  <div class="bg-white dark:bg-slate-800 rounded-3xl border border-celeste-100 dark:border-slate-700/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden transition-colors duration-300">
    <div class="overflow-x-auto custom-scrollbar">
      <table class="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr class="bg-celeste-50/50 dark:bg-slate-900/80 border-b border-celeste-100 dark:border-slate-700 text-[10px] font-bold text-celeste-600 dark:text-celeste-400 uppercase tracking-widest">
            <th class="py-4 px-6">ID</th>
            <th class="py-4 px-6">Usuario</th>
            <th class="py-4 px-6">Nombre Completo</th>
            <th class="py-4 px-6">Email</th>
            <th class="py-4 px-6">Rol</th>
            <th class="py-4 px-6">Estado</th>
            <th class="py-4 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-celeste-50 dark:divide-slate-700/50 text-sm font-medium text-celeste-950 dark:text-slate-200">
          <tr v-if="usuarios.length === 0">
            <td colspan="7" class="py-12 text-center text-slate-400 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">
              No se encontraron usuarios que coincidan con la búsqueda.
            </td>
          </tr>
          <tr v-for="u in usuarios" :key="u.id_usuario || u.id" class="hover:bg-celeste-50/30 dark:hover:bg-slate-700/30 transition-colors group">
            <td class="py-4 px-6 font-bold text-celeste-500 dark:text-celeste-400 text-xs">
              #{{ u.id_usuario || u.id }}
            </td>
            <td class="py-4 px-6 font-bold text-celeste-950 dark:text-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-celeste-100 dark:bg-slate-700 flex items-center justify-center text-celeste-600 dark:text-celeste-400 font-extrabold text-xs">
                  <i class="fa-solid fa-user-shield"></i>
                </div>
                <span>{{ u.username }}</span>
              </div>
            </td>
            <td class="py-4 px-6 font-extrabold text-celeste-900 dark:text-slate-100">
              {{ u.nombre }}
            </td>
            <td class="py-4 px-6 text-xs text-celeste-700 dark:text-slate-300">
              <div class="flex items-center gap-1.5">
                <i class="fa-solid fa-envelope text-[11px] text-celeste-400 dark:text-slate-500"></i>
                <span>{{ u.email || 'Sin email' }}</span>
              </div>
            </td>
            <td class="py-4 px-6">
              <span :class="[
                'px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-xs',
                getRoleBadgeClass(u.rol)
              ]">
                {{ getRoleLabel(u.rol) }}
              </span>
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center gap-2">
                <div :class="['w-2.5 h-2.5 rounded-full', u.activo ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500']"></div>
                <span :class="['text-xs font-bold', u.activo ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400']">
                  {{ u.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </td>
            <td class="py-4 px-6 text-center">
              <button @click="$emit('toggle-status', u.id_usuario || u.id)"
                :title="u.activo ? 'Desactivar Cuenta' : 'Activar Cuenta'"
                class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-celeste-100 dark:hover:bg-slate-600 hover:text-celeste-700 dark:hover:text-celeste-300 transition-all cursor-pointer">
                <i :class="[u.activo ? 'fa-solid fa-user-xmark text-rose-500' : 'fa-solid fa-user-check text-emerald-500']"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  usuarios: {
    type: Array,
    default: () => []
  }
});

defineEmits(['toggle-status']);

const getRoleLabel = (rol) => {
  if (!rol) return 'USUARIO';
  const r = (rol?.nombre || rol).toString().toUpperCase();
  if (r.includes('ADMIN')) return 'ADMINISTRADOR';
  if (r.includes('VET')) return 'VETERINARIO';
  if (r.includes('RECEPC')) return 'RECEPCIONISTA';
  return r;
};

const getRoleBadgeClass = (rol) => {
  if (!rol) return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  const r = (rol?.nombre || rol).toString().toUpperCase();
  if (r.includes('ADMIN')) {
    return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
  }
  if (r.includes('VET')) {
    return 'bg-celeste-50 dark:bg-celeste-950/40 text-celeste-700 dark:text-celeste-300 border-celeste-200 dark:border-celeste-800';
  }
  if (r.includes('RECEPC')) {
    return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  }
  return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
};
</script>
