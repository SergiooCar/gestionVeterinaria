import api from './api';

export const razaService = {
  getAll() {
    return api.get('/razas/traer');
  },
  getById(id) {
    return api.get(`/razas/traer/${id}`);
  },
  save(data) {
    return api.post('/razas/crear', data);
  }
};
