import api from './api';

export const especieService = {
  getAll() {
    return api.get('/especies/traer');
  },
  getById(id) {
    return api.get(`/especies/traer/${id}`);
  },
  save(data) {
    return api.post('/especies/crear', data);
  }
};
