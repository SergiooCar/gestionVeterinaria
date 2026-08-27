<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-2">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-celeste-950/40 dark:bg-slate-950/80 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div :class="[
      'relative bg-white w-full rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom duration-300 transition-all border border-celeste-100 flex flex-col max-h-[85vh]',
      mode === 'view' ? 'max-w-6xl' : 'max-w-2xl'
    ]">

      <!-- Content Container -->
      <div :class="mode === 'view' ? 'flex flex-col lg:flex-row flex-1 min-h-0' : 'flex flex-col flex-1 min-h-0 p-0'">

        <!-- LEFT COLUMN: Profile Panel / Form Panel -->
        <div :class="[
          'flex-1 flex flex-col min-h-0',
          mode === 'view' ? 'lg:w-[50%] bg-white' : ''
        ]">
          <!-- Header -->
          <div :class="[
            'p-3 relative transition-all duration-300',
            mode === 'view'
              ? 'bg-white dark:bg-slate-800 border-b border-celeste-100 dark:border-slate-700'
              : 'bg-gradient-to-r from-celeste-700 to-celeste-600 text-white rounded-t-[2rem]',
          ]">
            <div class="relative z-10 flex justify-between items-center">
              <div class="flex items-center gap-4">
                <!-- Icon on the left -->
                <div v-if="mode !== 'view'"
                  class="w-10 h-9 bg-white/10 rounded-2xl flex items-center justify-center text-white text-md border border-white/10 shadow-inner">
                  <i :class="mode === 'create'
                      ? 'fa-solid fa-user-plus'
                      : 'fa-solid fa-user-pen'
                    "></i>
                </div>
                <div v-if="mode === 'view'"
                  class="w-9 h-9 bg-celeste-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-celeste-600 dark:text-celeste-400 border border-celeste-100 dark:border-slate-600">
                  <i class="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <h2 :class="[
                    'font-bold tracking-tight leading-tight',
                    mode === 'view'
                      ? '!text-2xl text-celeste-950 dark:text-slate-100'
                      : '!text-2xl text-white',
                  ]">
                    {{ title }}
                  </h2>
                  <p :class="[
                    'text-[10px] font-bold uppercase tracking-widest mt-1',
                    mode === 'view'
                      ? 'text-celeste-600 dark:text-celeste-400'
                      : 'text-celeste-100',
                  ]">
                    {{ subtitle }}
                  </p>
                </div>
              </div>
              <button @click="close" :class="[
                'w-8 h-8 flex items-center justify-center rounded-xl transition-all hover:rotate-90 cursor-pointer',
                mode === 'view'
                  ? 'bg-celeste-50 dark:bg-slate-700 hover:bg-celeste-100 dark:hover:bg-slate-600 text-celeste-600 dark:text-slate-200'
                  : 'bg-white/10 hover:bg-white/20 text-white',
              ]">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Form Area / Profile Info -->
          <div :class="[
            'flex-1 overflow-y-auto',
            mode === 'view'
              ? 'p-3 space-y-5 bg-white dark:bg-slate-800'
              : 'p-3 lg:p-3 bg-celeste-50/10 dark:bg-slate-900/40',
          ]">
            <!-- View Mode: Elegant Info List -->
            <div v-if="mode === 'view'" class="space-y-5">
              <div class="flex items-start gap-4 group">
                <div
                  class="w-9 h-9 rounded-lg bg-celeste-50 dark:bg-slate-700 flex items-center justify-center text-celeste-600 dark:text-celeste-400 shrink-0 border border-celeste-100 dark:border-slate-600">
                  <i class="fa-solid fa-id-card text-sm"></i>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-1">
                    Documento
                  </p>
                  <p class="text-sm font-bold text-celeste-950 dark:text-slate-100">
                    {{ formData.dni }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div
                  class="w-9 h-9 rounded-lg bg-celeste-50 dark:bg-slate-700 flex items-center justify-center text-celeste-600 dark:text-celeste-400 shrink-0 border border-celeste-100 dark:border-slate-600">
                  <i class="fa-solid fa-phone text-sm"></i>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-1">
                    Teléfono
                  </p>
                  <p class="text-sm font-bold text-celeste-950 dark:text-slate-100">
                    {{ formData.telefono || "No registrado" }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div
                  class="w-9 h-9 rounded-lg bg-celeste-50 dark:bg-slate-700 flex items-center justify-center text-celeste-600 dark:text-celeste-400 shrink-0 border border-celeste-100 dark:border-slate-600">
                  <i class="fa-solid fa-envelope text-sm"></i>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-celeste-500 dark:text-celeste-400 uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <p class="text-sm font-bold text-celeste-950 dark:text-slate-100 truncate">
                    {{ formData.email || "Sin email" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Create/Edit Mode: Modern Form copying requested style -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Section: Información Personal -->
              <div
                class="flex items-center gap-2 text-celeste-600 dark:text-celeste-400 font-bold text-[11px] uppercase tracking-wider mb-3">
                <i class="fa-regular fa-user text-sm text-celeste-500 dark:text-celeste-400"></i>
                <span>Información Personal</span>
              </div>

              <!-- Row 1: DNI, Apellido, Nombre -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- DNI -->
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">DNI</label>
                  <div class="relative flex items-center">
                    <i
                      class="fa-solid fa-fingerprint absolute left-4 text-celeste-500 dark:text-slate-400 text-base"></i>
                    <input v-model="formData.dni" type="text" required
                      class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-celeste-400 dark:placeholder:text-slate-500 outline-none"
                      placeholder="Sin puntos" />
                  </div>
                </div>

                <!-- Apellido -->
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Apellido</label>
                  <input v-model="formData.apellido" type="text" required
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                    placeholder="Ej. Pérez" />
                </div>

                <!-- Nombre -->
                <div class="space-y-1.5">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Nombre/s</label>
                  <input v-model="formData.nombre" type="text" required
                    class="w-full px-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                    placeholder="Ej. Juan" />
                </div>
              </div>

              <!-- Row 2: Email, Teléfono -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Email -->
                <div class="space-y-1.5 md:col-span-2">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Email</label>
                  <div class="relative flex items-center">
                    <i class="fa-solid fa-at absolute left-4 text-celeste-500 dark:text-slate-400 text-base"></i>
                    <input v-model="formData.email" type="email"
                      class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                      placeholder="ejemplo@correo.com" />
                  </div>
                </div>

                <!-- Teléfono -->
                <div class="space-y-1.5 md:col-span-1">
                  <label
                    class="text-[11px] font-bold text-celeste-700 dark:text-slate-300 uppercase tracking-wider ml-1">Teléfono</label>
                  <div class="relative flex items-center">
                    <i class="fa-solid fa-phone absolute left-4 text-celeste-500 dark:text-slate-400 text-base"></i>
                    <input v-model="formData.telefono" type="text"
                      class="w-full pl-11 pr-4 py-2 bg-celeste-50/50 dark:bg-slate-900/80 border border-celeste-100 dark:border-slate-700 focus:border-celeste-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-celeste-500/10 rounded-2xl text-celeste-950 dark:text-slate-100 font-bold transition-all !text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                      placeholder="Ej. 351123456" />
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="pt-6 flex justify-end gap-3 border-t border-celeste-100 dark:border-slate-700">
                <button type="button" @click="close"
                  class="px-6 bg-white dark:bg-slate-700 text-celeste-700 dark:text-slate-200 font-bold py-2 rounded-2xl border border-celeste-200 dark:border-slate-600 hover:bg-celeste-50 dark:hover:bg-slate-600 transition-all transform active:scale-95 !text-xs cursor-pointer">
                  Cancelar
                </button>
                <button type="submit"
                  class="px-8 bg-celeste-600 dark:bg-celeste-500 text-white font-bold py-2 rounded-2xl shadow-lg shadow-celeste-500/25 hover:bg-celeste-700 dark:hover:bg-celeste-600 transition-all transform active:scale-95 !text-xs flex items-center gap-2 cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>{{ mode === "create" ? "Crear" : "Actualizar" }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- RIGHT COLUMN: Patient Dashboard (Only for View Mode) -->
        <div v-if="mode === 'view'"
          class="lg:w-[50%] p-6 bg-celeste-50/30 dark:bg-slate-900/50 border-l border-celeste-50 dark:border-slate-700 overflow-y-auto flex flex-col relative">
          <div class="relative z-10 flex items-center justify-between mb-6">
            <div>
              <h3 class="!text-sm font-extrabold text-celeste-900 dark:text-slate-100 uppercase tracking-widest mb-1">
                Mascotas registradas
              </h3>
              <div class="h-1 w-6 bg-celeste-400 rounded-full"></div>
            </div>
            <div class="flex items-center gap-3">
              <button v-if="!persona?.listaMascotas?.length" @click="registrarNuevaMascota"
                class="px-3 py-1.5 bg-celeste-600 dark:bg-celeste-500 hover:bg-celeste-700 dark:hover:bg-celeste-600 text-white rounded-xl text-xs font-bold transition-all transform active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-plus text-xs"></i>
                <span>Registrar Nueva Mascota</span>
              </button>
              <div
                class="bg-white dark:bg-slate-700 px-3 py-1 rounded-lg border border-celeste-200 dark:border-slate-600 shadow-sm">
                <span class="text-celeste-700 dark:text-slate-200 font-bold text-sm">{{ persona?.listaMascotas?.length
                  || 0 }}</span>
              </div>
            </div>
          </div>

          <div v-if="persona?.listaMascotas?.length > 0"
            class="relative z-10 grid grid-cols-1 gap-3 flex-1 content-start">
            <div v-for="mascota in persona.listaMascotas" :key="mascota.id_mascota"
              class="group p-2 rounded-xl bg-white dark:bg-slate-800 border border-celeste-100 dark:border-slate-700 hover:border-celeste-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-300">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg bg-celeste-50 dark:bg-slate-700 border border-celeste-100 dark:border-slate-600 flex items-center justify-center text-celeste-500 dark:text-celeste-400 group-hover:bg-celeste-500 group-hover:text-white transition-all">
                  <i :class="[
                    getPetIcon(mascota.raza?.especie?.nombre),
                    'text-lg',
                  ]"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-celeste-950 dark:text-slate-100 text-sm truncate transition-colors">
                    {{ mascota.nombre }}
                  </h4>
                  <div class="flex items-center justify-between mt-1">
                    <span
                      class="text-[9px] font-bold text-celeste-600 dark:text-celeste-400 uppercase tracking-tighter">
                      {{ mascota.raza?.especie?.nombre || "Especie" }}
                    </span>
                    <button @click="verFichaMascota(mascota.id_mascota || mascota.id)"
                      class="!text-xs font-extrabold text-celeste-500 dark:text-celeste-400 hover:text-celeste-700 dark:hover:text-celeste-300 uppercase tracking-widest flex items-center gap-1 transition-colors cursor-pointer">
                      Ver ficha →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else
            class="flex-1 flex flex-col items-center justify-center py-10 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-celeste-200 dark:border-slate-700 shadow-sm p-6 text-center gap-3">
            <div
              class="w-12 h-12 bg-celeste-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-1">
              <i class="fa-solid fa-paw text-xl text-celeste-400 dark:text-celeste-400"></i>
            </div>
            <p class="text-celeste-500 dark:text-celeste-400 font-bold text-[10px] uppercase tracking-widest">
              Sin pacientes registrados
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isOpen: Boolean,
  mode: { type: String, default: 'create' },
  persona: { type: Object, default: () => ({}) },
  subtitleOverride: { type: String, default: '' }
});

const emit = defineEmits(["close", "submit"]);
const router = useRouter();

const formData = ref({
  nombre: "",
  apellido: "",
  dni: "",
  telefono: "",
  email: "",
});

const title = computed(() => {
  if (props.mode === "create") return "Agregar Dueño";
  if (props.mode === "edit") return "Editar Dueño";
  return props.persona?.nombre + " " + props.persona?.apellido;
});

const subtitle = computed(() => {
  if (props.subtitleOverride) return props.subtitleOverride;
  if (props.mode === 'create') return 'GESTIONAR DATOS DE UN DUEÑO';
  if (props.mode === 'edit') return 'GESTIONAR DATOS DE UN DUEÑO';
  return 'EXPEDIENTE DEL DUEÑO';
});

const getPetIcon = (especie) => {
  if (!especie) return "fa-solid fa-paw";
  const esp = especie.toLowerCase();
  if (esp.includes("perro")) return "fa-solid fa-dog";
  if (esp.includes("gato")) return "fa-solid fa-cat";
  return "fa-solid fa-paw";
};

const resetForm = () => {
  formData.value = {
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
  };
};

watch(
  () => props.persona,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      formData.value = {
        nombre: newVal.nombre || "",
        apellido: newVal.apellido || "",
        dni: newVal.dni || "",
        telefono: newVal.telefono || "",
        email: newVal.email || "",
      };
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

const close = () => {
  emit("close");
  if (props.mode === "create") resetForm();
};

const verFichaMascota = (id) => {
  router.push({
    path: "/mascotas",
    query: { viewId: id },
  });
};

const registrarNuevaMascota = () => {
  const ownerId = props.persona?.id_persona || props.persona?.id;
  close();
  router.push({
    path: "/mascotas",
    query: { openCreate: "true", ownerId: ownerId },
  });
};

const handleSubmit = () => {
  emit("submit", { ...formData.value });
};
</script>

<style scoped>
.animate-in.slide-in-from-bottom {
  animation: slide-in-from-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-in-from-bottom {
  from {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
