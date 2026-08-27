import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Personas from '../views/Personas.vue'
import Mascotas from '../views/Mascotas.vue'
import Agenda from '../views/Agenda.vue'
import ConfirmarTurno from '../views/ConfirmarTurno.vue'
import AtencionRegistro from '../views/AtencionRegistro.vue'
import ConfiguracionPracticas from '../views/ConfiguracionPracticas.vue'
import Seguridad from '../views/Seguridad.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/personas',
    name: 'Personas',
    component: Personas
  },
  {
    path: '/mascotas',
    name: 'Mascotas',
    component: Mascotas
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda
  },
  {
    path: '/confirmar-turnos',
    name: 'ConfirmarTurno',
    component: ConfirmarTurno
  },
  {
    path: '/atencion-registro/:id',
    name: 'AtencionRegistro',
    component: AtencionRegistro
  },
  {
    path: '/configuracion/practicas',
    name: 'ConfiguracionPracticas',
    component: ConfiguracionPracticas,
    alias: '/config'
  },
  {
    path: '/seguridad',
    name: 'Seguridad',
    component: Seguridad
  },
  {
    path: '/fichas',
    name: 'Fichas',
    component: Dashboard // Placeholder
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
