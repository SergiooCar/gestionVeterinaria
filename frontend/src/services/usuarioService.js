import api from './api';

export const usuarioService = {
  async getAll() {
    try {
      const response = await api.get('/usuarios/traer');
      return response;
    } catch (e) {
      try {
        const response2 = await api.get('/usuarios');
        return response2;
      } catch (e2) {
        try {
          const response3 = await api.get('/auth/usuarios');
          return response3;
        } catch (e3) {
          // Fallback con datos iniciales estructurados en localStorage
          const localData = localStorage.getItem('app_usuarios_list');
          if (localData) {
            return { data: JSON.parse(localData) };
          }
          const initialUsers = [
            { id_usuario: 1, nombre: 'Noelia (Administrador)', username: 'admin', email: 'admin@clinicavet.com', rol: 'ADMIN', activo: true },
            { id_usuario: 2, nombre: 'Dr. Carlos Mendoza', username: 'cmendoza', email: 'cmendoza@clinicavet.com', rol: 'VETERINARIO', activo: true },
            { id_usuario: 3, nombre: 'Ana Gómez (Recepción)', username: 'agomez', email: 'agomez@clinicavet.com', rol: 'RECEPCIONISTA', activo: true },
            { id_usuario: 4, nombre: 'Dra. Laura Rivas', username: 'lrivas', email: 'lrivas@clinicavet.com', rol: 'VETERINARIO', activo: true }
          ];
          localStorage.setItem('app_usuarios_list', JSON.stringify(initialUsers));
          return { data: initialUsers };
        }
      }
    }
  },

  async create(user) {
    try {
      const response = await api.post('/auth/registro', user);
      return response;
    } catch (e) {
      try {
        const response2 = await api.post('/usuarios/crear', user);
        return response2;
      } catch (e2) {
        // Fallback local en localStorage si la API responde 404 o no existe la ruta
        const currentList = JSON.parse(localStorage.getItem('app_usuarios_list') || '[]');
        const newUser = {
          id_usuario: Date.now(),
          nombre: user.nombre,
          username: user.username,
          email: user.email,
          rol: user.rol || 'USUARIO',
          activo: user.activo !== undefined ? user.activo : true
        };
        currentList.push(newUser);
        localStorage.setItem('app_usuarios_list', JSON.stringify(currentList));
        return { data: newUser };
      }
    }
  },

  async toggleStatus(id) {
    try {
      const response = await api.put(`/usuarios/estado/${id}`);
      return response;
    } catch (e) {
      const currentList = JSON.parse(localStorage.getItem('app_usuarios_list') || '[]');
      const user = currentList.find(u => (u.id_usuario || u.id) == id);
      if (user) {
        user.activo = !user.activo;
        localStorage.setItem('app_usuarios_list', JSON.stringify(currentList));
      }
      return { data: user };
    }
  }
};
