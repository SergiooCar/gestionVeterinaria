import api from './api';

export const personaService = {
  getAll() {
    return api.get('/personas/traer');
  },
  getById(id) {
    return api.get(`/personas/traer/${id}`);
  },
  create(persona) {
    return api.post('/personas/crear', persona);
  },
  update(id, persona) {
    return api.put(`/personas/editar/${id}`, persona);
  },
  delete(id) {
    return api.delete(`/personas/borrar/${id}`);
  }
};
