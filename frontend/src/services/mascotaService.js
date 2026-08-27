import api from "./api";

export const mascotaService = {
  getAll() {
    return api.get("/mascotas/traer");
  },
  getById(id) {
    return api.get(`/mascotas/traer/${id}`);
  },
  save(data) {
    return api.post("/mascotas/crear", data);
  },
  update(id, mascota) {
    return api.put(`/mascotas/editar/${id}`, mascota);
  },
  delete(id) {
    return api.delete(`/mascotas/borrar/${id}`);
  },
};
