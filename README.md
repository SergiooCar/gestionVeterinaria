# Sistema de Gestión de Clínica Veterinaria

Este proyecto es un sistema de gestión integral para una clínica veterinaria. Permite administrar pacientes (mascotas), clientes (dueños), turnos y llevar un registro detallado de las atenciones y el historial clínico.

El proyecto está dividido en dos partes principales: un backend robusto construido con **Spring Boot** y un frontend moderno y reactivo desarrollado con **Vue.js**.

## 🛠️ Tecnologías Utilizadas

### Backend (`/backend`)

- **Java 17**
- **Spring Boot 3.3.4**
  - Spring Web (API REST)
  - Spring Data JPA (Persistencia de datos)
  - Spring Security (Autenticación y Autorización)
- **MySQL** (Base de datos relacional)
- **Lombok** (Reducción de código boilerplate)
- **Maven** (Gestión de dependencias)

### Frontend (`/frontend`)

- **Vue.js 3** (Composition API)
- **Vite** (Herramienta de construcción rápida)
- **Vue Router** (Navegación SPA)
- **Tailwind CSS 4** & **Bootstrap 5** (Estilos y diseño responsivo)
- **Axios** (Peticiones HTTP)

## 🌟 Características Principales

- **Gestión de Dueños y Mascotas:** Registro, actualización y visualización de clientes y sus mascotas.
- **Agenda de Turnos:** Programación y confirmación de turnos para los pacientes.
- **Historial Clínico:** Registro de atenciones médicas, prácticas realizadas y evolución clínica de cada mascota.
- **Autenticación:** Sistema de login para proteger las rutas y las operaciones del sistema.
- **Diseño Responsivo:** Interfaz adaptable a diferentes tamaños de pantalla (modo claro/oscuro o "Light & Clínico").

## 🚀 Instalación y Ejecución Local

Para ejecutar este proyecto en tu máquina local, necesitarás tener instalados **Java 17**, **Maven**, **Node.js**, y un servidor **MySQL**.

### 1. Clonar el repositorio

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd veterinaria
```

### 2. Configurar y Ejecutar el Backend

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Configura tu base de datos MySQL. Asegúrate de tener una base de datos creada para el proyecto y verifica las credenciales en `src/main/resources/application.properties` o `application.yml`.
3. Compila y ejecuta la aplicación con Maven:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   El backend estará corriendo en `http://localhost:8080`.

### 3. Configurar y Ejecutar el Frontend

1. Abre una nueva terminal y navega a la carpeta del frontend desde la raíz del proyecto:
   ```bash
   cd frontend
   ```
2. Instala las dependencias de Node.js:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El frontend estará corriendo, generalmente, en `http://localhost:5173` (o el puerto que indique Vite).

## 📄 Licencia

Este proyecto es de código abierto.
